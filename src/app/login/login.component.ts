import { Component,Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { UserLoginService } from './user-login.service';
import { User } from '../models/user-model';
import { fadeIn } from '../animations/fade-in';
declare var $:any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [ fadeIn
  ]
})
export class LoginComponent implements OnInit {


  public user: User = new User();

  constructor(


    public router: Router,
    public activatedRoute: ActivatedRoute,
    public userLoginService: UserLoginService
  ) {

  }


  ngOnInit() {
    console.log("--- user-login-component ---");
    console.log(this.router);
    console.log(this.activatedRoute);
    let activatedRouteSnapshot:ActivatedRouteSnapshot=this.activatedRoute.snapshot;
    let routerState: RouterState = this.router.routerState;
    let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;

    console.log(activatedRouteSnapshot);
    console.log(routerState);
    console.log(routerStateSnapshot);
  }


  public login():void{
    console.log(this.user);
    this.userLoginService.login(this.user).subscribe(res => {
      console.log(res)
      if(res){
        localStorage.setItem("tokenId", res.tokenId);
        localStorage.setItem("roleId", res.roleId);
        let userid = res.tokenId.split('==')[1]
        localStorage.setItem("userId", userid);


        this.router.navigateByUrl("home");
      }
      return false;

    });
  }

}

