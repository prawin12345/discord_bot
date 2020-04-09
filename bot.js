const Discord = require('discord.js');
const client = new Discord.Client();
var express = require('express');
const https = require('https');
var app = express();
const PORT = process.env.PORT;
var sp  = `
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
`
var sp = "```PHP" + sp + "```"

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '=sp') {
    msg.reply(sp);
  }
  else if (msg.content === '=help') {
    msg.reply("\n =sp   sendet den Stundenplan");
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
