// Se realiza el uso del metodo addEventListener("DOMContentLoaded") para realizar una carga en nuestro DOM antes del script
// document.addEventListener("DOMContentLoaded", function() {

//     // Manejo de la página de index.html
//     // Creamos una variable para almacenar y manejar el formulario de registro en index.html
//     var registroForm = document.getElementById('registroForm');
//     if (registroForm) {
//         registroForm.addEventListener('submit', function(event) { // Volvemos a usar addEventListener pero con nuestro id "Submit"
//             event.preventDefault(); // Evitar que el formulario se envíe

//             var nickname = document.getElementById('nickname').value;
//             if (nickname) {
//                 // Almacenar el nickname en el almacenamiento local
//                 localStorage.setItem('nickname', nickname);
//                 // Redirigir a la página de la trivia
//                 // window.location.href = 'paginas/trivia.html';
//                 window.location.href = '../index.html';
//             } else {
//                 alert('Por favor, ingresa un nickname.');
//             }
//         });
//     }
// });
document.querySelector("html")