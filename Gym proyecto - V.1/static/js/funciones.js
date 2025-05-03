document.addEventListener('DOMContentLoaded', function (){
    
    if (document.getElementById("frmB")) {
        busquedaUsuarios();
    }

    if (document.getElementById("frmB_sus")) {
        busquedaSuscripcion();
    }

    if (document.getElementById("frmE")){
        eliminarUsuario();
    }


    function busquedaUsuarios() {
        const entrada=document.getElementById("frmB")
        const listado=document.getElementById("usuariosR")  
        if (entrada){
            entrada.addEventListener("submit", function (event) { 
            event.preventDefault()
            
            //Limpia la tabla para imprimir nuevos datos
            listado.innerHTML=""
            // trae el valor ingresado en el inpul de formulario frmB
            const consulta=document.getElementById('busqueda').value.trim();

            
            if(!consulta){ // si los parametros ingresados son diferentes a un documento o nombre
                Swal.fire('Ingrese un documento o nombre para iniciar la busqueda')
                return
            }
            
            let datos = new URLSearchParams();

            if (consulta.includes("@")) { // si consulta (string) tiene @ entonces se identifica como correo
                datos.append('correo', consulta);
            } else {  // si no entonces, se identifica como nombre
                datos.append('nombre', consulta);
            }

                //definiendo la ruta a consultar
            const ruta= `http://127.0.0.1:5000/consultar?${datos.toString()}`

            fetch(ruta)
                .then(dato=>dato.json())
                .then(respuesta=> {
                    if (respuesta && Array.isArray(respuesta)){
                        if (respuesta.length == 0){
                            Swal.fire('No se encontraron resultados');
                            return
                        }
                        respuesta.forEach(cliente =>{
                            listado.innerHTML +=
                            `<tr>
                                <td>${cliente.correo}</td>
                                <td>${cliente.t_documento}</td>
                                <td>${cliente.documento}</td>
                                <td>${cliente.nombre}</td>
                                <td>${cliente.fecha_nacimiento}</td>
                                <td>${cliente.edad}</td>
                                <td>${cliente.sexo}</td>
                                <td>${cliente.ciudad}</td>
                                <td>${cliente.telefono}</td>
                                <td>${cliente.permisos}</td>
                            </tr> `;

                        })
                    }else{
                        swal.fire('No se encontraron resultados válidos')
                    }

                })
                .catch(error =>{
                    console.error("Error al consultar los datos", error)
                    swal.fire('Hubo un error al realizar la búsqueda')
                })
        
            }) 
        }
    
    }


    function busquedaSuscripcion() {
        const entrada=document.getElementById("frmB_sus")
        const listado=document.getElementById("suscripciones_R")
        
        if (entrada){
            entrada.addEventListener("submit", function (event) { 
            event.preventDefault()
            
                // atrapa el valor registrado en el input del formulario frmB_sus
            const consulta=document.getElementById('busqueda_sus').value.trim();

            if(!consulta){ // si los parametros ingresados son diferentes a un documento o nombre
                Swal.fire('Ingrese un documento o nombre para iniciar la busqueda')
                return
            }
            
            let datos = new URLSearchParams();

            if (consulta.includes("@")) { // si consulta (string) tiene @ entonces se identifica como correo
                datos.append('usuario_correo', consulta);
            }
                //definiendo la ruta a consultar
            
            const ruta= `http://127.0.0.1:5000/buscar?${datos.toString()}`

            fetch(ruta)
                .then(resultado=>resultado.json())
                .then (respuesta=>{
                    listado.innerHTML="";
                    if(respuesta && Array.isArray(respuesta)){
                        if(respuesta.length == 0){
                            Swal.fire('No se encontraron resultados')
                            return
                        }
                        respuesta.forEach(cliente=>{
                            listado.innerHTML +=
                            `<tr>
                                <td>${cliente.id}</td>
                                <td>${cliente.usuario_correo}</td>
                                <td>${cliente.fecha_sus}</td>
                                <td>${cliente.tipo_plan}</td>
                                <td>${cliente.tiempo_suscripcion}</td>
                                <td>${cliente.valor_pago}</td>
                            </tr> `;

                            }) 

                        }else{
                            Swal.fire('No se encontraron resultados válidos')
                        }

                    })
                    .catch(error =>{
                        console.error("Error al consultar los datos", error)
                        Swal.fire('Hubo un error al realizar la búsqueda')
                    })
            
                }) 
        }
    }

    
    function eliminarUsuario() {
        const entrada=document.getElementById("frmE")
        if (entrada){
            entrada.addEventListener("submit", function (event) { 
                event.preventDefault()

                let inputcorreo=document.getElementById('input_correo').value.trim()

                if(!inputcorreo){
                    Swal.fire ('Por favor ingrese un correo válido, \nrecuerde que el usuario no debe registrar suscripciones')
                    return
                }
                

                fetch(`http://127.0.0.1:5000/eliminarU/correo/${inputcorreo}` , {
                    method:'DELETE'
                
                })
                .then(datos =>{
                    if (!datos.ok){
                        throw new Error ('Error en la solicitud')
                    }

                    return datos.json()

                })
                .then (respuesta => {
                    Swal.fire({
                        title: respuesta.mensaje
                        })
                    document.getElementById('input_correo').value = ""
                })
        
                })
                .catch(error =>{
                    console.error("Error al eliminar :", error)
                    Swal.fire('Error al eliminar el usuario')
                })    
        
            }
    }   
    


})