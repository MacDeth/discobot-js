var Discord = require("discord.js");
var querystring = require("querystring");
var request = require("request");
var fs = require("fs");
var process = require("process");
var chalk = require("chalk");
var moment = require("moment");

var bot = new Discord.Client();
var botInfo = {};
var token = "";
var imageOK = true;
var botInfo = require('./config.js');
var cmds = require('./cmds.js')(bot);

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
    console.error(
      chalk.bold.red(moment().format("YYYY MMM D, hh:mm:ss A ZZ")+
      " [ERROR] Bad login: "+err)
    );
    process.exit(1);
  }
});


bot.on("ready", function(){
  console.log(
    chalk.bold.blue(moment().format("YYYY MMM D, hh:mm:ss A ZZ")+
    " [INFO] Connected as: "+botInfo.user)
  );
  var servers = bot.servers;
  var channels = bot.channels;
});

var quotes = {}
readJSON("quotes.json", function(jsonShit){ quotes = jsonShit; });

// fs.access("quotes.json", fs.R_OK | fs.W_OK, function(err){
//   if(err)
//     console.error(
//       chalk.bold.red(moment().format("YYYY MMM D, hh:mm:ss A ZZ")+
//       " [ERROR] "+err)
//     );
//   else{
//     fs.readFile("quotes.json", function(err, data){
//       if(err){
//         console.error(
//           chalk.bold.red(moment().format("YYYY MMM D, hh:mm:ss A ZZ")+
//           " [ERROR] "+err)
//         );
//       }else{
//         quotes = JSON.parse(data);
//       }
//     });
//   }
// });

process.stdin.on("data", function(data) {
  if(lastMessage){
    lastMessage.content = data.toString().trim();
    var msg = lastMessage.content.toLowerCase();
    for(idx in cmds){
      var cmd = cmds[idx];
      if(msg.match(cmd.match)){
        cmd.exec(lastMessage);
      }
    }
  }
  console.log(
    chalk.bold.blue(moment().format("YYYY MMM D, hh:mm:ss A ZZ")+
    " [INFO] Command entered via terminal.")
  );
});

bot.on("warn", function(warning){
  console.error(
    chalk.yellow(moment().format("YYYY MMM D, hh:mm:ss A ZZ")+
    " [WARN] "+warning)
  );
});

var lastMessage;

bot.on("message", function(message){
  if(typeof lastMessage === "undefined"){
    lastMessage = message;
  }
  var msg = message.content.toLowerCase();
  if(message.author.username != bot.user.username){
    if(!message.channel.isPrivate){
      console.log(
        chalk.bold.blue(moment().format("YYYY MMM D, hh:mm:ss A ZZ")+
        " [INFO] Server: "+message.channel.server.name)
      );
    }else{
      console.log(
        chalk.bold.blue(moment().format("YYYY MMM D, hh:mm:ss A ZZ")+
        " [INFO] Private:")
      );
    }
    lastMessage = message;
    console.log(message.channel.name+" "+message.author.id+" "+message.author.username+
      ": "+message.content);
    
    for(idx in cmds){
      var cmd = cmds[idx];
      //console.log(cmd);
      if(msg.match(cmd.match)){
        cmd.exec(message);
      }
    }
    
    servers = bot.servers;
    channels = bot.channels;
  }
});


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
