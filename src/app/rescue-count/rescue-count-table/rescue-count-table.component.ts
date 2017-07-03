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
  public data: any[];
  rowsOnPage = 10;
  sortOrder = "asc";
  rescues: Rescue[];
  rescue: Rescue;
  selectedRescue: Rescue;
  Rescue=new Rescue();
  constructor(
    private router: Router,
    private rescueCountService: RescueCountService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getElectricities();
  }


  getElectricities(): void {
    this.rescueCountService.getMenuDatas().then(rescues => {
        this.rescues = rescues;
      this.data = this.rescues;
      }
    );
    // this.rescueCountService.getMenuDatas().then( electricities => {
    //   console.log(electricities)
    //   this.rescues = electricities
    //   this.data = this.rescues;
    // });
  }

  onSelect(rescue: Rescue): void {
    this.selectedRescue = rescue;
    // console.log(electricity.data);

  }

  search2(term: string): void{

    this.rescueCountService.search2(term).then( menus => {
      if(typeof (menus)=='string'){
        layer.open({
          title: '提示'
          ,content: '没有查询到数据！'
        });
      }else{
        this.data=menus;
      }
      console.log(this.data);
    });
  }

  getMenus(): void {
    this.rescueCountService.getMenuDatas().then( menus => {
      this.rescues  = menus;
      this.data = this.rescues;
    });
  }

  gotoDetail(): void {
    this.router.navigate(['/user-detail', this.selectedRescue.rescueId]);
  }

  goBack(): void {
    this.location.back();
  }

}
