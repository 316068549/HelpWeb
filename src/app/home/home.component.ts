import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { fadeIn } from '../animations/fade-in';
import { LeftNavComponent } from '../left-nav/left-nav.component';
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [ fadeIn]

})
export class HomeComponent implements OnInit {
  @ViewChild(LeftNavComponent)
  private timerComponent2: LeftNavComponent;
  clicke:boolean = true;
  public currentRoleId = localStorage.getItem("roleId");

  constructor() { }

  ngOnInit() {
    $('.dropdown-toggle').dropdown();
    // $('.dropdown-toggle').click(function () {
    //   alert(1)
    // });
    // $('.dropdown-menu').show();
  }
  countChange($event) {
   this.clicke=$event;
    console.log(this.clicke)
  }

}
