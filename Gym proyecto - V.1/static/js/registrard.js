document.addEventListener("DOMContentLoaded", function(){

    // Si existe frmR en la pagina a ejecutar  ingresa un registro de usuario
    const frmR = document.getElementById("frmR");
    if (frmR) {
        frmR.addEventListener("submit", async function (event) {
            event.preventDefault();
                //es una variable nueva                           para captar el valor
                // Aquí se captan cada uno de los datos del formulario
                let correo=document.getElementById('correo').value
                let t_documento=document.getElementById('t_documento').value
                let documento=document.getElementById('documento').value
                let nombre=document.getElementById('nombre').value;
                let fecha_nacimiento=document.getElementById('fecha_nacimiento').value
                let sexo=document.getElementById('sexo').value
                let ciudad=document.getElementById('ciudad').value
                let telefono=document.getElementById('telefono').value
                let password=document.getElementById('password').value
                let confirmacion=document.getElementById('confirmacion').value
                let permisos=document.getElementById('permisos').value
        
                // validacion de contraseña, si la password y confirmacion no coinciden el dato será invalido
        
                if (password !== confirmacion) {
                    Swal.fire({
                        title: "Las contraseñas ingresadas no coinciden"
                    });
                    return; // Detiene el proceso si las contraseñas no coinciden
                }
        
                // Se calcula la edad a partir de la fecha de nacimiento ingresada, solo valido para personas mayores de 15 años
                const nacimiento = dayjs(fecha_nacimiento);
                const hoy = dayjs();
                const edadCalculada = hoy.diff(nacimiento, 'year'); // Edad en años
                
                if (edadCalculada< 15) { //si la edad es menor a 15 años no puede hacer el registro
                    Swal.fire({
                        title: "Edad ingresada invalida"
                    });
                    return;
                } 
                 //Aqui se convierten los datos ingresados a un archivo json
        
                let respuesta=await fetch ('http://127.0.0.1:5000/registrar' , {
                    method:'POST',  //clave
                    headers:{
                        'Content-Type': 'application/json'
        
                    },
                    
                    body:JSON.stringify({correo,t_documento,documento,nombre,fecha_nacimiento,edad:edadCalculada,sexo,ciudad,telefono,password,permisos})
        
                })
        
                let data=await respuesta.json();
               // alert(data.Mensaje || data.error )
        
        
                if(data.mensaje){
                    Swal.fire({
                        title: data.mensaje,
                        icon: 'success', // o 'error', 'info', etc. si aplica
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#ff6f00' // Verde, cámbialo al color que desees
                    });
                    document.getElementById('frmR').reset();
        
                }else{
                    Swal.fire({
                        title:"No se registro el cliente"
                    })
                }
        
        })
    }


    // Si existe id frmS  en la página a ejecutar entonces ingresa una suscripción
    const frmS = document.getElementById("frmS");
    if (frmS) {
        frmS.addEventListener("submit", async function (event) {
            event.preventDefault();
            // lógica para suscribirse
                //es una variable nueva                           para captar el valor
                // Aquí se captan cada uno de los datos del formulario
                let correoR=document.getElementById('correoR').value
                let tipo_plan=document.getElementById('tipo_plan').value
                let tiempo_suscripcion=parseFloat(document.getElementById('tiempo_suscripcion').value) // parseo para ingreso de INT
                let fecha_registro= dayjs().format('YYYY-MM-DD');
        
                function pagar(tipo_plan, tiempo_suscripcion){
                    const hierro=60000
                    const acero=80000
                    const platino=100000
                    const titanio=120000
        
                    if (tipo_plan == 'P hierro'){
                        if (tiempo_suscripcion >=6){
                            valorT=(hierro*tiempo_suscripcion)
                            descuento= valorT*0.20
                            pago= valorT-descuento
        
                            return(pago)
                        }else{
                            pago=hierro*tiempo_suscripcion
                            return (pago)
                        }
                    }
                    if (tipo_plan== 'P acero'){
                        if (tiempo_suscripcion >=6){
                            valorT=acero*tiempo_suscripcion
                            descuento= valorT*0.20
                            pago= valorT-descuento
        
                            return(pago)
                        }else{
                            pago=acero*tiempo_suscripcion
                            return (pago)
                        }
                    }
                    if (tipo_plan == 'P platino'){
                        if (tiempo_suscripcion >=3){
                            valorT=platino*tiempo_suscripcion
                            descuento=valorT*0.15
                            pago=valorT-descuento
                            return (pago)
                        }else{
                            pago=platino*tiempo_suscripcion
        
        
                            return(pago)
                        }
                    }
                    if (tipo_plan == 'P titanio'){
                        if (tiempo_suscripcion>=3){
                            valorT=titanio*tiempo_suscripcion
                            descuento=valorT*0.15
                            pago=valorT-descuento
                            return (pago)
                        }else{
                            pago=titanio*tiempo_suscripcion
                            return(pago)

                        }

                        
                    }



                    
                }
        
                // Se guarda el valor obtenido de la funcion en una variable
                let valorPago=pagar(tipo_plan, tiempo_suscripcion)
                alert(valorPago) // Aqui me gustaria emplear un sweet alert para mostrar el valor a

        
                let respuesta=await fetch ('http://127.0.0.1:5000/suscribir' , {
                    method:'POST',  //clave
                    headers:{
                        'Content-Type': 'application/json'
        
                    },
                    
                    body:JSON.stringify({usuario_correo:correoR,fecha_sus:fecha_registro,tipo_plan,tiempo_suscripcion,valor_pago:valorPago})
        
                })
        
        
                let data=await respuesta.json();
                // alert(data.Mensaje || data.error )
        
                if(data.mensaje){
                    Swal.fire({
                        title: valorPago,
                        icon: 'success', 
                        text: 'El valor a pagar es:' + valorPago,
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#ff6f00' //
                    });


                    Swal.fire({
                        title: data.mensaje,
                        icon: 'success', 
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#ff6f00' //
                    });
                    document.getElementById('frmS').reset();

                }else{
                    Swal.fire({
                        title:"No se hizo la suscripción",
                        icon: 'warning', // Puedes cambiar a 'error' si aplica
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#d33' // Rojo
                    });
                                            
                }
    
        })
    }
            


})

