import { Component, Input, OnInit } from '@angular/core';
// 1. 引入forms中的组件
import {FormGroup, FormControl} from '@angular/forms';
// 2. 引入ng2-validation中的组件
import {CustomValidators} from 'ng2-validation';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Helpers } from '../../models/helpers';
import { HelperService } from '../helpers-service';
declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-helpers-table',
  templateUrl: './helpers-table.component.html',
  styleUrls: ['./helpers-table.component.css']
})
export class HelpersTableComponent implements OnInit {
  // form:FormGroup;
  public data: any[];
  rowsOnPage = 10;
  sortOrder = "asc";
  helpers: Helpers[];
  helper: Helpers;
  selectedHelper: Helpers;
  private tjmenu:boolean;
  private clicked:boolean;
  private deletemenu:boolean = false;
  Helpers=new Helpers();
  parentNames = ['普通管理员', '超级管理员', '初级管理'];
  constructor(
    private router: Router,
    private userService: HelperService,
    private location: Location
  ) {
    // // 4. 初始化表达组里面的内容
    // this.form = new FormGroup({
    //   phone: new FormControl('', CustomValidators.phone("zh-CN"))
    // });
  }

  ngOnInit(): void {
    this.getElectricities();
  }


  delete(helper: Helpers): void {
    console.log(helper.helperId)
    this.userService
      .delete(helper.helperId)
      .then(() => {
        this.helpers = this.helpers.filter(h => h !== helper);
        this.data = this.helpers;
        layer.open({
                    title: '提示'
                    ,content: '删除成功'
                  });
        if (this.selectedHelper === helper) { this.selectedHelper = null; }
      });
      // layer.open({
      //   content: '确定删除？'
      //   , btn: ['确定', '取消']
      //   , yes: () => {
      //     this.userService
      //       .delete(helper.helperId)
      //       .then(() => {
      //         this.helpers = this.helpers.filter(h => h !== helper);
      //         if (this.selectedHelper === helper) { this.selectedHelper = null; }
      //       });
      //   }
      //   , btn2: () => {
      //
      //   }
      // })
  }

  // delete(userId: number): void{
  //   layer.open({
  //     content: '确定删除？'
  //     , btn: ['确定', '取消']
  //     , yes: () => {
  //       this.userService.delete(userId).then(() =>{
  //         this.getMenus();
  //       })
  //     }
  //     , btn2: () => {
  //
  //     }
  //   })
  // }

  getElectricities(): void {
    this.userService.getMenuDatas().then( electricities => {
      console.log(electricities)
      this.helpers = electricities
      this.data = this.helpers;
    });
  }

  onSelect(helper: Helpers): void {
    this.selectedHelper = helper;
    // console.log(electricity.data);

  }

  // search(term: string): void {
  //   this.searchTerms.next(term);
  // }

  search2(term: string): void{

    this.userService.search2(term).then( menus => {
      // if(typeof (menus)=='string'){
      //   layer.open({
      //     title: '提示'
      //     ,content: '没有查询到数据！'
      //   });
      // }else{
        this.data=menus;
      // }
      console.log(this.data);
    });
  }
  add(helperId:number,helperName: string, age: number, sex: string,address: string,
           phoneNumber: string, nationalId: string): void {

    this.userService.create(helperId,helperName,age,sex,address,phoneNumber,nationalId)
      .then(hero => {
        this.helpers.push(hero);
        this.selectedHelper = null;
        this.tjmenu = false;
        this.clicked = false;
        this.getMenus();
      });
  }
  // add(helperId:number,helperName: string, age: number, sex: string,address: string,
  //     phoneNumber: string, nationalId: string ): void {
  //   helperName = helperName.trim();
  //
  //   address = address.trim();
  //   nationalId = nationalId.trim();
  //   phoneNumber = phoneNumber.trim();
  //   if (!helperId && !helperName && !age  && !sex && !phoneNumber && !address && nationalId ) { return; }
  //   this.userService.create(helperId,helperName,age,sex,address,phoneNumber,nationalId)
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
  //         this.selectedHelper = null;
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
  getMenus(): void {
    this.userService.getMenuDatas().then( menus => {
      this.helpers  = menus;
      this.data = this.helpers;
    });
  }
  save(): void {
    this.userService.update(this.selectedHelper)
      .then(() => {
        this.deletemenu = false;
        this.clicked = false;
        layer.open({
                  title: '提示'
                  ,content: '修改成功'
                });
    });
  }
  // save(): void {
  //   this.userService.update(this.selectedHelper)
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







