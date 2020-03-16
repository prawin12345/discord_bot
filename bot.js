const Discord = require('discord.js');
const client = new Discord.Client();
var express = require('express');
const https = require('https');
var app = express();
const PORT = process.env.PORT;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'Bonjour') {
    msg.reply('Bonjour!');
    var link = 'https://prawin.gq/on?user='+msg.author.username;
    console.log(link);

    https.get(link, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {console.log(JSON.parse(data).explanation);});
    }).on("error", (err) => {console.log("Error: " + err.message);});
  }
});


// respond with "hello world" when a GET request is made to the homepage
app.get('/send', function(req, res) {
    var m = decodeURI(m);
    m = req.query.m;
    client.channels.get('687937985852866603').send(m);
    res.send("OK \n Message: " + m + " sent into channel.");
});

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
client.login('Njg4MDU5NTc2NzgzNzMyODM3.Xmu7sA.ig2LSYmh0GqfJu0_tt3ZZ2-Xcc4');
