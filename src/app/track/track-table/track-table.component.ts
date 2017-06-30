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
  public data: any[];
  rowsOnPage = 10;
  sortOrder = "asc";
  electricities: Electricity[];
  electricity: Electricity;
  selectedElectricity: Electricity;


  constructor(
    private router: Router,
    private electricityService: ElectricityService,
    private location: Location,
  ) { }


  ngOnInit(): void {
    this.getElectricities();
  }
  getElectricities(): void {
    this.electricityService.getElectricities().then( electricities => {
      console.log(electricities)
      this.electricities = electricities
      this.data = this.electricities;
    });
  }

  onSelect(electricity: Electricity): void {
    this.selectedElectricity = electricity;
    // console.log(electricity.data);

  }

  search(IMEI: string) {
    return this.electricityService.search(IMEI).subscribe(
      res => {
          console.log(res);
          this.data = res;
      },
      error => {
        console.log(error);
        if (error.message.indexOf('Unexpected end of JSON input') > -1) {
          layer.open({
            title: '提示'
            ,content: '没有查询到数据！'
          });
          // layer.alert('没有查询到数据');
          // this.data = res;
          return;
        }

      },
      () => { }
    );
    // this.router.navigate(['/detail', deviceIMEI])
  }

  gotoDetail(): void {
    // this.router.navigate(['/user-detail', this.selectedMenu.id]);
  }

  goBack(): void {
    this.location.back();
  }


}







