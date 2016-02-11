var Discord = require("discord.js");
var querystring = require("querystring");
var request = require("request");
var fs = require("fs");
var process = require("process");
const chalk = require("chalk");

var bot = new Discord.Client();
var botInfo = {};
var token = "";
var imageOK = true;
var botInfo = require('./config.js');

// fs.access("config.json", fs.R_OK, function(err){
//   if(err){
//     console.error(chalk.bold.red("[ERROR] "+err));
//     process.exit(1);
//   }else{
//     fs.readFile("config.json", function(err, data){
//       if(err){
//         console.error(chalk.bold.red("[ERROR] "+err));
//         process.exit(1);
//       }else{
//         botInfo = JSON.parse(data);
//         token = bot.login(botInfo.user, botInfo.pass, function(err){
//           if(err){
//             console.error(chalk.bold.red("[ERROR] Bad login: "+err));
//             process.exit(1);
//           }
//         });
//       }
//     });
//   }
// });

token = bot.login(botInfo.user, botInfo.pass, function(err){
  if(err){
    console.error(chalk.bold.red("[ERROR] Bad login: "+err));
    process.exit(1);
  }
});


bot.on("ready", function(){
  console.log(chalk.bold.blue("[INFO] Connected as: "+botInfo.user));
  var servers = bot.servers;
  var channels = bot.channels;
});

var quotes = {};

fs.access("quotes.json", fs.R_OK | fs.W_OK, function(err){
  if(err)
    console.error(chalk.bold.red("[ERROR] "+err));
  else{
    fs.readFile("quotes.json", function(err, data){
      if(err){
        console.error(chalk.bold.red("[ERROR] "+err));
      }else{
        quotes = JSON.parse(data);
      }
    });
  }
});

process.stdin.on("data", function(data) {
  if(lastMessage){
    lastMessage.content = data.toString().trim();
    var msg = lastMessage.content.toLowerCase();
    for(idx in cmdBattery){
      var cmd = cmdBattery[idx];
      if(msg.match(cmd.match)){
        cmd.exec(lastMessage);
      }
    }
  }
  console.log(chalk.bold.blue("[INFO] Command entered via terminal."));
});

bot.on("warn", function(warning){
  console.error(chalk.yellow("[WARN] "+warning));
});

var lastMessage;

bot.on("message", function(message){
  if(typeof lastMessage === "undefined"){
    lastMessage = message;
  }
  var msg = message.content.toLowerCase();
  if(message.author.username != bot.user.username){
    if(!message.channel.isPrivate){
      console.log(chalk.bold.blue("[INFO] Server: "+message.channel.server.name));
    }else{
      console.log(chalk.bold.blue("[INFO] Private:"));
    }
    lastMessage = message;
    console.log(message.channel.name+" "+message.author.id+" "+message.author.username+
      ": "+message.content);
    
    for(idx in cmdBattery){
      var cmd = cmdBattery[idx];
      //console.log(cmd);
      if(msg.match(cmd.match)){
        cmd.exec(message);
      }
    }
    
    servers = bot.servers;
    channels = bot.channels;
  }
});

var cmdBattery = [
  {
    match: /^ping$/,
    exec: function(message){
      var chance = Math.floor(Math.random()*11);
      if(chance == 10)
        bot.reply(message, "fuCK YOU WHORE");
      else
        bot.sendMessage(message.channel, "pong");
    }
  },
  {
    match: /^goodbye,\s+discobot!/,
    exec: function(message){
      bot.reply(message, "Goodbye!");
      bot.logout(token);
    }
  },
  {
    match: /^discobot,\s+channel\s+me/,
    exec: function(message){
      bot.sendMessage(message.channel, "You're in the "+message.channel+" channel.");
    }
  },
  {
    match: /^discobot,\s+cake\s+me/,
    exec: function(message){
      bot.sendMessage(message.channel, "Here "+message.author+", I made it just for you! :cake:");
    }
  },
  {
    match: /^discobot,\s+show\s+me\s+your\s+uptime|^discobot,\s+uptime/,
    exec: function(message){
      bot.sendMessage(message.channel, "I've been up for "+(Math.round(bot.uptime/600)/100)+
        " minutes.");
    }
  },
  {
    match: /why(?!\s+not)|^y(?:\?*$|\s+)(?!not)/,
    exec: function(message){
      // /(?:(?!why\s+not).)*/
      var chance = Math.floor(Math.random()*11);
      if(chance == 10)
        bot.reply(message, "Because life sucks.");
      else
        bot.sendMessage(message.channel, "Why not?");
    }
  },
  {
    match: /how\s+come/,
    exec: function(message){
      var chance = Math.floor(Math.random()*11);
      if(chance == 10)
        bot.reply(message, "BECAUSE YOU TOLD ME TOOOOOOOOOO! "+
          "http://i.imgur.com/yMlcYfW.jpg");
      else
        bot.reply(message, "Because reasons.");
    }
  },
  {
    match: /(?:hi,?\s+|hello,?\s+)(?:discobot|disco)/,
    exec: function(message){
      bot.reply(message, "Hello!");
    }
  },
  {
    match: /^discobot,\s+help/,
    exec: function(message){
      bot.reply(message,
        "You can use me with the commands listed on "+
        "https://github.com/MacDeth/discobot-js/wiki/Chat-Triggers"
      );
    }
  },
  {
    match: /^discobot,\s+tell\s+me\s+about\s+yourself|^discobot,\s+about/,
    exec: function(message){
      bot.reply(message, "I'm written by MacDeth with the help of the discord.js"+
      " unofficial API.\nhttp://steamcommunity.com/id/macdeth");
    }
  },
  {
    match: /(?:^|\s)\d{1,2}d\d{1,3}/,
    exec: function(message){
      var msg = message.content.toLowerCase();
      var patt = /(\d{1,2})d(\d{1,3})/;
      var results = patt.exec(msg);
      var num = results[1].valueOf();
      var faces = results[2].valueOf();
      
      var answer = 0;
      var answerA = [];
      if(num != 0 && faces != 0){
        for(i = 0; i < num; i++){
          var adding = Math.floor(Math.random()*faces)+1;
          answer += adding;
          answerA.push(adding);
        }
      }
      
      bot.reply(message, "Your roll is: "+answer+"\n"+
        answerA.join(" + "));
    }
  },
  {
    match: /^discobot,\s+quote/,
    exec: function(message){
      var msg = message.content.toLowerCase();
      if(msg.match(/^discobot,\s+quote\s+me$/)){
        if(quotes[message.author.id]){
          var randQuoteIndex = Math.floor(Math.random()*quotes[message.author.id].length);
          bot.sendMessage(message.channel, quotes[message.author.id][randQuoteIndex]+
              " - "+message.author.username);
        }
      //}else if(msg === "discobot, quote anyone"){
        
      }else if(msg.match(/^discobot,\s+quote\s+.+/)){
        var patt = /^discobot,\s+quote\s+(.+)/i;
        var results = patt.exec(message.content);
        if(results != null){
          var quote = results[1];
          if(!quotes[message.author.id]){
            quotes[message.author.id] = [];
          }
          quotes[message.author.id].push(quote);
          bot.reply(message, "Quote recorded - "+quote);
          fs.open("quotes.json","w+", function(err, fd){
            if(err){
              console.error(chalk.bold.red("[ERROR] "+err));
            }else{
              fs.write(fd, JSON.stringify(quotes), function(err){
                if(err)
                  console.error(chalk.bold.red("[ERROR] "+err));
                fs.close(fd);
              });
            }
          });
        }
      }
    }
  },
  {
    match: /^m8|\sm8/,
    exec: function(message){
      bot.reply(message, "ill punch u str8 in the gab i will m8. ill fookin rek you m8");
    }
  },
  {
    match: /good\s+shit/,
    exec: function(message){
      bot.sendMessage(message, ":ok_hand::eyes::ok_hand::eyes::ok_hand::eyes:"+
        ":ok_hand::eyes::ok_hand::eyes:good shit go౦ԁ sHit :ok_hand: thats "+
        ":heavy_check_mark: some good :ok_hand: :ok_hand: shit right "+
        ":ok_hand: :ok_hand:there :ok_hand: :ok_hand: :ok_hand: right"+
        ":heavy_check_mark:there :heavy_check_mark:heavy_check_mark:if i do ƽaү"+
        " so my self :100: i say so :100: thats what im talking about right there"+
        " right there (chorus: ʳᶦᵍʰᵗ ᵗʰᵉʳᵉ) mMMMMᎷМ:100: :ok_hand::ok_hand: "+
        ":ok_hand:НO0ОଠOOOOOОଠଠOoooᵒᵒᵒᵒᵒᵒᵒᵒᵒ:ok_hand: :ok_hand::ok_hand: "+
        ":ok_hand: :100: :ok_hand: :eyes: :eyes: :eyes: :ok_hand::ok_hand:Good shit"
      );
    }
  },
  {
    match: /^discobot,\s+image\s+me\s+.+/,
    exec: function(message){
      var msg = message.content.toLowerCase();
      googleImageSearch(msg.match(
        /^discobot,\s+image\s+me\s+(.+)/)[1],
        null,
        true,
        message,
        function(link){
          bot.sendMessage(message, link);
      });
    }
  },
  {
    match: /^discobot,\s+animate\s+me\s+.+/,
    exec: function(message){
      var msg = message.content.toLowerCase();
      // if(imageOK){
      googleImageSearch(msg.match(
        /^discobot,\s+animate\s+me\s+(.+)/)[1],
        "gif",
        false,
        message,
        function(link){
          bot.sendMessage(message, link);
      });
      // }else{
      //   imageFail(message);
      // }
    }
  },
  {
    match: /^discobot,\s+pug\s+me/,
    exec: function(message){
      var msg = message.content.toLowerCase();
      var randIndex = Math.floor(Math.random()*8);
      var pugQueries = ["pug","pug cute","pug derp","pug dumb","pug fat",
        "pug long","pug meme","pugs not drugs"];
      googleImageSearch(
        pugQueries[randIndex],
        null,
        true,
        message,
        function(link){
          bot.sendMessage(message, link);
      });
    }
  },
  {
    match: /^discobot,\s+smut\s+me.+/,
    exec: function(message){
      var msg = message.content.toLowerCase();
      googleImageSearch(
        msg.match(/^discobot,\s+smut\s+me\s+(.+)/)[1],
        "gif",
        false,
        message,
        function(link){
          bot.sendMessage(message, link);
        }
      );
    }
  },
  {
    match: /^discobot,\s+youtube\s+me\s+.+/,
    exec: function(message){
      var msg = message.content.toLowerCase();
      youtubeSearch(
        msg.match(/^discobot,\s+youtube\s+me\s+(.+)/)[1],
        function(link){
          bot.sendMessage(message, link);
        }
      );
    }
  },
  {
    match: /guarantee/,
    exec: function(message){
      if(imageOK){
        googleImageSearch("george zimmer copypasta",
          null,
          true,
          message,
          function(link){
            bot.sendMessage(message, link);
        });
      }else{
        console.log(chalk.bold.blue("[INFO] Kept from unintentional bugging of Google API."));
      }
    }
  },
  {
    match: /^discobot,\s+override\s+image\s+block/,
    exec: function(message){
      imageOK = true;
      console.log(chalk.bold.blue("[INFO] Imageblock deactivated."));
    }
  },
  {
    match: /^discobot,\s+get\s+.+/,
    exec: function(message){
      var msg = message.content.toLowerCase();
      if(msg.match(/^discobot,\s+get\s+servers/)){
        for(idx in servers){
          console.log(servers[idx].name);
        }
      }
      if(msg.match(/^discobot,\s+get\s+channels\s+.+/)){
        
      }
    }
  },
  {
    match: /^discobot,\s+set\s+.+/,
    exec: function(message){
      var msg = message.content.toLowerCase();
      if(msg.match(/^discobot,\s+set\s+game\s+.+/)){
        bot.setPlayingGame(message.content.match(/^discobot,\s+set\s+game\s+(.+)/i)[1], function(err){
          if(err)
            console.error(chalk.bold.red("Failure to set status.\n"+err));
        });
      }
      if(msg.match(/^discobot,\s+set\s+channel\s+.+/)){
        
      }
      // if(msg.match(/^discobot,\s+set\s+\s+.+/)){
      //   
      // }
    }
  },
  {
    match: /^discobot,\s+say\s+.+/,
    exec: function(message){
      var said = message.content.match(/^discobot,\s+say\s+(.+)/)[1];
      bot.sendMessage(message, said);
      console.log(chalk.bold.blue("[INFO] Discobot said: "+said));
    }
  }
];

function googleImageSearch(query, type, safe, message, callback){
  var qs = {
    key: botInfo.googleAPI,
    cx: botInfo.cx,
    q: query,
    searchType: "image",
    prettyPrint: false
  }
  if(type){
    qs.fileType = type;
  }
  if(safe){
    qs.safe = "medium";
  }else{
    qs.safe = "off";
  }
  request("https://www.googleapis.com/customsearch/v1?"+querystring.stringify(qs),
    function(error, response, body){
      if(!error && response.statusCode === 200){
        jBody = JSON.parse(body);
        console.log(
          chalk.bold.blue(
            "[INFO] "+jBody.searchInformation.formattedTotalResults+
            " results\nIn "+jBody.searchInformation.formattedSearchTime+" seconds."
          )
        );
        console.log(
          chalk.bold.blue(
            "[INFO] Items array undefined? "+(typeof jBody.items === "undefined")
          )
        );
        img = random(jBody.items);
        if(typeof img === "undefined"){
          return;
        }
        callback(img.link);
        return;
      }else{
        imageOK = false;
        var hour = Math.floor((Date.now()%86400000)/3600000); // 86.4M for # of ms/day. 3.6M for # of ms/hour
        var countdown = 0;
        if(hour > 8){ // UTC hour for quota reset
          countdown = (24-hour)+8;
        }else{
          countdown = 8-hour;
        }
        bot.sendMessage(message, "Failed to procure an image, sorry :'(\n"+
          "This is probably because I hit my query limit. Next batch ready in "+
          countdown+" hours.");
        console.error(chalk.bold.red("[ERROR] Failed to procure image. Status code: "+
          response.statusCode));
        return;
      }
  });
}

function youtubeSearch(query, callback){ // 100 unit impact on quota
  var qs = {
    key: botInfo.googleAPI,
    part: "snippet",
    // maxresults: 5, // default value, 0-50 inclusive
    q: query,
    type: "video,channel",
    safeSearch: "none"
  }
  request("https://www.googleapis.com/youtube/v3/search?"+querystring.stringify(qs),
    function(error, response, body){ // May need to worry about ETag later.
      if(!error && response.statusCode === 200){
        jBody = JSON.parse(body);
        console.log(
          chalk.bold.blue(
            "[INFO] "+jBody.pageInfo.totalResults+" YouTube results.\n"+
            "ETag: "+jBody.etag+" "+
            "Item array undefined: "+(typeof jBody.items === "undefined")
          )
        );
        
        result = random(jBody.items);
        if(typeof result !== "undefined"){
          console.log(result.id.kind);
          if(result.id.kind === "youtube#video"){
            callback("https://www.youtube.com/watch?v="+result.id.videoId);
          }else if(result.id.kind === "youtube#channel"){
            callback("https://www.youtube.com/channel/"+result.id.channelId);
          }
        }
        return;
      }else{
        console.error(chalk.bold.red("[ERROR] Error may exist. Response: "+response.statusCode));
      }
    }
  );
}

function random(array){
  if(typeof array === "undefined"){
    return array;
  }
  return array[Math.floor(Math.random() * array.length)];
}

function getServers(){
  
}

function getChannels(){
  
}

// function imageFail(message){
//   var hour = Math.floor((Date.now()%86400000)/3600000); // 86.4M for # of ms/day. 3.6M for # of ms/hour
//   var countdown = 0;
//   if(hour > 8){ // UTC hour for quota reset
//     countdown = (24-hour)+8;
//   }else{
//     countdown = 8-hour;
//   }
//   bot.sendMessage(message, "Failed to procure an image, sorry :'(\n"+
//     "This is probably because I hit my query limit. Next batch ready in "+countdown+" hours.");
//   console.log("[INFO] Kept bot from pestering Google API.");
// }
