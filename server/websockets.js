/**
 * Created by Ravy on 17.03.2017.
 */
'use strict';
const WebSocketServer = new require('ws');

var clients = {}; // подключенные клиенты

/**
 * Создание WebSocket сервера
 * @type {*|Server}
 */
var webSocketServer = new WebSocketServer.Server({port: 8081});
webSocketServer.on('connection', function(ws) {
    console.log("Socket.service activated");
    
    var userId = guid();
    clients[userId] = ws;
    console.log("Новое соединение. UserID: " + userId);

    messageWs(ws,userId); //Отслеживание новых сообщений

    closeWs(ws, userId); //Отработка прерывания WS соединения

});

/**
 * Отслеживание новых сообщений
 */
function messageWs(ws,userId) {
    ws.on('message', function(message) {
        console.log('WS (in): ' + message);

        wsSend(message, userId);

    });
}

/**
 * Отправка сообщение всем или адруссату
 * @param message - тело сообщение
 * @param userId - ID поьзователя
 */
function wsSend(message, userId){
    if (userId){
        clients[userId].send('Это твое сообщение');
    } else {
        for(var key in clients) {
            clients[key].send(message);
        }
    }
}


/**
 * Отработка прерывания WS соединения
 */
function closeWs(ws, id) {
    ws.on('close', function(resolve) {
        console.log('соединение закрыто ' + id, resolve);
        delete clients[id];
    });
}

/**
 * Создание userId
 * @returns {string} - user Id
 */
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4();
}
