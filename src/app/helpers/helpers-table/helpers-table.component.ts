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
import { ActivatedRoute, Params }   from '@angular/router';
declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-helpers-table',
  templateUrl: './helpers-table.component.html',
  styleUrls: ['./helpers-table.component.css']
})
export class HelpersTableComponent implements OnInit {
  helpers: Helpers[];
  helper: Helpers;
  selectedHelper: Helpers;
  private tjmenu:boolean;
  private clicked:boolean;
  private deletemenu:boolean = false;
  Helpers=new Helpers();
  parentNames = [];
  private submied:boolean = false;
  private addbtn:boolean = false;
  private edit:boolean = false;
  private del:boolean = false;
  public params; // 保存页面url参数
  public totalNum ; // 总数据条数
  public pageSize = 5;// 每页数据条数
  public totalPage ;// 总页数
  public curPage = 1;// 当前页码
  pages: any;
  term={};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: HelperService,
    private location: Location
  ) {
    // // 4. 初始化表达组里面的内容
    // this.form = new FormGroup({
    //   phone: new FormControl('', CustomValidators.phone("zh-CN"))
    // });
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
  // 添加选择数据初始化
  searchParMenu(): void{
    // this.parentNames=[];
    // this.addIDs=[];
    // this.addIDs2=[];
    // this.term={};
    // this.userService.getMenuDatas().then( menus => {
    //   this.menus = menus['allList']
    //   console.log(this.menus)
    // });
  }
  // 编辑选择数据初始化
  searchParMenu2(){
  }
  ngOnInit(): void {
    // var imeicode = this.route.snapshot.params['deviceIMEI'];
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

  getPageData(pageNo) {
    let vm = this;
    vm.curPage = pageNo;
    this.userService.getMenuDatas(pageNo).then( res => {
      if(res['code'] == 0){
        this.helpers = res['data']['list'];
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

  delete(helper: Helpers): void{
    var ak = layer.open({
      content: '确定删除？'
      , btn: ['确定', '取消']
      , yes: () => {
        this.userService.delete(helper.userId).then(res =>{
          if(res['code'] == 0){
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
          this.getElectricities();
        })
      }
      , btn2: () => {

      }
    })
  }

  getElectricities(): void {
    this.userService.getMenuDatas().then( res => {
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
      this.helpers = res['data']['list'];
      this.totalPage = Math.ceil(this.helpers.length/5);
      this.totalNum = this.helpers.length;
      this.pages  = res['data']['page'];
      console.log(this.pages)
    });
  }

  onSelect(helper: Helpers): void {
    this.selectedHelper = helper;
  }

  search2(term: string): void{
    this.userService.search2(term).then( menus => {
      if(!menus['list']){
        layer.open({
          title: '提示'
          ,content: '错误'
        });
      }
      if(this.helpers.length==0){
        layer.open({
          title: '提示'
          ,content: '没有查询到数据！'
        });
      }
      if(this.helpers.length>0){
        this.helpers = menus['list'];
      }
    });
  }

  add(helperName: string, sex: string, password: string,phone: string,
      nationalId: string, rescue: string ): void {
    helperName = helperName.trim();
    phone = phone.trim();
    nationalId = nationalId.trim();
    rescue = rescue.trim();
    if (!helperName && !sex  && !password && !phone && !nationalId && rescue ) { return; }
    this.userService.create(helperName,sex,password,phone,nationalId,rescue)
      .subscribe(res => {
        if(res["code"]==0){
          layer.open({
            title: '提示'
            ,content: '添加成功'
          });
          this.getElectricities();
          this.selectedHelper = null;
          this.tjmenu = false;
          this.clicked = false;
        }else{
          layer.open({
            title: '提示'
            ,content: res["error"],
            end:function () {
              $('#helperName').focus();
            }
          });

        }
      });
  }

  save(): void {
    this.userService.update(this.selectedHelper)
      .then(() => {this.getElectricities();this.deletemenu = false;this.clicked = false;
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
  // search(term: string): void {
  //   this.searchTerms.next(term);
  // }


}







