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
            console.log('DB-CONNECT: error connection:', err);
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log('DB-CONNECT: connect successfully');
        }
    });

    dbClient.on('error', function(err) {
        //console.log('DB-CONNECT: connection lose', err);
        console.log('DB-CONNECT: connection lose');
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
        console.log('DB-CONNECT: response: ', result[0]);
    });
}

db('SELECT * FROM users');