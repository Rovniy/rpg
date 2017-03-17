/**
 * Created by Ravy on 17.03.2017.
 */
//DB server: smartf.beget.tech
//DB name: smartf_rpg
//DB pass: %c4nHn*f
'use strict';

var mysql = require('mysql');

var dbClient, 
    dbConfig = {
    host: 'smartf.beget.tech',
    user: 'smartf_rpg',
    password: '%c4nHn*f',
    database: 'smartf_rpg'
};

/**
 * Создание подключение к серверу. Переподключение при потере соединения
 */
function handleDisconnect() {
    dbClient = mysql.createConnection(dbConfig);
    dbClient.connect(function(err) {
        if(err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log('Connect to DB successful');
        }
    });

    dbClient.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}
handleDisconnect();

function db(query) {
    dbClient.query(query, function(error, result, fields){
        console.log('DB response: ', result[0]);
    });
}

db('SELECT * FROM users');