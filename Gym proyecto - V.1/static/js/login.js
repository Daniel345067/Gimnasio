document.addEventListener('DOMContentLoaded', function(){
    if (document.getElementById("frmLogin")){
        login ()
    }

    function login(){
        // Lectura de formulario 
        const entrada=document.getElementById("frmLogin")

        if (entrada){
            entrada.addEventListener("submit", function (event) {
                event.preventDefault() // se crea un evento al dar click en el boton del formulario 
                
                // Atrapa los valores de los inputs del formulario
                const correoRU=document.getElementById('correoRU').value.trim();
                const passwordU=document.getElementById('passwordU').value.trim();

                //Validación de datos ingresados, para que no se envien datos vacios
                if (!correoRU || !passwordU){
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Por favor ingrese un correo y contraseña válidos",
                    })
                    return
                }
        
                // Envia los datos atrapados al bakend para su validación
                fetch("http://127.0.0.1:5000/login",{
                    method: 'POST',
                    headers:{
                        'Content-Type':'application/json'
                        },
                        body:JSON.stringify({correo:correoRU,password:passwordU})

                }) 
                .then(respuesta => respuesta.json ())
                .then (data=> {
                    if (data.acceso){
                        Swal.fire({
                            icon: "success",
                            text: "Inicio de sesión exitoso",
                            confirmButtonColor: 'orange',
                            TimeRanges: 300000,
                        })
                    document.getElementById('frmLogin').reset();
                    window.location.href = "http://127.0.0.1:5000/membresia";
                    
                    }else{
                        Swal.fire ({
                            icon: "error",
                            title: "Oops..",
                            text:"Contraseña o correo incorrectos",
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: 'red', // Rojo
                        })
                        

                    }
                })
                .catch(error =>{
                    console.error("Error:", error)
                })
            })
        }
            
    }
})
