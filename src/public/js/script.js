const socket = io();

const chatBox = document.querySelector('#chatBox')

Swal.fire(
    {title:'Identifícate',
     text:'¿Quién eres?',
     input:'text',
     icon:'question',
     inputValidator: (value)=>{
     return !value && 'Pro favor, escribe tu nombre'
    },
    allowOutsideClick: false,
    }).then(result=>{
        user = result.value
        console.log({user})
        socket.emit('new-user', {user})
    })

    //Aquí se va a recibir la info del id messageLogs
    socket.on('messageLogs', (data) => {
        const log = document.querySelector('#messageLogs')
        const messages = data
        .map((mes) => `<p>${mes.user} dice: ${mes.message}</p>`)
        .join('')
        log.innerHTML = messages
    })

    socket.on('user_connected', (data) => {
        Swal.fire({
            title: 'Nuevo usuario conectado',
            text: `${data.user} se acaba de conectar`,
            toast: true,
            position: 'top-right'
        })
    })
   

chatBox.addEventListener('keyup',event => {
    if(event.key === "Enter"){
        if(chatBox.value.trim().length > 0){
            socket.emit("message", {  //Aquí se manda el mensaje con el user y el message que es el chatBox
                user: user, message: chatBox.value
            })
            chatBox.value= ""  //Aquí se resetea el campo
        }
    }
})
