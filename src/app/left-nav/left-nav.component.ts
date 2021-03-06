import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { Menu } from '../models/menu';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { MenuService} from '../shared-service/menu-service';
import { ParentsmenuesPipe } from '../left-nav/left-nav.pipe';
declare var $:any;
@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {
  @Input()
  url:boolean;
  address:string
  data:  Menu[];

  @Output()
  change = new EventEmitter();

  menus: Menu[];
  menuactive:boolean = false;
  menuactive2:boolean = true;
  userName:string;
  roleName:string;

  // address:string;
  private userId = parseInt(localStorage.getItem("userId"));
  constructor(
    private menuService: MenuService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.getMenu();
    this.getUser();
   // $('.item').click(function () {
   //  if($(this).hasClass("actives")){
   //    $(this).removeClass("actives");
   //    $(this).children("ul").addClass("collapse in");
   //  }else{
   //    $(this).addClass("actives");
   //    $(this).children("ul").removeClass("collapse in");
   //  }
   //   // $(this).find("li").not(".active").has("ul").children("ul").addClass("collapse");
   // })
  }

  searvh(ak){
    if(ak=='monitor'){
      this.url = true;
      this.change.emit(this.url);
    }else{
      this.url = false;
      this.change.emit(this.url);
    }
  }

  logout(){
    this.menuService
      .logout()
      .then(menus => {
        if(menus['code'] == 0){
          localStorage.removeItem("tokenId");//清除
          this.router.navigateByUrl("");
        }
      });
  }

  getMenus(): void {
    this.menuService
      .getMenuDatas()
      .then(menus => {
        this.menus = menus
        $.each(this.menus,(i,obj)=>{
          obj.selected = true;
        })
      });
  }
  getUser(): void{
    this.menuService.getMenuDetail2(this.userId).then(res => {
      if(res['adminUser']){
        console.log(res['adminUser'])
        // menus['adminUser']['roleList'] = menus['adminRoleList'];
        this.userName = res['adminUser']['userName'];
        this.roleName = res['adminRoleList'][0]['roleName'];
        localStorage.setItem("address", res['rescueTeam']['addr']);
        localStorage.setItem("rescueTeamId", res['rescueTeam']['rescueTeamId']);
        this.address = res['rescueTeam']['addr'];
      }
    });
  }
  getSubMenu(menu2:Menu){
    this.data=null;
    this.data = menu2.subAdminPermission;
  }

  getMenu(): void {
    this.menuService
      .getMenuDatas()
      .then(menus => this.menus = menus);
  }



}
