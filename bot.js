const Discord = require('discord.js');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

       }

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env."Njg4MDU5NTc2NzgzNzMyODM3.Xmu7sA.ig2LSYmh0GqfJu0_tt3ZZ2-Xcc4");//BOT_TOKEN is the Client Secret