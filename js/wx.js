var url = location.href;
var timestamp = "";
var signature = "";
var title = document.title;
var shareData = {
  "imgUrl": data.imgUrl,    // 分享显示的缩略图地址 ,根据自己情况而定
  "link": url,    // 分享地址  
  "desc": title,   // 分享描述  
  "title": title,   // 分享标题  
  success: function () {

    // 分享成功可以做相应的数据处理  

    //alert("分享成功"); }   
  }
};
function init() {
  var parms = { url: url };
  $.ajax({
    type: "POST",
    url: "/membervideo/share.ashx",//后台接口
    data: parms, //可选参数
    dataType: "json",
    success: function (data) {
      timestamp = data.timestamp;
      signature = data.signature;
      //alert(timestamp)
      initwx(timestamp, signature);
    } //可选参数
  });



}
$(function () {
  init();
});
function initwx(timestamp, signature) {
  wx.config({
    debug: false, // 
    appId: 'wxxxxxxxxxx', // 公众号的唯一标识 
    timestamp: timestamp, //生成签名的时间戳 
    nonceStr: 'GDOU', //生成签名的随机串
    signature: signature,// 
    jsApiList: ['onMenuShareTimeline', // 
      'onMenuShareAppMessage'] // 
  });
  wx.checkJsApi({
    jsApiList: [
      'onMenuShareTimeline', 'onMenuShareAppMessage'
    ]
  });
  wx.ready(function () {
    wx.onMenuShareTimeline(shareData);//分享到朋友圈
    wx.onMenuShareAppMessage(shareData);//分享给朋友
  });
}