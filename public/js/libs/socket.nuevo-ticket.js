// Comando para establecer la conexion (comunicacion activa)
var socket = io();

const label = $('#lblNuevoTicket');

socket.on('connect', function(){
    console.log('Conectado al servidor');
});

socket.on('disconnect', function(){
    console.log('Conexión perdida con el servidor');
});

socket.on('ticketActual', function(resp){
    console.log(resp);
    label.text(resp.ticketActual);
});

$('button').on('click', function(){
    socket.emit('siguienteTicket', null, function(siguienteTicket){
        label.text(siguienteTicket);
    });
});