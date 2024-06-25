import cipher from './cipher.js';
// Se realiza el uso del metodo addEventListener("DOMContentLoaded") para realizar una carga en nuestro DOM antes del script
document.addEventListener("DOMContentLoaded", function() {

    // Manejo de la página de index.html
    // Creamos una variable para almacenar y manejar el formulario de registro en index.html
    var registroForm = document.getElementById('registroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', function(event) { // Volvemos a usar addEventListener pero con nuestro id "Submit"
            event.preventDefault(); // Evitar que el formulario se envíe

            var nickname = document.getElementById('nickname').value;
            if (nickname) {
                // Almacenar el nickname en el almacenamiento local
                localStorage.setItem('nickname', nickname);
                // Redirigir a la página de la trivia
                window.location.href = 'azul.html';
            } else {
                alert('Por favor, ingresa un nickname.');
            }
        });
    }
   
})
    //Manejo de la página de trivia.html
    var Saludo = document.getElementById('bienvenida');
    if (Saludo) {
        var nickname = localStorage.getItem('nickname');

        if (nickname) {
            // Mostrar un saludo personalizado con el nickname
            Saludo.textContent = '   Bienvenid@  ' + nickname +'  !!!';
        } else {
            // Redirigir al usuario a la página de registro si no se ha registrado
            window.location.href = '../index.html';
        }
    }

    // Limpiar nickname
    // var limpiarNicknameBtn = document.getElementById('limpiarNickname');
    // if (limpiarNicknameBtn) {
    //     limpiarNicknameBtn.addEventListener('click', function() {
    //         // Limpiar el nickname almacenado en el almacenamiento local
    //         localStorage.removeItem('nickname');
    //         window.location.href = '../azul.html';
    //         alert('Nickname limpiado.');
    //     });
    // }

//Selectors
const limpiar=document.getElementById("btnlimpiar");
const txtMsg = document.getElementById("msg");
const count = document.getElementById("counter");
const botonQr=document.getElementById("btnQr");
const contenedorqr=document.getElementById("codigo-qr");
// const offset = document.getElementById('offset');
const btnCipher = document.getElementById("cipher");
const btnDecipher = document.getElementById("decipher");
const lblMsgResult = document.getElementById("lblMsgResult");
const txtMsgResult = document.getElementById("msgResult");
const btnCopy = document.getElementById("copy");
const modalC = document.getElementsByClassName("modalContainer")[0];
const modal = document.getElementsByClassName("modal")[0];
const close = document.getElementById("close");

//EventListeners
/******Limit characters******/
txtMsg.addEventListener("keyup", () =>{
    count.innerHTML = txtMsg.value.length + "/280";
});

/*******Function cifrado*****/
btnCipher.addEventListener("click",()=>{
    if(txtMsg.value == ""){
        alert("Ingresa tu mensaje secreto.");
    }
    else{
        lblMsgResult.innerHTML = "Su mensaje cifrado es ";
        let msgResult = cipher.encode(parseInt(20),txtMsg.value);
        txtMsgResult.innerHTML = msgResult;
        openModal();
    }
});

/******Funcion decifrar*******/
btnDecipher.addEventListener("click",()=>{
    if(txtMsg.value == ""){
        alert("Ingresa tu mensaje secreto.");
    }
    else{
        lblMsgResult.innerHTML = "Su mensaje descifrado es ";
        let msgResult = cipher.decode(parseInt(20),txtMsg.value);
        txtMsgResult.innerHTML = msgResult;
        openModal();
    }
});
/******funcion para crear QR********/ 
botonQr.addEventListener("click",()=>{
    if(txtMsg.value == ""){
        alert("Ingresa tu mensaje.");
     }
     else{ 

        var qrc = new QRCode(contenedorqr,txtMsg.value);
        clearMsg();
        contenedorqr.innerHTML.getElementById.value=qrc;
        

     }

});
/******limpiar el qr******/
limpiar.addEventListener("click",()=>{
     contenedorqr.innerHTML="";

  });


/***** * Copiar mensaje cifrado o decifrado****** */
btnCopy.addEventListener("click",()=>{
    txtMsgResult.select();
    document.execCommand("copy");
    setTimeout(()=>{
        btnCopy.textContent = "Copiado!";
    }, 100);
});

/*********** eventos de la ventana emergente***********/
close.addEventListener("click",()=>{
    closeModal();
});

window.addEventListener("click",(e)=>{
    if(e.target == modalC){
        closeModal();
    }
});

/********Funciones extras para el manejo de limpiar datos ***********/
function openModal(){
    modalC.classList.remove("containerClose");
    modal.classList.remove("modalClose");
}

function closeModal(){
    modal.classList.add("modalClose");
    clearMsg();
    setTimeout(()=>{
        btnCopy.innerHTML = "<i class='fas fa-copy'></i> Copiar";
        modalC.classList.add("containerClose");
    }, 550);
}

function clearMsg(){
    txtMsg.value = "";
    txtMsg.innerHTML = "";
    count.innerHTML = "0/280";
    
}




