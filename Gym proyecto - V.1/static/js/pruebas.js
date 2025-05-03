document.addEventListener("DOMContentLoaded", function (){

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
                alert('Entrando datos'+ correoR+tipo_plan+tiempo_suscripcion+fecha_registro)
        
                function pagar(tipo_plan, tiempo_suscripcion){
                    const hierro=60000
                    const acero=80000
                    const platino=100000
                    const titaneo=120000
        
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
                    if (tipo_plan == 'P titaneo'){
                        if (tiempo_suscripcion>3){
                            valorT=titaneo*tiempo_suscripcion
                            descuento=valorT*0.15
                            pago=valorT-descuento
                            return (pago)
                        }
                
                
                    }
                }
        
                // Se guarda el valor obtenido de la funcion en una variable
                let valorPago=pagar(tipo_plan, tiempo_suscripcion)

                alert(valorPago)
        
        
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
                        title:data.mensaje
                    })
        
                }else{
                    Swal.fire({
                        title:"No se hizo la suscripción"
                    })
                }
    
        })
    }    







})