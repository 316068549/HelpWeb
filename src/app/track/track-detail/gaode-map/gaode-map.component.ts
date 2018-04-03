import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Params,Router, ParamMap } from '@angular/router';
import { ElectricityService } from '../../../electricity/electricity-service';
import { Electricity } from '../../../models/electricity';
import { Location }               from '@angular/common';
declare var BMap: any;
declare var $:any;
declare var layer:any;

@Component({
  selector: 'app-gaode-map',
  templateUrl: './gaode-map.component.html',
  styleUrls: ['./gaode-map.component.css']
})
export class GaodeMapComponent implements OnInit {
  electricity: Electricity;
  rescuePaperId:number;
  imei:number;

  constructor(
    private electricityService: ElectricityService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    var loading;
    var pointList;
    var points =[];
     var  markers,lineArr = [];
    var polyline;

    this.rescuePaperId = parseInt(this.route.snapshot.queryParamMap.get('cur'));
    var imeicode = this.route.snapshot.params['deviceIMEI'];
    this.imei = imeicode;
    var map = new BMap.Map("container");            // 创建Map实例
    var point = new BMap.Point(108.924295,34.235939); // 创建点坐标  width: 437px; height: 267px; top: -3px; left: -9px;
    var myIcon = new BMap.Icon("assets/img/poi-marker2.png", new BMap.Size(25,35),{
      anchor: new BMap.Size(10, 30),
      imageOffset: new BMap.Size(-10, -4)
    });
    var myIcon3 =  new BMap.Icon("assets/img/poi-marker2.png", new BMap.Size(25,35),{
      anchor: new BMap.Size(10, 30),
      imageOffset: new BMap.Size(-53, -4)
    });
    var myIcon2 = new BMap.Icon("assets/img/poi-marker2.png", new BMap.Size(25,35),{
      anchor: new BMap.Size(10, 30),
      imageOffset: new BMap.Size(-98, -4)
    });
    map.centerAndZoom(point,15);
    map.addControl(new BMap.NavigationControl());
    var top_left_control = new BMap.ScaleControl({anchor: 'BMAP_ANCHOR_TOP_LEFT'});
    map.addControl(top_left_control);
    map.enableScrollWheelZoom();                 //启用滚轮放大缩小
    //初始化
    // 鹰眼获取轨迹
    // changeX();
    // track()

    // 后台获取GPS坐标点
    init();



    function init(){
      var start= $('#start').val();
      var end = $('#end').val();
      if(new Date(end.replace(/\-/g,'\/'))<new Date(start.replace(/\-/g,'\/'))){
        layer.open({
          title: '提示'
          ,content: '结束时间不能小于开始时间！'
        });
        return;
      }
      var result;
      var paramms = {deviceImei:imeicode,startTime:start,endTime:end}

      if(paramms.startTime==''){
        delete paramms['startTime'];
      }
      if(paramms.endTime==''){
        delete paramms['endTime'];
      }
      $.ajax({
        type: "post",
        url: "web/query/orbit",
        //    url: " api/query/messageAll",
        contentType:"application/json",
        dataType: "json",
        data:JSON.stringify(paramms),
        cache: false,
        async: false,
        success: function(data){
          console.log('success')
          if(data.data){
            result=data.data;
            loading = layer.msg('轨迹加载中...');
          }else {
            layer.open({
              title: '提示'
              ,content: '没有查询到轨迹'
            });
            return;
          }
        }
      });
      pointList=result;
      completeEventHandler();
    }

    function completeEventHandler(){
      var lngX ;
      var latY ;
      markers = [];
      var lineArr=[];
      if(!pointList){
        return
      }
      console.log(pointList);
      var pointLen = pointList.length;
      for(var d = 0,marker;d<pointLen;d++){
        var point = new BMap.Point(pointList[d].locationLongitude,pointList[d].locationLatitude);
        lineArr.push(point);
        if(d==0){
          var marker = new BMap.Marker(point,{icon:myIcon,title:pointList[d].locationTime});
          marker.setLabel('起');
          marker.setZIndex(99)
          map.addOverlay(marker);
        }else if(d<pointLen-1){
          // var point = new BMap.Point(resultList2.resultList[d].x, resultList2.resultList[d].y);
          var marker = new BMap.Marker(point,{icon:myIcon3,title:pointList[d].locationTime});
          map.addOverlay(marker);
          // points.push(point);
        }else{
          var marker = new BMap.Marker(point,{icon:myIcon2,title:pointList[d].locationTime});
          map.addOverlay(marker);
          marker.setZIndex(99)
        }
      }
      var view = map.getViewport(lineArr);
      var mapZoom = view.zoom;
      var centerPoint = view.center;
      map.centerAndZoom(centerPoint,mapZoom);
      // //绘制轨迹
      polyline = new BMap.Polyline(lineArr, {strokeColor:"#5298FF", strokeWeight:3, strokeOpacity:0.9});
      layer.close(loading);
      map.addOverlay(polyline);
      //调整视野
    }


    //转换代码，暂时用不到
    function getPoints(pointList){
       var points =[];
       for(var i=0;i<pointList.length;i++){
         var pt = new BMap.Point(pointList[i].locationLongitude,pointList[i].locationLatitude);
         points.push(pt);
       }
       return points;
    }
    function fengzhuang(gpsPouints){
      var pointsArray = new Array();
      var times = Math.floor(gpsPouints.length/10)
      var k = 0;
      for(var i=0;i<times;i++){
        pointsArray[i]=new Array();
        for(var j=0;j<10;j++,k++){
          pointsArray[i][j] = gpsPouints[k]
        }
      }
      if(k<gpsPouints.length){
        var j=0;var i = times;
        pointsArray[i]=new Array();
        while (k<gpsPouints.length){
          pointsArray[i][j] = gpsPouints[k];
          k++;
          j++;
        }
      }
      return pointsArray;
    }
    //转换end
    // function completeEventHandler(){
    //   var lngX ;
    //   var latY ;
    //   markers = [];
    //   var lineArr=[];
    //   var posIndex = 0;
    //   var pointsArray = new Array();
    //   var maxCnt = 10;
    //   if(!pointList){
    //     return
    //   }
    //   //转换百度坐标代码
    //   var gpsPouints = getPoints(pointList);
    //   pointsArray = fengzhuang(gpsPouints);
    //   console.log(pointList);
    //   console.log(pointsArray);
    //   var convertor = new BMap.Convertor();
    //   var translateCallback = function (data){
    //     if(data.status!=0){
    //       alert("转换出错");
    //       return
    //     }
    //     for (var i = 0; i < data.points.length; i++) {
    //       lineArr.push(data.points[i])
    //     }
    //     posIndex++;
    //     if(posIndex<pointsArray.length){
    //       convertor.translate(pointsArray[posIndex], 1, 5, translateCallback);
    //     }
    //     if(posIndex==pointsArray.length){
    //       console.log(lineArr);
    //
    //       for(var d = 0,marker;d<lineArr.length;d++){
    //         if(lineArr.length == 0){
    //           return;
    //         }
    //         if(d==0){
    //           var marker = new BMap.Marker(lineArr[d],{icon:myIcon,title:pointList[d].locationTime});
    //           marker.setLabel('起');
    //           marker.setZIndex(99)
    //           map.addOverlay(marker);
    //         }else if(d<lineArr.length-1){
    //           // var point = new BMap.Point(resultList2.resultList[d].x, resultList2.resultList[d].y);
    //           var marker = new BMap.Marker(lineArr[d],{icon:myIcon3,title:pointList[d].locationTime});
    //           map.addOverlay(marker);
    //           // points.push(point);
    //         }else{
    //           var marker = new BMap.Marker(lineArr[d],{icon:myIcon2,title:pointList[d].locationTime});
    //           map.addOverlay(marker);
    //           marker.setZIndex(99)
    //         }
    //       }
    //       var view = map.getViewport(lineArr);
    //       var mapZoom = view.zoom;
    //       var centerPoint = view.center;
    //       map.centerAndZoom(centerPoint,mapZoom);
    //       // //绘制轨迹
    //       polyline = new BMap.Polyline(lineArr, {strokeColor:"#5298FF", strokeWeight:3, strokeOpacity:0.9});
    //       layer.close(loading);
    //       map.addOverlay(polyline);
    //       //调整视野
    //     }
    //   }
    //   convertor.translate(pointsArray[posIndex], 1, 5, translateCallback);
    // }
    //根据时间搜索
    function changeTime(str){
      // var str ="2013-01-01 00:00:00";
      str = str.replace(/-/g,"/");
      var date = new Date(str);
      var humanDate = new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(), date.getSeconds()));
      var unix_time = humanDate.getTime()/1000 - 8*60*60;
      return unix_time;
    }
    $('#search1').on('click',function () {
      // polyline.hide( );
      //  map.remove(markers);
      map.clearOverlays();
      init();
      completeEventHandler();
    })



    function changeX(){
      var ak = 'PmTFEuep7FmccxTrTn67TxRn';
      var service_id = 144064;
      // var point_list = '隔壁老王';
      var url = 'http://yingyan.baidu.com/api/v3/track/getlatestpoint?ak=gMtXC5ktlFpOFpRrrevVV' +
        'KhjbeUloFcb&service_id=142120&entity_name=0862631036609138&process_option=need_denoise=1,' +
        'radius_threshold=20,need_mapmatch=1,transport_mode=driving&coord_type_output=bd09ll&mcode=18:' +
        '1A:E7:83:7C:36:CF:CA:83:A8:C5:F6:6F:CA:CB:5C:5A:65:5C:DF;com.anyikang.fallalarm';
      var point_list = [
        {
          "entity_name": "entity1",
          "loc_time": 123,
          "latitude": 34.235939,
          "longitude": 108.924220,
          "coord_type_input": "wgs84",
          "speed":27.23,
          "direction":178,
          "height":173.3,
          "radius":32,
          "city": "guangzhou",
          "province": "guangdong",
        },
        {
          "entity_name": "entity2",
          "loc_time": "321",
          "latitude": "34.215939",
          "longitude": "108.924295",
          "coord_type_input": "wgs84",
          "speed" :28.82,
          "direction":174,
          "height":173.6,
          "radius":32,
          "city": "guangzhou",
          "province": "guangdong"
        }
      ]
      // var start= $('#start').val();
      // var end = $('#end').val();
      var result;
      // var paramms = {imeiCode:imeicode,startTime:start,endTime:end}
      // if(paramms.startTime==''){
      //   delete paramms['startTime'];
      // }
      // if(paramms.endTime==''){
      //   delete paramms['endTime'];
      // }
      // var uul = "http://yingyan.baidu.com/api/v3/track/addpoint"
      // $.ajax({
      //   type: "post",
      //   url: "http://yingyan.baidu.com/api/v3/track/addpoints",
      //   dataType: "json",
      //   data:{ak:'PmTFEuep7FmccxTrTn67TxRn',service_id:144064,point_list:JSON.stringify(point_list)},
      //   cache: false,
      //   async: false,
      //   success: function(data){
      //     result=data.objectbean;
      //     console.log(result)
      //   }
      // });
      $.ajax({
        type: "post",
        url: url,
        dataType: "json",
        data:{ak:'PmTFEuep7FmccxTrTn67TxRn',service_id:144064,point_list:JSON.stringify(point_list)},
        cache: false,
        async: false,
        success: function(data){
          result=data.objectbean;
          console.log(result)
        }
      });
      pointList=result;
      console.log(pointList)
    }
    // 鹰眼获取轨迹
    function track(){
      var ak = 'gMtXC5ktlFpOFpRrrevVVKhjbeUloFcb';
      var service_id = 142120;
      var  entity_name = '0862631036609138';
      var process_option='need_denoise=1,radius_threshold=20,need_mapmatch=1,transport_mode=driving';
      var coord_type_output='bd09ll';
      var mcode='18:1A:E7:83:7C:36:CF:CA:83:A8:C5:F6:6F:CA:CB:5C:5A:65:5C:DF;com.anyikang.fallalarm';
      var start_time=changeTime('2017-06-22 12:00:00');
      var end_time=changeTime('2017-06-22 13:00:00');

      var url = 'http://yingyan.baidu.com/api/v3/track/gettrack?ak='+ak +
        '&service_id='+service_id+'&entity_name='+entity_name+'&process_option='+process_option+'&coord_type_output='+coord_type_output+'&mcode=' +
        mcode+'&start_time='+start_time+'&end_time='+end_time;

      // var start= $('#start').val();
      // var end = $('#end').val();


      $.ajax({
        type: "get",
        url: url,
        dataType: 'jsonp',
        success: function (res) {
          if (res.status === 0) {
            console.log(res);
            pointList=res.points;
            completeEventHandler();

            console.log(res.total);
          } else {
            console.log(res);
            console.log(res.status);
          }
        },
        error: function () {

        }
        // ,
        // complete: function (data) {
        //   console.log(data)
        // }
      });
    }


  }
  goBack(): void {
    let heroId = this.rescuePaperId ? this.rescuePaperId: null;
    this.router.navigate(['/home/track/121', { cur: heroId}]);
    //  this.location.back();
  }

//改的循环的，是坏的顺序错乱
  // var yushu = pointLen % 100;
  // changeCount = Math.ceil(pointLen / 100);
  // for (var j = 0; j < changeCount; j++) {
  //   var changgeUrl = "http://api.map.baidu.com/geoconv/v1/?coords=";
  //   for(var i = 0,marker;i<100;i++){
  //     if(pointList[(j * 100) + i]&&pointList[(j * 100) + i]){
  //       lngX = pointList[(j * 100) + i].locationLongitude;
  //       latY = pointList[(j * 100) + i].locationLatitude;
  //       if(i<99){
  //         if(j<(changeCount-1)){
  //           changgeUrl+= lngX+","+latY+";"
  //         }else{
  //           if(i!=(yushu-1)){
  //             changgeUrl+= lngX+","+latY+";"
  //           }
  //         }
  //       }
  //       if (i==99||j==(changeCount-1)&&i==(yushu-1)){
  //         changgeUrl+= lngX+","+latY
  //       }
  //     }
  //   }
  //    if(j==0){
  //      $.ajax({
  //        type: "get",
  //        url: changgeUrl+"&from=1&to=5&ak=PeF7fa3g436cNdspCytr4ogR8VdoUsXa",
  //        dataType: 'jsonp',
  //        cache: false,
  //        async: false, //同步请求外面才能获取到*
  //        success: function(data){
  //          if(data.status === 0) {
  //            console.log(data.result)
  //            for(var c = 0,marker;c<data.result.length;c++) {
  //              if (data.result.length == 0) {
  //                return;
  //              }
  //              userData.resultList.push(data.result[c])
  //            }
  //          }
  //          // if(userData.resultList.length==pointLen){
  //          localStorage.setItem('resultList',JSON.stringify(userData))
  //          // }
  //        }
  //      });
  //    }
  // }
  // var getDataJson = setInterval(function () {
  //   var resultList2 = JSON.parse(localStorage.getItem('resultList'));
  //   if(resultList2){
  //     if(resultList2.hasOwnProperty('resultList')){
  //       if(resultList2.resultList.length==pointLen){
  //         clearInterval(getDataJson);
  //         var points=[];
  //         for(var d = 0,marker;d<resultList2.resultList.length;d++){
  //           if(resultList2.resultList.length == 0){
  //             return;
  //           }
  //           if(d==0){
  //             var point = new BMap.Point(resultList2.resultList[d].x, resultList2.resultList[d].y);
  //             var marker = new BMap.Marker(point,{icon:myIcon});
  //             marker.setLabel('起');
  //             marker.setZIndex(99)
  //             map.addOverlay(marker);
  //             points.push(point);
  //           }else if(d<resultList2.resultList.length-1){
  //             var point = new BMap.Point(resultList2.resultList[d].x, resultList2.resultList[d].y);
  //             var marker = new BMap.Marker(point,{icon:myIcon3});
  //             map.addOverlay(marker);
  //             points.push(point);
  //           }else{
  //             var point = new BMap.Point(resultList2.resultList[d].x, resultList2.resultList[d].y);
  //             var marker = new BMap.Marker(point,{icon:myIcon2});
  //             map.addOverlay(marker);
  //             marker.setZIndex(99)
  //             points.push(point);
  //           }
  //         }
  //         var view = map.getViewport(points);
  //         var mapZoom = view.zoom;
  //         var centerPoint = view.center;
  //         map.centerAndZoom(centerPoint,mapZoom);
  //         // //绘制轨迹
  //         polyline = new BMap.Polyline(points, {strokeColor:"#5298FF", strokeWeight:3, strokeOpacity:0.9});
  //         map.addOverlay(polyline);
  //         //调整视野
  //       }
  //     }
  //   }
  // },200)


//   for(var i = 0,marker;i<pointLen;i++){
//   if(pointList[i].locationLongitude){
//   lngX = pointList[i].locationLongitude;
// }
// if(pointList[i].locationLatitude){
//   latY = pointList[i].locationLatitude;
// }
// if(i<(pointLen-1)){
//   changgeUrl+= lngX+","+latY+";"
// }
// if (i==(pointLen-1)){
//   changgeUrl+= lngX+","+latY
// }
// //预留问题最多转100个
// // var zhuanhuan = changgeUrl.split(';')
// // if(zhuanhuan.length>100){
// //
// // }
// //预留问题
//
// // lngX = pointList[i].longitude;
// // latY = pointList[i].latitude;
// // lineArr.push(new BMap.Point(lngX,latY));
//
// // var convertor = new BMap.Convertor();
// // convertor.translate(lineArr, 1, 5, translateCallback)
// // var  translateCallback = function (data){
// //   if(data.status === 0) {
// //     console.log(data.points)
// //     for(var a = 0,marker;a<data.points.length;a++){
// //       if(data.points.length == 0){
// //         return;
// //       }
// //       if(a==0){
// //         var point = new BMap.Point(data.points[a].lng, data.points[a].lat);
// //         var marker = new BMap.Marker(point,{icon:myIcon});
// //         marker.setLabel('起');
// //         map.addOverlay(marker);
// //       }else if(a<data.points.length-1){
// //         var point = new BMap.Point(data.points[a].lng, data.points[a].lat);
// //         var marker = new BMap.Marker(point);
// //         map.addOverlay(marker);
// //       }else{
// //         var point = new BMap.Point(data.points[a].lng, data.points[a].lat);
// //         var marker = new BMap.Marker(point,{icon:myIcon2});
// //         map.addOverlay(marker);
// //       }
// //
// //     }
// //     var view = map.getViewport(data.points);
// //     var mapZoom = view.zoom;
// //     var centerPoint = view.center;
// //     map.centerAndZoom(centerPoint,mapZoom);
// //     //绘制轨迹
// //     polyline = new BMap.Polyline(data.points, {strokeColor:"red", strokeWeight:2, strokeOpacity:0.5});
// //     map.addOverlay(polyline);
// //   }
// // }
//
// //   if(pointList.length == 0){
// //     return;
// //   }
// // if(i==0){
// //   var myIcon = new BMap.Icon("markers.png");
// //   var point = new BMap.Point(pointList[i].longitude, pointList[i].latitude);
// //   var marker = new BMap.Marker(point);
// //   marker.setLabel('起');
// //   map.addOverlay(marker);
// //
// //
// //   //  marker = new AMap.Marker({ //添加自定义点标记
// //   //   map: map,
// //   //   position: [pointList[i].locationLongitude, pointList[i].locationLatitude], //基点位置
// //   //   offset: new AMap.Pixel(-17, -42), //相对于基点的偏移位置
// //   //   draggable: true,  //是否可拖动
// //   //    zIndex:999,
// //   //   content: '<div class="marker-route marker-marker-bus-from"></div>'   //自定义点标记覆盖物内容
// //   // });
// //   // markers.push(marker)
// // }else if(i<pointList.length-1){
// //   var point = new BMap.Point(pointList[i].longitude, pointList[i].latitude);
// //   var marker = new BMap.Marker(point);
// //   map.addOverlay(marker);
// //   //  marker = new AMap.Marker({ //添加自定义点标记
// //   //   map: map,
// //   //   position: [pointList[i].locationLongitude, pointList[i].locationLatitude], //基点位置
// //   //   offset: new AMap.Pixel(-17, -42), //相对于基点的偏移位置
// //   //   draggable: true,  //是否可拖动
// //   //   content: '<div class="marker-route" style=" width:30px;height:40px;background-position: -333px -23px;margin-top: 6px"></div>'   //自定义点标记覆盖物内容
// //   // });
// //   // markers.push(marker)
// // }else{
// //   var point = new BMap.Point(pointList[i].longitude, pointList[i].latitude);
// //   var marker = new BMap.Marker(point);
// //   map.addOverlay(marker);
// //   //  marker = new AMap.Marker({ //添加自定义点标记
// //   //   map: map,
// //   //   position: [pointList[i].locationLongitude, pointList[i].locationLatitude], //基点位置
// //   //   offset: new AMap.Pixel(-17, -42), //相对于基点的偏移位置
// //   //   draggable: true,  //是否可拖动
// //   //    zIndex:999,
// //   //   content: '<div class="marker-route" style=" background-position: -334px -135px"></div>'   //自定义点标记覆盖物内容
// //   // });
// //   // markers.push(marker)
// // }
// }

  // this.route.params
  //   .switchMap((params: Params) => this.electricityService.getElectricity(params['deviceIMEI'].toString()))
  //   .subscribe(electricity => {
  //     // pointList = electricity;

  //     console.log(pointList);
  //     // marker = new AMap.Marker({
  //     //   map: map,
  //     //   position: [116.397428, 39.90923],
  //     //   icon: "http://webapi.amap.com/images/car.png",
  //     //   offset: new AMap.Pixel(-26, -13),
  //     //   autoRotation: true
  //     // });
  //     // 绘制轨迹
  //     // var polyline = new AMap.Polyline({
  //     //   map: map,
  //     //   path: lineArr,
  //     //   strokeColor: "#00A",  //线颜色
  //     //   // strokeOpacity: 1,     //线透明度
  //     //   strokeWeight: 3,      //线宽
  //     //   // strokeStyle: "solid"  //线样式
  //     // });
  //     // var passedPolyline = new AMap.Polyline({
  //     //   map: map,
  //     //   // path: lineArr,
  //     //   strokeColor: "#F00",  //线颜色
  //     //   // strokeOpacity: 1,     //线透明度
  //     //   strokeWeight: 3,      //线宽
  //     //   // strokeStyle: "solid"  //线样式
  //     // });
  //     // marker.on('moving',function(e){
  //     //   passedPolyline.setPath(e.passedPath);
  //     // })
  //     // map.setFitView();
  //
  //
  //   });
}


