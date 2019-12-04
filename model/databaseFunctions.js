var mysql = require('mysql2');
var mysqlpromise = require('mysql2/promise');

exports.databaseFunctions = function () {
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'root'
        });

    function connect() {
        con.connect(function (err, result) {
            if (err) throw err;
            console.log("Connected!");
            createDatabase();
        });
    }

    function createDatabase() {
        // Query 1
        con.query("CREATE DATABASE runes", function (err, result) {
            if (err) { console.log("Db creation failed."); throw err; }
            console.log("Database created.");

            con = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                database: 'runes'
            });

            con.connect(function (err, result) {
                if (err) throw err;
                console.log("Connected!");
                createTable();
            });
        });
    }

    function createTable() {
        // Query 3
        var sql = "CREATE TABLE rune (name VARCHAR(255), levelreq INT, description VARCHAR(255))";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table " + "rune" + " created. ");
            insert();
        });
    }

    function insert() {
        var sql = "INSERT INTO " + "rune" + " (name, levelreq) VALUES ?";
        var values = [
            ['Jah', 1],
            ['Ber', 1],
            ['Zod', 3],
            ['Ist', 5],
            ['Ler', 6],
            ['Mal', 3],
            ['Ko', 6],
            ['Lo', 6],
            ['Tir', 4],
            ['Vicky', 33],
            ['Ben', 3],
            ['William', 5],
            ['Chuck', 6],
            ['Viola', 3]
        ];

        con.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
            process.exit(); // Uden denne vil eksekveringen ikke stoppe. 
            res.end();
        });
    }

    connect();
}

exports.databaseFunctionsPromises = async function () {
    let connection;
    try {
        connection = await mysqlpromise.createConnection({
            host: "localhost",
            user: "root",
            password: ""
        });
 
        let queryCreateDatabase = "CREATE DATABASE runes";
        await connection.query(queryCreateDatabase);
        connection.end();
 
        connection = await mysqlpromise.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "runes"
        });

        let queryCreateTable = 'CREATE TABLE rune (name VARCHAR(255), levelreq INT, description VARCHAR(255))';
        await connection.query(queryCreateTable);
        
        var sql = "INSERT INTO " + "rune" + " (name, levelreq) VALUES ?";
        var values = [
            ['Jah', 1],
            ['Ber', 1],
            ['Zod', 3],
            ['Ist', 5],
            ['Ler', 6],
            ['Mal', 3],
            ['Ko', 6],
            ['Lo', 6],
            ['Tir', 4],
            ['Vicky', 33],
            ['Ben', 3],
            ['William', 5],
            ['Chuck', 6],
            ['Viola', 3]
        ];
        
        await connection.query(sql, [values]);
    } catch (e) {
        throw e;
    } finally {
        if (connection)
            connection.end();
    }
};


exports.appendTable = async function () {

    let connection = await mysqlpromise.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "runes"
    });

    var sql = "SELECT * FROM rune";
    let result = await connection.query(sql);
    return result;
}



