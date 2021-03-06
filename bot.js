var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var twss = require('twss');
var emoji = require('node-emoji');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0])
  if(request.name == 'Alex Spungen'){
        postMessage(request) 
  }
}

function postMessage(request) {
  var botResponse, options, body, botReq;
  var resp1 = emoji.get('rice');
  botResponse = resp1

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
