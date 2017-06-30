import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Config } from '../../models/config';
import { SendService} from './service/send.service';
declare var $:any;
declare var layer: any;

@Component({
  selector: 'app-config-table',
  templateUrl: './config-table.component.html',
  styleUrls: ['./config-table.component.css']
})
export class ConfigTableComponent implements OnInit {
  configs: Config[];
  config: Config;
  model = new Config('',null,'','','','','','','','');
  model1 = new Config();
  model2 = new Config();
  model3 = new Config();
  model4 = new Config();
  model5 = new Config();
  model6 = new Config();
  model9 = new Config();
  model10 = new Config();
  model11 = new Config();
  model12 = new Config();
  model13 = new Config();
  public issue: Object;
  public issue2:String;
  public sendMsg:String;
  public reply:String;
  private count1: any = 0;
  constructor(
    private sendService: SendService,
    private router: Router,
    private location: Location
  ) {}
  private deleteEmptyProperty(object:Object){
    for (var i in object) {
      var value = object[i];
      if (typeof value === 'object') {
        if (Array.isArray(value)) {
          if (value.length == 0) {
            delete object[i];
            continue;
          }
        }
        this.deleteEmptyProperty(value);
        if (this.isEmpty(value)) {
          delete object[i];
        }
      } else {
        if (value === '' || value === null || value === undefined) {
          delete object[i];
        } else {
        }
      }
    }
  }
  private isEmpty(object:Object) {
    for (var name in object) {
      return false;
    }
    return true;
  }
  submitted = false;
  //配置方法
  async timeSubmit(id:Number) {
    this.count1 = 0;
    let params = {params:'',imeiCode:''};
    let term = {imeiCode:'',functionCode:'',mark:'',locationMode:'',fenceType:'',latitude:'',longitude:'',fenceParams:'',
      ip:'',sosControle:'',fallControle:'',responseType:'',phoneQuantity:'',whiteListSwitch:'',phoneOne:'',phoneTwo:'',phoneThree:'',phoneFour:'',phoneFive:'',macAddress:''
      ,userName:'',password:'',remindModel:'',remindInterval:'',remindFrequency:'',
      onceRemindTime:'',messageLength:'',message:'',controlWord:'',serialNumber:'',startTime:'',endTime:'',timeInterval:'',time:''};
    switch (id)
    {
      case 0:
        params.params="timeConfig";
        params.imeiCode = this.model1.imeiCode;
        term.imeiCode = this.model1.imeiCode;
        term.mark=this.model1.mark;
        term.functionCode="0x90";
        if($('.timeconfig #time').val()==''){
          $('.timeconfig .ding-time13').show();
          return;
        }else{
          term.time=$('.timeconfig #time').val();
          $('.timeconfig .ding-time13').hide();
        }
        break;
      case 1:
        params.params="locationConfig";
        params.imeiCode = this.model2.imeiCode;
        term.imeiCode = this.model2.imeiCode;
        term.mark=this.model2.mark;
        term.locationMode=this.model2.locationMode2;
        term.functionCode="0x91";
        term.timeInterval=this.model2.timeInterval;
        if($('.gps #time').val()==''){
          $('.ding-time').show();
          return;
        }else{
          term.time=$('.gps #time').val();
          $('.ding-time').hide();
        }
        console.log(JSON.stringify(term))
        break;
      case 2:
        params.params="electricConfig";
        params.imeiCode = this.model3.imeiCode;
        term.imeiCode = this.model3.imeiCode;
        term.mark=this.model3.mark;
        term.latitude=this.model3.latitude;
        term.longitude=this.model3.longitude;
        term.fenceParams=this.model3.fenceParams;
        term.fenceType=this.model3.fenceType;
        term.functionCode="0x92";
        if($('.intel #time').val()==''){
          $('.ding-time2').show();
          return;
        }else{
          term.time=$('.intel #time').val();
          $('.ding-time2').hide();
        }
        console.log(JSON.stringify(term))
        break;
      case 3:
        params.params="ipConfig";
        params.imeiCode = this.model4.imeiCode;
        term.imeiCode = this.model4.imeiCode;
        term.functionCode="0x97";
        term.mark=this.model4.mark;
        term.ip=this.model4.ip;
        if($('.ip #time').val()==''){
          $('.ding-time3').show();
          return;
        }else{
          term.time=$('.ip #time').val();
          $('.ding-time3').hide();
        }
        console.log(JSON.stringify(term))
        break;
      // case 4:
      //   params.params="heartConfig";
      //   params.imeiCode = this.model5.imeiCode;
      //   term.imeiCode = this.model5.imeiCode;
      //   term.functionCode="0x98";
      //   term.mark=this.model5.mark;
      //   term.responseType=this.model5.responseType;
      //   term.timeInterval=this.model5.timeInterval;
      //   if($('.heartbeat #time').val()==''){
      //     $('.ding-time4').show();
      //     return;
      //   }else{
      //     term.time=$('.heartbeat #time').val();
      //     $('.ding-time4').hide();
      //   }
      //   console.log(JSON.stringify(term))
      //   break;
      // case 5:
      //   params.params="wifiConfig";
      //   params.imeiCode = this.model6.imeiCode;
      //   //let term = {imeiCode:'',functionCode:'',mark:'',macAddress:'',userName:'',password:'',time:''};
      //   term.imeiCode = this.model6.imeiCode;
      //   term.functionCode="0x9A";
      //   term.mark=this.model6.mark;
      //   term.macAddress=this.model6.macAddress;
      //   term.userName=this.model6.userName;
      //   term.password=this.model6.password;
      //   if($('.wifi #time').val()==''){
      //     $('.ding-time5').show();
      //     return;
      //   }else{
      //     term.time=$('.wifi #time').val();
      //     $('.ding-time5').hide();
      //   }
      //   console.log(JSON.stringify(term))
      //   break;
      // case 6:
      //   params.params="remindConfig";
      //   params.imeiCode = this.model7.imeiCode;
      //   term.imeiCode = this.model7.imeiCode;
      //   term.functionCode="0x9B";
      //   term.mark=this.model7.mark;
      //   term.remindModel=this.model7.remindModel;
      //   term.remindInterval=this.model7.remindInterval;
      //   term.remindFrequency=this.model7.remindFrequency;
      //   term.onceRemindTime=this.model7.onceRemindTime;
      //   if($('.remind #time').val()==''){
      //     $('.ding-time6').show();
      //     return;
      //   }else{
      //     term.time=$('.remind #time').val();
      //     $('.ding-time6').hide();
      //   }
      //   console.log(JSON.stringify(term))
      //   break;
      // case 7:
      //   params.params="messageConfig";
      //   params.imeiCode = this.model8.imeiCode;
      //   term.imeiCode = this.model8.imeiCode;
      //   term.functionCode="0x9C";
      //   term.mark=this.model8.mark;
      //   term.messageLength=this.model8.messageLength;
      //   term.message=this.model8.message;
      //   if($('.messag #time').val()==''){
      //     $('.ding-time7').show();
      //     return;
      //   }else{
      //     term.time=$('.messag #time').val();
      //     $('.ding-time7').hide();
      //   }
      //   console.log(JSON.stringify(term))
      //   break;
      // case 8:
      //   params.params="telecontrolConfig";
      //   params.imeiCode = this.model9.imeiCode;
      //   term.imeiCode = this.model9.imeiCode;
      //   term.functionCode="0x9D";
      //   //term.mark=this.model9.mark;
      //   term.controlWord=this.model9.controlWord;
      //   if($('.control #time').val()==''){
      //     $('.ding-time8').show();
      //     return;
      //   }else{
      //     term.time=$('.control #time').val();
      //     $('.ding-time8').hide();
      //   }
      //   console.log(JSON.stringify(term))
      //   break;
      case 9:
        params.params="sosConfig";
        params.imeiCode = this.model10.imeiCode;
        term.imeiCode = this.model10.imeiCode;
        term.functionCode="0x9E";
        term.mark=this.model10.mark;
        term.sosControle=this.model10.sosControle;
        term.responseType=this.model10.responseType;
        if($('.sos #time').val()==''){
          $('.ding-time9').show();
          return;
        }else{
          term.time=$('.sos #time').val();
          $('.ding-time9').hide();
        }
        console.log(JSON.stringify(term))
        break;
      case 10:
        params.params="familyConfig";
        params.imeiCode = this.model11.imeiCode;
        term.imeiCode = this.model11.imeiCode;
        term.functionCode="0x93";
        // term.dataLength=this.model11.dataLength;
        term.mark=this.model11.mark;
        term.phoneQuantity=this.model11.phoneQuantity;
        term.phoneOne=this.model11.phoneOne;
        term.phoneTwo=this.model11.phoneTwo;
        term.phoneThree=this.model11.phoneThree;
        term.phoneFour=this.model11.phoneFour;
        term.phoneFive=this.model11.phoneFive;
        if($('.family #time').val()==''){
          $('.ding-time10').show();
          return;
        }else{
          term.time=$('.family #time').val();
          $('.ding-time10').hide();
        }
        console.log(JSON.stringify(term))
        break;
      case 11:
        params.params = 'fallConfig';
        params.imeiCode = this.model12.imeiCode;
        term.imeiCode = this.model12.imeiCode;
        term.functionCode = '0x9F';
        term.mark = this.model12.mark;
        term.fallControle = this.model12.fallControle;
        term.responseType = this.model12.responseType;
        if ($('.fall #time').val()==''){
          $('.ding-time11').show();
          return;
        }else{
          term.time=$('.fall #time').val();
          $('.ding-time11').hide();
        }
        console.log(JSON.stringify(term))
        break;
      case 12:
        params.params = 'whiteListConfig';
        params.imeiCode = this.model13.imeiCode;
        term.imeiCode = this.model13.imeiCode;
        term.functionCode = '0x94';
        // term.dataLength = this.model13.dataLength;
        term.mark = this.model13.mark;
        term.whiteListSwitch = this.model13.whiteListSwitch;
        term.phoneQuantity = this.model13.phoneQuantity;
        term.phoneOne = this.model13.phoneOne;
        term.phoneTwo = this.model13.phoneTwo;
        term.phoneThree = this.model13.phoneThree;
        term.phoneFour = this.model13.phoneFour;
        term.phoneFive = this.model13.phoneFive;
        if($('.whiteList #time').val()==''){
          $('.ding-time12').show();
          return;
        }else{
          term.time=$('.whiteList #time').val();
          $('.ding-time12').hide();
        }
        console.log(JSON.stringify(term))
        break;
    }

    //term.imeiCode = this.model1.imeiCode;
    //term.mark=this.model1.mark;
    //term.time=$('#time').val();
    this.deleteEmptyProperty(term);
    var string = JSON.stringify(term);
    console.log(JSON.stringify(term))
    console.log(JSON.stringify(params))
    this.submitted = true;
    await this.sendService.send(term).subscribe(
      res=>{
        this.sendMsg = JSON.stringify(res);
        layer.open({
          title: '提示'
          ,content: '配置成功'
        });
        //this.issue = {isSuccess:true};
        console.log(this.sendMsg)
      },
      error => {alert(error)
        this.issue2 = JSON.stringify(error);
      },
      () => {}
    );
    let sendMsgs = setInterval(() => {this.sendService.send2(params)
        .subscribe(
          res=>{
            if(res){
              clearInterval(sendMsgs);
            }

            this.reply = JSON.stringify(res);
            //this.issue = {isSuccess:true};
            console.log(this.reply)
          }
          ,
          error => {
            //alert(error)
            //this.issue2 = JSON.stringify(error);
          },
          () => {}
        );
        if(this.count1 >= 2){
          layer.open({
            title: '提示'
            ,content: '服务器未响应'
          });
          clearInterval(sendMsgs);
        }
        this.count1++;
        console.log(this.count1);
      }
      ,1000);
  }
  // 查询方法
  onSubmit(id:Number) {
    this.count1 = 0;
    let params = {params:'',imeiCode:''};
    let term = {imeiCode:'',functionCode:'',serialNumber:'',time:''};
    switch (id){
      case 0:
        params.params="versionMessage";
        params.imeiCode = this.model5.imeiCode;
        term.imeiCode = this.model5.imeiCode;
        term.functionCode="0xB0";
        if($('.version #time').val()==''){
          $('.ding-time4').show();
          return;
        }else{
          term.time=$('.version #time').val();
          $('.ding-time4').hide();
        }
        console.log(JSON.stringify(term))
        break;
      case 1:
        params.params="locationMessage";
        params.imeiCode = this.model6.imeiCode;
        term.imeiCode = this.model6.imeiCode;
        term.functionCode="0xB1";
        if($('.dropPaper #time').val()==''){
          $('.ding-time5').show();
          return;
        }else{
          term.time=$('.dropPaper #time').val();
          $('.ding-time5').hide();
        }
        console.log(JSON.stringify(term));
        break;
      // case 2:
      //   params.params="lostWordMessage";
      //   params.imeiCode = this.model2.imeiCode;
      //   term.imeiCode = this.model2.imeiCode;
      //   term.functionCode="0xB7";
      //   term.serialNumber = this.model2.serialNumber;
      //   if($('.dropPapers #time').val()==''){
      //     $('.ding-time2').show();
      //     return;
      //   }else{
      //     term.time=$('.dropPapers #time').val();
      //     $('.ding-time2').hide();
      //   }
      //   console.log(JSON.stringify(term));
      //   break;
    }
    this.deleteEmptyProperty(term);
    var string = JSON.stringify(term);
    this.submitted = true;
    console.log(JSON.stringify(params))
    this.sendService.searchPaper(term)
      .subscribe(
        res=>{
          this.sendMsg = JSON.stringify(res);
          //this.issue = {isSuccess:true};
          console.log(this.sendMsg)
        },
        error => {alert(error)
          this.issue2 = JSON.stringify(error);
        },
        () => {}
      );
    console.log('next');
    let sendMsgs = setInterval(() => {this.sendService.send3(params)
        .subscribe(
          res=>{
            if(res){
              clearInterval(sendMsgs);
            }
            this.reply = JSON.stringify(res);
            //this.issue = {isSuccess:true};
            console.log(this.reply)
          }
          ,
          error => {
            //alert(error)
            //this.issue2 = JSON.stringify(error);
          },
          () => {}
        );
        if(this.count1 >= 2){
          layer.open({
            title: '提示'
            ,content: '服务器未响应'
          });
          clearInterval(sendMsgs);
        }
        this.count1++;
        console.log(this.count1);
      }
      ,1000);
  }


  ngOnInit(): void {
    $('input[name="time"]').click(function(){
        $(this).parent().find('.alert-danger').hide();
    })
    $(function () {
      $('.itmebox li .config-btn').on('click',function () {
        var index = $(this).parents('li').index();
        console.log(index);
        if($(this).parents('li').hasClass('actived')){
          $(this).find('.glyphicon').removeClass('glyphicon-menu-up').addClass('glyphicon-menu-down');
          $('.itmebox li').eq(index).removeClass('actived');
        }else{
          $(this).find('.glyphicon').removeClass('glyphicon-menu-down').addClass('glyphicon-menu-up');
          $('.itmebox li').eq(index).addClass('actived').siblings().removeClass('actived');
        }
      })

      // $('.upbtn').on('click',function () {
      //   $(this).parents('li').removeClass('actived');
      //   $(this).parents('li').find('.config-btn .glyphicon').removeClass('glyphicon-menu-up').addClass('glyphicon-menu-down');
      // })
    })
  }

  goBack(): void {
    this.location.back();
  }


}







