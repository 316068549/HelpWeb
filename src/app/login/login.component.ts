import { Component,Input, OnInit,AfterContentInit,AfterViewChecked, AfterViewInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { UserLoginService } from './user-login.service';
import { User } from '../models/user-model';
import { fadeIn } from '../animations/fade-in';
declare var $:any;
declare var layer:any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [ fadeIn
  ]
})
export class LoginComponent implements OnInit,AfterViewChecked {


  user = new User();


  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public userLoginService: UserLoginService
  ) {

  }

  ngAfterViewChecked(){
    // console.log($('#name').val());
    // console.log($('#userPassword').val());
    if(!this.user.userName && $('#name').val()){
      this.user.userName = $('#name').val();
    }
    if(!this.user.userPassword && $('#userPassword').val()){
      this.user.userPassword = $('#userPassword').val();
    }
  }

  ngOnInit() {
    let index = layer.load(0, {shade: false,offset: '30%'}); //0代表加载的风格，支持0-2
    console.log("--- user-login-component ---");
    console.log(this.router);
    console.log(this.activatedRoute);
    let activatedRouteSnapshot:ActivatedRouteSnapshot=this.activatedRoute.snapshot;
    let routerState: RouterState = this.router.routerState;
    let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;

    console.log(activatedRouteSnapshot);
    console.log(routerState);
    console.log(routerStateSnapshot);
    layer.close(index);
    $('#name').val('');
    $('#userPassword').val('');
  }


  public login():void{
    let index = layer.load(1, {shade: false,offset: '30%'}); //0代表加载的风格，支持0-2
      this.userLoginService.login(this.user.userName,this.user.userPassword).subscribe(res => {
        layer.close(index);
        if(res){
          localStorage.setItem("tokenId", res.tokenId);
          localStorage.setItem("roleId", res.roleId);
          let userid = res.tokenId.split('==')[1]
          localStorage.setItem("userId", userid);
          if(res.roleId==3||res.roleId==5){
            this.router.navigateByUrl("home/helpers/116");
          }else{
            this.router.navigateByUrl("home");
          }
        }
        return false;

      });



  }

}

