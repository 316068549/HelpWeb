import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animations/fade-in';
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [ fadeIn]

})
export class HomeComponent implements OnInit {
  clicke:boolean = true;
  constructor() { }

  ngOnInit() {
    $('.dropdown-toggle').dropdown();
    // $('.dropdown-toggle').click(function () {
    //   alert(1)
    // });
    // $('.dropdown-menu').show();

  }

}
