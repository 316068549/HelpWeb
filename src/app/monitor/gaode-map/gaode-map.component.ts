import { Component, OnInit, DoCheck } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
declare var BMap: any;
declare var $:any;
declare var BMapLib:any;
declare var videojs:any;
declare var layer:any;

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
  var tokenId = localStorage.getItem("tokenId");
    var defaultIconStyle = 'red', //默认的图标样式
      hoverIconStyle = 'green', //鼠标hover时的样式
      selectedIconStyle = 'purple'; //选中时的图标样式
    var volunteerList;
    var deviceList;
    var changeXyList=[];
    var taskList ;
    var rescueAddress = localStorage.getItem('address');
    var statuses =[];//是否报警
    var warningList=[];//报警列表
    var obj={
      deviceIMEI:'',
      statuses:'',
      warning:false
    }
    var  markers,infoWindows = [];
    var map = new BMap.Map("container");            // 创建Map实例
    //获取下拉数据
    var X = $('#container').width();
    var Y = $('#container').height();
    var point = new BMap.Point(108.924295,34.235939); // 创建点坐标
    var myIcon = new BMap.Icon("assets/img/baojing.gif", new BMap.Size(30,30));
    var myIcon2 = new BMap.Icon("assets/img/mark_b.png", new BMap.Size(30,30));
    var myIcon3 = new BMap.Icon("assets/img/rescue.png", new BMap.Size(45,45));
    map.enableScrollWheelZoom();  //启用滚轮放大缩小
    // map.enableInertialDragging();
    map.centerAndZoom(point,15);
    map.addControl(new BMap.NavigationControl());
    getBoundary(rescueAddress);
    init();
    startRun();
    // var awp = setTimeout(xunhuan,5000);
    var interval = setInterval(xunhuan,18000)
    //打开气泡延迟20秒刷新
    function aa() {
      clearInterval(interval);
      setTimeout(cc,8000);
    }
    function xunhuan(){
      map.clearOverlays();
      changePlace();
      startRun();
    }
    function cc() {
      interval = setInterval(xunhuan,18000)
    }
    // 地图初始化位置
    function init(){
      var resul;
      $.ajax({
        type: "get",
        cache: false,
        async: false, //同步请求外面才能获取到*
        url: "indata?tokenId="+tokenId,
        success: function(data){
          console.log('success')
           // resul=data.data;
          resul = {
            "status":0,
            "msg":null,
            "time":0,
            "objectbean":null,
            "code":0,
            "error":null,
            "data":{
              "deviceList":[
                {
                  "address":"西安莲湖区",
                  "locationTime":"2017-08-05 12:01:37",
                  "image_url":"liuwei.jpg",
                  "mobile":"15662355564",
                  "locationLatitude":34.2307,
                  "locationType":1,
                  "NAME":"刘位",
                  "deviceStatus":"00000000000000000000000000010000",
                  "is_alarm":1,
                  "deviceIMEI":"123456",
                  "locationLongitude":108.813,
                  "alarmId":"deadf2f3-32c0-4a51-9721-3efa3e6b26a7",
                  "onlineTime":1501745760000,
                  "deviceMobile":"15002933699"
                }
              ],
              "volunteerList":[
                {
                  "volunteer_id":"1",
                  "address":null,
                  "locationTime":1501914408000,
                  "image_url":"http://localhost:8080/api/file/downloadFile",
                  "sex":0,
                  "latitude":"34.323985",
                  "mobile":"15002933643",
                  "rescue_team_id":1,
                  "NAME":"lxx",
                  "longitude":"109.049169"
                },
                {
                  "volunteer_id":"111",
                  "address":null,
                  "locationTime":1501914594000,
                  "image_url":"xw.jpg",
                  "sex":0,
                  "latitude":"34.324172",
                  "mobile":"13072925248",
                  "rescue_team_id":1,
                  "NAME":"xw",
                  "longitude":"109.049137"
                }
              ]
              // ,
              // "taskList":[
              //   {
              //     "volunteer_id":"1",
              //     "receiveTime":1501911522000,
              //     "createTime":1501911522000,
              //     "alarmId":"deadf2f3-32c0-4a51-9721-3efa3e6b26a7",
              //     "task_id":"ba3ce39d-5169-4dfc-b1ee-9414ec8fd8ac",
              //     "status":1
              //   }
              // ]
            }
          }

        }
      });
      // volunteerList=resul.volunteerList;
      // deviceList=resul.deviceList;
      // taskList=resul.taskList;
      volunteerList=resul.data.volunteerList;
      deviceList=resul.data.deviceList;
      taskList=resul.data.taskList;
      if(deviceList.length>0){
        $.each(deviceList,function (i,n) {
          if(n['is_alarm']==1){
            $('.panel').show();
            var html = "<li><a href='javascript:;' class="+n.deviceIMEI+">"+n.NAME+"</a></li>"
            $('.panel ul').append(html)
            warningList.push(n.deviceIMEI);
          }
        })
      }
      //任务状态表格
      if(taskList){
        if(taskList.length>0){
          $.each(taskList,function (i,n) {
            $.each(deviceList,function (a,obj) {
              if(obj.alarmId==n.alarmId){
                obj.isCreat = true;
              }
              // if(n.status==3){
              //   $.each(deviceList,function (a,obj) {
              //     if(obj.alarmId==n.alarmId){
              //       obj.isCreat = false;
              //     }
              //   })
              // }
            })
          })
          $.each(taskList,function (i,n) {
            $('.panel').show();
            var html = "<li><a href='javascript:;' id="+n.task_id+" class=";
            // var html2 = "<span style='margin-left: 15px'>任务状态（等待接单，报警地址："+item.address+")</span>"
            // var html2 = "<span style='margin-left: 15px'>任务状态（救援中，接单人："+obj.NAME+"，电话："+obj.mobile+")</span>"
            // var html3 = "<span style='margin-left: 15px'>任务状态（已结束，接单人："+obj.NAME+"，电话："+obj.mobile+")</span>"
            if(n.status==1){
              $.each(deviceList,function (a,obj) {
                if(obj.alarmId==n.alarmId){
                  html+=obj.deviceIMEI+">"+obj.NAME+"<span style='margin-left: 15px'>任务状态（等待接单，报警地址："+obj.address+")</span></a></li>"
                }
              })
            }else if(n.status==2){
              $.each(deviceList,function (a,obj) {
                if(obj.alarmId==n.alarmId){
                  html+=obj.deviceIMEI+">"+obj.NAME+"<span style='margin-left: 15px'>任务状态（救援中，接单人："
                }
              })
              $.each(volunteerList,function (c,vol) {
                if(vol['volunteer_id']==n['volunteer_id']){
                  html+=vol.NAME+"，电话："+vol.mobile+")</span></a></li>"
                }
              })
            }else {
              $.each(deviceList,function (a,obj) {
                if(obj.alarmId==n.alarmId){
                  html+=obj.deviceIMEI+">"+obj.NAME+"<span style='margin-left: 15px'>任务状态（已结束，接单人："
                }
              })
              $.each(volunteerList,function (c,vol) {
                if(vol['volunteer_id']==n['volunteer_id']){
                  html+=vol.NAME+"，电话："+vol.mobile+")</span></a></li>"
                }
              })
            }
            $('.panel ul').append(html)
          })
        }
      }


      //清空数据表
      $.ajax({
        type: "post",
        url: 'wwe/lbs/delete',
        cache: false,
        success: function(data){
          console.log('success')
          //存入百度LBS(不支持批量，只能循环存)
          $.each(volunteerList,function (i,obj) {
            $.ajax({
              type: "post",
              url: 'wwe/lbs/create',
              //    url: " api/query/messageAll",
              // contentType:"application/json",
              // dataType: "json",
              data:'&ak=nsOyvRLrIMthoLm9M4OUK0nv8aNObxTv&geotable_id=172905&coordType=1&lng='+obj.longitude+'&lat='+obj.latitude+'&tags='+obj.mobile,
              cache: false,
              success: function(data){
                console.log('success')
                // result=data.data.list;
              }
            });
          })
        }
      });
    }
    // 地图刷新位置
    function changePlace(){
      changeXyList=[];
      var result;
      $.ajax({
        type: "get",
        cache: false,
        async: false, //同步请求外面才能获取到*
        url: "indata?tokenId="+tokenId,
        success: function(data){
          console.log('success')
          // result=data.data;
          result = {
            "status":0,
            "msg":null,
            "time":0,
            "objectbean":null,
            "code":0,
            "error":null,
            "data":{
              "deviceList":[
                {
                  "address":"西安莲湖区",
                  "locationTime":"2017-08-05 12:01:37",
                  "image_url":"liuwei.jpg",
                  "mobile":"15662355564",
                  "locationLatitude":34.2307,
                  "locationType":1,
                  "NAME":"刘位",
                  "deviceStatus":"00000000000000000000000000010000",
                  "is_alarm":0,
                  "deviceIMEI":"123456",
                  "locationLongitude":108.813,
                  "alarmId":"deadf2f3-32c0-4a51-9721-3efa3e6b26a7",
                  "onlineTime":1501745760000,
                  "deviceMobile":"15002933699"
                }
              ],
              "volunteerList":[
                {
                  "volunteer_id":"1",
                  "address":null,
                  "locationTime":1501914408000,
                  "image_url":"http://localhost:8080/api/file/downloadFile",
                  "sex":0,
                  "latitude":"34.323985",
                  "mobile":"15002933643",
                  "rescue_team_id":1,
                  "NAME":"lxx",
                  "longitude":"109.049169"
                },
                {
                  "volunteer_id":"111",
                  "address":null,
                  "locationTime":1501914594000,
                  "image_url":"xw.jpg",
                  "sex":0,
                  "latitude":"34.324172",
                  "mobile":"13072925248",
                  "rescue_team_id":1,
                  "NAME":"xw",
                  "longitude":"109.049137"
                }
              ],
              "taskList":[
                {
                  "volunteer_id":"1",
                  "receiveTime":1501911522000,
                  "createTime":1501911522000,
                  "alarmId":"deadf2f3-32c0-4a51-9721-3efa3e6b26a7",
                  "task_id":"ba3ce39d-5169-4dfc-b1ee-9414ec8fd8ac",
                  "status":1
                }
              ]
            }
          }
        }
      });
      // volunteerList=result.volunteerList;
      // deviceList=result.deviceList;
      // taskList=result.taskList;
      volunteerList=result.data.volunteerList;
      deviceList=result.data.deviceList;
      taskList=result.data.taskList;
      console.log(taskList);
      if(taskList) {
        if (taskList.length > 0) {
          $.each(taskList, function (i, n) {
            $.each(deviceList, function (a, obj) {
              if (obj.alarmId == n.alarmId) {
                if (n.status == 1 || n.status == 2) {
                  obj.isCreat = true;
                } else {
                  obj.isCreat = false;
                }
              }
            })
          })
          $.each(taskList, function (s, sss) {
            var html = "<span style='margin-left: 15px'>任务状态（";
            if (sss.status == 1) {
              $.each(deviceList, function (aa, oobj) {
                if (oobj.alarmId == sss.alarmId) {
                  html += "等待接单，报警地址：" + oobj.address + ")</span>"
                }
              })
            } else if (sss.status == 2) {
              $.each(deviceList, function (aa, oobj) {
                if (oobj.alarmId == sss.alarmId) {
                  html += "救援中，接单人："
                }
              })
              $.each(volunteerList, function (c, vol) {
                if (vol['volunteer_id'] == sss['volunteer_id']) {
                  html += vol.NAME + "，电话：" + vol.mobile + ")</span>"
                }
              })
            } else {
              $.each(deviceList, function (aa, oobj) {
                if (oobj.alarmId == sss.alarmId) {
                  html += "已结束，接单人："
                }
              })
              $.each(volunteerList, function (c, vol) {
                if (vol['volunteer_id'] == sss['volunteer_id']) {
                  html += vol.NAME + "，电话：" + vol.mobile + ")</span>"
                }
              })
            }
            $('#' + sss['task_id'] + ' span').remove();
            $('#' + sss['task_id']).append(html);
          })
        }
      }
      console.log(volunteerList)
      console.log(deviceList)
      //清空数据表
      $.ajax({
        type: "post",
        url: 'wwe/lbs/delete',
        cache: false,
        success: function(data){
          console.log('success')
          //存入百度LBS(不支持批量，只能循环存)
          $.each(volunteerList,function (i,obj) {
            $.ajax({
              type: "post",
              url: 'wwe/lbs/create',
              //    url: " api/query/messageAll",
              // contentType:"application/json",
              // dataType: "json",
              data:'&ak=nsOyvRLrIMthoLm9M4OUK0nv8aNObxTv&geotable_id=172905&coordType=1&lng='+obj.longitude+'&lat='+obj.latitude+'&tags='+obj.mobile,
              cache: false,
              success: function(data){
                console.log('success')
                // result=data.data.list;
              }
            });
          })
        }
      });

    }
    //地图坐标转换，添加marker
    function completeEventHandler(){
      var lngX ;
      var latY ;
      markers = [];
      statuses=[];
      var devicess = volunteerList.length;
      var volunters = deviceList.length;
      console.log(deviceList)
      $('#result .devicess').text(devicess);
      $('#result .volunters').text(volunters);
      var changgeUrl = "http://api.map.baidu.com/geoconv/v1/?coords=";
      var changgeUrl2 = "http://api.map.baidu.com/geoconv/v1/?coords=";
      for(var i = 0,marker,poiny;i<devicess;i++){
        lngX = volunteerList[i].longitude;
        latY = volunteerList[i].latitude;
        if(i<(devicess-1)){
          changgeUrl+= lngX+","+latY+";"
        }
        if (i==(devicess-1)){
          changgeUrl+= lngX+","+latY
        }
        // lineArr.push(new BMap.Point(lngX,latY));
        // if(i==(devicess-1)){
        //   console.log(lineArr)
        //   var convertor = new BMap.Convertor();
        //   convertor.translate(lineArr, 1, 5, translateCallback1)
        // }
      }
      console.log(changgeUrl);
      $.ajax({
        type: "get",
        url: changgeUrl+"&from=1&to=5&ak=nsOyvRLrIMthoLm9M4OUK0nv8aNObxTv",
        dataType: 'jsonp',
        success: function(data){
          if(data.status === 0) {
            console.log(data.result)
            for(var a = 0,marker;a<data.result.length;a++){
              if(data.result.length == 0){
                return;
              }
              var myIcon = new BMap.Icon("markers.png");
              var point = new BMap.Point(data.result[a].x, data.result[a].y);
              var marker = new BMap.Marker(point,{title:'志愿者'});
              var content = '<div class="personIcon">' +
                '<img src="'+volunteerList[a]['image_url']+'" id="imgDemo" alt="暂无头像" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
                '<p style="margin: 15px 0 15px 0">志愿者:' +volunteerList[a].NAME+'</p>'+
                '<div  class="rescuesta">定位时间：'+volunteerList[a].locationTime+'</div>'
              '</div>';
              // var content = '<div style="margin:0;line-height:20px;padding:2px;height: auto;">志愿者:' +volunteerList[a].NAME+
              //   '<br/>定位时间：'+volunteerList[a].locationTime;
              // var iw = createInfoWindow(a);
              map.addOverlay(marker);
              addClickHandler(content,marker);
              // (function () {
              //   var index = a;
              //   var _iw = createInfoWindow(a);
              //   var _marker = marker;
              //   _marker.addEventListener("click", function () {
              //     this.openInfoWindow(_iw);
              //
              //   });
              // })()
            }
          }
        }
      });
      for(var b = 0,marker;b<volunters;b++){
        lngX = deviceList[b].locationLongitude;
        latY = deviceList[b].locationLatitude;
        if(b<(volunters-1)){
          changgeUrl2+= lngX+","+latY+";"
        }
        if (b==(volunters-1)){
          changgeUrl2+= lngX+","+latY
        }
        changeXyList.push(deviceList[b]);
        statuses.push(deviceList[b].is_alarm);
      }
      console.log(changgeUrl2);
      console.log(changeXyList);
      $.ajax({
        type: "get",
        url: changgeUrl2+"&from=1&to=5&ak=nsOyvRLrIMthoLm9M4OUK0nv8aNObxTv",
        dataType: 'jsonp',
        success: function(data){
          if(data.status === 0) {
            console.log(data.result)
            console.log(statuses)
            var points=[];
            for(var c = 0,marker;c<data.result.length;c++){
              if(data.result.length == 0){
                return;
              }
              var myIcon = new BMap.Icon("markers.png");
              var point = new BMap.Point(data.result[c].x, data.result[c].y);
              points.push(point)
              console.log(deviceList[c].deviceIMEI)
               if(changeXyList[c].isCreat){
                 addMarker(point,statuses[c],changeXyList[c].isCreat,changeXyList[c].deviceIMEI,changeXyList[c].NAME,changeXyList[c].alarmId);
               }else {
                 addMarker(point,statuses[c],changeXyList[c].isCreat,changeXyList[c].deviceIMEI,changeXyList[c].NAME,changeXyList[c].alarmId);
               }
            }
            var view = map.getViewport(points);
            var mapZoom = view.zoom;
            var centerPoint = view.center;
            map.centerAndZoom(centerPoint,mapZoom);
          }
        }
      });
    }
    function startRun(){
      // if(volunteerList.length>1){
      //   var x=volunteerList[0].locationLongitude;
      //   var y=volunteerList[0].locationLatitude;
      // }
      completeEventHandler();
    }
    function addClickHandler(content,marker){
      marker.addEventListener("click",function(e){
        aa();
        openInfo(content,e)}
      );
    }
    function openInfo(content,e){
      var p = e.target;
      var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
      var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
      map.openInfoWindow(infoWindow,point); //开启信息窗口
    }

    // 全屏
    $('.video_link').on('click',()=>{
      alert(2)
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
      exitFull(document);
    })

    // 编写自定义函数,创建标注
    function addMarker(point,status,jiedan,deviceIMEI,name,alarmId){
      console.log(jiedan)
      console.log(status)
      console.log(deviceIMEI)
      var infoWindow;
      var marker;
      if(jiedan&&status==0){
      // if(jiedan){
        $('.panel').show();
        var imgUrl;
        $.each(deviceList,function (i,obj) {
          if(obj.deviceIMEI == deviceIMEI){
            imgUrl = obj['image_url'];
          }
        })
        var content = '<div class="personIcon">' +
          '<img src="'+imgUrl+'" id="imgDemo" alt="暂无头像" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
          '<p style="margin: 15px 0 15px 0">需要救援人:' +name+'</p>'+
          // '<div  class="rescuesta">救援状态：<span></span></div>'+
          '</div>';
        //创建检索信息窗口对象
        var searchInfoWindow = null;
        infoWindow = new BMap.InfoWindow(content);
        marker = new BMap.Marker(point,{icon:myIcon3,title:deviceIMEI});
        map.addOverlay(marker,{title:deviceIMEI});
        markers.push(marker);
        // 查询接单壮态,如果接单传志愿者电话给后台  志愿者status 1 创建任务无人接单 2 救援中 3 结束
        // $.each(taskList,function (index,obj) {
        //     if(obj.status==2){
        //       var html2 = "<span style='margin-left: 15px'>任务状态（救援中，接单人："+obj.NAME+"，电话："+obj.mobile+")</span>"
        //       $('#'+obj['task_id']+' span').remove();
        //       $('#'+obj['task_id']).append(html2);
        //       var content2 = '<div class="personIcon">' +
        //         // '<img src="assets/img/profile_small.jpg" id="imgDemo" alt="" style="float:right;zoom:1;overflow:hidden;' +
        //         // 'width:100px;height:100px;margin-left:3px;"/>' +
        //         '需要救援人:' +name+
        //         '<br/><div class="rescuesta">救援状态：救援中<span></span></div>'
        //         // '地址：'+deviceIMEI
        //         +
        //         '</div>';
        //       var infoWindow = new BMap.InfoWindow(content2);
        //     }else if(obj.status==3){
        //       var html3 = "<span style='margin-left: 15px'>任务状态（已结束，接单人："+obj.NAME+"，电话："+obj.mobile+")</span>"
        //       $('#'+obj['task_id']+' span').remove();
        //       $('#'+obj['task_id']).append(html3);
        //       var content3 = '<div class="personIcon">' +
        //         // '<img src="assets/img/profile_small.jpg" id="imgDemo" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;' +
        //         // 'height:100px;margin-left:3px;"/>' +
        //         '需要救援人:' +name+
        //         '<br/><div class="rescuesta">救援状态：已结束<span></span></div>'
        //         // '地址：'+deviceIMEI
        //         +
        //         '</div>';
        //       var infoWindow = new BMap.InfoWindow(content3);
        //     }
        //
        // })
      }else if(status==1){
        $('.panel').show();
        // 在添加marker时附加一个id属性
        // 获取marker时
        // var markers = map.getOverlays();
        // for (var i = 0; i < markers.length; i++) {
        //   if (markers[i].toString() == "[object Marker]") {
        //     if (markers[i].id == 你附加的id属性值) {
        //       处理自己的业务
        //     }
        //   }
        // }
        var imgUrl;
        $.each(deviceList,function (i,obj) {
          if(obj.deviceIMEI == deviceIMEI){
            imgUrl = obj['image_url'];
          }
        })
        var content = '<div class="personIcon">' +
          '<img src="'+imgUrl+'" id="imgDemo" alt="暂无头像" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
          '<p style="margin: 15px 0 15px 0">需要救援人:' +name+'</p>'+
          '<div style="display: none" class="rescuesta">救援状态：<span></span></div>'
          // '地址：'+deviceIMEI
          +'<button class="btn btn-red" id="startRescue">启动救援</button><button class="btn btn-red ml10" id="cancelRescue">取消救援</button>'+
          '</div>';
        //创建检索信息窗口对象
        var searchInfoWindow = null;
        infoWindow = new BMap.InfoWindow(content);
        infoWindow.addEventListener("open", function(e){
          $('#cancelRescue').on("click", function(){
            var creatUrl = "web/task/create?alarmId="+alarmId+"&rescueType=3&deviceIMEI="+deviceIMEI;
            var result;
            $.ajax({
              type: "get",
              url: creatUrl,
              cache: false,
              async: false,
              success: function(data){
                if(data.status==1){
                  layer.open({
                    title: '提示'
                    ,content: '救援任务已取消'
                  });
                }else{
                  layer.open({
                    title: '提示'
                    ,content: '任务取消失败'
                  });
                }
              }
            });

        })
          $('#startRescue').on("click", function(){
            var creatUrl = "web/task/create?alarmId="+alarmId+"&rescueType=1&deviceIMEI="+deviceIMEI;
            // var creatUrl = "web/task/create?alarmId=17248b69-e61e-4458-94cd-064c063bd235&rescueType=2&deviceIMEI="+deviceIMEI;
            var result;
            $.ajax({
              type: "get",
              url: creatUrl,
              cache: false,
              async: false,
              success: function(data){
                layer.open({
                  title: '提示'
                  ,content: data.msg
                });
                result = data.data;
              }
            });
            var taskId = result.taskId;
            //{"status":1,"msg":"创建任务单成功,成功返回任务单号",
            // "time":0,"objectbean":null,"code":0,"error":null,"data":{"taskId":"862ae897-f7d7-404f-bbd1-b1dfd086e883"}}
            if(taskId){
              var html2 = "<span>(已经传建任务，等待接单)</span>"
              $('.'+deviceIMEI).append(html2);
              $('.'+deviceIMEI).attr('id',taskId);
            }
            //推送app上报位置接口，代理前是web/query/voLocation
            $.ajax({
              type: "get",
              url: "send/query/voLocation",
              cache: false,
              async: false,
              success: function(data){
                console.log(data.data)
              }
            });
            var mPoint = infoWindow.getPosition();
            //圆形区域搜索
            var circle = new BMap.Circle(mPoint, 10000, {
              fillColor: "blue",
              strokeWeight: 1,
              fillOpacity: 0.3,
              strokeOpacity: 0.3
            });
            map.addOverlay(circle);
            //检索附近志愿者
            var parment2={
              'ak':'nsOyvRLrIMthoLm9M4OUK0nv8aNObxTv',
              'geotable_id':172905,
              'coord_type':3,
              'location':''+mPoint.lng+','+mPoint.lat+'',
              'radius':100000
            };
            $.ajax({
              type: "get",
              url: 'http://api.map.baidu.com/geosearch/v3/nearby?callback=?',
              contentType: 'application/json',
              data:parment2,
              dataType: 'json',
              async: false,
              cache: false,
              success: function(data){
                console.log(data.contents.length)
                var arrObj=[];
                if(data.contents.length>0){
                  var person = '发现'+data.contents.length+'位志愿者，推送任务中...';
                  $.each(data.contents,function (index,obj) {
                    arrObj.push(obj.tags)
                  })
                  layer.msg(person,{
                    time: 2000, //20s后自动关闭
                  });
                   var item = sendTask(result.taskId,arrObj);
                   if(item.itemId){
                     // var html2 = item.surname+'，报警地址：'+item.address
                     var html2 = "<span style='margin-left: 15px'>任务状态（等待接单，报警地址："+item.address+")</span>"
                     $('.'+deviceIMEI+' span').remove();
                     $('.'+deviceIMEI).append(html2)
                   }
                  map.removeOverlay(circle);
                }else{
                  map.removeOverlay(circle);
                  var html = '附近无志愿者请值班人员指定<select id="volunter">'
                  html+= ' <option value="-1">请选择</option>';
                  $.each(volunteerList, function(index, obj){
                        html+= '<option value="'+obj['volunteer_id']+'">'+obj.NAME+'</option>';
                  });
                  html+= ' </select>去救援';
                  var ak = layer.open({
                    title: '提示',
                    content: html,
                    yes: () => {
                      console.log($('#volunter option:selected').val())
                      var goUrl = 'web/task/receive?userId='+$('#volunter').val()+'&itemId='+result.taskId
                        $.ajax({
                          type: "get",
                          url: goUrl,
                          cache: false,
                          async: false,
                          success: function(data){
                            if(data.status==1){
                              layer.open({
                                title: '提示'
                                ,content: '指定成功'
                              });
                            }else{
                              layer.open({
                                title: '提示'
                                ,content: '强制接单失败'
                              });
                            }
                          }
                        });
                      layer.close(ak);
                      }
                  })
                }
              }
            });

          });
        })
        marker = new BMap.Marker(point,{icon:myIcon,title:deviceIMEI});
        map.addOverlay(marker,{title:deviceIMEI});
        markers.push(marker);
        if($.inArray(deviceIMEI, warningList)==-1){
          var html = "<li><a href='javascript:;' class="+deviceIMEI+">"+name+"</a></li><li><a href='javascript:;'  id='2'>刘大兵</a></li>"
          $('.panel ul').prepend(html)
          warningList.push(deviceIMEI);

        }
        // else {
        //   // 查询接单壮态,如果接单传志愿者电话给后台  志愿者status 1 创建任务无人接单 2 救援中 3 结束
        //   $.each(volunteerList,function (index,obj) {
        //     if(obj['is_receive']==1){
        //       if(obj.status==2){
        //         var html2 = "<span style='margin-left: 15px'>任务状态（救援中，接单人："+obj.NAME+"，电话："+obj.mobile+")</span>"
        //         $('#'+obj['task_id']+' span').remove();
        //         $('#'+obj['task_id']).append(html2);
        //         var content2 = '<div class="personIcon">' +
        //           // '<img src="assets/img/profile_small.jpg" id="imgDemo" alt="" style="float:right;zoom:1;overflow:hidden;' +
        //           // 'width:100px;height:100px;margin-left:3px;"/>' +
        //           '需要救援人:' +name+
        //           '<br/><div class="rescuesta">救援状态：救援中<span></span></div>'
        //           // '地址：'+deviceIMEI
        //           +
        //           '</div>';
        //         var infoWindow = new BMap.InfoWindow(content2);
        //       }else if(obj.status==3){
        //         var html3 = "<span style='margin-left: 15px'>任务状态（已结束，接单人："+obj.NAME+"，电话："+obj.mobile+")</span>"
        //         $('#'+obj['task_id']+' span').remove();
        //         $('#'+obj['task_id']).append(html3);
        //         var content3 = '<div class="personIcon">' +
        //           // '<img src="assets/img/profile_small.jpg" id="imgDemo" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;' +
        //           // 'height:100px;margin-left:3px;"/>' +
        //           '需要救援人:' +name+
        //           '<br/><div class="rescuesta">救援状态：已结束<span></span></div>'
        //           // '地址：'+deviceIMEI
        //           +
        //           '</div>';
        //         var infoWindow = new BMap.InfoWindow(content3);
        //       }
        //     }
        //   })
        // }

      }
      else {
        marker = new BMap.Marker(point,{icon:myIcon2,title:deviceIMEI});
        map.addOverlay(marker,{title:deviceIMEI});
        markers.push(marker);
        $.each(deviceList,function (i,obj) {
          if(obj.deviceIMEI == deviceIMEI){
            imgUrl = obj['image_url'];
          }
        })
        var content = '<div class="personIcon">' +
          '<img src="'+imgUrl+'" id="imgDemo" alt="暂无头像" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
          '<p style="margin: 15px 0 15px 0">设备使用者:' +name+'</p>'+
          // '<div  class="rescuesta">救援状态：<span></span></div>'+
          '</div>';
        //创建检索信息窗口对象
        var searchInfoWindow = null;
        infoWindow = new BMap.InfoWindow(content);
      }
      marker.addEventListener("click", function(e){
        this.openInfoWindow(infoWindow);
        aa();
        // var circle = new BMap.Circle(point,100,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.2});
        // map.addOverlay(circle);
        // var local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false,panel: "results"}});
        // local.searchNearby('志愿者',point,100);
        //图片加载完毕重绘infowindow
        document.getElementById('imgDemo').onload = function (){
          infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
        }
        // searchInfoWindow.open(marker);
      })
      //列表绑定
      $('.'+deviceIMEI).on('click',function () {
        $(this).addClass('active').siblings().removeClass('active');
        // var markers = map.getOverlays();
        // for (var i = 0; i < markers.length; i++) {
        //   if (markers[i].toString() == "[object Marker]") {
        //     if (markers[i].getTitle() == deviceIMEI) {
        //       alert(deviceIMEI)
        //     }
        //   }
        // }
        console.log(markers)
        for (var i = 0; i < markers.length; i++) {
          console.log(markers[i].getTitle())
          if (markers[i].getTitle() == deviceIMEI) {
            markers[i].openInfoWindow(infoWindow);
          }
        }
      })
    }
    //推送任务
    function  sendTask(id,arrObj){
      var result;
      var taskurl = "send/query/task?taskId="+id+"&alias=";
      $.each(arrObj,function (index,n) {
        if(index<(arrObj.length-1)){
          taskurl+=n+","
        }else{
          taskurl+=n
        }
      })
      $.ajax({
        type: "get",
        url: taskurl,
        cache: false,
        async: false,
        success: function(data){
          if(data.data){
            layer.msg('推送成功',{
              time: 2000, //20s后自动关闭
            });
            result = data.data;
          }
        }
      });
      return result;
      //无人接单
      // if(deviceList[0].task){
      //
      // }
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
    function exitFull(element) {
      //判断各种浏览器，找到正确的方法
      var exitMethod = element.exitFullscreen || //W3C
         element.mozCancelFullScreen ||  //Chrome等
        element.webkitExitFullscreen || //FireFox
        element.msExitFullscreen; //IE11
      if (exitMethod) {
        exitMethod.call(element);
      }
      // else if (typeof $(window).ActiveXObject !== "undefined") {//for Internet Explorer
      //   var wscript = $(window).ActiveXObject("WScript.Shell");
      //   if (wscript !== null) {
      //     wscript.SendKeys("{F11}");
      //   }
      // }
    }










    // var  translateCallback1 = function (data){
    //   if(data.status === 0) {
    //     console.log(data.points)
    //     // (function () {
    //     //   var index = a;
    //     //   var _iw = createInfoWindow(a);
    //     //   var _marker = marker;
    //     //   _marker.addEventListener("click", function () {
    //     //     this.openInfoWindow(_iw);
    //     //
    //     //   });
    //     // })()
    //   }
    // }
    // $('.container').on("click", "#startRescue", function(){
    //   alert(1)
    //   var mPoint = infoWindow.getPosition();
    //   //圆形区域搜索
    //   var circle = new BMap.Circle(mPoint,100,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.2});
    //   map.addOverlay(circle);
    //   var local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false,panel: "results"}});
    //   local.searchNearby('志愿者',mPoint,100);
    // });
    // volunteerList =
    //   [
    //     {
    //       "deviceIMEI": "1123",
    //       "locationTime": "2017-03-06 11:22:56",
    //       "locationPower": "97%",
    //       "longitude": 108.932575,
    //       "latitude": 34.230698,
    //       "locationType": "GPS"
    //     },
    //     {
    //       "deviceIMEI": "1123456",
    //       "locationTime": "2017-03-06 11:22:56",
    //       "locationPower": "97%",
    //       "longitude": 108.822575,
    //       "latitude": 34.230688,
    //       "locationType": "GPS"
    //     },
    //     {
    //       "deviceIMEI": "1123456789",
    //       "locationTime": "2017-03-06 11:22:56",
    //       "locationPower": "97%",
    //       "longitude": 108.812575,
    //       "latitude": 34.230688,
    //       "locationType": "GPS"
    //     }
    //     ]
    // deviceList= [
    //   {
    //     "is_alarm": 0,
    //     "address": "西安市雁塔区",
    //     "deviceIMEI": "4545131654512",
    //     "locationTime": "2017-08-01 14:23:46",
    //     "mobile": "18699999999",
    //     "locationLongitude": 108,
    //     "locationLatitude": 36,
    //     "onlineTime": 1501570011000,
    //     "locationType": 1,
    //     "deviceMobile": null,
    //     "NAME": "张三",
    //     "deviceStatus": null
    //   },
    //   {
    //     "is_alarm": 1,
    //     "address": "西安市莲湖区",
    //     "deviceIMEI": "4545131654513",
    //     "locationTime": "2017-08-31 14:25:35",
    //     "mobile": "18699999999",
    //     "locationLongitude": 108,
    //     "locationLatitude": 36,
    //     "onlineTime": 1501568591000,
    //     "locationType": 1,
    //     "deviceMobile": "",
    //     "NAME": "李四",
    //     "deviceStatus": ""
    //   }
    // ]










  }


}


