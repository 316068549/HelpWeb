import { Component, OnInit, DoCheck } from '@angular/core';
declare var BMap: any;
declare var $:any;
declare var BMapLib:any;

@Component({
  selector: 'app-gaode-map',
  templateUrl: './gaode-map.component.html',
  styleUrls: ['./gaode-map.component.css']
})
export class GaodeMapComponent implements OnInit {

  constructor() { }

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

//创建检索控件
    var searchControl = new BMapLib.SearchControl({
      container : "searchBox" //存放控件的容器
      , map     : map  //关联地图对象
      , type    : type  //检索类型
    });
    var point = new BMap.Point(108.924295,34.235939); // 创建点坐标
    var myIcon = new BMap.Icon("assets/img/006f (3).gif", new BMap.Size(300,157));
    var marker = new BMap.Marker(point,{icon:myIcon});
    // marker.setIcon('http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png');
    map.addOverlay(marker);
    // var label = new BMap.Label("转换后的百度坐标（正确）",{offset:new BMap.Size(20,-10)});
    // marker.setLabel(label); //添加百度label
    map.enableScrollWheelZoom();                 //启用滚轮放大缩小
    // map.enableInertialDragging();
    map.centerAndZoom(point,15);

     //sousuo
    var circle = new BMap.Circle(point,1000,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.2});
    map.addOverlay(circle);
    var local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false,panel: "results"}});
    local.searchNearby('医院',point,1000);


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
    //区域标出
    function getBoundary(ak){
      var bdary = new BMap.Boundary();
      bdary.get(ak, function(rs){       //获取行政区域
        map.clearOverlays();        //清除地图覆盖物
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


