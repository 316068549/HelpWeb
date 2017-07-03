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
  public data: any[];
  rowsOnPage = 10;
  sortOrder = "asc";
  devices: Device[];
  device: Device;
  selectedDevice: Device;
  private tjmenu:boolean;
  private clicked:boolean;
  private deletemenu:boolean = false;
  Device=new Device();
  parentNames = ['普通管理员', '超级管理员', '初级管理'];
  constructor(
    private router: Router,
    private userService: DeviceService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getElectricities();
  }
  delete(userId: number): void{

    this.userService.delete(userId).then(() =>{
      layer.open({
        title: '提示'
        ,content: '删除成功！'
      });
      this.getMenus();
    })
    // this.getMenus();
  }

  getElectricities(): void {
    this.userService.getMenuDatas().then( electricities => {
      console.log(electricities)
      this.devices = electricities
      this.data = this.devices;
    });
  }

  onSelect(helper: Device): void {
    this.selectedDevice = helper;
    // console.log(electricity.data);

  }

  search2(term: string): void{

    this.userService.search2(term).then( menus => {
      if(typeof (menus)=='string'){
        layer.open({
          title: '提示'
          ,content: '没有查询到数据！'
        });
      }else{
        this.data=menus;
      }
      console.log(this.data);
    });
  }
  add(userId:number,userName: string, password: string, role: string,  sex: string,phoneNumber: string,
      address: string, remarks: string ): void {
    userName = userName.trim();
    if(!role){
      $('.must3').show();
      return;
    }
    address = address.trim();
    remarks = remarks.trim();
    phoneNumber = phoneNumber.trim();
    if (!userId && !userName && !password && !role && !sex && !phoneNumber && !address ) { return; }
    this.userService.create(userId,userName, password, role, sex, phoneNumber,address, remarks)
      .subscribe(res => {
        console.log(res["status"])
        // console.log(typeof (res))
        if(res["status"]==1){
          layer.open({
            title: '提示'
            ,content: '添加成功'
          });
          // this.dictionarys.push(menu);
          this.getMenus();
          this.selectedDevice = null;
          this.tjmenu = false;
          this.clicked = false;
        }else{
          layer.open({
            title: '提示'
            ,content: res["objectbean"],
            end:function () {
              $('#helperId').focus();
            }
          });

        }
      });
  }
  getMenus(): void {
    this.userService.getMenuDatas().then( menus => {
      this.devices  = menus;
      this.data = this.devices;
    });
  }
  save(): void {
    this.userService.update(this.selectedDevice)
      .then(() => {this.getMenus();this.deletemenu = false;this.clicked = false;
        layer.open({
          title: '提示'
          ,content: '修改成功'
        });

    });
  }
  // gotoDetail(): void {
  //   this.router.navigate(['/user-detail', this.selectedMenu.id]);
  // }

  goBack(): void {
    this.location.back();
  }


}







