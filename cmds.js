module.exports = function(bot){
  return [
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
        var pack = readJSON("package.json");
        bot.reply(message, "I'm written by MacDeth with the help of the discord.js"+
          " unofficial API. My version is: "+pack.version+"\nhttp://steamcommunity.com/id/macdeth\n"+
          "https://github.com/MacDeth/discobot-js\n"+
          "https://github.com/hydrabolt/discord.js/"
        );
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
        
        bot.reply(message, "Your roll is: "+answer+"\n"+answerA.join(" + "));
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
                console.error(
                  chalk.bold.red(moment().format("YYYY MMM D, hh:mm:ss A ZZ")+
                  " [ERROR] "+err)
                );
              }else{
                fs.write(fd, JSON.stringify(quotes), function(err){
                  if(err)
                    console.error(
                      chalk.bold.red(moment().format("YYYY MMM D, hh:mm:ss A ZZ")+
                      " [ERROR] "+err)
                    );
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
          null,
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
          console.log(chalk.bold.blue(
            moment().format("YYYY MMM D, hh:mm:ss A ZZ")+
            " [INFO] Kept from unintentional bugging of Google API.")
          );
        }
      }
    },
    {
      match: /^discobot,\s+override\s+image\s+block/,
      exec: function(message){
        imageOK = true;
        console.log(
          chalk.bold.blue(moment().format("YYYY MMM D, hh:mm:ss A ZZ")+
          " [INFO] Imageblock deactivated.")
        );
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
        console.log(
          chalk.bold.blue(moment().format("YYYY MMM D, hh:mm:ss A ZZ")+
          " [INFO] Discobot said: "+said)
        );
      }
    },
    {
      match: /^\(╯°□°）╯︵ ┻━┻|\(╯°□°\)╯︵ ┻━┻/,
      exec: function(message){
        var list = [
          "(ﾉಥ益ಥ）ﾉ﻿ ┻━┻", 
          "┬──┬﻿ ¯\\_(ツ)", 
          "┻━┻ ︵ヽ(`Д´)ﾉ︵﻿ ┻━┻", 
          "┻━┻ ︵﻿ ¯\\(ツ)/¯ ︵ ┻━┻", 
          "┬─┬ノ( º _ ºノ)", 
          "(ノಠ益ಠ)ノ彡┻━┻", 
          "(J °O°)J JL_JL v-v /(°_°/)"
        ];
        bot.sendMessage(message, random(list));
      }
    }
  ];
};
