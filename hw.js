
function modifyHomework(msg, subject, input, type) {
    fs = require('fs');
    fs.readFile(__dirname+'/hw.json', (err, file) => {
        if (err) return msg.reply(err);
        var hw = JSON.parse(file);
        if (hw[subject] == null) return msg.reply("Hausaufgabe mit diesem Fach nicht gefunden.");
        else if (input == null) return msg.reply("Unvollständige Eingabe");
        type = type || "doTime";
        if (type !== "doTime" && type !== "forTime") return msg.reply("Ungültige Eingabe für Datentyp");
        hw[subject][type] = input;
        fs.writeFile(__dirname+'/hw.json', JSON.stringify(hw, null, '\t'), (err) => {
            if (err) return msg.reply(err);
        });
        return "test";
    })
}

function addHomework(msg, subject, forTime, doTime) {
    fs = require('fs');
    fs.readFile(__dirname+'/hw.json', (err, file) => {
        if (err) return msg.reply(err);
        var hw = JSON.parse(file);
        if (subject == null || forTime == null || doTime == null) return msg.reply("Unvollständige Eingabe");
        if (hw[subject] !== null) return msg.reply("Fach existiert schon");
        hw[subject] = {forTime: forTime, doTime: doTime}
        fs.writeFile(__dirname+'/hw.json', JSON.stringify(hw, null, '\t'), (err) => {
            if (err) return msg.reply(err);
        })
        return "test";
    })
}

function showHomework(msg) {
    fs = require('fs');
    fs.readFile(`${__dirname}hw.json`, (err, file) => {
        if (err) return msg.reply(err);
        var hw = JSON.parse(file);
        for (let subject in hw) {
            msg.reply(`${hw[subject]} auf ${hw[subject]["forTime"]} am ${hw[subject]["doTime"]}`);
        }
        return "test";
    })
}

exports.modifyHomework = modifyHomework;
exports.addHomework = addHomework;
exports.showHomework = showHomework;