import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Rescue } from '../../models/rescue';
import { RescueCountService } from '../rescue-count-service';
declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-rescue-count-table',
  templateUrl: './rescue-count-table.component.html',
  styleUrls: ['./rescue-count-table.component.css']
})
export class RescueCountTableComponent implements OnInit {
  rescues: Rescue[];
  rescue: Rescue;
  selectedRescue: Rescue;
  rescueTeams = [];
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
  pages: any;
  Rescue=new Rescue();
  constructor(
    private router: Router,
    private rescueCountService: RescueCountService,
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
    this.rescueCountService.getMenuDatas(index+1,5).then( res => {
      if(res['code'] == 0){
        this.rescues = res['data']['list'];
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
    this.rescueCountService.getMenuDatas(1,5).then(res => {
      if(res['code'] == 0){
        if(res['data']['list']){
          this.rescues = res['data']['list'];
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
      }
    );

  }

  onSelect(rescue: Rescue): void {
    this.selectedRescue = rescue;
  }

  // search2(term: number): void{
  //   this.rescueCountService.search2(term,1,5).then( res => {
  //     if(res['code'] == 0){
  //       this.rescues = res['data']['list'];
  //       this.usersLength = res['data']['list'].length;
  //       this.pages  = res['data']['total'];
  //       this.curPage = res['data']['pageNum'];
  //     }else if(res['code'] == 5){
  //       var ak = layer.open({
  //         content: res['error']+'请重新登录'
  //         , btn: ['确定']
  //         , yes: () => {
  //           this.router.navigate(['login']);
  //           layer.close(ak);
  //         }
  //       })
  //     }else{
  //       layer.open({
  //         title: '提示'
  //         ,content: res['error']
  //       });
  //     }
  //   });
  // }
  //
  // gotoDetail(): void {
  //   this.router.navigate(['/user-detail', this.selectedRescue.rescueId]);
  // }

  goBack(): void {
    this.location.back();
  }

}
