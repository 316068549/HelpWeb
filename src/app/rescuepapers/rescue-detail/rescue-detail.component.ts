import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params }   from '@angular/router';

import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Rescue } from '../../models/rescue';
import { RescuePapersService } from '../rescuepapers-service';
declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-rescue-detail',
  templateUrl: './rescue-detail.component.html',
  styleUrls: ['./rescue-detail.component.css']
})
export class RescueDetailComponent implements OnInit {
  rescue: Rescue;

  constructor(
    private route: ActivatedRoute,
    private rescueCountService: RescuePapersService,
    private location: Location
  ) { }


  ngOnInit() {
    // this.route.params
    //   .switchMap((params: Params) => this.rescueCountService.getMenuData(params['rescueId']))
    //   .subscribe(rescue => this.rescue = rescue);
  }

  goBack(): void {
    this.location.back();
  }
}
