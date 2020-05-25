
function modifyHomework(msg, subject, input, type) {
    fs = require('fs');
    fs.readFile(__dirname+'/hw.json', (err, file) => {
        if (err) console.log(err);
        var hw = JSON.parse(file);
        if (hw[subject] == null) return msg.reply("Hausaufgabe mit diesem Fach nicht gefunden.");
        else if (input == null) return msg.reply("Unvollständige Eingabe");
        type = type || "doTime";
        if (type !== "doTime" && type !== "forTime") return msg.reply("Ungültige Eingabe für Datentyp");
        hw[subject][type] = input;
        fs.writeFile(__dirname+'/hw.json', JSON.stringify(hw, null, '\t'), (err) => {
            if (err) return console.log(err);
        });
        sendData(JSON.stringify(hw, null, '\t'));
        showHomework(msg);
        return;
    })
}

function addHomework(msg, subject, forTime, doTime) {
    fs = require('fs');
    fs.readFile(__dirname+'/hw.json', (err, file) => {
        if (err) return console.log(err);
        var hw = JSON.parse(file);
        if (subject == null || forTime == null || doTime == null) return msg.reply("Unvollständige Eingabe");
        s = hw[subject];
        if (typeof s !== "undefined") { console.log(typeof s); return msg.reply("Fach existiert schon");}
        hw[subject] = {forTime: forTime, doTime: doTime}
        fs.writeFile(__dirname+'/hw.json', JSON.stringify(hw, null, '\t'), (err) => {
            if (err) return console.log(err);
        });
        sendData(JSON.stringify(hw, null, '\t'));
        showHomework(msg);
        return;
    })
}

function showHomework(msg) {
    fs = require('fs');
    fs.readFile(`${__dirname}/hw.json`, (err, file) => {
        if (err) return console.log(err);
        var hw = JSON.parse(file);
        for (let subject in hw) {
            msg.reply(`${subject} auf ${hw[subject]["forTime"]} am ${hw[subject]["doTime"]}`);
        }
        return;
    })
}

function removeHomework(msg, subject) {
    fs = require('fs');
    fs.readFile(`${__dirname}/hw.json`, (err, file) => {
        if (err) return console.log(err);
        if (hw[subject] == null) return msg.reply("Hausaufgabe mit diesem Fach nicht gefunden.");
        var hw = JSON.parse(file);
        delete hw[subject];
        fs.writeFile(__dirname+'/hw.json', JSON.stringify(hw, null, '\t'), (err) => {
            if (err) return console.log(err);
        });
        sendData(JSON.stringify(hw, null, '\t'));
        return;
    })
}

function sendData(hw) {
    const { Client } = require('pg');
    const client = new Client({
        connectionString: process.env.HEROKU_POSTGRESQL_BLACK_URL,
        ssl: {
          rejectUnauthorized: false
        }
    }); 
    client.connect();

    queryStr = `INSERT INTO "Json" ("name","data") values ('hw','${hw}');`;
    client.query(queryStr, (err, res) => {
        if (err) console.log(err);
        if (res) console.log(res);
    });
}

exports.modifyHomework = modifyHomework;
exports.addHomework = addHomework;
exports.showHomework = showHomework;
exports.removeHomework = removeHomework;