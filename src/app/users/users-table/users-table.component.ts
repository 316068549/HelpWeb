import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';

import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { User } from '../../models/user-model';
import { UserService } from '../users-service';
declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  users: User[];
  user: User;
  selectedUser: User;
  private tjmenu:boolean;
  private clicked:boolean;
  private submied:boolean = false;
  private addbtn:boolean = false;
  private edit:boolean = false;
  private del:boolean = false;
  private deletemenu:boolean = false;
  public params; // 保存页面url参数
  public totalNum; // 总数据条数
  public pageSize = 5;// 每页数据条数
  public totalPage ;// 总页数
  public totalPages = 7 ;// 总页数
  public curPage = 1;// 当前页码
  public isEmpty:boolean = false;
  public usersLength;// 当前页码
  User=new User();
  pages: any;
  parentNames = [];
  rescueTeams = [];
  parentNames2 = [];
  public pageList= [{
    isActive: true,
    pageNum: '1'
  }];
  originalRoleId:number;
  originalUserName:string;
  constructor(
    private router: Router,
    private userService: UserService,
    private location: Location,
  private route: ActivatedRoute
  ) {

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
    this.getElectricities(1);
  }

  getElectricities(index:number): void {
    this.userService.getMenuList(index,5).then( res => {
      if(res['code'] == 0){
        this.curPage = res['data']['pageNum'];
        if(res['data']['list']){
          this.users = res['data']['list'];
        }else{
          this.isEmpty=true;
        }
        this.totalNum   = res['data']['total'];
        this.totalPage   = res['data']['pages'];
        this.setPagingArr();
      }else if(res['code'] == 5){
        var ak = layer.open({
          content: res['error']+'请重新登录'
          , btn: ['确定']
          , yes: () => {
            this.router.navigate(['login']);
              layer.close(ak);
          }
        })
      }else{
        layer.open({
          title: '提示'
          ,content: res['error']
        });
      }
    });
  }
  onSelect(user: User): void {
    this.selectedUser = user;
  }

  setPagingArr() {
    console.log(this.curPage)
    if ( this.totalPage == this.pageList.length) {
      return
    }
    this.pageList = [{
      isActive: true,
      pageNum: '1'
    }];
    let offset = Math.floor(this.totalPages / 2) - 1;
    if(this.totalPage <= this.totalPages){
      for (let i=1;i < this.totalPage;i++){
        this.pageList.push({
          isActive:false,
          pageNum: ''+(i + 1)
        });
      }
    }else {
      if (this.curPage < this.totalPages - offset) {
        for (let i = 1; i < this.totalPages; i++) {
          this.pageList.push({
            isActive: false,
            pageNum: '' + (i + 1)
          });
        }
        this.pageList.push({
          isActive: false,
          pageNum: '...'
        });
        this.pageList.push({
          isActive: false,
          pageNum: '' + this.totalPage
        });
        //右边没有'...'
      }else if(this.curPage >= this.totalPage - offset - 1){
        // this.pageList.push({
        //   isActive: false,
        //   pageNum: '2'
        // });
        this.pageList.push({
          isActive: false,
          pageNum: '...'
        });
        for(let i=this.totalPages - 2;i >= 0 ;i--){
          this.pageList.push({
            isActive: false,
            pageNum: ''+(this.totalPage - i)
          });
        }
        //两边都有'...'
      }else {
        // this.pageList.push({
        //   isActive: false,
        //   pageNum: '2'
        // });
        this.pageList.push({
          isActive: false,
          pageNum: '...'
        });
        for(let i= this.curPage - offset;i < this.curPage + offset; i++){
          this.pageList.push({
            isActive: false,
            pageNum: '' + (i + 1)
          });
        }
        this.pageList.push({
          isActive: false,
          pageNum: '...'
        });
        this.pageList.push({
          isActive: false,
          pageNum: '' + this.totalPage
        });
      }
    }
    // for (var i = 1; i < this.totalPage; i++) {
    //   this.pageList.push({
    //     isActive:false,
    //     pageNum: i + 1
    //   });
    // }
  }

  resetPagingArr() {
    for (var i = 0; i < this.pageList.length; i++) {
      this.pageList[i].isActive = false;
    }
    this.pageList[0].isActive = true;
  }


  changePage(index) {

    // lastPage = page;
    // this.curPage = index;
    this.userService.getMenuList(index,5).then( res => {
      if(res['code'] == 0){
        this.users = res['data']['list'];
        this.curPage = res['data']['pageNum'];
        this.setPagingArr();
        for (var i = 0; i < this.pageList.length; i++) {
          this.pageList[i].isActive = false;
          if(this.pageList[i].pageNum==''+this.curPage){
            this.pageList[i].isActive = true;
          }
        }
      }else if(res['code'] == 5){
        var ak = layer.open({
          content: res['error']+'请重新登录'
          , btn: ['确定']
          , yes: () => {
            this.router.navigate(['login']);
            layer.close(ak);
          }
        })
      }else{
        layer.open({
          title: '提示'
          ,content: res['error']
        });
      }

    })
  }

  searchParMenu(): void{
    this.parentNames=[];
    this.rescueTeams=[];
    this.userService.getParMenus().then( menus => {
      for(let i=0;i<menus.length;i++){
        this.parentNames.push(menus[i])
      }
    });
    this.userService.getRescuesList().then( menus => {
      for(let i=0;i<menus.length;i++){
        this.rescueTeams.push(menus[i])
      }
    });
  }


  searchParMenu2(id:number): void{
    this.originalRoleId=null;
    this.originalUserName='';
    this.parentNames2=[];
    this.rescueTeams=[];
    this.userService.getMenuDetail(id).then( menus => {
      if(menus['adminUser']){
         this.originalRoleId = this.selectedUser.roleList[0].roleId;
         this.originalUserName = menus['adminUser']['nickName'];
      }
      if(menus['adminRoleList']){
        for(let i=0;i<menus['adminRoleList'].length;i++){
          this.parentNames2.push(menus['adminRoleList'][i])
        }
        // this.selectedMenu.subPermissionList = menus['subPermissionList'];
        // for(let i=0;i<menus['subPermissionList'].length;i++){
        //   if(this.selectedMenu.permissionParentId==menus['subPermissionList'][i].permissionId){
        //     this.selectedMenu.parentPermission = menus['subPermissionList'][i].permissionParentId;
        //   }
        //   this.parentNames2.push(menus['subPermissionList'][i])
        // }
      }
    });
    this.userService.getRescuesList().then( menus => {
      for(let i=0;i<menus.length;i++){
        this.rescueTeams.push(menus[i])
      }
    });
  }

  delete(user: User): void{
    var ak = layer.open({
      content: '确定删除？'
      , btn: ['确定', '取消']
      , yes: () => {
        this.userService.delete(user.userId).then(res =>{
          if(res['code'] == 0){
            this.getElectricities(this.curPage);
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

  save(usersId:number,userName: string, nickName: string, password: string,  role: number,rescueTeam: string): void {
    console.log(this.selectedUser.roleList[0].roleId)
    this.userService.update(usersId,this.originalRoleId,this.originalUserName,userName, nickName, password,  role,rescueTeam)
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
        this.selectedUser = null;
        this.getElectricities(this.curPage);
        this.deletemenu = false;
        this.clicked = false;
    });
  }

  ak(a){
    console.log(a)
  }
  search2(term: number): void{
    this.userService.getMenuDetail(term).then( menus => {
      if(!menus){
        layer.open({
          title: '提示'
          ,content: '没有查询到数据'
        });
        return
      }
      if(menus['adminUser']){
        menus['adminUser']['roleList'] = menus['adminRoleList'];
        this.users = [];
        this.users.push(menus['adminUser'])
      }else {
        layer.open({
          title: '提示'
          ,content: '没有查询到数据'
        });
      }
    });
  }
  add(userName: string, nickName: string, password: string,  role: string,rescueTeam: string): void {
    console.log(rescueTeam)
    userName = userName.trim();
    if(!role){
      $('.must3').show();
      return;
    }
    nickName = nickName.trim();
    if (!userName && !nickName && !password  && !role && !rescueTeam ) { return; }
      this.userService.create(userName, nickName, password, role,rescueTeam)
        .then(menu => {
          if(!menu) {
            layer.open({
              title: '提示'
              , content: "添加失败"
            });
            return;
          }
          if(typeof (menu)=='string'){
            layer.open({
              title: '提示'
              ,content: menu
            });
          }
          this.getElectricities(this.curPage);
          this.selectedUser = null;
          $('#details').val('');
          this.submied = true;
          this.tjmenu = false;
          this.clicked = false;
        });
  }

  // add(userId:number,userName: string, password: string, role: string,  sex: string,phoneNumber: string,
  //     address: string, remarks: string ): void {
  //   userName = userName.trim();
  //   if(!role){
  //     $('.must3').show();
  //     return;
  //   }
  //   address = address.trim();
  //   remarks = remarks.trim();
  //   phoneNumber = phoneNumber.trim();
  //   if (!userId && !userName && !password && !role && !sex && !phoneNumber && !address ) { return; }
  //   this.userService.create(userId,userName, password, role, sex, phoneNumber,address, remarks)
  //     .then(menu => {
  //       if(typeof (menu)=='string'){
  //         layer.open({
  //           title: '提示'
  //           ,content: menu
  //         });
  //       }
  //       this.users.push(menu);
  //       console.log(this.users)
  //       this.getMenus();
  //       this.selectedUser = null;
  //       $('#details').val('');
  //     });
  //   $('#details').val('');
  //   this.tjmenu = false;
  //   this.clicked = false;
  //   layer.open({
  //     title: '提示'
  //     ,content: '添加成功'
  //   });
  // }



  // gotoDetail(): void {
  //   this.router.navigate(['/user-detail', this.selectedMenu.id]);
  // }

  goBack(): void {
    this.location.back();
  }


}







