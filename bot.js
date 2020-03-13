const Discord = require('discord.js');
const client = new Discord.Client();
var express = require('express');
var app = express();
const PORT = process.env.PORT

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  client.channels.get('687937985852866603').send(req.headers['x-forwarded-for']);
});

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
client.login('Njg4MDU5NTc2NzgzNzMyODM3.Xmu7sA.ig2LSYmh0GqfJu0_tt3ZZ2-Xcc4');