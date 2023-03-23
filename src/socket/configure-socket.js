import { Server } from 'socket.io';
const messages = [] //es nuestra base de datos de los mensajes, en este caso vacía


export default function configureSocket(httpServer) {
  const io = new Server(httpServer);
  io.on('connection', (socket) => {
    console.log('new connection:', socket.id);

    //El servidor escucha con el ID message
    socket.on('message', data=>{
      console.log('message:', (data))
      messages.push(data)  //Aquí se guarda la info que se recibe del cliente en el id message, que se almacenó en la variable data
      console.log('mensajes:', {messages})
      //Ahora se va a mandar un mensaje con el id messageLogs, el contenido serán los mensajes almacenados en messages del socket anterior ↑
      io.emit('messageLogs', messages)
    })
    socket.on('new-user',(data)=> {
      console.log('new user:', data)
      socket.emit('messageLogs', messages)
      socket.broadcast.emit('user_connected', data )
    })
  });
}
