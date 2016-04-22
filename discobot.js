var Discord = require("discord.js");
var process = require("process");
var chalk = require("chalk");
var moment = require("moment");

var bot = new Discord.Client();
var botInfo = {};
var token = "";
var imageOK = true;
var botInfo = require('./config.js');
var cmds = require('./cmds.js')(bot, botInfo);

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
