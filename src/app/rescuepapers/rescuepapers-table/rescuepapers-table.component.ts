import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { rescuePaper } from '../../models/rescue-paper';
import { RescuePapersService } from '../rescuepapers-service';
declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-rescuepapers-table',
  templateUrl: './rescuepapers-table.component.html',
  styleUrls: ['./rescuepapers-table.component.css']
})
export class RescuepapersTableComponent implements OnInit {
  rescuePapers: rescuePaper[];
  rescuePaper: rescuePaper;
  selectedRescuePaper: rescuePaper;
  public params; // 保存页面url参数 2012-10-20 11:11:11
  public totalNum ; // 总数据条数
  public pageSize = 5;// 每页数据条数
  public totalPage;// 总页数
  public curPage = 1;// 当前页码
  public isEmpty:boolean = false;
  public pageList= [{
    isActive: true,
    pageNum: 1
  }];
  rescueTeams = [];
  pages: any;
  parentNames = ['普通管理员', '超级管理员', '初级管理'];
  constructor(
    private router: Router,
    private userService: RescuePapersService,
    private location: Location
  ) {
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
    for (var i = 0; i < this.pageList.length; i++) {
      this.pageList[i].isActive = false;
    }

    this.pageList[index].isActive = true;
    this.curPage = index;
    this.userService.getMenuDatas(index+1,5).then( res => {
      if(res['code'] == 0){
        this.rescuePapers = res['data']['list'];
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
  }

  ngOnInit(): void {
    this.getElectricities();
  }


  getElectricities(): void {
    this.userService.getMenuDatas(1).then( res => {
      if(res['code'] == 0){
        if(res['data']['list']){
          this.rescuePapers = res['data']['list'];
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
    this.userService.getRescuesList().then( menus => {
      for(let i=0;i<menus.length;i++){
        this.rescueTeams.push(menus[i])
      }
    });
  }

  onSelect(helper: rescuePaper): void {
    this.selectedRescuePaper = helper;
  }


  search2(term: number): void{
    this.userService.search2(term,1,5).then( res => {
      if(res['code'] == 0){
        if(res['data']['list']==null){
          layer.open({
            title: '提示'
            ,content: '没有查询到数据'
          });
          return
        }
        this.rescuePapers = res['data']['list'];
        this.pages  = res['data']['total'];
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
    });
  }

  gotoDetail(): void {
    this.router.navigate(['/user-detail', this.selectedRescuePaper.taskId]);
  }

  goBack(): void {
    this.location.back();
  }


}







