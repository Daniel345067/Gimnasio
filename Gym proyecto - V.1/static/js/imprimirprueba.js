document.addEventListener('DOMContentLoaded', function (){

    if (document.getElementById("usuariosR")) {
        cargarClientes();
        // Función que imprime clientes en una tabla
    }

    function cargarClientes() {
        const listado= document.getElementById("usuariosR");

        fetch('http://127.0.0.1:5000/imprimir')

            .then(datos =>datos.json()) // se pasan los datos encontrados a formato json
            .then(respuesta => {    //Respuesta 
                if (respuesta && Array.isArray (respuesta)){  //Respuesta verifica que si sea un arreglo
                    respuesta.forEach(cliente=> {
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
        
                    });
                    
                }else{
                    console.log('No se encontraron datos validos ');
                }
            })
            
            .catch(error=> {
                console.error('error al consultar los datos:', error);
        
            });
        }
    
        if (document.getElementById("usuariosR")) {
            cargarSuscripciones();
            // Función que imprime clientes en una tabla
        }

    function cargarSuscripciones() {
        const listado_sus= document.getElementById("suscripciones_R");

        fetch('http://127.0.0.1:5000/verificar')

        .then(datos =>datos.json()) // se pasan los datos encontrados a formato json
        .then(respuesta => {    //Respuesta 
            if (respuesta && Array.isArray (respuesta)){  //Respuesta verifica que si sea un arreglo
                respuesta.forEach(cliente=> {
                    listado_sus.innerHTML += 
                    `<tr>
                        <td>${cliente.id}</td>
                        <td>${cliente.usuario_correo}</td>
                        <td>${cliente.fecha_sus}</td>
                        <td>${cliente.tipo_plan}</td>
                        <td>${cliente.tiempo_suscripcion}</td>
                        <td>${cliente.valor_pago}</td>
                    </tr> `;
    
                });
                
            }else{
                console.log('No se encontraron datos validos ');
            }
        })
        
        .catch(error=> {
            console.error('Error al verificar los datos:', error);
    
        });
    }


})
