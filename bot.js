const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  client.channels.get('687937985852866603').send(req.headers['x-forwarded-for']);
});

client.login('Njg4MDU5NTc2NzgzNzMyODM3.Xmu7sA.ig2LSYmh0GqfJu0_tt3ZZ2-Xcc4');