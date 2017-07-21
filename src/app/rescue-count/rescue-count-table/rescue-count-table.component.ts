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
  public params; // 保存页面url参数 2012-10-20 11:11:11
  public totalNum ; // 总数据条数
  public pageSize = 5;// 每页数据条数
  public totalPage ;// 总页数
  public curPage = 1;// 当前页码
  pages: any;
  Rescue=new Rescue();
  constructor(
    private router: Router,
    private rescueCountService: RescueCountService,
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
    this.rescueCountService.getMenuDatas(pageNo).then( res => {
      if(res['code'] == 0){
        this.rescues = res['data']['list'];
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
    this.getElectricities();
  }


  getElectricities(): void {
    this.rescueCountService.getMenuDatas().then(res => {
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
      this.rescues = res['data']['list'];
      this.totalPage = Math.ceil(this.rescues.length/5);
      this.totalNum = this.rescues.length;
      this.pages  = res['data']['page'];
      }
    );
  }

  onSelect(rescue: Rescue): void {
    this.selectedRescue = rescue;
  }

  search2(term: string): void{
    this.rescueCountService.search2(term).then( menus => {
      if(!menus['list']){
        layer.open({
          title: '提示'
          ,content: '错误'
        });
      }
      if(menus['list'].length==0){
        layer.open({
          title: '提示'
          ,content: '没有查询到数据！'
        });
      }
      if(menus['list'].length>0){
        this.rescues = menus['list'];
      }
    });
  }

  gotoDetail(): void {
    this.router.navigate(['/user-detail', this.selectedRescue.rescueId]);
  }

  goBack(): void {
    this.location.back();
  }

}
