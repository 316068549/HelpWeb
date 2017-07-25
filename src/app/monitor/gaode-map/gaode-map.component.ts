import { Component, OnInit, DoCheck } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
declare var BMap: any;
declare var $:any;
declare var BMapLib:any;
declare var videojs:any;

@Component({
  selector: 'app-gaode-map',
  templateUrl: './gaode-map.component.html',
  styleUrls: ['./gaode-map.component.css']
})
export class GaodeMapComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    var defaultIconStyle = 'red', //默认的图标样式
      hoverIconStyle = 'green', //鼠标hover时的样式
      selectedIconStyle = 'purple' //选中时的图标样式
    ;
    var pointList;
    var  markers,lineArr = [];

    var map = new BMap.Map("container");            // 创建Map实例
    //获取下拉数据
    var type = "LOCAL_SEARCH";
    var X = $('#container').width();
    var Y = $('#container').height();

//创建检索控件
    var searchControl = new BMapLib.SearchControl({
      container : "searchBox" //存放控件的容器
      , map     : map  //关联地图对象
      , type    : type  //检索类型
    });
    var point = new BMap.Point(108.924295,34.235939); // 创建点坐标
    var myIcon = new BMap.Icon("assets/img/006f (3).gif", new BMap.Size(30,30));
    var myIcon2 = new BMap.Icon("http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png", new BMap.Size(30,30));
    // var label = new BMap.Label("转换后的百度坐标（正确）",{offset:new BMap.Size(20,-10)});
    // marker.setLabel(label); //添加百度label
    map.enableScrollWheelZoom();                 //启用滚轮放大缩小
    // map.enableInertialDragging();
    map.centerAndZoom(point,15);
    map.addControl(new BMap.NavigationControl());
    // var bounds = map.getBounds();
    // var sw = bounds.getSouthWest();
    // var ne = bounds.getNorthEast();
    // var lngSpan = Math.abs(sw.lng - ne.lng);
    // var latSpan = Math.abs(ne.lat - sw.lat);
    init();
    startRun();
    // for (var i = 0; i < 10; i ++) {
    //   var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
    //   addMarker(point);
    // }
    // for (var i = 0; i < 10; i ++) {
    //   var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
    //   var marker = new BMap.Marker(point);
    //   map.addOverlay(marker);
    // }

    // setTimeout(function(){
    //   var convertor = new BMap.Convertor();
    //   var pointArr = [];
    //   pointArr.push(point);
    //   convertor.translate(pointArr, 1, 5, translateCallback)
    // }, 500);
    //坐标转换完之后的回调函数
    var  translateCallback = function (data){
      if(data.status === 0) {
        // var marker = new BMap.Marker(data.points[0]);
        // map.addOverlay(marker);
        // marker.setLabel(label);
        // map.setCenter(data.points[0]);

        // var label = new BMap.Label("求助点刘胡兰",{offset:new BMap.Size(20,-10)});
        // label.setStyle({ width:"50px",color : "red", fontSize : "12px",background:"#fff" })
        // marker.setLabel(label); //添加百度label
        //sousuo
        var marker2 = new BMap.Marker(data.points[0],{icon:myIcon});
        map.addOverlay(marker2);
        // 随机向地图添加25个标注

        map.centerAndZoom(data.points[0],15);
        // if (status === 'complete') {
        //   console.log(result);
        //   var poiArr = result.poiList.pois;
        //   for (var i = 0; i < poiArr.length; i++) {
        //     //在地图上创建标注点
        //     var marker = new AMap.Marker({
        //       icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png"
        //     });
        //     marker.setPosition(new AMap.LngLat(poiArr[i].location.lng, poiArr[i].location.lat));
        //     marker.setMap(map);
        //     marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
        //       offset: new AMap.Pixel(3, 0),//修改label相对于maker的位置
        //       content: String.fromCharCode(65 + i)
        //     });
        //     marker.content = poiArr[i].name + "<br/>" + poiArr[i].address;
        //     markers.push(marker);
        //   }
        // }
        // var local = new BMap.LocalSearch(map, {
        //   renderOptions:{map: map,autoViewport: false}
        // });
        // local.search("医院");
        // local.setMarkersSetCallback(function (pois) {
        //     //  map.clearOverlays();
        //     // for (var i = 0,marker; i < pois.length; i++) {
        //     //   //在地图上创建标注点
        //     //    marker = new BMap.Marker(pois[i].marker.point,{icon:myIcon2});
        //     //   map.addOverlay(marker);
        //     // }
        //   // var marker2 = new BMap.Marker(data.points[0],{icon:myIcon});
        //   // map.addOverlay(marker2);
        //   // map.centerAndZoom(data.points[0],15);
        //   console.log(pois)
        // })



        var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
          '<img src="assets/img/profile_small.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
          '简介：需要救援人刘大虎，77岁<br/>' +
          // '<a   videohref="ttp://vjs.zencdn.net/v/oceans.mp4" class="video_link">查看视频</a>' +
          '地址：西安市雁塔区上地十街10号<br/>电话：13898966666<br/>救援状态：志愿者乙正在前往救援' +
          '</div>';

        //创建检索信息窗口对象
        var searchInfoWindow = null;
        searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
          title  : "救援信息",      //标题
          width  : 290,             //宽度
          height : 115,              //高度
          panel  : "panel",         //检索结果面板
          enableAutoPan : true,   //自动平移
          enableSendToPhone: true, //是否显示发送到手机按钮
          // searchTypes   :[
          //   BMAPLIB_TAB_SEARCH,   //周边检索
          //   BMAPLIB_TAB_TO_HERE,  //到这里去
          //   BMAPLIB_TAB_FROM_HERE //从这里出发
          // ]
        });

        marker2.addEventListener("click", function(e){
          searchInfoWindow.open(marker2);
        })


        //圆形区域搜索
        // var circle = new BMap.Circle(data.points[0],1000,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.2});
        // map.addOverlay(circle);
        // var local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false,panel: "results"}});
        // local.searchNearby('饭店',data.points[0],1000);

        // var opts = {
        //   width : 150,     // 信息窗口宽度
        //   height: 190,     // 信息窗口高度
        //   title : "求助点" , // 信息窗口标题
        //   enableMessage:true,//设置允许信息窗发送短息
        //   message:"刘胡兰，13898966666~"
        // }
        // var infoWindow = new BMap.InfoWindow("刘胡兰，13898966666~", opts);  // 创建信息窗口对象
        // marker.addEventListener("click", function(){
        //   map.openInfoWindow(infoWindow,point); //开启信息窗口
        // });
      }
    }



    //播放视频
    // var myPlayer = videojs('my-video');
    // videojs("my-video").ready(function(){
    //   var myPlayer = this;
    //   myPlayer.play();
    // });
    //
    // videojs("my-video", {}, function(){
    // });
    // var fullscreenchange = function(){
    //   $('#page-wrapper').removeClass('marg220').addClass('fullscreen');
    // };
    //
    // myPlayer.on("pause", function(){
    //   console.log("pause")
    // });
    // 地图初始化位置
    function init(){
      getBoundary('西安市雁塔区');
      var result;
      // var paramms = {imeiCode:imeicode,startTime:start,endTime:end}
      var paramms = {imeiCode:111}
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
    //地图坐标转换，添加marker
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
                var myIcon = new BMap.Icon("markers.png");
                var point = new BMap.Point(data.points[a].lng, data.points[a].lat);
                var marker = new BMap.Marker(point);
                map.addOverlay(marker);
            }
            var view = map.getViewport(data.points);
            var mapZoom = view.zoom;
            var centerPoint = view.center;
            map.centerAndZoom(centerPoint,mapZoom);
          }
        }
      }
    }
    function startRun(){
      var x=pointList[0].longitude;
      var y=pointList[0].latitude;
      completeEventHandler(x,y);
    }
    // 全屏
    $('.video_link').on('click',()=>{
      this.router.navigate(['video']);
    }
    )
    $('.seracch').on('click',function () {
      var address = $("#address").val();
      getBoundary(address)
      // searchControl.initMarker(108.924295,34.235939);

    })
    $('#BMapLib_sc_b0').on('click',function () {
      var address = $("#BMapLib_PoiSearch").val();
      getBoundary(address)
      // searchControl.initMarker(108.924295,34.235939);

    })
    $('.quanping').on('click',function () {
      $(this).hide()
      $('.back').show();
      var showMap = document.getElementById("container");
      $('#page-wrapper').removeClass('marg220').addClass('fullscreen');

      showMap.style.width = screen.width + "px";
      showMap.style.height = screen.height + "px";
      requestFullScreen(document.documentElement);
    })
    $('.back').on('click',function () {
      $(this).hide()
      $('.quanping').show();
      var showMap = document.getElementById("container");
      $('#page-wrapper').addClass('marg220').removeClass('fullscreen');
      showMap.style.width = X;
      showMap.style.height = Y;
      exitFull();
    })
    // 编写自定义函数,创建标注
    function addMarker(point){
      var marker = new BMap.Marker(point,{icon:myIcon2});
      map.addOverlay(marker);
    }

    //区域标出
    function getBoundary(ak){
      var bdary = new BMap.Boundary();
      bdary.get(ak, function(rs){       //获取行政区域
        // map.clearOverlays();        //清除地图覆盖物
        var count = rs.boundaries.length; //行政区域的点有多少个 ACABF4  E4F6F8
        if (count === 0) {
          alert('未能获取当前输入行政区域');
          return ;
        }
        var pointArray = [];
        for (var i = 0; i < count; i++) {
          var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000",fillColor:"#F7AD9E",fillOpacity:"0.3"}); //建立多边形覆盖物
          map.addOverlay(ply);  //添加覆盖物
          pointArray = pointArray.concat(ply.getPath());
        }
        map.setViewport(pointArray);    //调整视野
      });
    }
    //全屏
    function requestFullScreen(element) {
      // 判断各种浏览器，找到正确的方法
      var requestMethod = element.requestFullScreen || //W3C
        element.webkitRequestFullScreen ||  //Chrome等
        element.mozRequestFullScreen || //FireFox
        element.msRequestFullScreen; //IE11
      if (requestMethod) {
        requestMethod.call(element);
      }
      else if (element.msRequestFullscreen) {

        element.msRequestFullscreen();

      }

      // else if (typeof $(window).ActiveXObject !== "undefined") {//for Internet Explorer
      //   var wscript = $(window).   ("WScript.Shell");
      //   if (wscript !== null) {
      //     wscript.SendKeys("{F11}");
      //   }
      // }
    }
    //退出全屏
    function exitFull() {
      // 判断各种浏览器，找到正确的方法
      var exitMethod = document.exitFullscreen || //W3C
        // document.mozCancelFullScreen ||  //Chrome等
        document.webkitExitFullscreen || //FireFox
        document.webkitExitFullscreen; //IE11
      if (exitMethod) {
        exitMethod.call(document);
      }
      // else if (typeof $(window).ActiveXObject !== "undefined") {//for Internet Explorer
      //   var wscript = $(window).ActiveXObject("WScript.Shell");
      //   if (wscript !== null) {
      //     wscript.SendKeys("{F11}");
      //   }
      // }
    }







    // function getData(data) {
    //   var bounds = data.boundaries;
    //
    //   var subList = data.districtList;
    //   var level = data.level;
    //
    //   //清空下一级别的下拉列表
    //   if (level === 'province') {
    //     nextLevel = 'city';
    //     citySelect.innerHTML = '';
    //     districtSelect.innerHTML = '';
    //     areaSelect.innerHTML = '';
    //   } else if (level === 'city') {
    //     nextLevel = 'district';
    //     districtSelect.innerHTML = '';
    //     areaSelect.innerHTML = '';
    //   } else if (level === 'district') {
    //     nextLevel = 'street';
    //     areaSelect.innerHTML = '';
    //   }
    //   if (subList) {
    //     var contentSub =new Option('--请选择--');
    //     for (var i = 0, l = subList.length; i < l; i++) {
    //       var name = subList[i].name;
    //       var levelSub = subList[i].level;
    //       var cityCode = subList[i].citycode;
    //       if(i==0){
    //         document.querySelector('#' + levelSub).add(contentSub);
    //       }
    //       contentSub=new Option(name);
    //       contentSub.setAttribute("value", levelSub);
    //       contentSub.center = subList[i].center;
    //       contentSub.adcode = subList[i].adcode;
    //       document.querySelector('#' + levelSub).add(contentSub);
    //     }
    //   }
    //
    // }






    // var cpoint = [108.924295,34.235939];
    // var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
    //   pageSize: 5,
    //   pageIndex: 1,
    //   city: "029", //城市
    //   map: map,
    //   // panel: "result"
    // });
    // placeSearch.setType('医院');
    // placeSearch.setCity('029');
    // var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});//信息窗口
    //  var markers = [];//定义标注数组
// 周边搜索

    // var marker = new AMap.Marker({
    //   // content:"<span style='background: #fff';border:1px solid #000;>我</span>",
    //   icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
    //   offset: new AMap.Pixel(0,0),
    //   position:cpoint
    // });
    // marker.setMap(map);
    // marker.setAnimation('AMAP_ANIMATION_BOUNCE');
    // marker.setIcon('http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png')
    // placeSearch.searchNearBy("", cpoint, 1000, function(status, result) {
      // if (status === 'complete' && result.info === 'OK') {
      //   var poiArr = result.poiList.pois;
      //     for(var i=0;i<poiArr.length;i++){
      //       //在地图上创建标注点
      //       var marker = new AMap.Marker({
      //         icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png"
      //       });
      //       marker.setPosition(new AMap.LngLat(poiArr[i].location.lng,poiArr[i].location.lat));
      //       marker.setMap(map);
      //       marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
      //         offset: new AMap.Pixel(3, 0),//修改label相对于maker的位置
      //         content: String.fromCharCode(65+i)
      //       });
      //       marker.content = poiArr[i].name+"<br/>"+poiArr[i].address;
      //       marker.on('click', function (e) {
      //         infoWindow.setContent(e.target.content);
      //         infoWindow.open(map, e.target.getPosition());
      //       });
      //       markers.push(marker);
      //
      //     }
      //
      //
      //   //TODO : 解析返回结果,如果设置了map和panel，api将帮助完成点标注和列表
      //   $("#s-point").text(poiArr[0].location.lng+","+poiArr[0].location.lat);
      //     //设置地图显示级别及中心点
      //     map.setZoomAndCenter(14,new AMap.LngLat(poiArr[0].location.lng,poiArr[0].location.lat));
      //     //获取查询城市信息
      //     map.getCity(function(res){
      //       $("#s-city").text(res.province+res.city);
      //     });
      // }
    // });
// 周边搜索end



//高德地图map实现
// geolocation.getCurrentPosition(function(status,result){
    //   if (status === 'complete') {
    //     console.log(JSON.stringify(result))
    //      alert('您的位置：'+result.position.lng+','+result.position.lat);
    //     var cpoint = [result.position.lng,result.position.lat];
    //
    //     var marker = new AMap.Marker({
    //       position:[result.position.lng,result.position.lat], //marker所在的位置
    //       map:map//创建时直接赋予map属性
    //     });
    //     marker.setMap(map);
    //     var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
    //       pageSize: 5,
    //       pageIndex: 1,
    //       city: "029", //城市
    //       map: map
    //     });
    //     placeSearch.setType('医院');
    //     var markers = [];//定义标注数组
    //    // 周边搜索
    //
    //     var marker = new AMap.Marker({
    //       // content:"<span style='background: #fff';border:1px solid #000;>我</span>",
    //       icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
    //       offset: new AMap.Pixel(0,0),
    //       position:cpoint
    //     });
    //     marker.setMap(map);
    //     placeSearch.searchNearBy("", cpoint, 1000, function(status, result) {
    //     });
    //
    //
    //
    //     var circle = new AMap.Circle({
    //       center: [result.position.lng,result.position.lat],
    //       redius: 100,
    //       fillOpacity:0.1,
    //       fillColor:'#09f',
    //       strokeColor:'#09f',
    //       strokeWeight:1
    //     })
    //     circle.setMap(map);
    //
    //   }
    // });

    // map.setCenter([108.924295,34.235939]);
    // var marker = new AMap.Marker({});
    // marker.setMap(map);
    // var clickEventListener = map.on('click', function(e) {
    //   document.getElementById("s-point").innerHTML = e.lnglat.getLng() + ',' + e.lnglat.getLat();
    //   var marker = new AMap.Marker({
    //     icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
    //     position:[e.lnglat.getLng(),e.lnglat.getLat()]
    //   });
    //   marker.setMap(map);
    // });
    // var clickEventListener = map.on('mouseover', function(e) {
    //   marker.setIconStyle(hoverIconStyle);
    //
    // });
//关键字搜索
//     $('.seracch').on('click',function () {
//       map.remove(markers);//查询前先移除所有标注
//       var address = $("#address").val();
//       placeSearch.search(address, function(status, result) {
//         if (status === 'complete' && result.info === 'OK') {
// //               alert(JSON.stringify(result));
//           var poiArr = result.poiList.pois;
//           for(var i=0;i<poiArr.length;i++){
//             //在地图上创建标注点
//              marker = new AMap.Marker({
//               icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png"
//             });
//             marker.setPosition(new AMap.LngLat(poiArr[i].location.lng,poiArr[i].location.lat));
//             marker.setMap(map);
//             marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
//               offset: new AMap.Pixel(3, 0),//修改label相对于maker的位置
//               content: String.fromCharCode(65+i)
//             });
//             marker.content = poiArr[i].name+"<br/>"+poiArr[i].address;
//             marker.on('click', function (e) {
//               infoWindow.setContent(e.target.content);
//               infoWindow.open(map, e.target.getPosition());
//             });
// //                    marker.emit('click', {target:marker});
//             markers.push(marker);
//
//           }
//           $("#s-point").text(poiArr[0].location.lng+","+poiArr[0].location.lat);
//           //设置地图显示级别及中心点
//           map.setZoomAndCenter(14,new AMap.LngLat(poiArr[0].location.lng,poiArr[0].location.lat));
//           //获取查询城市信息
//           map.getCity(function(res){
//             $("#s-city").text(res.province+res.city);
//           });
//
//         }
//       });
//     })
//关键字搜索end



  }


}


