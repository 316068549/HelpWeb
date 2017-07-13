import { Component, Input, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
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
import { LeftNavComponent } from '../../left-nav/left-nav.component';
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
  @ViewChild(LeftNavComponent)
  private timerComponent: MenuSearchComponent;
  private timerComponent2: LeftNavComponent;
  // public data: any[];
  // countChange($event) {
  //   console.log($event)
  //  console.log(typeof ($event))
  //  //  this.data = $event;
  //   this.data = this.timerComponent.data;
  // }
  private tjmenu:boolean;
  private clicked:boolean;
  private addbtn:boolean = false;
  private edit:boolean = false;
  private del:boolean = false;
  public params: any;  // 保存页面url参数
  public totalNum = 0; // 总数据条数
  public pageSize ;// 每页数据条数
  public totalPage;// 总页数
  public curPage ;// 当前页码

  // public data: any[];
  // filterQuery = "";
  // rowsOnPage = 10;
  //  sortBy = "parentCode";
  // sortOrder = "asc";
  menus: Menu[];
  pages: any;
  btns: Menu[];
  menu: Menu;
  selectedMenu: Menu;
  Menu=new Menu();
  wordControl: string='展开';
  parentName: Menu[];
  info: string = '';
  ref;
  // 表单验证
  form:FormGroup;
  onSelect(menu: Menu): void {
    this.selectedMenu = menu;
    console.log('xxx');
  }
  // setInfo() {
  //   this.info = this.parentName;
  // }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService,
     ref: ChangeDetectorRef,
    private location: Location) {
    this.ref = ref;
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

  getPageData(pageNo) {
    let vm = this;
    vm.curPage = pageNo;
    console.log('触发', pageNo);
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.menuService.getMenuBtns(params['permissionId']))
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
    this.getMenus();
    console.log(this.pages)
    // $('input[name="address"],#parentName').change(function(){
    //   if($(this).val()){
    //     $(this).parent().find('.must3').hide();
    //   }
    // })

  }
  searchParMenu(): void{
    this.menuService.getParMenus().then( menus => {
      this.parentName = menus;
    });
  }
  openClose(id:number,val:string,number:number): void{
      this.menuService.getSubMenu(id).then( menus => {
        for(let i=0;i<menus.length;i++){
          menus[i].ak="subTr"+id;
          this.menus.splice(number+i,0,menus[i]);
          if(menus[i].subAdminPermission.length>0){
            for(let a=0;a<menus[i].subAdminPermission.length;a++){
              menus[i].subAdminPermission[a].ak="subTr2"+id;
              this.menus.splice(number+i+a+1,0,menus[i].subAdminPermission[a]);
            }
          }
        }
      });
  }
   Close(id:number,val:string,number:number,id2:number): void{
     $(".subTr"+ id).remove();
     $(".subTr2"+ id).remove();
    if(id==id2){
      $(".subTr2"+ id).hide();
    }else{
      $(".subTr"+ id).remove();
      $(".subTr2"+ id).remove();
    }


   }
  Close2(id:number,val:string,number:number,id2:number): void{
      $(".subTr2"+ id2).hide();
  }
  openClose2(id:number,val:string,number:number,id2:number): void{
    $(".subTr2"+ id2).show();
  }

  getMenus() {
    var self = this;
    this.menuService.getMenuList().subscribe( menus => {
      if(menus){
        this.menus  = menus['list'];
        // for(let i=0;i<this.menus.length;i++){
        //   this.menus[i].selected = true;
        // }
        this.pages  = menus['page'];
        self.ref.markForCheck();
        self.ref.detectChanges();
        console.log(this.pages)
      }
    });
  }
  // getMenuBtns(id:number): void{
  //   this.menuService.getMenuBtns().then( menus => {
  //     this.menus  = menus;
  //   });
  // }
  // gotoDetail(): void {
  //   this.router.navigate(['/user-detail', this.selectedMenu.id]);
  // }
  add(name: string, coding: string, subName: string, parentName: string,parentCode: string,
      newWindow: string, details: string ): void {
    name = name.trim();
    console.log(newWindow)
    coding = coding.trim();
    if(!parentName){
      $('.must3').show();
      return;
    }
    subName = subName.trim();
    parentName = parentName.trim();
    parentCode = parentCode.trim();
    details = details.trim();
    if (!name && !coding && !subName && !newWindow && !parentName && !parentCode ) { return; }
    // this.menuService.create(ids,name, coding, address, parentName, parentCode,newWindow, details)
    //   .then(menu => {
    //     if(typeof (menu)=='string'){
    //       layer.open({
    //         title: '提示'
    //         ,content: menu
    //       });
    //     }
    //     this.menus.push(menu);
    //     console.log(this.menus)
    //     this.getMenus();
    //     this.selectedMenu = null;
    //     $('#details').val('');
    //   });
    $('#details').val('');
    this.tjmenu = false;
    this.clicked = false;
    layer.open({
      title: '提示'
      ,content: '添加成功'
    });
  }
  delete(menu: Menu): void {
    layer.open({
      content: '确定删除？'
      , btn: ['确定', '取消']
      , yes: () => {
        // this.menuService
        //   .delete(menu.menuId)
        //   .then(() => {
        //     this.menus = this.menus.filter(h => h !== menu);
        //     // this.data = this.data.filter(h => h !== menu);
        //     if (this.selectedMenu === menu) { this.selectedMenu = null; }
        //   });
        // this.getMenus();
      }
      , btn2: () => {

      }
    })
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
    // this.menuService.update(this.menu);
    // layer.open({
    //   title: '提示'
    //   ,content: '修改成功'
    // });
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





