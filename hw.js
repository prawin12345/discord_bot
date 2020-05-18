fs = require('fs');
function modifyHomework(msg, subject, input, type) {
    fs.readFile(__dirname+'/hw.json', (err, file) => {
        if (err) return msg.reply(err);
        var hw = JSON.parse(file)
        subject = hw[subject];
        if (subject == null) return msg.reply("Hausaufgabe mit diesem Fach nicht gefunden.");
        else if (input == null) return msg.reply("Unvollständige Eingabe");
        type = type || "do";
        if (type !== "do" && type !== "for") return msg.reply("Ungültige Eingabe für Datentyp");
        hw[subject][type] = input;
        fs.writeFile(__dirname+'/hw.json', JSON.parse(hw, null, '\t'), (err) => {
            if (err) return msg.reply(err);
        });
        console.log(hw);
        return msg.reply(JSON.parse(hw, null, '\t'));
    })
}
exports.modifyHomework = modifyHomework;