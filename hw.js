
function modifyHomework(msg, subject, input, type) {
    getData((hw) => {
        hw = JSON.parse(hw);
        if (hw[subject] == null) return msg.reply("Hausaufgabe mit diesem Fach nicht gefunden.");
        else if (input == null) return msg.reply("Unvollständige Eingabe");
        type = type || "doTime";
        if (type !== "doTime" && type !== "forTime") return msg.reply("Ungültige Eingabe für Datentyp");
        hw[subject][type] = input;
        sendData(JSON.stringify(hw));
        showHomework(msg);
    });
}

function addHomework(msg, subject, forTime, doTime) {
    getData((hw) => {
        hw = JSON.parse(hw);
        if (subject == null || forTime == null || doTime == null) return msg.reply("Unvollständige Eingabe");
        s = hw[subject];
        if (typeof s !== "undefined") { console.log(typeof s); return msg.reply("Fach existiert schon");}
        hw[subject] = {forTime: forTime, doTime: doTime}
        sendData(JSON.stringify(hw));
        showHomework(msg);
    });
}

function showHomework(msg) {
    getData((hw) => {
        console.log(hw);
        var hw = JSON.parse(hw);
        console.log(hw);
        for (let subject in hw) {
            msg.reply(`${subject} auf ${hw[subject]["forTime"]} am ${hw[subject]["doTime"]}`);
        }
    });
}

function removeHomework(msg, subject) {
    getData((hw) => {
        hw = JSON.parse(hw);
        if (hw[subject] == null) return msg.reply("Hausaufgabe mit diesem Fach nicht gefunden.");
        var hw = JSON.parse(file);
        delete hw[subject];
        sendData(JSON.stringify(hw));
    });
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

    queryStr = `UPDATE "Json" SET "data" = '${hw}' WHERE "name" = 'hw';`;
    client.query(queryStr, (err, res) => {
        if (err) console.log(err);
        if (res) {
            console.log(JSON.parse(res.rows[0].data));
        }
    });
}

function getData(func) {
    const { Client } = require('pg');
    const client = new Client({
        connectionString: process.env.HEROKU_POSTGRESQL_BLACK_URL,
        ssl: {
          rejectUnauthorized: false
        }
    }); 
    client.connect();

    queryStr = `SELECT "data" FROM "Json" WHERE "name" = 'hw';`;
    var hw;
    client.query(queryStr, (err, res) => {
        if (err) console.log(err);
        if (res) {
            hw = res.rows[0].data; /*return res.rows[0].data;*/
            func(hw);
        }
    });
    console.log(hw);
    return hw;
}

exports.modifyHomework = modifyHomework;
exports.addHomework = addHomework;
exports.showHomework = showHomework;
exports.removeHomework = removeHomework;