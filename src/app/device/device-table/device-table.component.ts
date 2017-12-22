import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Device } from '../../models/device';
import { DeviceService } from '../device-service';
declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.css']
})
export class DeviceTableComponent implements OnInit {
  devices: Device[];
  device: Device;
  selectedDevice: Device;
   tjmenu:boolean;
   clicked:boolean;
   deletemenu:boolean = false;
  public params; // 保存页面url参数 2012-10-20 11:11:11
  public totalNum ; // 总数据条数
  public pageSize = 10;// 每页数据条数
  public totalPage;// 总页数
  public totalPages = 7 ;// 分页显示数目
  public curPage = 1;// 当前页码
  public isEmpty:boolean = false;
  public isSearch:boolean = false;
  public pageList= [{
    isActive: true,
    pageNum: '1'
  }];
  pages: any;
  Device=new Device();
  parentNames = ['普通管理员', '超级管理员', '初级管理'];
  constructor(
    private router: Router,
    private userService: DeviceService,
    private location: Location
  ) {
  }


  setPagingArr() {
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
  }

  resetPagingArr() {
    this.pageList[0].isActive = true;
    this.curPage = 0;
  }

  changePage(index) {
    this.userService.getMenuDatas(index,10).then( res => {
      if(res['code'] == 0){
        this.devices = res['data']['list'];
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

  ngOnInit(): void {
    this.getElectricities();
  }


  getElectricities(): void {
    let index = layer.load(1, {shade: false,skin: 'load-box',offset: '30%',area:'30px'});
    this.userService.getMenuDatas(1,10).then( res => {
      layer.close(index);
      if(res['code'] == 0){
        if(res['data']['list']){
          this.devices = res['data']['list'];
        }else{
          this.isEmpty=true;
        }
        this.curPage = res['data']['pageNum'];
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


  onSelect(helper: Device): void {
    this.selectedDevice = helper;
  }

  search2(term: string): void{
    this.userService.search2(term).then( menus => {
      if(!menus['list']){
        layer.open({
          title: '提示'
          ,content: '没有查询到数据'
        });
        return
      }
      if(menus['list'].length==0){
        layer.open({
          title: '提示'
          ,content: '没有查询到数据！'
        });
      }
      if(menus['list'].length>0){
        this.devices = menus['list'];
        this.isSearch = true;
      }
    });
  }
  // delete(userId: number): void{
  //   // var _this = this;
  //   layer.open({
  //     content: '确定删除？'
  //     , btn: ['确定', '取消']
  //     // , yes: function (index, layero) {
  //     //   _this.userService.delete(userId).then(() => {
  //     //     // layer.open({
  //     //     //   title: '提示'
  //     //     //   ,content: '删除成功！'
  //     //     // });
  //     //     _this.getMenus();
  //     //   })
  //     // }
  //     , yes: () => {
  //       this.userService.delete(userId).then(() => {
  //         this.getElectricities();
  //       })
  //     }
  //     , btn2: () => {
  //
  //     }
  //   })
  // }
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
  //     .subscribe(res => {
  //       console.log(res["status"])
  //       // console.log(typeof (res))
  //       if(res["status"]==1){
  //         layer.open({
  //           title: '提示'
  //           ,content: '添加成功'
  //         });
  //         // this.dictionarys.push(menu);
  //         this.getMenus();
  //         this.selectedDevice = null;
  //         this.tjmenu = false;
  //         this.clicked = false;
  //       }else{
  //         layer.open({
  //           title: '提示'
  //           ,content: res["objectbean"],
  //           end:function () {
  //             $('#helperId').focus();
  //           }
  //         });
  //
  //       }
  //     });
  // }
  //
  // save(): void {
  //   this.userService.update(this.selectedDevice)
  //     .then(() => {this.getMenus();this.deletemenu = false;this.clicked = false;
  //       layer.open({
  //         title: '提示'
  //         ,content: '修改成功'
  //       });
  //
  //   });
  // }
  // gotoDetail(): void {
  //   this.router.navigate(['/user-detail', this.selectedMenu.id]);
  // }

  goBack(): void {
    this.location.back();
  }


}







