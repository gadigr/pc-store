/**
 * Created by gadi on 12/27/2015.
 */
module.exports = function (io) {
    io.on('connection', function (socket) {
        socket.on('message', function (from, msg) {

            io.sockets.emit('broadcast', {
                payload: msg,
                source: from
            });

        });
    });
};