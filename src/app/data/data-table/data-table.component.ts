import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Dictionary } from '../../models/dictionary';
import { DataService } from '../data-service';
declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DatasTableComponent implements OnInit {
  @Input() selected;
  public data: any[];
  rowsOnPage = 10;
  sortOrder = "asc";
  dictionarys: Dictionary[];
  dictionary: Dictionary;
  selectedDictionary: Dictionary;
  private tjmenu:boolean;
  private clicked:boolean;
  private deletemenu:boolean = false;

  Dictionary=new Dictionary();
  parentNames = ['普通管理员', '超级管理员', '初级管理'];
  constructor(
    private router: Router,
    private dataService: DataService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getElectricities();

  }
  toggleCheckIn(checkedIn: boolean) {
    if (checkedIn) {
      this.dictionary.dataValid = "true";
    }else{
      this.dictionary.dataValid = "false";
    }
  }
  toggleCheckIn2(checkedIn: boolean) {
    if (checkedIn) {
      this.dictionary.dataCommon = "true";
    }else{
      this.dictionary.dataCommon = "false";
    }
  }
  toggleCheckIn3(checkedIn: boolean) {
    if (checkedIn) {
      this.dictionary.dataEnableEditing = "true";
    }else{
      this.dictionary.dataEnableEditing = "false";
    }
  }
  toggleCheckIn4(checkedIn: boolean) {
    if (checkedIn) {
      this.dictionary.dataDeleteAllowed = "true";
    }else{
      this.dictionary.dataDeleteAllowed = "false";
    }
  }
  delete(userId: number): void{
      this.dataService.delete(userId).then(() =>{
        this.getMenus();
      })
    layer.open({
      title: '提示'
      ,content: '删除成功！'
    });
  }

  getElectricities(): void {
    this.dataService.getMenuDatas().then( electricities => {
      console.log(electricities)
      this.dictionarys = electricities
      this.data = this.dictionarys;
    });
  }

  onSelect(user: Dictionary): void {
    this.selectedDictionary = user;
    // console.log(electricity.data);

  }

  search2(term: string): void{
    this.dataService.search2(term).then( menus => {
      if(typeof (menus)=='string'){
        layer.open({
          title: '提示'
          ,content: '没有查询到数据！'
        });
      }else{
        this.data=menus;
      }
      console.log(this.data);
    });
  }
  add(dataId:number,dataName: string, dataCode: string, dataValid: string,  dateCommon: string,dataEnableEditing: string,
      dateDeleteAllowed: string ) {
    dataName = dataName.trim();
    dataCode = dataCode.trim();
    if (!dataId && !dataName && !dataCode && !dataValid && !dateCommon && !dataEnableEditing && !dateDeleteAllowed ) { return; }
     this.dataService.create(dataId,dataName, dataCode, dataValid, dateCommon, dataEnableEditing,dateDeleteAllowed)
      .subscribe(res => {
        console.log(res["status"])
        // console.log(typeof (res))
          if(res["status"]==1){
            layer.open({
              title: '提示'
              ,content: '添加成功'
            });
            // this.dictionarys.push(menu);
            this.getMenus();
            this.selectedDictionary = null;
            this.tjmenu = false;
            this.clicked = false;
          }else{
            layer.open({
              title: '提示'
              ,content: res["objectbean"],
              end:function () {
                $('#dataId').focus();
              }
            });

          }
      });
  }
  getMenus(): void {
    this.dataService.getMenuDatas().then( menus => {
      this.dictionarys  = menus;
      this.data = this.dictionarys;
    });
  }
  toggle(){
    this.selected.isActive = !this.selected.isActive;
  }
  updatae(dictionary){
    this.deletemenu=true;
    this.clicked=true;
    this.dictionary=dictionary;
    console.log(this.dictionary)
  }
  save(dataId:number,dataName: string, dataCode: string, dataValid: string,  dateCommon: string,dataEnableEditing: string,
       dateDeleteAllowed: string) {
    dataName = dataName.trim();
    dataCode = dataCode.trim();
    if (!dataId && !dataName && !dataCode && !dataValid && !dateCommon && !dataEnableEditing && !dateDeleteAllowed ) { return; }
    this.dataService.update(dataId,dataName, dataCode, dataValid, dateCommon, dataEnableEditing,dateDeleteAllowed)
      .then(() => {this.deletemenu = false;this.clicked = false;
        layer.open({
          title: '提示'
          ,content: '修改成功'
        });

    });
    // this.dictionary=null;
  }
  // gotoDetail(): void {
  //   this.router.navigate(['/user-detail', this.selectedMenu.id]);
  // }

  goBack(): void {
    this.location.back();
  }


}







