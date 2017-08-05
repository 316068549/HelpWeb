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
  private tjmenu:boolean;
  private clicked:boolean;
  private deletemenu:boolean = false;
  public params; // 保存页面url参数 2012-10-20 11:11:11
  public totalNum ; // 总数据条数
  public pageSize = 5;// 每页数据条数
  public totalPage ;// 总页数
  public curPage = 1;// 当前页码
  pages: any;
  Device=new Device();
  parentNames = ['普通管理员', '超级管理员', '初级管理'];
  constructor(
    private router: Router,
    private userService: DeviceService,
    private location: Location
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

  getPageData(pageNo) {
    let vm = this;
    vm.curPage = pageNo;
    this.userService.getMenuDatas(pageNo).then( res => {
      if(res['code'] == 0){
        this.devices = res['data']['list'];
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

  ngOnInit(): void {
    this.getElectricities();
  }


  getElectricities(): void {
    this.userService.getMenuDatas(1,5).then( res => {
      if(res['code'] == 0){

      }else if(res['code'] == 5){
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
      if(res['data']['list']){
        this.devices = res['data']['list'];
        this.totalPage = Math.ceil(this.devices.length/5);
        this.totalNum = this.devices.length;
        this.pages  = res['data']['page'];
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
          ,content: '错误'
        });
      }
      if(menus['list'].length==0){
        layer.open({
          title: '提示'
          ,content: '没有查询到数据！'
        });
      }
      if(menus['list'].length>0){
        this.devices = menus['list'];
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







