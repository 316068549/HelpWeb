import { Component,ElementRef,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params,Router, ParamMap }   from '@angular/router';

import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Rescue } from '../../models/rescue';
import { rescuePaper } from '../../models/rescue-paper';
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
  printDiv: any;
  rescue: Rescue;
  rescuePaper: rescuePaper;
  imageList=[];
  videoList=[];
  printCSS: string[];
  printStyle: string;
  code:boolean = false;
  private rescuePaperId:number;

  constructor(
    private elRef: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private rescueCountService: RescuePapersService,
    private location: Location
  ) {
    this.printCSS = ['http://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css'];
     this.printStyle =
       `
       .txt-center{
  text-align: center;
}
         .table>tbody>tr>td{
  border-left: 1px solid #ddd;
  border-top: 1px solid #ddd;
  border-right: 1px solid #ddd;
      vertical-align: middle;
      text-align: center;
}
.borderright{
  border-right: 1px solid #ddd;
}
.borderbottom{
  border-bottom: 1px solid #ddd;
}
.noborder{
  border-width: 0px !important;
}
#imgBox a{
  margin-bottom: 5px;
  width: 24%;
  position: relative;
}
.fancybox img {
    margin-bottom: 5px;
    width: 24%;
    border:0;
    vertical-align: middle;
}
         `;

  }


  ngOnInit()  {
    this.rescuePaperId = parseInt(this.route.snapshot.queryParamMap.get('cur'));
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
        if(menus['data']['voRescue']!=null){
           this.rescuePaper = menus['data']['voRescue'];
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
    var myPlayer;
    for(var i=0;i<this.videoList.length;i++){
      videojs(document.getElementById('my-video'+i), {}, function() {
       myPlayer = this;
        myPlayer.ready(function(){
          $('#my-video'+i).prev(".loading").hide();
        });
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

  getPrintDiv () {
    for (let i: number = 0; i < this.elRef.nativeElement.childNodes.length; i++) {
      let node: any = this.elRef.nativeElement.childNodes[i];
      if (node.id === 'print_div') {
        this.printDiv = node;
      }
    }
  }
  printBtnBoolean = true;
  printComplete() {
    this.printBtnBoolean = true;
  }
  beforePrint() {
    this.printBtnBoolean = false;
  }

  selectImg(obj,i){
    let $img = $('#imgBox .img'+i).parent();
    let $obj = $img.clone();
    if( $img.hasClass('selected')){
      $img.removeClass('selected');
      $('table #printImgBox .img'+i).parent().remove();
    }else {
      $img.addClass('selected');
      if($('table #printImgBox .fancybox').length==8){
        $('table .borderbottom').css({"marginTop":"25px"});
      }
      $('table #printImgBox').append($obj);
    }
  }

  setVideo(obj,i){
    $('#my-video'+i).prev(".loading").hide();
    let box = $('.ibox-content').width();
    let  aspect_ratio = obj.videoWidth / obj.videoHeight;
    $('#my-video'+i).width=obj.videoWidth<box ? obj.videoWidth : box;
    // $('#my-video'+i).height=$('#my-video'+i).height/aspect_ratio;
  }
  // printObj(){
  //   var div_print=document.getElementById("div_print");
  //   var newstr = div_print.innerHTML;
  //   var oldstr = document.body.innerHTML;
  //   document.body.innerHTML =newstr;
  //   window.print();
  //   document.body.innerHTML=oldstr;
  //   return false;
  // }

  hideLoad(i){
    console.log('#my-video'+i);
    $('#my-video'+i).prev(".loading").hide();
  }

  setImg(obj,i){
   let box = $('.ibox-content').width()*(24/100)
    // console.log(obj.width)
    // console.log(obj.height)
    // if(obj.width/obj.height>1){
    //  obj.style.transform = 'rotate(-90deg)';
    //   $('.img'+i).height(box+'px')
    // }
    // console.log(obj.width+','+obj.height)
  }

  goBack(): void {
    let heroId = this.rescuePaperId ? this.rescuePaperId: null;
    console.log(heroId);
    this.router.navigate(['/home/rescuepapers/135', { cur: heroId}]);
    // this.location.back();
  }
}
