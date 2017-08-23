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
declare var videojs:any;

@Component({
  selector: 'app-rescue-detail',
  templateUrl: './rescue-detail.component.html',
  styleUrls: ['./rescue-detail.component.css']
})
export class RescueDetailComponent implements OnInit {
  rescue: Rescue;
  imageList=[];
  videoList=[];
  code:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private rescueCountService: RescuePapersService,
    private location: Location
  ) { }


  ngOnInit() {
    this.code = false;
    this.route.params
      .switchMap((params: Params) => this.rescueCountService.getMenuData(params['id']))
      .subscribe(menus => {
        if(!menus['data']){
          layer.open({
            title: '提示'
            ,content: '错误'
          });
        }else {
          this.code = true;
        }
        if(menus['data']['imageList'].length>0&&menus['data']['imageList'][0]!=null){
          for(let i=0;i<menus['data']['imageList'].length;i++){
            this.imageList.push(menus['data']['imageList'][i])
          }
        }
        if(menus['data']['videoList'].length>0&&menus['data']['videoList'][0]!=null){
          for(let i=0;i<menus['data']['videoList'].length;i++){
            this.videoList.push(menus['data']['videoList'][i])
          }
        }
        console.log(this.imageList.length)
      });

    //播放视频
    for(var i=0;i<this.videoList.length;i++){
      videojs(document.getElementById('my-video'+i), {}, function() {
      });
    }
    // var myPlayer = videojs('my-video');
    // videojs("my-video").ready(function(){
    //   var myPlayer = this;
    //   myPlayer.play();
    // });

    // videojs("my-video", {}, function(){
    // });
    // var fullscreenchange = function(){
    //   $('#page-wrapper').removeClass('marg220').addClass('fullscreen');
    // };

    // myPlayer.on("pause", function(){
    //   console.log("pause")
    // });
  }

  goBack(): void {
    this.location.back();
  }
}
