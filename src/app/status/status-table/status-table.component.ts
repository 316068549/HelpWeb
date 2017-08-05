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
  public totalPage ;// 总页数
  public curPage = 1;// 当前页码
  pages: any;

  constructor(
    private router: Router,
    private statusService: StatusService,
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
    this.statusService.getStatuses2(pageNo).then( res => {
      if(res['code'] == 0){
        this.statuses = res['data']['list'];
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
    this.getStatuses();
  }

  searchOn(){
    if(!this.onActive){
      this.onActive=!this.onActive;
      this.getStatuses();
    }
  }

  searchOff(){
    if(this.onActive){
      this.onActive=!this.onActive;
      this.getStatuses2();
    }
  }

  getStatuses(): void {
    this.statusService.getStatuses(1).then( res => {
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
      if(res['data']['list']) {
        this.statuses = res['data']['list'];
        this.totalPage = Math.ceil(this.statuses.length / 5);
        this.totalNum = this.statuses.length;
        this.pages = res['data']['page'];
        console.log(this.pages)
      }
    });
  }

  getStatuses2(): void {
    this.statusService.getStatuses2(1).then( res => {
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
      this.statuses = res['data']['list'];
      this.totalPage = Math.ceil(this.statuses.length/5);
      this.totalNum = this.statuses.length;
      this.pages  = res['data']['page'];
      console.log(this.pages)
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











