import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Status } from '../../models/status';
import { StatusService } from '../status-service';
declare var $:any;
declare var layer: any;

@Component({
  selector: 'app-status-table',
  templateUrl: './status-table.component.html',
  styleUrls: ['./status-table.component.css']
})
export class StatusTableComponent implements OnInit {
  statuses: Status[];
  status: Status;
  selectedStatus: Status;
  onActive:boolean = true;
  public params; // 保存页面url参数 2012-10-20 11:11:11
  public totalNum ; // 总数据条数
  public pageSize = 5;// 每页数据条数
  public totalPage;// 总页数
  public curPage = 1;// 当前页码
  public isEmpty:boolean = false;
  pages: any;
  public pageList= [{
    isActive: true,
    pageNum: 1
  }];

  constructor(
    private router: Router,
    private statusService: StatusService,
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
    // lastPage = page;
    this.curPage = index;
    if(this.onActive) {
      this.statusService.getStatuses(index + 1, 5).then(res => {
        if (res['code'] == 0) {
          if (res['data']['list']) {
            this.statuses = res['data']['list'];
          }
          this.curPage = res['data']['pageNum'];
        } else if (res['code'] == 5) {
          var ak = layer.open({
            content: res['error'] + '请重新登录'
            , btn: ['确定']
            , yes: () => {
              this.router.navigate(['login']);
              layer.close(ak);
            }
          })
        } else {
          layer.open({
            title: '提示'
            , content: res['error']
          });
        }

      })
    }else {
      this.statusService.getStatuses2(index + 1, 5).then(res => {
        if (res['code'] == 0) {
          if (res['data']['list']) {
            this.statuses = res['data']['list'];
          }
          this.curPage = res['data']['pageNum'];
        } else if (res['code'] == 5) {
          var ak = layer.open({
            content: res['error'] + '请重新登录'
            , btn: ['确定']
            , yes: () => {
              this.router.navigate(['login']);
              layer.close(ak);
            }
          })
        } else {
          layer.open({
            title: '提示'
            , content: res['error']
          });
        }

      })

    }
  }


  ngOnInit(): void {
    this.getStatuses();
  }

  searchOn(){
    this.statuses = null;
    if(!this.onActive){
      this.onActive=!this.onActive;
      this.getStatuses();
    }
  }

  searchOff(){
    this.statuses = null;
    if(this.onActive){
      this.onActive=!this.onActive;
      this.getStatuses2();
    }
  }

  getStatuses(): void {
    this.statusService.getStatuses(1,5).then( res => {
      if(res['code'] == 0){
        this.curPage = res['data']['pageNum'];
        if(res['data']['list']){
          this.statuses = res['data']['list'];
        }else{
          this.isEmpty=true;
        }
        this.totalPage   = res['data']['pages'];
        this.pages  = res['data']['total'];
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

  getStatuses2(): void {
    this.statusService.getStatuses2(1,5).then( res => {
      if(res['code'] == 0){
        if(res['data']['list']){
          this.statuses = res['data']['list'];
          this.isEmpty=false;
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

  onSelect(electricity: Status): void {
    this.selectedStatus = electricity;
  }

  search(IMEI: string,deviceMobile?:string,startTime?:string,endTime?:string) {

    return this.statusService.search(IMEI,deviceMobile,startTime,endTime).subscribe(
      res => {
        // this.data = res;
      },
      error => {
        console.log(error);
        if (error.message.indexOf('Unexpected end of JSON input') > -1) {
          layer.open({
            title: '提示'
            ,content: '没有查询到数据！'
          });
          // this.data = res;
          return;
        }

      },
      () => { }
    );
  }



}











