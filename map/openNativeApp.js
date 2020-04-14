

<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=auqpBhpnBSs0Xm9GLoB3NESWmtLvyj5e"></script>
var scheme = "";
$(function () {
  // var map = new BMap.Map("allmap");
  // map.centerAndZoom(new BMap.Point(106.32416,29.478063), 11); //经纬度
  // map.enableScrollWheelZoom(true);

  // map.clearOverlays();
  // var new_point = new BMap.Point(Number('@ViewBag.Longitude'), Number('@ViewBag.Latitude'));
  // var marker = new BMap.Marker(new_point);  // 创建标注
  // map.addOverlay(marker);              // 将标注添加到地图中
  // map.panTo(new_point);
  // map.setZoom(18);
  // map.addControl(new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT, offset: { height: 30, width: 5 } }));// 左下角，添加比例尺

  // var cr = new BMap.CopyrightControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, offset: { height: 30, width: 5 } });   //设置版权控件位置
  // map.addControl(cr); //添加版权控件
  // cr.addCopyright({ id: 1, content: "<a οnclick='OpenApp()' href='#' style='font-size: 16px;background: #ebedf0;border: solid 1px #606366;border-radius: 4px;padding: 2px;color: #606366;text-decoration: none;'>打开百度地图</a>" });
  
  function OpenApp() {
    console.log('0')
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        if (r.point.lat != "" && r.point.lng != "") {
          scheme = "://map/direction?origin=latlng:" + r.point.lat + "," + r.point.lng + "|name:我的位置&destination=latlng:106.32416,29.478063|name:走马-椒园村-森源木材&mode=driving";
  
          var I = navigator.userAgent;
          var isiPad = (I.match(/(iPad).*OS\s([\d_]+)/)) ? true : false;
          var isAndroid = I.match(/android/i) ? true : false;
          var isMac = (I.match(/(Mac\sOS)\sX\s([\d_]+)/)) ? true : false;
          var isiPhone = (!isiPad && I.match(/(iPhone\sOS)\s([\d_]+)/)) ? true : false;
          var isSafari = (isiPhone || isiPad) && I.match(/Safari/);
          var isMQQBrowser = I.match(/MQQBrowser\/([\d\.]+)/) ? true : false;
          var isUCBrowser = I.match(/UCBrowser\/([\d\.]+)/) ? true : false;
          var isQQ = (!isMQQBrowser) ? (I.match(/QQ\/([\d\.]+)/) ? true : false) : false;
          var safariVersion = 0;
          isSafari && (safariVersion = I.match(/Version\/([\d\.]+)/));
          try { safariVersion = parseFloat(safariVersion[1], 10) } catch (R) { }
          var isSAMSUNG = I.toUpperCase().indexOf("SAMSUNG-SM-N7508V") != -1;
          // 尝试打开手机APP  
          if ((isSafari && safariVersion >= 9) || isMac || isSAMSUNG || isUCBrowser || isMQQBrowser || isQQ || isiPhone) {
            tryIOpen(scheme);
          } else {
            tryAOpen(scheme);
          }
  
        } else {
          alert("无法获取当前位置!");
        }
      }
      else {
        alert("无法获取当前位置!");
        console('无法获取当前位置' + this.getStatus());
      }
    }, { enableHighAccuracy: true, timeout: 1000 });
  }
  
  function tryAOpen(scheme) {
    var protocol = "bdapp";
    var iframe = document.createElement("iframe");
    iframe.Id = "i" + Math.random().toString().replace(".", "");
    iframe.src = protocol + scheme;
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    setTimeout(function () {
      document.body.removeChild(iframe);
    }, 500)
  }
  
  function tryIOpen(scheme) {
    var protocol = "baidumap";
    var a = document.createElement("a");
    a.id = "a" + Math.random().toString().replace(".", "");
    a.href = protocol + scheme;
    document.body.appendChild(a);
    var T = document.createEvent("HTMLEvents");
    T.initEvent("click", !1, !1),
      a.dispatchEvent(T)
  }

});


