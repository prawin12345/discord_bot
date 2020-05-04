const { Client } = require('pg');

function punish(name, points, reason) {

    //database credentials
    const client = new Client({
        connectionString: 'postgres://zgvvytdjsnpskn:c8cf5046e20d9c85e0a2e8c47373dce39e3647ad27971421892f341ca6235df9@ec2-54-217-204-34.eu-west-1.compute.amazonaws.com:5432/dci0ac44on9q5j',
        ssl: true,
    });

    //validate inputs
    points = parseInt(points, 10)
    if (typeof name !== 'string') return "Ungültige Eingabe für \"Name\"";
    else if (isNaN(points)) return "Ungültige Eingabe für \"Punkte\"";
    else if (reason == null) var reason = "n. a.";

    //connect to database
    client.connect();
    
client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });

    //check if name exists in database
    let sql = `SELECT points FROM public.discord WHERE name='${name}' AND time='current'`;
    client.query(sql, function (err, result) {
        if (err) return err;
        else if (isNaN(parseInt(result, 10))) return "Name wurde nicht gefunden";
    });

    //do INSERT query
    var time = new Date();
    time = time.toISOString();

    sql = `INSERT INTO public.discord (time, name, points, reason) VALUES (${time}, ${name}, ${points}, ${reason})`;
    client.query(sql, function (err, result) {
        if (err) return err;
    });

    //sum up all punishments
    var totalPoints;
    sql = `SELECT SUM(points) FROM public.discord WHERE NOT time='current' AND name='${name}'`;
    client.query(sql, function (err, result) {
        if (err) return err;
        else if (isNaN(parseInt(result, 10))) return "Error: Summe der Punkte ist keine Zahl";
        
        totalPoints = parseInt(result, 10);
    });

    //update current value
    sql = `UPDATE public.discord SET points=${totalPoints} WHERE name='${name}' AND time='current'`;
    client.query(sql, function (err, result) {
        if (err) return err;
    });

    client.end();
    return `Der Puntestand von ${name} wurde um ${points} geändert (Grund: ${reason}).`;

}

//export functions
exports.punish = punish;
