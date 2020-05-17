const Discord = require('discord.js');
var express = require('express');
var app = express();
//const db = require('./database.js');

const client = new Discord.Client();
const PORT = process.env.PORT;

const TIMETABLE  = "```PHP" + `
+-------+-----+-----+----+----+----+
| 07:45 | G   | F   | G  | Mu |    |
+-------+     +-----+----+----+----+
| 08:40 |     | E   | M° | B  | F  |
+-------+-----+-----+----+----+----+
| 09:35 | M+  | M°  | BG | D  | E  |
+-------+-----+-----+    |    +----+
| 10:35 | F   | Gg  |    |    | M° |
+-------+-----+-----+----+----+----+
| 11:30 | Mu  | D   | B  | M+ |    |
+-------+-----+-----+----+----+----+
|       |     |     |    |    |    |
+-------+-----+-----+----+----+----+
| 13:20 | (D) | TK  |    | F  | D  |
+-------+-----+-----+----+----+----+
| 14:15 |     |     |    | G  | Gg |
+-------+-----+-----+----+----+----+
| 15:10 |     | (M) |    | E  |    |
+-------+-----+-----+----+----+----+
` + "```";
const LESSONS = {
  starts0745: [ "Die Klassenstunde beginnt.",
                "La leçon de français a commencé, donnez un pouce.",
                "Geschichte hat begonnen.",
                "Die Musik-Lektion hat begonnen.",
                "stop"],
  starts0840: [ "stop",
                "The English lesson hat started, like the message.",
                "Die Geometrie-Stunde hat begonnen",
                "Die Bio-Stunde beginnt vielleicht.",
                "La leçon de français a commencé, donnez un pouce."],
  starts0935: [ "Alegbra fängt an.",
                "Die Geometrie-Stunde hat begonnen.",
                "Die künsterlisch weiterbildende Doppellektion beginnt.",
                "Die Stunde mit spannendstem Inhalt nimmt ihren Anfang.",
                "The English lesson hat started, like the message."],
  starts1035: [ "La leçon de français a commencé, donnez un pouce.",
                "Schmidtpeter ruft zur Stunde, kommt!",
                "stop",
                "stop",
                "Die Geometrie-Stunde hat begonnen."],
  starts1130: [ "Die Musik-Lektion hat begonnen.",
                "Die Stunde mit spannendstem Inhalt nimmt ihren Anfang.",
                "Die Bio-Stunde beginnt vielleicht.",
                "Alegbra fängt an.",
                "stop"],
  starts1320: [ "stop",
                "Der Konferenz des Sportunterrichts ist teilzunehmen.",
                "stop",
                "La leçon de français a commencé, donnez un pouce.",
                "Die Stunde mit spannendstem Inhalt nimmt ihren Anfang."],
  starts1415: [ "Die Stunde mit spannendstem Inhalt nimmt ihren Anfang.",
                "stop",
                "stop",
                "Geschichte hat begonnen.",
                "Schmidtpeter ruft zur Stunde, kommt!"],
  starts1510: [ "stop",
                "stop",
                "stop",
                "The English lesson hat started, like the message.",
                "!clear-all-infractions"]
}
const CHANNEL_ID = '687937985852866603';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

  //Stundenplan
  if (msg.content === '=sp') {
    client.channels.get(msg.channel.id).send(TIMETABLE);
  }

  //Ping-Test
  else if (msg.content === '=test') {
    client.channels.get(msg.channel.id).send("test ok \n");
  }

  //alle muten
  else if (msg.content === '=mute') {
      if (msg.author.username == "Prawin1234" || msg.author.username == "Rtz"){
        if (msg.member.voiceChannelID == null) {
          msg.reply('Du musst dafür in einem voiceChannel sein.');
        }
        else {
          let channel = client.channels.get(msg.member.voiceChannelID);
          for (let member of channel.members) {
              member[1].setMute(true, "Aufgrund einer Konferen o. Ä. wurden alle gemutet.");
          }
          client.channels.get(msg.channel.id).send(`Alle im Channel ${channel.name()} wurden gemutet.`);
        }
      }
      else {
        msg.reply('Wie wagst du es nur, diesen Befehl auszuführen?');
        msg.react('😡');
      }
  }

  //alle entmuten
  else if (msg.content === '=unmute') {
    if (msg.author.username == "Prawin1234" || msg.author.username == "Rtz"){
      if (msg.member.voiceChannelID == null) {
        msg.reply('Du musst dafür in einem voiceChannel sein.');
        //console.log(msg.member);
        console.log(msg.member.voiceChannelID);
      }
      else {
        let channel = client.channels.get(msg.member.voiceChannelID);
        for (let member of channel.members) {
            member[1].setMute(false);
        }
        client.channels.get(msg.channel.id).send(`Alle im Channel ${channel.name()} wurden entmutet.`);
      }
    }
    else {
      if (msg.member.voice.serverMute) {
        msg.member.voice.setMute(false);
        msg.reply('Du wurdest entmutet.');
      }
      else {
        msg.reply('Du bist schon entmutet.');
      }
    }
  }
  /*else if (msg.content.startsWith('=punish')) {
    let message = msg.content.split(' ');
    console.log(message);
    let [,name,points,reason] = message;
    client.channels.get(msg.channel.id).send(db.punish(name, points, reason));
  }*/
});


// respond with "hello world" when a GET request is made to the homepage
app.get('/send', function(req, res) {
    m = req.query.m;
    client.channels.get(CHANNEL_ID).send(m);
    res.send("OK \n Message: " + m + " sent into channel.");
});

app.get('/bot', function(req, res) {
    var time = req.query.time;
    var index = new Date();
    index = index.getDay() - 1;
    var message = LESSONS["starts"+time][index];
    if (message !== "stop") {
      client.channels.get(CHANNEL_ID).send(message);
    }
    res.send(message);
});

app.get('/', function(req, res) {
    res.send("200 OK");
});

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
client.login('Njg4MDU5NTc2NzgzNzMyODM3.Xmu7sA.ig2LSYmh0GqfJu0_tt3ZZ2-Xcc4');
