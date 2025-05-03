@app.route('/login2', methods=['POST']) 

def login2():
    try:# Aquí se reciben los de la suscripción
        datos=request.json
        correoR=datos.get('usuario_correo')
        fecha_sus=datos.get('fecha_sus')
        tipo_plan=datos.get('tipo_plan')
        tiempo_suscripcion=datos.get('tiempo_suscripcion')
        valor_pago=datos.get('valor_pago')

        con=MySQLdb.connect(**conecto,cursorclass=MySQLdb.cursors.DictCursor)
        cursor=con.cursor()
        
        #consulta el correo en la base de datos con el valor ingresado 
        cursor.execute("SELECT * FROM suscripcion WHERE usuario_correo= %s", (usuario_correo,))
        #Aquí se guarda el resultado de la consulta anterior-Fetchone por que solo se espera un resultado
        suscripcion=cursor.fetchone()

        if suscripcion == None:
                cursor.execute("""
                    INSERT INTO suscripcion (usuario_correo, fecha_sus,tipo_plan, tiempo_suscripcion,valor_pago )
                    VALUES (%s, %s, %s, %s, %s)
                """, (correoR, fecha_sus, tipo_plan,tiempo_suscripcion,valor_pago ))
                cursor=con.cursor()
                con.commit()  #Guarda cambios en la base de datos
                con.close()

                return jsonify({'mensaje': 'Suscripción registrada correctamente'})
        else: 
            return jsonify({'mensaje': 'El correo ya tiene una suscripción activa'})
        
    except Exception as e:
        return jsonify({'error': str (e)})

