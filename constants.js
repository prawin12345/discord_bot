const TIMETABLE  = "```PHP" + `
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
` + "```";
const LESSONS = {
  starts0745: [ "Die Klassenstunde beginnt.",
                "La leçon de français a commencé, donnez un pouce.",
                "Geschichte hat begonnen.",
                "Die Musik-Lektion hat begonnen.",
                "stop"],
  starts0840: [ "stop",
                "The English lesson hat started, like the message.",
                "Die Geometrie-Stunde hat begonnen",
                "Die Bio-Stunde beginnt vielleicht.",
                "La leçon de français a commencé, donnez un pouce."],
  starts0935: [ "Alegbra fängt an.",
                "Die Geometrie-Stunde hat begonnen.",
                "Die künsterlisch weiterbildende Doppellektion beginnt.",
                "Die Stunde mit spannendstem Inhalt nimmt ihren Anfang.",
                "The English lesson hat started, like the message."],
  starts1035: [ "La leçon de français a commencé, donnez un pouce.",
                "Schmidtpeter ruft zur Stunde, kommt!",
                "stop",
                "stop",
                "Die Geometrie-Stunde hat begonnen."],
  starts1130: [ "Die Musik-Lektion hat begonnen.",
                "Die Stunde mit spannendstem Inhalt nimmt ihren Anfang.",
                "Die Bio-Stunde beginnt vielleicht.",
                "Alegbra fängt an.",
                "stop"],
  starts1320: [ "stop",
                "Der Konferenz des Sportunterrichts ist teilzunehmen.",
                "stop",
                "La leçon de français a commencé, donnez un pouce.",
                "Die Stunde mit spannendstem Inhalt nimmt ihren Anfang."],
  starts1415: [ "Die Stunde mit spannendstem Inhalt nimmt ihren Anfang.",
                "stop",
                "stop",
                "Geschichte hat begonnen.",
                "Schmidtpeter ruft zur Stunde, kommt!"],
  starts1510: [ "stop",
                "stop",
                "stop",
                "The English lesson hat started, like the message.",
                "!clear-all-infractions"]
}
const CHANNEL_ID = '687937985852866603';

exports.confirmation = "module erfolgreich geladen";
