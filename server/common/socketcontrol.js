


module.exports = function(io){
    io.sockets.on("connection", function(socket){

        socket.on("connect", function(){
            console.log("user-connect")

        });



        //disconnect
        socket.on("disconnect", function(){
            console.log('user-disconnect')
        });
    });
}