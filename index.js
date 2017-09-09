var linebot = require('linebot');
var express = require('express');

var bot = linebot({
  channelId:'1534427640',
  channelSecret:'aa11835019a07c5b417b70b00057b85e',
  channelAccessToken:'HrgD9tlcM3S9nLmvLOqfJx4J1k7wOGUS+USrl1DAFxmHtyGn6oPsFpCG5QStnoNgyAfU7bwx/f8Yw5jn7Y4k0LlY3lY18keCA9HD/CmRbI6PhXJJBqCob5cDq6N7psKKMf80mP0atPFalbT0/HKnjwdB04t89/1O/w1cDnyilFU='
});

var googleMaps = {
  key: 'AIzaSyCk71IiIQbtzk_-n53R7mYtdRWNEPmm4_M'
};

                      
// 取得使用者的 GPS 位置
var getUserLocation = function(){

};

// 根據使用者的位置或搜尋字串傳回地點清單
var getNearbyPlaces = function(userLocation, text){
  var http = require("https");
  
  var options = {
    "method": "GET",
    "hostname": "maps.googleapis.com",
    "port": null,
    "path": "/maps/api/place/nearbysearch/json?location="+ userLocation + "&radius=500&name="+ text +"&key=" + googleMaps.key,
  };
  
  var req = http.request(options, function (res) {
    var chunks = [];
  
    // 取得資料
    res.on("data", function (chunk) {
      chunks.push(chunk);
      return chunk;
    });
  
    res.on("end", function () {
      var body = Buffer.concat(chunks);
      // console.log(body.toString());
    });
  });
  
  req.end();
}

// 根據關鍵字在 Pixnet 搜尋文章
var getArticles = function(text){
  var http = require("https");
  
  var options = {
    "method": "GET",
    "hostname": "emma.pixnet.cc",
    "port": null,
    "path": "/blog/articles/search?key="+ text +"format=json"
  };
  
  var req = http.request(options, function (res) {
    var chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
      return chunk;
    });
  
    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });
  
  req.end();
};

var step = 0;

bot.on('message', function(event) {



  if (event.message.type = 'text') {
   

    var msg = event.message.text;
    if (msg == "我要開團"){
      event.reply("請傳您的位置資訊給我").then(function(data) {
      // 傳送訊息成功時，可在此寫程式碼 
        console.log("告訴我你的所在地");
        step = 1;
      }).catch(function(error) {
        // 傳送訊息失敗時，可在此寫程式碼 
        console.log('錯誤產生，錯誤碼：'+error);
      });
    }


    var postion_arr = [0,0];

    if (step == 1) {
      if (event.message.type = 'location'){
        postion_arr[0] = event.message.latitude;
        postion_arr[1] = event.message.longitude;

        step = 2;
        event.reply("請告訴我你要吃/喝什麼(範例：店名/品項)").then(function(data) {
        // 傳送訊息成功時，可在此寫程式碼 
          console.log("確認食物");
        }).catch(function(error) {
          // 傳送訊息失敗時，可在此寫程式碼 
          console.log('錯誤產生，錯誤碼：'+error);
        });
      }
      
    } else if (step == 2){
      
    }


    // // 收到文字訊息時，直接把收到的訊息傳回去
    // event.reply(msg).then(function(data) {
    //   // 傳送訊息成功時，可在此寫程式碼 
    //   console.log(msg);
    // }).catch(function(error) {
    //   // 傳送訊息失敗時，可在此寫程式碼 
    //   console.log('錯誤產生，錯誤碼：'+error);
    // });
  }
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log('目前的port是', port);
});
