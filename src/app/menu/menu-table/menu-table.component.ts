import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
// 2. 引入ng2-validation中的组件
import {CustomValidators} from 'ng2-validation';
import { Subject }           from 'rxjs/Subject';

import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Menu } from '../../models/menu';
import { MenuSearchComponent } from '../menu-search/menu-search.component';
import { MenuService} from '../../shared-service/menu-service';
declare var $:any;
declare var layer: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu-table.component.html',
  styleUrls: ['./menu-table.component.css']
})
export class MenuTableComponent implements OnInit {
  // menus: Observable<Menu[]>;
  // private searchTerms = new Subject<string>();
  // @Input("mfData") public inputData: any[] = [];
  @ViewChild(MenuSearchComponent)
  private timerComponent: MenuSearchComponent;
  public data: any[];
  countChange($event) {
    console.log($event)
   console.log(typeof ($event))
   //  this.data = $event;
    this.data = this.timerComponent.data;
  }
  private tjmenu:boolean;
  private clicked:boolean;
  public params: any;  // 保存页面url参数
  // public data: any[];
  // filterQuery = "";
  rowsOnPage = 10;
   sortBy = "parentCode";
  sortOrder = "asc";
  menus: Menu[];
  menu: Menu;
  selectedMenu: Menu;
  parentNames = ['首页', '设备管理', '系统管理'];
  Menu=new Menu();
  myWindow = 'newWindow';
  parentName: string = '首页';
  info: string = '';
  // 表单验证
  form:FormGroup;
  onSelect(menu: Menu): void {
    this.selectedMenu = menu;
    console.log('xxx');
  }
  setInfo() {
    this.info = this.parentName;
  }
  constructor(
    private router: Router,
    private menuService: MenuService,

    private location: Location) {
    // 初始化表达组里面的内容
    this.form = new FormGroup({
      name: new FormControl('', CustomValidators.range([2, 10])),
      coding: new FormControl('', CustomValidators.number)
      // address: new FormControl('', CustomValidators.url)
      // ,
      // position: new FormControl('', CustomValidators.range([2, 20])),
      // habby: new FormControl('', CustomValidators.range([2, 50])),
      // phone: new FormControl('', CustomValidators.phone("zh-CN")),
      // email: new FormControl('', CustomValidators.email),
      // url: new FormControl('', CustomValidators.url)
    });

  }
  ngOnInit(): void {
    this.getMenus();
    $('input[name="address"],#parentName').change(function(){
      if($(this).val()){
        $(this).parent().find('.must3').hide();
      }
    })

  }

  getMenus(): void {
    this.menuService.getMenuDatas().then( menus => {
      this.menus  = menus;
      this.data = this.menus;
    });
  }
  // gotoDetail(): void {
  //   this.router.navigate(['/user-detail', this.selectedMenu.id]);
  // }
  add(ids:number,name: string, coding: string, address: string, parentName: string,parentCode: string,
      newWindow: string, details: string ): void {
    name = name.trim();
    console.log(newWindow)
    coding = coding.trim();
    if(!parentName){
      $('.must3').show();
      return;
    }
    address = address.trim();
    parentName = parentName.trim();
    parentCode = parentCode.trim();
    details = details.trim();
    if (!ids && !name && !coding && !address && !newWindow && !parentName && !parentCode ) { return; }
    this.menuService.create(ids,name, coding, address, parentName, parentCode,newWindow, details)
      .then(menu => {
        if(typeof (menu)=='string'){
          layer.open({
            title: '提示'
            ,content: menu
          });
        }
        this.menus.push(menu);
        console.log(this.menus)
        this.getMenus();
        this.selectedMenu = null;
        $('#details').val('');
      });
    $('#details').val('');
    this.tjmenu = false;
    this.clicked = false;
    layer.open({
      title: '提示'
      ,content: '添加成功'
    });
  }
  delete(menu: Menu): void {

      this.menuService
        .delete(menu.menuId)
        .then(() => {
          this.menus = this.menus.filter(h => h !== menu);
          // this.data = this.data.filter(h => h !== menu);
          if (this.selectedMenu === menu) { this.selectedMenu = null; }
        });
      layer.open({
        title: '提示'
        ,content: '删除成功！'
      });
      this.getMenus();



  }
  // delete(menu: Menu): void {
  //   this.menuService
  //     .delete(menu.id)
  //     .then(() => {
  //       this.menus = this.menus.filter(h => h !== menu);
  //       if (this.selectedMenu === menu) { this.selectedMenu = null; }
  //     });
  // }
  save(): void {
    this.menuService.update(this.menu);
    layer.open({
      title: '提示'
      ,content: '修改成功'
    });
    // .then(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
  toInt(num: string) {
    return +num;
  }

  sortByWordLength = (a: any) => {
    return a.city.length;
  }

}





