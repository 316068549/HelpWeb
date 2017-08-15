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
import { fadeIn } from '../../animations/fade-in';
declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-helpers-table',
  templateUrl: './helpers-table.component.html',
  styleUrls: ['./helpers-table.component.css'],
  animations: [ fadeIn]
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
  public totalNum; // 总数据条数
  public pageSize = 5;// 每页数据条数
  public totalPage ;// 总页数
  public curPage = 1;// 当前页码
  public isEmpty:boolean = false;
  public pageList= [{
    isActive: true,
    pageNum: 1
  }];
  rescueTeams = [];
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


  setPagingArr() {
      if ( this.totalPage == this.pageList.length) {
        return
      }
       this.pageList = [{
        isActive: true,
        pageNum: 1
      }];
      for (var i = 1; i < this.totalPage; i++) {
        this.pageList.push({
          isActive:false,
          pageNum: i + 1
        });
      }
    }

  resetPagingArr() {
    this.pageList[0].isActive = true;
      this.curPage = 0;
    }

  changePage(page,index) {
    // if (index == lastPage.pageNum - 1 || page.pageNum - (this.curPage + 1) == 2 && page.pageNum > 5 && page.pageNum != pagingArr.length || $scope.selectPageIndex - page.pageNum == 1 && page.pageNum != 1 && $scope.selectPageIndex > 3 || page.pageNum == 6 && $scope.selectPageIndex <= 3) {
    //   return
    // }
    for (var i = 0; i < this.pageList.length; i++) {
      this.pageList[i].isActive = false;
    }

    this.pageList[index].isActive = true;
    // lastPage = page;
    this.curPage = index;
    this.userService.getMenuDatas(index+1,5).then( res => {
      if(res['code'] == 0){
        this.helpers = res['data']['list'];
        this.curPage = res['data']['pageNum'];
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
    console.log('触发', page.pageNum);
  }


  delete(helper: Helpers): void{
    var ak = layer.open({
      content: '确定删除？'
      , btn: ['确定', '取消']
      , yes: () => {
        this.userService.delete(helper.volunteerId).then(res =>{
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
    this.userService.getMenuDatas(1,5).then( res => {
      if(res['code'] == 0){
        this.curPage = res['data']['pageNum'];
        if(res['data']['list']){
          this.helpers = res['data']['list'];
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
    this.userService.getRescuesList().then( menus => {
      for(let i=0;i<menus.length;i++){
        this.rescueTeams.push(menus[i])
      }
    });
  }

  onSelect(helper: Helpers): void {
    this.selectedHelper = helper;
    console.log(this.selectedHelper)
  }

  search2(term: string): void{
    this.userService.search2(term).then( menus => {
      if(!menus){
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
      if(menus['volunteerId']){
        this.helpers = [];
        this.helpers.push(menus);
      }
    });
  }

  add(helperName: string, sex: string, password: string,phone: string,
      nationalId: string, rescue: number,imageUrl:string ): void {
    helperName = helperName.trim();
    phone = phone.trim();
    nationalId = nationalId.trim();
    if (!helperName && !sex  && !password && !phone && !nationalId && rescue ) { return; }
    this.userService.create(helperName,sex,password,phone,nationalId,rescue,imageUrl)
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







