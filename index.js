const Discord = require("discord.js");
const client = new Discord.Client();
var prefix = "+";
var mention = "@406930681462259712"
var version = "2.0";

client.on("ready", () => {
console.log('[==========================]');
console.log('Nydoma est pret a être en ligne ');

var memberNumber = client.users.size;                           
var serverNumber = client.guilds.size;
setInterval(function(){
client.user.setGame("+help ▪ +invite")}, 200000);
setTimeout(function(){
setInterval(function(){
client.user.setGame("I am blue | "+serverNumber+" guilds")}, 200000)}, 100000)

client.user.setStatus("online")

})
//HELP COMMAND//
client.on('message', (message) => {

if(message.content === prefix + "help") {
 var help_embed = new Discord.RichEmbed()
  .setColor('#00FF2B')
  .setAuthor('Help Menu')
  .addField('Utilly','``+avatar <@user>`` ``+profile <@user>`` ``+afk <reason>`` ``+remafk`` ``+vcs <message>`` ``+servinfos`` ``+emojis`` ``+members``')
  .addField('Bot infos','``+invite`` ``+infos`` ``+ping`` ``+bug <bug>``')
  .addField('Fun','``+koala <text>`` ``+love <@user>`` ``+flip`` ``+8ball <question>`` ``+roll <number>``')
  .addField('Picture','``+triggered``')
  
  .addField('Mod & Admin','``+ban <@user>`` ``+kick <@user>`` ``+purge <nomber>`` ``+say <text>`` ``+unmute <@user>`` ``+mute <@user>``')
message.channel.send(help_embed)
}
});
//COMMANDES UTILES//
client.on('message', (message) => {

if (message.content.startsWith(prefix + "avatar")) {
        if (!message.mentions.users.first()) return message.channel.send("<:error:439747196003549216> | Please specify a user")
   let user = message.mentions.users.first() ? message.mentions.users.first() : message.author
  let ava = user.displayAvatarURL
  let embed = {
      
      description:""+user.username+"'s avatar: *[url]("+ava+")*",
      image:{url:ava}
    }
  message.channel.send("", {embed})
}


});
//
client.on('message', (message) => {
if(message.content.startsWith(prefix + "profile")) {

let User = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));
    if(!User) return message.channel.send(":x: | Please specify a user");
    
   

    let uinfoEmbed = new Discord.RichEmbed()
    .setAuthor(`${User.user.username}`)
    .setColor('00FF2B')
    .addField("#tag", `${User.user.discriminator}`)
    .addField("ID", `${User.user.id}`)
    .addField("Created at", `${User.user.createdAt}`)
    .addField("Last message", `${User.user.lastMessage}`)
    .addField("Status", `${User.presence.status}`)
    .addField("Game", `${User.presence.game ? User.presence.game.name : 'No game'}`)


    .addField(" Bot ?", `${User.user.bot}`)
     .setThumbnail(User.user.displayAvatarURL);

    


    message.channel.send(uinfoEmbed);

 }
});
client.on('message', (message) => {
if(message.content.startsWith(prefix + "emojis")) {
 if (!message.guild.emojis.size) {

    message.reply('There are no custom emojis in this guild!');

    return;

  }

  message.channel.send(message.guild.emojis.map(e => e).join(' '));

}
});
client.on('message', (message) => {
if(message.content.startsWith(prefix + "members")) {
message.channel.send(`${message.guild.members.filter(member => member.user.bot).size} bots and ${message.guild.memberCount} members.`)
}
});
const fs = require("fs")
client.on('message', (message) => {
var msg = message;


let afk = JSON.parse(fs.readFileSync("./afks.json", "utf8"));

if (message.content.startsWith(prefix + "remafk")){

if (afk[msg.author.id]) {

delete afk[msg.author.id];

if (msg.member.nickname === null) {

msg.channel.send(":white_check_mark: | I removed your afk successfully");

}else{

msg.channel.send(":white_check_mark: | I removed your afk successfully");

}

fs.writeFile("./afks.json", JSON.stringify(afk), (err) => { 
if (err) console.error(err);});

}else{

msg.channel.send("<:nop:439747110863110144> | Error , You are already afk");

}

}


if (message.content.startsWith(prefix + "afk")||message.content === prefix + "afk") {

if (afk[message.author.id]) {

return message.channel.send("<:hihi:439747192719278082> | Error , You are already afk");

}else{

let args1 = message.content.split(" ").slice(1);

if (args1.length === 0) {

afk[message.author.id] = {"reason" : true};

message.delete();

message.channel.send(`:white_check_mark: You are now afk, say **${prefix}remafk** to remove it`).then(x => DeleteQueue.add(x, 10000));

}else{

afk[message.author.id] = {"reason" : args1.join(" ")};

message.delete();

message.channel.send(`:white_check_mark: You are now afk, say **${prefix}remafk** to remove it`).then(x => DeleteQueue.add(x, 10000));

}

fs.writeFile("./afks.json", JSON.stringify(afk), (err) => { 
if (err) console.error(err);});

}

}

    

    var mentionned = message.mentions.users.first();

if(message.mentions.users.size > 0) {

if (afk[message.mentions.users.first().id]) {

if (afk[message.mentions.users.first().id].reason === true) {

message.channel.send(`**${mentionned.username}** is afk : no reason`);

}else{

message.channel.send(`**${mentionned.username}** is afk: ${afk[message.mentions.users.first().id].reason}`);

}

}

}
});
client.on('message', (message) => {
if (message.content.startsWith(prefix + "vcs")) {
    message.delete();
    var vcsc = client.channels.findAll('name', 'vcs-a');
    var vcsc2 = message.guild.channels.find('name', 'vcs-a');
    if(!vcsc2) {
      return message.reply("<:error:439747196003549216> | You must create channel called ``vcs-a``")
    }
    vcsc.forEach(channel => {
      message.delete();
     const embeduser = new Discord.RichEmbed()
        .setAuthor(message.author.tag)
        .setThumbnail(message.author.avatarURL)  
        
        .addField("▪User", `${message.content.substr(5)}`)
        .setFooter("In " + message.guild.name, message.guild.iconURL)
        .setTimestamp() 
        .setColor("#FFFFFF");
      const embeddev = new Discord.RichEmbed()
        .setAuthor(message.author.tag)
        .setThumbnail(message.author.avatarURL)
        
        .addField("▪Staff Bot", `${message.content.substr(5)}`)
        .setFooter("In " + message.guild.name, message.guild.iconURL)
        .setTimestamp() 
        .setColor("#A901DB");
      const embedow = new Discord.RichEmbed()
        .setAuthor(message.author.tag)
        .setThumbnail(message.author.avatarURL)
        
        .addField("▪Owner", `${message.content.substr(5)}`)
        .setFooter("In " + message.guild.name, message.guild.iconURL)
        .setTimestamp() 
        .setColor("#FF000F");
        
        
      if(message.author.id == "321030467891494913") {
      
      channel.send(embedow)
    } else {
      if(message.author.id == "427177186630565888") {
      channel.send(embeddev)
    } else {
      channel.send(embeduser)
   
      
    }
    }
    })
  } });
 client.on('message', message => { 
if(message.content.startsWith(prefix + "servinfos")) {
const humanLevels = {

	0: 'None',

	1: 'Low',

	2: 'Medium',

	3: '(╯°□°）╯︵ ┻━┻',

	4: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'

};


if(message.channel.type === 'dm') return;
    var sinfo_embed = new Discord.RichEmbed()
    .setAuthor(`${message.guild.name}`)
    .setColor('#81FF00')  
    .addField("Guild's ID", `${message.guild.id}`)
    .addField("Region", `${message.guild.region}`)
    .addField('Members', `${message.guild.members.filter(member => member.user.bot).size} bots and ${message.guild.memberCount} members.`)
    .addField("Owner", `${message.guild.owner.user.tag}`)
    
    .addField("Roles", `${message.guild.roles.size}`)

    .addField("Role list", `${message.guild.roles.map(role => role.name).join(', ')}`)
    .addField('Channels', `${message.guild.channels.filter(chan => chan.type === 'voice').size} voice / ${message.guild.channels.filter(chan => chan.type === 'text').size} text`)
    //.addField("Liste des channels","Fait ``+channels``")//
    .addField("Created at", `${message.guild.createdAt}`)
    .addField("Verification Level", `${humanLevels[message.guild.verificationLevel]}`)
    .addField("AFK channel", `${message.guild.afkChannelID ? `<#${message.guild.afkChannelID}> after ${message.guild.afkTimeout / 60}min` : 'None.'}`)

    .setThumbnail(message.guild.displayAvatarURL);

    


    message.channel.send(sinfo_embed);

 }
})

//BOT INFOS//

client.on('message', message => {

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

if (message.content.startsWith(prefix + 'ping')) {
    
let startTime = Date.now();

message.channel.send("Pong = loading...").then(msg => msg.edit(`Pong :ping_pong: != ${Date.now() - startTime} ms`));


}

}); 
client.on('message', (message) => {

if(message.content === prefix + "invite") {
	var invite_embed = new Discord.RichEmbed()
	 .setColor('00FF2B')
	 .addField('Hey ! You want invite me ? ','[Click here !](https://discordapp.com/oauth2/authorize?client_id=406930681462259712&scope=bot&permissions=8)')
	 
	 message.channel.send(invite_embed)
	 }
});
	client.on('message', (message) => {
	if(message.content.startsWith("+bug")) {

        let args = message.content.split(' ').slice(1).join(" ")
        
        
        if (!args) return message.channel.send("<:hihi:439747192719278082> | You must report the bug");
        message.channel.send(":white_check_mark: |  Thanks !")
      
        
        
        
        var support_embed = new Discord.RichEmbed()
           .setColor('00FF2B')
           .setTitle("| BUG |")
           .addField("Message by " + message.author.username + "#" + message.author.discriminator + ": ", args)
.setAuthor(message.guild.name)
           .setThumbnail(message.author.disAvatarURL)
        
        client.channels.get("442618744502747136")
        .send(support_embed)
client.channels.get("442618744502747136")
        .send(message.author.username + "#" + message.author.discriminator)
    }
});


client.on('message', (message) => {

if(message.content === prefix + "infos") {
 var infos_embed = new Discord.RichEmbed()
  .setColor('00FF2B')
  .setTimestamp()
  .setAuthor('Bot infos')
  .addField('Name','NyDoma#'+client.user.discriminator+'')
  .addField('ID',+client.user.id+'')
  .addField('Version',''+version+'')
  .addField('Prefix',''+prefix+'')
  .addField('Invite link','Say ``.invite``')
  .addField('Uptime',(Math.round(client.uptime / (1000 * 60 * 60))) + " hours, " + (Math.round(client.uptime / (1000 * 60)) % 60) + " minutes" + (Math.round(client.uptime / 1000) % 60) + " seconds")
  .addField('Langage','English')
  .addField('Langage of developper','Français')
  .addField('Code langage','Js')
  .setImage('https://cdn.discordapp.com/attachments/439694551167533057/439739789365870593/ezgif.com-video-to-gif.gif')
message.channel.send(infos_embed)
}
});
//FUN COMMANDS//
client.on('message', (message) => {

if (message.content.startsWith(prefix + 'koala')) {
    let args = message.content.split(" ").slice(1).join(" ");
    if(!args) return message.channel.send("<:nop:439747110863110144> | You must say a message");
    message.channel.send('User : '+message.author.username+ '\n```<'+(args)+' >\n  (”)...(”) \n  ( ‘ o ‘ ) \n   (”)–(”) \n (””’)-(””’)```')
  }        
});

client.on('message', message => {
if (message.content.startsWith(prefix + "love")) {  
 var mention = message.mentions.users.first(2) 
   if(!mention)
   message.channel.send("<:error:439747196003549216> | Please specify a user");
 

var love = Math.floor(Math.random() * 101);
  var love_embed = new Discord.RichEmbed()
   .setColor('#FF00DC')
   
   .setDescription(':heart: | **'+mention+'** + **'+message.author.username+'** = **'+love+'%**')
message.channel.send(love_embed)
  }
});    
 client.on('message', message => {
if (message.content === prefix + "flip") {
    	var result = Math.floor((Math.random() * 2) + 1);
    	if (result == 1) {
    	 
    	 message.channel.send("I choose **Stick**")
    	} else if (result == 2) {
    		 	  
    	 message.channel.send("I choose **Head**")
    	}
    }

}); 
//client.on('message', message => {
// if(message.content.startsWith(prefix + "trump")) { 
//let finalImage = `http://isnowillegal.com/` + message.content.slice(7).toUpperCase() + `.gif`;

 //   if (!message.content.slice(7)) {

     //   return message.reply('specify a thing that trump will make illegal');

 //   }

 //   if (message.content.slice(7).length > 11) {

  //      return message.reply('Max letters/numbers = 10 sorry..');

 //   }

 //  const embed = new Discord.RichEmbed()

//  .setAuthor("Trump", "https://is2-ssl.mzstatic.com/image/thumb/Purple111/v4/7d/a4/55/7da455f6-b1f7-be48-7649-bbf90c1a0be1/source/256x256bb.jpg")

  // .setImage(finalImage);

 //  message.channel.send({embed});

    

//}
//});


//const fs = require("fs"); 
//let points = JSON.parse(fs.readFileSync("./points.json", "utf8")); 
//client.on("message", message => { 
//if (message.author.bot) return; // always ignore bots! // if the points don"t exist, init to 0; 
//if (!points[message.author.id]) points[message.author.id] = { points: 0,level: 1 }; 
//let userData = points[message.author.id]; userData.points++;
 
//let curLevel = Math.floor(0.1 * Math.sqrt(userData.points + 1)); 
//let nxtLvlXp = curLevel * 300;

//  let difference = nxtLvlXp - userData.points;



// if (curLevel > userData.level) { // Level up! 
//userData.level = curLevel; 
//message.reply(`:up: | You are now level**${curLevel}**! `); } 
//if (message.content.startsWith(prefix + "level")) { 
// var level_embed = new Discord.RichEmbed()
//  .setColor('#81FF00')
// .setTitle(''+message.author.username+'')                            
//  .setDescription("**Level**\n" +userData.level+ " \n**Points**\n"+userData.points+ " xp \n**Xp til level up**\n"+difference+"")
//  .setTimestamp()
//message.channel.send(level_embed)
// }
//message.reply(`Vous êtes level ${userData.level}, avec ${userData.points} points.`); }
//points[message.author.id].points++; // And then, we save the edited file.
// fs.writeFile("./points.json", JSON.stringify(points), (err) => { if (err) console.error(err) }); 
//});
//const fs = require("fs");
//client.on("message", message => { 
//let xp = require("./points.json");



  //if(!xp[message.author.id]){

  // xp[message.author.id] = {

   //  xp: 0,

  //   level: 1

 // };

//}

  //let curxp = xp[message.author.id].xp;

 // let curlvl = xp[message.author.id].level;

 // let nxtLvlXp = curlvl * 300;

//  let difference = nxtLvlXp - curxp;

//if (message.content.startsWith(prefix + "level")) { 
 // let lvlEmbed = new Discord.RichEmbed()

//  .setAuthor(message.author.username)

 // .setColor('#81FF00')

//  .addField("Level", curlvl, true)

//  .addField("XP", curxp, true)

//  .setFooter(`${difference} XP til level up`, message.author.displayAvatarURL);


 // message.channel.send(lvlEmbed).then(msg => {msg.delete(5000)});

//}

client.on('message', message => {
if (message.content.startsWith(prefix + "8ball")) {
    var args = message.content.split(" ").slice(1).join(" ");
  	var result = Math.floor(Math.random() * 8);
    if(!args) 
     message.channel.send("<:error:439747196003549216> | You must ask a question");


    
    	if (result == 1) {
    	message.channel.send(":8ball: | Yes ");
    	} else if (result == 2) {
    		message.channel.send(":8ball: | No  ");
    	} else if (result == 3) {
    		message.channel.send(":8ball: | Totally");
    	} else if (result == 4) {
   	  message.channel.send(":8ball: | Certainly");
   	} else if (result == 5) {
    		message.channel.send(":8ball: | Certainly no");
    	} else if (result == 6) {
    		message.channel.send(":8ball: | No doubts");
    	} else if (result == 7) {
    		message.channel.send(":8ball: | It remains a mystery");
    	}
    }
 

});
client.on('message', (message) => {

  const messageWords = message.content.split(' ');

  const rollFlavor = messageWords.slice(2).join(' ');

  if (messageWords[0] === '+roll') {

    if (messageWords.length === 1) {

      

      return message.reply(

        (Math.floor(Math.random() * 6) + 1) + ' ' + rollFlavor

      );

    }


    let sides = messageWords[1]; 

    let rolls = 1;

    if (!isNaN(messageWords[1][0] / 1) && messageWords[1].includes('d')) {

      

      rolls = messageWords[1].split('d')[0] / 1;

      sides = messageWords[1].split('d')[1];

    } else if (messageWords[1][0] == 'd') {


      sides = sides.slice(1);

    }

    sides = sides / 1; 

    if (isNaN(sides) || isNaN(rolls)) {

      return;

    }

    if (rolls > 1) {

      const rollResults = [];

      for (let i = 0; i < rolls; i++) {

        rollResults.push(Math.floor(Math.random()*sides)+1);

      }

      const sum = rollResults.reduce((a,b) => a + b);

      return message.reply(`[${rollResults.toString()}] ${rollFlavor}`);

    } else {

      return message.reply(

        (Math.floor(Math.random() * sides) + 1) + ' ' + rollFlavor

      );

    }

  }

});

//PICTURES//
client.on('message', (message) => {

if(message.content.startsWith(prefix + "triggered")) { 
var image; 
var args = message.content.split(" ").slice(1).join(" "); 
if(args){ 
var image = args; 
}else{ 
var image = message.author.avatarURL; 
} 
message.channel.send({ file: { attachment: "http://www.triggered-api.tk/api/v1/url=" + image, name: "triggered.gif" 
}}) 
}
});









//ADMINISTRATIONS COMMANDS//
client.on('message', (message) => {

if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" "); 
switch (args[0].toLowerCase()) {

        case "kick":
            if (!message.channel.permissionsFor(message.member).hasPermission("KICK_MEMBERS")) {
                message.channel.send(":x: | You must have kick members permission")
            } else {
                var member = message.mentions.members.first();
                if (!member) {
                    message.channel.send("<:nop:439747110863110144> | Please mention a user");
                } else {
                    if (!member.kickable) {
                        message.channel.send("<:error:439747196003549216> | Error , I can't kick this user");
                    } else {
                        member.kick().then((member))
 
 var kick_embed = new Discord.RichEmbed()
 .setColor('00FF2B')
 .setDescription(':white_check_mark: | '+member+' has been kicked')
                        message.channel.send(kick_embed);


                    }
                }

            }
        
    }
    });
  client.on('message', (message) => { 
  
 if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" "); 
switch (args[0].toLowerCase()) {
        case "ban":
            if (!message.channel.permissionsFor(message.member).hasPermission("BAN_MEMBERS")) {
                message.channel.send("<:nop:439747110863110144> | You must have ban members permission")
            } else {
                var member = message.mentions.members.first();
                if (!member) {
                    message.channel.send("<:hein:439747190026665984> | Please mention a user");
                } else {
                    if (!member.bannable) {
                        message.channel.send("<:error:439747196003549216> | Error, I can't ban this user");
                    } else {
                        member.ban().then((member))
 
 var ban_embed = new Discord.RichEmbed()
 .setColor('00FF2B')
 .setDescription(':white_check_mark: |  '+member+' has been banned')
                        message.channel.send(ban_embed);


                    }
                }

            }
        
    } 
});
client.on('message', (message) => {

if (message.content.startsWith(prefix + "purge")) {
if (message.channel.type === "dm") return;
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("<:nop:439747110863110144> | You haven't the permission").catch(console.error);

const user = message.mentions.users.first();
 const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2]) 
if (!amount) return message.reply('<:error:439747196003549216> | Please specify a limit'); 
if (!amount && !user) 
return message.reply('<:hihi:439747192719278082> | Please specify a limit');
if (!user){
if(isNaN(message.content.split(' ')[1]) || parseInt(message.content.split(' ')[1]) < 2 || parseInt(message.content.split(' ')[1]) > 100){
message.channel.send('<:nop:439747110863110144> | Please specify a limit')
}
}
if(message.content.split(' ')[2]){
if(isNaN(message.content.split(' ')[2]) || parseInt(message.content.split(' ')[2]) < 2 || parseInt(message.content.split(' ')[2]) > 100){
message.channel.send('<:error:439747196003549216> | Please specify a limit beetween 2 and 100')
}
}
 message.channel.fetchMessages({ limit: amount, }).then((messages) => {
 if (user) {
const filterBy = user ? user.id : Client.user.id;
messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
 }
 message.channel.bulkDelete(messages).catch(error => console.log(error.stack));


    
});
}
});
client.on('message', (message) => {
if(message.content === "pute") {
if(message.content === "tg") 
if(message.content === "fuck") 
if(message.content === "bitch") 
if(message.content === "ntm") 
if(message.content === "pd") 
message.delete()
message.channel.send(":x: | No insult").then(msg => {msg.delete(5000)});
}

});
client.on('message', (message) => {
if (message.content.startsWith(prefix + 'say')) {
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("<:error:439747196003549216> | Perms ? Where are you ?").catch(console.error);
    let args = message.content.split(" ").slice(1)
    if(!args) return message.channel.send("<:nop:439747110863110144> | I can't say this ");
    message.delete()
    message.channel.send(args)
  }
  });  
client.on('message', (message) => {  
if(message.content.startsWith(prefix + 'mute')){

if(message.channel.type === 'dm') return;

if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')){

return message.reply("<:hihi:439747192719278082> | You have Admin perms ? No  ").catch(console.error);

}

if(message.mentions.users.size === 0){

return message.reply("<:nop:439747110863110144> | Please specify a user")

}

if(!message.guild.member(client.user).hasPermission('ADMINISTRATOR')){

return message.reply("<:hein:439747190026665984> | I can't mute this user ").catch(console.error);

}

let muteMember = message.guild.member(message.mentions.users.first());

if(!muteMember){

return message.channel.send("<:error:439747196003549216> | I can't mute")

}

message.channel.overwritePermissions(muteMember, {SEND_MESSAGES: false}).then(member => {

message.channel.send('**'+member.user.username+ '** has been muted ! **:warnings:+unmute <@user> for unmute :wink:**');

})

}

if(message.content.startsWith(prefix + 'unmute')){

if(message.channel.type === 'dm') return;

if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')){

return message.reply("<:nop:439747110863110144> | Perms !? Absent. ").catch(console.error);

}

if(message.mentions.users.size === 0){

return message.reply("<:hihi:439747192719278082> | Ow , specify a user")

}

if(!message.guild.member(client.user).hasPermission('ADMINISTRATOR')){

return message.reply("<:hein:439747190026665984> | I can't mute ").catch(console.error);

}

let unmuteMember = message.guild.member(message.mentions.users.first());

if(!unmuteMember){

return message.channel.send("<:hihi:439747192719278082> | Specify a real user ")

}

message.channel.overwritePermissions(unmuteMember, {SEND_MESSAGES: true}).then(member => {

  
      
      message.channel.send('**'+member.user.username+ '** has been unmuted');

})

}
});

    
//OWNER//



client.on('message', (message) => {
if(message.content.startsWith(mention)){
message.channel.send(':white_check_mark: | **Hi !**')
}

});
client.login(process.env.TOKEN)












