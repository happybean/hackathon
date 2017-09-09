var express = require('express');
var linebot = require('linebot');

var bot = linebot({
	channelId:'1534427640',
	channelSecret:'aa11835019a07c5b417b70b00057b85e',
	channelAccessToken:'HrgD9tlcM3S9nLmvLOqfJx4J1k7wOGUS+USrl1DAFxmHtyGn6oPsFpCG5QStnoNgyAfU7bwx/f8Yw5jn7Y4k0LlY3lY18keCA9HD/CmRbI6PhXJJBqCob5cDq6N7psKKMf80mP0atPFalbT0/HKnjwdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function(event) {
  console.log(event); //把收到訊息的 event 印出來看看
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});




