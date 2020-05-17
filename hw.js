
function modifyHomework(subject, input, type) {
    fs.readFile(__dirname+'/hw.json', (err, file) => {
        if (err) return err;
        var hw = JSON.parse(file)
        subject = hw[subject];
        if (subject == null) return "Hausaufgabe mit diesem Fach nicht gefunden.";
        else if (input == null) return "Unvollständige Eingabe";
        type = type || "do";
        if (type !== "do" && type !== "for") return "Ungültige Eingabe für Datentyp";
        hw[subject][type] = input;
        fs.writeFile(__dirname+'/hw.json', JSON.parse(hw, null, '\t'), (err) => {
            if (err) return err;
        });
    })
}