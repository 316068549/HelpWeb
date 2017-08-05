import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';

import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Role } from '../../models/role';
import { Menu } from '../../models/menu';
import { PermissionService } from '../permissions-service';
declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-permissions-table',
  templateUrl: './permissions-table.component.html',
  styleUrls: ['./permissions-table.component.css']
})
export class PermissionTableComponent implements OnInit {
  roles: Role[];
  role: Role;
  menus: Menu[];
  menus2: Menu[];
  menus3: Menu[];
  selectedRole: Role;
  private tjmenu:boolean;
  private clicked:boolean;
  private submied:boolean = false;
  private addbtn:boolean = false;
  private edit:boolean = false;
  private del:boolean = false;
  private deletemenu:boolean = false;
  Role=new Role();
  addIDs = [];
  public params; // 保存页面url参数
  public totalNum ; // 总数据条数
  public pageSize = 5;// 每页数据条数
  public totalPage ;// 总页数
  public curPage = 1;// 当前页码
  pages: any;
  term={};
  parentNames = [];
  addIDs2 = [];
  originalRoleId:number;
  originalUserName:string;
  constructor(
    private router: Router,
    private userService: PermissionService,
    private location: Location,
  private route: ActivatedRoute
  ) {
    let vm = this;
    if (vm.params) {
      vm.params = vm.params.replace('?', '').split('&');
      let theRequest = [];
      for (let i = 0; i < vm.params.length; i++) {
        theRequest[vm.params[i].split("=")[0]] = vm.params[i].split("=")[0] == 'pageNo' ? parseInt(vm.params[i].split("=")[1]) : vm.params[i].split("=")[1];
      }
      vm.params = theRequest;
      if (vm.params['pageNo']) {
        vm.curPage = vm.params['pageNo'];
        //console.log('当前页面', vm.curPage);
      }
    } else {
      vm.params = {};
    }
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.userService.getMenuBtns(params['permissionId']))
      .subscribe(rescue => {
        for(let i=0;i<rescue.length;i++){
          if(rescue[i].permissionUrl=="add"){
            this.addbtn = true;
          }
          if(rescue[i].permissionUrl=="edit"){
            this.edit = true;
          }
          if(rescue[i].permissionUrl=="del"){
            this.del = true;
          }

        }
      });
    this.getElectricities();
  }

  getElectricities(): void {
    this.userService.getMenuList(1,5).then( res => {
      // if(res['code'] == 0){
      //   this.getElectricities();
      // }else if(res['code'] == 5){
      //   alert(res['error']);
      //   this.router.navigate(['login']);
      // }else if(res['code'] == 6){
      //   alert(res['error']);
      //   this.router.navigate(['login']);
      // }else{
      //   alert(res['error']);
      // }
      this.roles = res['list'];
      this.pages  = res['page'];
    });
  }

  getPageData(pageNo) {
    let vm = this;
    vm.curPage = pageNo;
    this.userService.getMenuList(pageNo,5).then( res => {
      if(res['code'] == 0){
        this.roles = res['data']['list'];
      }
      else if(res['code'] == 5){
        layer.open({
          title: '提示'
          ,content: res['error']
        });
        this.router.navigate(['login']);
      }else if(res['code'] == 6){
        layer.open({
          title: '提示'
          ,content: res['error']
        });
        this.router.navigate(['login']);
      }else{
        layer.open({
          title: '提示'
          ,content: res['error']
        });
      }
    })
    console.log('触发', pageNo);
  }

  onSelect(user: Role): void {
    this.selectedRole = user;
    this.originalUserName =this.selectedRole.roleName;
  }

  searchParMenu(): void{
    this.parentNames=[];
    this.addIDs=[];
    this.addIDs2=[];
    this.term={};
    this.userService.getMenuDatas().then( menus => {
      this.menus = menus['allList']
      console.log(this.menus)
      // for(let i=0;i<this.menus.length;i++){
      //   this.menus[i].permissionDescription = null;
      //   for(let a=0;a<this.menus[i].subAdminPermission.length;a++){
      //     this.menus[i].subAdminPermission[a].permissionDescription = null;
      //     for(let b=0;b<this.menus[i].subAdminPermission[a].subAdminPermission.length;b++){
      //       this.menus[i].subAdminPermission[a].subAdminPermission[b].permissionDescription = null;
      //     }
      //   }
      // }
    });
  }
  ak3(status,name,id){
    $.each(this.menus,(i, role)=>{
      $.each(role.subAdminPermission,(i, role2)=>{
        $.each(role2.subAdminPermission,(i, role3)=>{
          if(role3.selected) {
            $.each(this.menus,(i, ak)=>{
              $.each(ak.subAdminPermission,(i, ak2)=>{
                if(ak2.permissionId==role3.permissionParentId){
                  ak2.selected =true;
                  $.each(this.menus,(i, it)=>{
                    if(it.permissionId==ak2.permissionParentId){
                      it.selected =true;
                    }
                  })
                }
              })
            })
          }
        })
      })
    })
    console.log(this.addIDs2)
  }
  ak2(status,name,id){
    $.each(this.menus,(i, role)=>{
      $.each(role.subAdminPermission,(i, role2)=>{
        if(role2.selected) {
          $.each(this.menus,(i, ak)=>{
            if(ak.permissionId==role2.permissionParentId){
              ak.selected =true;
            }
          })
          $.each(role2.subAdminPermission,(i, role3)=>{
            role3.selected=true;
          })
        }else{
          $.each(this.menus,(i, ak)=>{
            if(ak.permissionId==role2.permissionParentId){
              ak.selected=false;
            }
          })
          $.each(role2.subAdminPermission,(i, role3)=>{
            role3.selected=false;
          })
        }
      })
    })
    console.log(this.addIDs2)
  }
  ak(status,name,id){
    $.each(this.menus,(i, role)=>{
      if(role.selected){
        $.each(role.subAdminPermission,(i, role2)=>{
          role2.selected=true;
          $.each(role2.subAdminPermission,(i, role3)=>{
            role3.selected=true;
          })
        })
      }else{
        $.each(role.subAdminPermission,(i, role2)=>{
          role2.selected=false;
          $.each(role2.subAdminPermission,(i, role3)=>{
            role3.selected=false;
          })
        })
      }
    })
    console.log(this.menus)
   // if(status){
   //   this.addIDs2.push(id);
   //   // if(name){
   //   //   if(name.indexOf('status')==-1){
   //   //     this.term[id]=name;
   //   //   }
   //   // }
   // }else{
   //   for(let i=0;i<this.addIDs2.length;i++){
   //     if(this.addIDs2[i]==id){
   //       this.addIDs2.splice(i,1)
   //     }
   //   }
   //   // if(this.term.hasOwnProperty(id)){
   //   //  delete this.term[id];
   //   //   console.log(this.term)
   //   // }
   // }
     console.log(this.term)
    console.log(this.addIDs2)
 }

  add(): void {
    $.each(this.menus,(i, role)=>{
      if(role.selected){
        this.addIDs.push(role.permissionId);
      }
      $.each(role.subAdminPermission,(i, role2)=>{
        if(role2.selected){
          this.addIDs.push(role2.permissionId);
          this.term[role2.permissionId]='subMenu_'+role2.permissionParentId;
        }
        $.each(role2.subAdminPermission,(i, role3)=>{
          if(role3.selected){
            this.addIDs.push(role3.permissionId);
            this.term[role3.permissionId]='buttonMenu_'+role2.permissionParentId+'_'+role3.permissionParentId;
          }
        })
      })
    })
    let str ='';
    $.each(this.addIDs, function(i, item){
      str +=item+',';
    });
    str=str.substring(0,str.length - 1)
    console.log(str);
    let str2 ='';
    for(var key in this.term){
      str2+=this.term[key]+'='+key+'&';
    }
    console.log(str2);
    this.userService.create(str, this.Role.roleName, this.Role.roleDescription,str2)
      .then(menu => {
        // if(!menu) {
        //   layer.open({
        //     title: '提示'
        //     , content: "添加失败"
        //   });
        //   return;
        // }
        if(typeof (menu)=='string'){
          layer.open({
            title: '提示'
            ,content: '添加成功'
          });
        }
        this.getElectricities();
        this.selectedRole = null;
        $('#details').val('');
        this.submied = true;
        this.tjmenu = false;
        this.clicked = false;
      });
  }

  searchParMenu2(id:number): void{
    this.addIDs=[];
    this.addIDs2=[];
    this.term={};
    this.originalUserName='';
    this.menus3 = null;
    this.userService.getMenuDatas(id).then( menus => {
      this.menus = menus['allList'];
      this.menus3 = menus['userList'];
      console.log(this.addIDs2);
      $.each(this.menus3,(i, role)=>{
          this.addIDs2.push(role.permissionId);
        $.each(role.subAdminPermission,(i, role2)=>{
            this.addIDs2.push(role2.permissionId);
          $.each(role2.subAdminPermission,(i, role3)=>{
              this.addIDs2.push(role3.permissionId);
          })
        })
      })
      console.log(this.addIDs2);
        if(menus['userList'].length>0){
          $.each(this.menus, (i, item)=>{
            $.each(menus['userList'], (i, item2)=>{
              if(item.permissionId==item2.permissionId){
                item.selected = true;
              }
              $.each(item.subAdminPermission, (b, item3)=>{
                $.each(item2.subAdminPermission, (c, item4)=>{
                  if(item3.permissionId==item4.permissionId){
                    item3.selected = true;
                  }else{

                  }
                  $.each(item3.subAdminPermission, (d, item5)=>{
                    $.each(item4.subAdminPermission, (e, item6)=>{
                      if(item5.permissionId==item6.permissionId){
                        item5.selected = true;
                      }else{

                      }

                    })

                  })
                })
              })
            });
          });
          console.log(this.menus)

        }
    });
  }

  delete(role: Role): void{
    var ak = layer.open({
      content: '确定删除？'
      , btn: ['确定', '取消']
      , yes: () => {
        this.userService.delete(role.roleId).then(res =>{
          if(res['code'] == 0){
            this.getElectricities();
          }else if(res['code'] == 5){
            alert(res['error']);
            this.router.navigate(['login']);
          }else if(res['code'] == 6){
            alert(res['error']);
            this.router.navigate(['login']);
          }else{
            alert(res['error']);
          }
          layer.close(ak);
        })
      }
      , btn2: () => {

      }
    })
  }

  save(roleId:number,roleName:string,des:string): void {
    $.each(this.menus,(i, role)=>{
      if(role.selected){
        this.addIDs.push(role.permissionId);
      }
      $.each(role.subAdminPermission,(i, role2)=>{
        if(role2.selected){
          this.addIDs.push(role2.permissionId);
          this.term[role2.permissionId]='subMenu_'+role2.permissionParentId;
        }
        $.each(role2.subAdminPermission,(i, role3)=>{
          if(role3.selected){
            this.addIDs.push(role3.permissionId);
            this.term[role3.permissionId]='buttonMenu_'+role2.permissionParentId+'_'+role3.permissionParentId;
          }
        })
      })
    })
    console.log(this.addIDs2);
    console.log(this.addIDs);
    for(let a=0;a<this.addIDs2.length;a++) {
      for (let i = 0; i < this.addIDs.length; i++) {
        if (this.addIDs[i] == this.addIDs2[a]) {
          this.addIDs.splice(i, 1)
        }
      }
    }
    console.log(this.addIDs);
    let str ='';
    $.each(this.addIDs, function(i, item){
      str +=item+',';
    });
    str=str.substring(0,str.length - 1)
    console.log(str);
    let str2 ='';
    for(var key in this.term){
      str2+=this.term[key]+'='+key+'&';
    }
    console.log(str2);

    this.userService.update(roleId,this.originalUserName,roleName,des, str, str2)
      .then(res => {
        if(res['code'] == 0){
          layer.open({
            title: '提示'
            ,content: '修改成功'
          });

        }else{
          layer.open({
            title: '提示'
            ,content: res['data']
          });
          return
        }
        this.selectedRole = null;
        this.getElectricities();
        this.deletemenu = false;
        this.clicked = false;
    });
  }


  // gotoDetail(): void {
  //   this.router.navigate(['/user-detail', this.selectedMenu.id]);
  // }

  goBack(): void {
    this.location.back();
  }


}







