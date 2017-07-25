import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ElectricityService } from '../../../electricity/electricity-service';
import { Electricity } from '../../../models/electricity';
import { Location }               from '@angular/common';
declare var BMap: any;
declare var $:any;

@Component({
  selector: 'app-gaode-map',
  templateUrl: './gaode-map.component.html',
  styleUrls: ['./gaode-map.component.css']
})
export class GaodeMapComponent implements OnInit {
  electricity: Electricity;

  constructor(
    private electricityService: ElectricityService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    var pointList;
     var  markers,lineArr = [];
    var polyline;
    var imeicode = this.route.snapshot.params['deviceIMEI'];

    var map = new BMap.Map("container");            // 创建Map实例
    var point = new BMap.Point(108.924295,34.235939); // 创建点坐标
    map.centerAndZoom(point,15);
    map.addControl(new BMap.NavigationControl());

    // map.centerAndZoom(point,15);
    map.enableScrollWheelZoom();                 //启用滚轮放大缩小
    // let map = new AMap.Map('container');
    // map.setZoom(11);
    // map.plugin(['AMap.OverView','AMap.ToolBar','AMap.PlaceSearch'], () => {
    //   var view = new AMap.OverView();
    //   map.addControl(view);
    //   var toolbar = new AMap.ToolBar();
    //   map.plugin(toolbar);
    //   var toolbar2 = new AMap.PlaceSearch();
    //   map.plugin(toolbar2);
    // });
    //初始化
    // 鹰眼获取轨迹
    // changeX();
    // track()

    // 后台获取GPS坐标点
    // {"status":0,"msg":null,"time":0,"objectbean":null,"code":0,"error":null,"data":null}
    init();
     startRun();

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

    function completeEventHandler(x,y){

      var lngX ;
      var latY ;
      markers = [];
      lineArr = new Array();
      lineArr=[];
      console.log(pointList)
      for(var i = 0,marker;i<pointList.length;i++){
        lngX = pointList[i].longitude;
        latY = pointList[i].latitude;
        // lineArr.push(new AMap.LngLat(lngX,latY));
        lineArr.push(new BMap.Point(lngX,latY));
        var convertor = new BMap.Convertor();
        convertor.translate(lineArr, 1, 5, translateCallback)
        var  translateCallback = function (data){
          if(data.status === 0) {
            console.log(data.points)
            for(var a = 0,marker;a<data.points.length;a++){
              if(data.points.length == 0){
                return;
              }
              if(a==0){
                var myIcon = new BMap.Icon("markers.png");
                var point = new BMap.Point(data.points[a].lng, data.points[a].lat);
                var marker = new BMap.Marker(point);
                marker.setLabel('起');
                map.addOverlay(marker);
              }else if(a<data.points.length-1){
                var point = new BMap.Point(data.points[a].lng, data.points[a].lat);
                var marker = new BMap.Marker(point);
                map.addOverlay(marker);
              }else{
                var point = new BMap.Point(data.points[a].lng, data.points[a].lat);
                var marker = new BMap.Marker(point);
                map.addOverlay(marker);
              }

            }
            var view = map.getViewport(data.points);
            var mapZoom = view.zoom;
            var centerPoint = view.center;
            map.centerAndZoom(centerPoint,mapZoom);
            //绘制轨迹
            polyline = new BMap.Polyline(data.points, {strokeColor:"red", strokeWeight:2, strokeOpacity:0.5});
            map.addOverlay(polyline);

            // var marker = new BMap.Marker(data.points[0]); lat:;lng:
            // bm.addOverlay(marker);
            // var label = new BMap.Label("转换后的百度坐标（正确）",{offset:new BMap.Size(20,-10)});
            // marker.setLabel(label); //添加百度label
            // bm.setCenter(data.points[0]);
          }
        }

        //   if(pointList.length == 0){
        //     return;
        //   }
        // if(i==0){
        //   var myIcon = new BMap.Icon("markers.png");
        //   var point = new BMap.Point(pointList[i].longitude, pointList[i].latitude);
        //   var marker = new BMap.Marker(point);
        //   marker.setLabel('起');
        //   map.addOverlay(marker);
        //
        //
        //   //  marker = new AMap.Marker({ //添加自定义点标记
        //   //   map: map,
        //   //   position: [pointList[i].locationLongitude, pointList[i].locationLatitude], //基点位置
        //   //   offset: new AMap.Pixel(-17, -42), //相对于基点的偏移位置
        //   //   draggable: true,  //是否可拖动
        //   //    zIndex:999,
        //   //   content: '<div class="marker-route marker-marker-bus-from"></div>'   //自定义点标记覆盖物内容
        //   // });
        //   // markers.push(marker)
        // }else if(i<pointList.length-1){
        //   var point = new BMap.Point(pointList[i].longitude, pointList[i].latitude);
        //   var marker = new BMap.Marker(point);
        //   map.addOverlay(marker);
        //   //  marker = new AMap.Marker({ //添加自定义点标记
        //   //   map: map,
        //   //   position: [pointList[i].locationLongitude, pointList[i].locationLatitude], //基点位置
        //   //   offset: new AMap.Pixel(-17, -42), //相对于基点的偏移位置
        //   //   draggable: true,  //是否可拖动
        //   //   content: '<div class="marker-route" style=" width:30px;height:40px;background-position: -333px -23px;margin-top: 6px"></div>'   //自定义点标记覆盖物内容
        //   // });
        //   // markers.push(marker)
        // }else{
        //   var point = new BMap.Point(pointList[i].longitude, pointList[i].latitude);
        //   var marker = new BMap.Marker(point);
        //   map.addOverlay(marker);
        //   //  marker = new AMap.Marker({ //添加自定义点标记
        //   //   map: map,
        //   //   position: [pointList[i].locationLongitude, pointList[i].locationLatitude], //基点位置
        //   //   offset: new AMap.Pixel(-17, -42), //相对于基点的偏移位置
        //   //   draggable: true,  //是否可拖动
        //   //    zIndex:999,
        //   //   content: '<div class="marker-route" style=" background-position: -334px -135px"></div>'   //自定义点标记覆盖物内容
        //   // });
        //   // markers.push(marker)
        // }


      }
      console.log(lineArr);
      // var view = map.getViewport(lineArr);
      // var mapZoom = view.zoom;
      // var centerPoint = view.center;
      // map.centerAndZoom(centerPoint,mapZoom);
      // //绘制轨迹
      // polyline = new BMap.Polyline(lineArr, {strokeColor:"red", strokeWeight:2, strokeOpacity:0.5});
      // map.addOverlay(polyline);
      // function addLine(points){
      //
      //   var linePoints = [],pointsLen = points.length,i,polyline;
      //   if(pointsLen == 0){
      //     return;
      //   }
      //   // 创建标注对象并添加到地图
      //   for(i = 0;i <pointsLen;i++){
      //     linePoints.push(new BMap.Point(points[i].lng,points[i].lat));
      //   }
      //
      //   polyline = new BMap.Polyline(linePoints, {strokeColor:"red", strokeWeight:2, strokeOpacity:0.5});
      //
      //   var polyline = new BMap.Polyline([
      //     new BMap.Point(116.399, 39.910),
      //     new BMap.Point(116.405, 39.920)
      //   ],
      //   {strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5}
      // );
      // map.addOverlay(polyline);


      // polyline = new AMap.Polyline({
      //   map:map,
      //   path:lineArr,
      //   strokeColor:"#00A",//线颜色
      //   strokeOpacity:1,//线透明度
      //   strokeWeight:3,//线宽
      //   strokeStyle:"solid",//线样式
      // });
    }
    function startRun(){  //开始绘制轨迹

      var x=pointList[0].longitude;
      var y=pointList[0].latitude;
      //坐标转换完之后的回调函数

      completeEventHandler(x,y);
      // marker.moveAlong(lineArr,80);     //开始轨迹回放
    }


    function init(){
      var start= $('#start').val();
      var end = $('#end').val();
        var result;
      var paramms = {imeiCode:imeicode,startTime:start,endTime:end}

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
         // result=data.data.list;
       }
       });
      pointList =
        [
          {
            "deviceIMEI": "1234567890123456",
            "locationTime": "2017-03-06 11:22:56",
            "locationPower": "97%",
            "longitude": 108.912575,
            "latitude": 34.230698,
            "locationType": "GPS"
          },
          {
            "deviceIMEI": "1234567890123456",
            "locationTime": "2017-03-06 11:22:56",
            "locationPower": "97%",
            "longitude": 108.812575,
            "latitude": 34.230688,
            "locationType": "GPS"
          }]
        // pointList=result;
    }
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
            startRun();

            console.log(res.total);
          } else {
            console.log(res);
            console.log(res.status);
          }
        },
        error: function () {
          alert(1)
        }
        // ,
        // complete: function (data) {
        //   console.log(data)
        // }
      });
    }
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
      startRun();
    })

  }
  goBack(): void {
    this.location.back();
  }
}


