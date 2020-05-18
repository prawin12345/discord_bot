const Discord = require('discord.js');
var express = require('express');
var app = express();
var constants = require(`${__dirname}/constants.js`);
var hw = require(`${__dirname}/hw.js`);
var fs = require('fs');
//const db = require('./database.js');

const client = new Discord.Client();
const PORT = process.env.PORT;
const CHANNEL_ID = constants.CHANNEL_ID;

//Bot einloggen
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.channels.get('696639770868056095').send(`Bot gestartet.`);
});

//Aktionen beim Versender einer Nachricht
client.on('message', msg => {

  //Stundenplan
  if (msg.content === '=sp') {
    client.channels.get(msg.channel.id).send(constants.TIMETABLE);
  }

  //Ping-Test
  else if (msg.content === '=test') {
    client.channels.get(msg.channel.id).send("test ok \n");
  }

  //alle muten
  else if (msg.content === '=mute') {
      if (msg.member.hasPermission('MUTE_MEMBERS')){
        if (msg.member.voiceChannelID == null) {
          msg.reply('Du musst dafür in einem voiceChannel sein.');
        }
        else {
          let channel = client.channels.get(msg.member.voiceChannelID);
          for (let member of channel.members) {
              member[1].setMute(true, "Aufgrund einer Konferen o. Ä. wurden alle gemutet.");
          }
          client.channels.get(msg.channel.id).send(`Alle im Channel ${channel.name} wurden gemutet.`);
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
        client.channels.get(msg.channel.id).send(`Alle im Channel ${channel.name} wurden entmutet.`);
      }
    }
    else {
      if (!msg.member.voice) {msg.reply('Fehler.'); console.log(msg.member);}
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
  }

  //Homework modify
  else if (msg.content.startsWith('=hw_mod')){
    if (msg.author.username !== 'Prawin1234') {msg.reply('Wie wagst du es nur, diesen Befehl auszuführen?'); msg.react('😡');}
    else {
      var command = msg.content.split(' ');
      var [,subject,input,type] = command;
      try {
        var out = hw.modifyHomework(subject,input,type);
        client.channels.get(msg.channel.id).send(out);
      } catch (error) {
        client.channels.get(msg.channel.id).send(error);
      }
    }
  }

  //dev Section
  else if (msg.content === '=dev_testfor module') {
    try {
      let {confirmation} = require(__dirname+'/constants.js');
      msg.reply(confirmation);
    } catch (e) {
      msg.reply(e);
    }
  }

  /*else if (msg.content === '=dev'){
    let code = msg.content.split(' ');
    try {
      eval(code[1])
    } catch (error) {
      msg.reply(error);
    }
  }*/
  /*else if (msg.content.startsWith('=punish')) {
    let message = msg.content.split(' ');
    console.log(message);
    let [,name,points,reason] = message;
    client.channels.get(msg.channel.id).send(db.punish(name, points, reason));
  }*/
});


// künstlicher Webhook
app.get('/send', function(req, res) {
    m = req.query.m;
    client.channels.get(CHANNEL_ID).send(m);
    res.send("OK \n Message: " + m + " sent into channel.");
});

//Stundenplan bot
app.get('/bot', function(req, res) {
    var time = req.query.time;
    var index = new Date();
    index = index.getDay() - 1;
    var message = constants.LESSONS["starts"+time][index];
    if (message !== "stop") {
      client.channels.get(CHANNEL_ID).send(message);
    }
    res.send(message);
});

app.get('/', function(req, res) {
    res.send("200 OK");
});

//bot starten
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
client.login('Njg4MDU5NTc2NzgzNzMyODM3.Xmu7sA.ig2LSYmh0GqfJu0_tt3ZZ2-Xcc4');
