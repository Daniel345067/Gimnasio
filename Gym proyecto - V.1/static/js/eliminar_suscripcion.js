document.addEventListener("DOMContentLoaded", function (){

    if (document.getElementById("frmE_susc")){
        eliminarSuscripcion()
    }

    
    function eliminarSuscripcion() {
        const entrada = document.getElementById("frmE_susc");
    
        if (entrada) {
            entrada.addEventListener("submit", function (event) {
                event.preventDefault();
    
                let inputValor = document.getElementById('input_correosus').value.trim();
                console.log("Correo enviado:", inputValor);
    
                if (!inputValor) {
                    Swal.fire({
                        icon: "error",
                        title: "Por favor ingrese un correo válido,\nrecuerde que el usuario no debe registrar suscripciones",
                    });
                    return;
                }
            
    
                fetch(`http://127.0.0.1:5000/eliminarS/usuario_correo/${inputValor}`, {
                    method: 'DELETE'
                })
                .then(datos => {
                    if (!datos.ok) {
                        throw new Error('Error en la solicitud');
                    }
                    return datos.json();
                })
                .then(respuesta => {
                    Swal.fire({
                        title: respuesta.mensaje
                    });
                    document.getElementById('input_correosus').value = "";
                })
                .catch(error => {
                    console.error("Error al eliminar:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Error al eliminar la suscripción",
                    });
                });
            });
        }
    }


})