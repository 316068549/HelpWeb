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

  public data: any[];
  rowsOnPage = 10;
  sortOrder = "asc";
  statuses: Status[];
  status: Status;
  selectedStatus: Status;


  constructor(
    private router: Router,
    private statusService: StatusService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getStatuses();
  }

  getStatuses(): void {
    this.statusService.getStatuses().then( electricities => {
      console.log(electricities)
      this.statuses = electricities
      this.data = this.statuses;
    });
  }

  onSelect(electricity: Status): void {
    this.selectedStatus = electricity;
    // console.log(electricity.data);

  }

  search(IMEI: string,deviceMobile?:string,startTime?:string,endTime?:string) {

    return this.statusService.search(IMEI,deviceMobile,startTime,endTime).subscribe(
      res => {
        this.data = res;
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











