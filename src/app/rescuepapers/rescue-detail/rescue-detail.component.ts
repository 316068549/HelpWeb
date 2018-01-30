import { Component,ElementRef,OnChanges,OnInit,AfterContentInit,AfterViewChecked, AfterViewInit, ViewChild } from '@angular/core';
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
export class RescueDetailComponent implements OnInit,AfterViewChecked {
  printDiv: any;
  rescue: Rescue;
  rescuePaper: rescuePaper;
  imageList=[];
  videoList=[];
  printCSS: string[];
  printStyle: string;
  code:boolean = false;
  imgNum:number;
  imgShown:boolean = false;
  private rescuePaperId:number;
  rescuesId:number;

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
  border-left: 1px solid #333;
  border-top: 1px solid #333 !important;
  border-right: 1px solid #333;
      vertical-align: middle;
      text-align: center;
}
.borderright{
  border-right: 1px solid #333;
}
.borderbottom{
  border-bottom: 1px solid #333 !important;
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
    this.rescuesId = parseInt(this.route.snapshot.queryParamMap.get('rescueId'));
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
          this.imgNum = menus['data']['imageList'].length;
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
    //图片加载
    //  setTimeout(()=> $("img.lazy").lazyload({placeholder : "../../../assets/img/timg.gif"}),1000)

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

  ngAfterViewChecked(){
    if(this.imgNum && $("img.lazy").length == this.imgNum && !this.imgShown){
       console.log('lazyload working!')
       $("img.lazy").lazyload({placeholder : "../../../assets/img/timg.gif"});
      this.imgShown = true;
    }
    if(this.imgNum && $("img.lazy").length == this.imgNum && this.imgShown){
      $("img.lazy").each(function () {
        if($(this).attr('src')!="../../../assets/img/timg.gif"){
          $(this).next('.turnBtn').show();
        }
      })
    }
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
    $obj.find('.turnBtn').remove();
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

  setImg(obj,i,last){
   let box = $('.ibox-content').width()*(24/100);
   let si = obj.width/obj.height;
     console.log(obj.width)
     console.log(obj.height)
    console.log(si)
    if((i+1)%4==0){
      $('.img'+i).parent().after('<div class="clearfix" ></div>')
    }
    // if(si>1){
    // if(obj.width==247&&obj.height==139){
    // if((obj.width==1920&&obj.height==1080)||(obj.width==1334&&obj.height==750)||(obj.width==1136&&obj.height==640)||(obj.width==2436&&obj.height==1125)){
    //   let tHeight = obj.width-obj.height;
    //   $('#imgBox').css({paddingTop:(tHeight/2+20)+'px',paddingBottom:(tHeight/2+15)+'px'})
    //  obj.style.transform = 'rotate(90deg)';
       // $('.img'+i).height(box+'px')
    // }
    // console.log(obj.width+','+obj.height)
  }

  turnRound(i){
    let round = parseInt($('.img'+i).attr('ak'));
    console.log(round);
    round+=90;
    $('.img'+i).attr('ak',round)
    console.log(round);
    let si = $('.img'+i).width()/$('.img'+i).height();
    console.log(si)
     if(si>1){
       let tHeight = $('.img'+i).width()-$('.img'+i).height();
       console.log(round%180)
       if(round%180!=0){
         $('#imgBox').css({paddingTop:(tHeight/2+20)+'px',paddingBottom:(tHeight/2+0)+'px'});
         $('.img'+i).css('marginBottom',tHeight+'px');
       }else{
         $('#imgBox').css({paddingTop:(tHeight/2+20)+'px',paddingBottom:0});
         $('.img'+i).css('marginBottom','20px');
       }
     }
     // $('.img'+i).css('transform','rotate('+round+'deg)');
    $('.img'+i).css({'transform':'rotate('+round+'deg)','-webkit-transform':'rotate('+round+'deg)','-o-transform':'rotate('+round+'deg)','-moz-transform':'rotate('+round+'deg)'});
  }

  goBack(): void {
    let rId = this.rescuesId;
    let heroId = this.rescuePaperId ? this.rescuePaperId: null;
    // console.log(heroId);
    this.router.navigate(['/home/rescuepapers/135', { cur: heroId,rescuesId:rId}]);
    // this.location.back();
  }
}
