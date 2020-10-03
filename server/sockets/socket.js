const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (cliente) => {

    cliente.on('siguienteTicket', (data, callback) =>{
        let siguiente = ticketControl.siguienteTicket();
        console.log(siguiente);
        callback(siguiente);
    });

    // Emitir evento 'estadoActual'
    cliente.emit('ticketActual', {
        ticketActual: ticketControl.getTicketActual(),
        ultimos4: ticketControl.getUltimos4()
    });

    cliente.on('atenderTicket', (data, callback) => {
        if(!data.escritorio){
            return callback({
                error: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // Actualizar/notificar cambios en los ultimos 4 tickets

        cliente.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });
    });

});