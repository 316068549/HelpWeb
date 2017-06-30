import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

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
