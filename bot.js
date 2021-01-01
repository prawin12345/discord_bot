const { CommandoClient } = require('discord.js-commando');
const path = require('path');
var express = require('express');
var app = express();
var constants = require(`${__dirname}/constants.js`);
var hw = require(`${__dirname}/hw.js`);

// const client = new Discord.Client();
const client = new CommandoClient({
	commandPrefix: '=',
	owner: '643544677202526210',
});
const PORT = process.env.PORT;
const CHANNEL_ID = constants.CHANNEL_ID;

//Bot einloggen
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//Aktionen beim Versender einer Nachricht
client.on('message', msg => {

  //Stundenplan
  if (msg.content === '=sp') {
    client.channels.cache.get(msg.channel.id).send(constants.TIMETABLE);
  }

  //Ping-Test
  else if (msg.content === '=test') {
    client.channels.cache.get(msg.channel.id).send("test ok \n");
  }

  //alle muten
  else if (msg.content === '=mute') {
      if (msg.member.hasPermission('MUTE_MEMBERS')){
        if (msg.member.voice.channel == null) {
          msg.reply('Du musst dafür in einem voiceChannel sein.');
        }
        else {
          let channel = msg.member.voice.channel;
          for (let member of channel.members) {
              member[1].voice.setMute(true, "Aufgrund einer Konferen o. Ä. wurden alle gemutet.");
          }
          client.channels.cache.get(msg.channel.id).send(`:mute: Alle im Channel ${channel.name} wurden gemutet.`);
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
      if (msg.member.voice.channel == null) {
        msg.reply('Du musst dafür in einem voiceChannel sein.');
      }
      else {
        let channel = msg.member.voice.channel;
        for (let member of channel.members) {
            member[1].voice.setMute(false);
        }
        client.channels.cache.get(msg.channel.id).send(`:loud_sound: Alle im Channel ${channel.name} wurden entmutet.`);
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
        hw.modifyHomework(msg, subject,input,type);
    }
  }

  else if (msg.content.startsWith('=hw_add')) {
    if (msg.author.username !== 'Prawin1234') {msg.reply('Wie wagst du es nur, diesen Befehl auszuführen?'); msg.react('😡');}
    else {
      var command = msg.content.split(' ');
      var [,subject, forTime, doTime] = command;
      hw.addHomework(msg, subject, forTime, doTime);
    }
  }

  else if (msg.content.startsWith('=hw_rm')) {
    if (msg.author.username !== 'Prawin1234') {msg.reply('Wie wagst du es nur, diesen Befehl auszuführen?'); msg.react('😡');}
    else {
      var command = msg.content.split(' ');
      var [,subject] = command;
      hw.removeHomework(msg, subject);
    }
  }

  else if (msg.content === '=hw_list') {
    hw.showHomework(msg);
  }

  //play sound
  else if (msg.content === '=w') {
    if (msg.author.username !== 'Prawin1234') {msg.reply('Wie wagst du es nur, diesen Befehl auszuführen?'); msg.react('😡');}
    else {
      var channel = msg.member.voice.channel;
      channel.join().then(connection => {
        let dispatcher = connection.play(__dirname+'/was.mp3');
        console.log(dispatcher);
      })
    }
  }

  else if (msg.content === '=b') {
    if (msg.author.username !== 'Prawin1234') {msg.reply('Wie wagst du es nur, diesen Befehl auszuführen?'); msg.react('😡');}
    else {
      var channel = msg.member.voice.channel;
      channel.join().then(connection => {
        let dispatcher = connection.play(__dirname+'/bruh.mp3');
        console.log(dispatcher);
      })
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

});


// künstlicher Webhook
app.get('/send', function(req, res) {
    m = req.query.m;
    client.channels.cache.get(CHANNEL_ID).send(m);
    res.send("OK \n Message: " + m + " sent into channel.");
});

//Stundenplan bot
app.get('/bot', function(req, res) {
    var time = req.query.time;
    var index = new Date();
    index = index.getDay() - 1;
    var message = constants.LESSONS["starts"+time][index];
    if (message !== "stop") {
      client.channels.cache.get(CHANNEL_ID).send(message, {tts: true});
    }
    res.send(message);
});

app.get('/mute', function(req, res) {

})

app.get('/', function(req, res) {
    res.send("200 OK");
});

//bot starten
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
client.login(process.env.BOT_TOKEN);
