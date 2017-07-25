import { Component, Input, OnInit,animate } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Electricity } from '../../models/electricity';
import { ElectricityService} from '../../electricity/electricity-service';
declare var $:any;
declare var layer: any;


@Component({
  selector: 'app-track-table',
  templateUrl: './track-table.component.html',
  styleUrls: ['./track-table.component.css']
})
export class TrackTableComponent implements OnInit {
  electricities: Electricity[];
  electricity: Electricity;
  selectedElectricity: Electricity;
  public params; // 保存页面url参数 2012-10-20 11:11:11
  public totalNum ; // 总数据条数
  public pageSize = 5;// 每页数据条数
  public totalPage ;// 总页数
  public curPage = 1;// 当前页码
  pages: any;

  constructor(
    private router: Router,
    private electricityService: ElectricityService,
    private location: Location,
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
    this.electricityService.getElectricities(pageNo).then( res => {
      if(res['code'] == 0){
        this.electricities = res['data']['list'];
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
    this.electricityService.getElectricities(1).then( res => {
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
      this.electricities = res['data']['list'];
      this.totalPage = Math.ceil(this.electricities.length/5);
      this.totalNum = this.electricities.length;
      this.pages  = res['data']['page'];
      console.log(this.pages)
    });
  }

  onSelect(electricity: Electricity): void {
    this.selectedElectricity = electricity;
    // console.log(electricity.data);

  }

  search(IMEI: string) {
    return this.electricityService.search(IMEI).then(
      menus => {
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
          this.electricities = menus['list'];
        }

    // this.router.navigate(['/detail', deviceIMEI])
  })
  }

  gotoDetail(): void {
    // this.router.navigate(['/user-detail', this.selectedMenu.id]);
  }

  goBack(): void {
    this.location.back();
  }


}







