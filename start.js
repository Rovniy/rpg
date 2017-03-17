/**
 * Created by Ravy on 17.03.2017.
 */
/**
 * Сборка всего сервера и его частей в единый механизм
 */
require('./server/services/db-connect.js');
require('./server/http.server.js');
require('./server/websockets.js');