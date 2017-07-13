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
  data:  Menu[];

  menus: Menu[];
  menuactive:boolean = false;
  menuactive2:boolean = true;
  constructor(
    private menuService: MenuService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.getMenu();

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

  getMenus(): void {
    this.menuService
      .getMenuDatas()
      .then(menus => this.menus = menus);
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
