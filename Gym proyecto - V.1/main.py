from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import MySQLdb
import MySQLdb.cursors
from conexion import conexiondb

app=Flask(__name__)
CORS(app)
conecto=conexiondb()

@app.route('/imprimir', methods= ['GET'])
def imprimir_usuarios():
    try:
        con=MySQLdb.connect(**conecto,cursorclass=MySQLdb.cursors.DictCursor)
        cursor=con.cursor()
        cursor.execute("SELECT * FROM usuarios")
        users=cursor.fetchall()
        con.close()
        return jsonify(users)
    except Exception as e :
        return jsonify({'error':str(e)})
    

@app.route('/verificar', methods= ['GET'])
def verificar_suscripcion():
    try:
        con=MySQLdb.connect(**conecto,cursorclass=MySQLdb.cursors.DictCursor)
        cursor=con.cursor()
        cursor.execute("SELECT * FROM suscripcion")
        users=cursor.fetchall()
        con.close()
        return jsonify(users)
    except Exception as e :
        return jsonify({'error':str(e)})


@app.route('/registrar', methods=['POST']) 

def registrar_usuario():
    try:
        datos=request.json
        correo=datos.get('correo')
        t_documento=datos.get('t_documento')
        documento=datos.get('documento')
        nombre=datos.get('nombre')
        fecha_nacimiento=datos.get('fecha_nacimiento')
        edad=datos.get('edad')
        sexo=datos.get('sexo')
        ciudad=datos.get('ciudad')
        telefono=datos.get('telefono')
        password=datos.get('password')
        permisos=datos.get('permisos')

        con=MySQLdb.connect(**conecto,cursorclass=MySQLdb.cursors.DictCursor)
        cursor=con.cursor()
        cursor.execute("""
            INSERT INTO usuarios (correo, t_documento, documento, nombre,fecha_nacimiento,edad, sexo, ciudad, telefono, password, permisos)
            VALUES (%s, %s, %s, %s, %s, %s, %s,%s,%s, %s,%s)
        """, (correo,t_documento,documento,nombre,fecha_nacimiento,edad, sexo,ciudad,telefono,password, permisos))
        con.commit()  #Guarda cambios en la base de datos
        con.close()

        return jsonify({'mensaje': 'Usuario registrado exitosamente'})
    except Exception as e:
        return jsonify({'error': str (e)})
    


@app.route('/suscribir', methods=['POST']) 

def suscribir_usuario():
    try:# Aquí se reciben los de la suscripción
        datos=request.json
        correoR=datos.get('usuario_correo')
        fecha_sus=datos.get('fecha_sus')
        tipo_plan=datos.get('tipo_plan')
        tiempo_suscripcion=datos.get('tiempo_suscripcion')
        valor_pago=datos.get('valor_pago')

        con=MySQLdb.connect(**conecto,cursorclass=MySQLdb.cursors.DictCursor)
        cursor=con.cursor()
        cursor.execute("""
            INSERT INTO suscripcion (usuario_correo, fecha_sus,tipo_plan, tiempo_suscripcion,valor_pago )
            VALUES (%s, %s, %s, %s, %s)
        """, (correoR, fecha_sus, tipo_plan,tiempo_suscripcion,valor_pago ))
        cursor=con.cursor()
        con.commit()  #Guarda cambios en la base de datos
        con.close()

        return jsonify({'mensaje': 'Suscripción registrada correctamente'})
    except Exception as e:
        return jsonify({'error': str (e)})



@app.route('/consultar', methods=['GET'])
def consultar_usuarios():
    try:
        con = MySQLdb.connect(**conecto, cursorclass=MySQLdb.cursors.DictCursor)
        cursor = con.cursor()
    
        correo= request.args.get('correo', default=None, type=str)
        nombre=request.args.get('nombre', default=None, type=str)

        if correo is not None:
            cursor.execute("SELECT * FROM usuarios WHERE correo= %s", (correo,))
        
        elif nombre is not None: #LOWER permite que la consulta se haga sin distinguir mayúsculas de minusculas
            cursor.execute("SELECT * FROM usuarios WHERE LOWER(nombre) LIKE LOWER (%s)",(f"%{nombre}%",))
            # LIKE permite realizar una consulta más flexible, donde un solo dato de nombre ingresado sea suficiente para hacer la consulta
        else:
            respuesta= {"Error": "Los datos proporcionados con son validos, ingrese un documento o nombre de un cliente " }
        
            return jsonify(respuesta), 400
        

        users = cursor.fetchall()
        con.close()

        if not users:
            return jsonify({'mensaje': 'No se encontraron usuarios con los datos ingresados'})

        return jsonify(users)

    except Exception as e:
            return jsonify({'error': str(e)})


@app.route('/buscar')
def buscar_suscripcion():
    try: #conecta la base de datos
        con = MySQLdb.connect(**conecto, cursorclass=MySQLdb.cursors.DictCursor)
        cursor = con.cursor()
        #parametro para condicionar la busqueda
        correo = request.args.get('usuario_correo')

        if correo:# selecciona de la tabla suscripcion donde coincida con direccion de correo 
            cursor.execute("SELECT * FROM suscripcion WHERE usuario_correo = %s", (correo,))
        else:
            respuesta= {"Error": "Los datos proporcionados no son validos, ingrese un correo de un cliente " }
            return jsonify(respuesta), 400
        
        users = cursor.fetchall()
        con.close()

        if not users:
            return jsonify({'mensaje': 'No se encontraron usuarios con los datos ingresados'})
        
        return jsonify(users)
    
    except Exception as e:
            return jsonify ({'error ': str (e)})

    
@app.route('/eliminarU/correo/<string:correo>', methods=['DELETE'])
def eliminarU(correo):
    con=MySQLdb.connect(**conecto,cursorclass=MySQLdb.cursors.DictCursor) # lee la base de datos
    cursor=con.cursor()
    try: 
        cursor.execute("DELETE FROM usuarios WHERE correo=%s", (correo,))
        con.commit()
        con.close()

        if cursor.rowcount==0:
            return jsonify({'mensaje': 'Documento no encontrado'})
        
        return jsonify({'mensaje': 'Cliente eliminado'})
            

    except Exception as e:
            return jsonify ({'error': str (e)})
    

@app.route('/eliminarS/usuario_correo/<string:usuario_correo>', methods=['DELETE'])
def eliminarS(usuario_correo):
    con=MySQLdb.connect(**conecto,cursorclass=MySQLdb.cursors.DictCursor) # lee la base de datos
    cursor=con.cursor()
    try: 
        cursor.execute("DELETE FROM suscripcion WHERE usuario_correo=%s", (usuario_correo,))
        con.commit()
        con.close()

        if cursor.rowcount == 0:
            return jsonify({'mensaje': 'Email no encontrado'})
        
        return jsonify({'mensaje': 'Suscripción eliminada'})
            

    except Exception as e:
            return jsonify ({'error': str (e)})
    

@app.route('/login', methods=['POST'])
def login():
    #Recibe los datos del usuario registrado 
    datos= request.get_json()
    correo=datos.get('correo')
    password=datos.get('password')

    try: #Conecta la base de datos
        con = MySQLdb.connect(**conecto, cursorclass=MySQLdb.cursors.DictCursor)
        cursor = con.cursor()

        #consulta el correo en la base de datos con el valor ingresado 
        cursor.execute("SELECT * FROM usuarios WHERE correo= %s", (correo,))
        #Aquí se guarda el resultado de la consulta anterior-Fetchone por que solo se espera un resultado
        usuario=cursor.fetchone()
        # Si se encuentra un correo que coincida, se consulta si las contraseñas coinciden tambien
        if usuario and usuario['password'] == password:
            return jsonify({"acceso":True})
        
        else : 
            return jsonify({"error": False})
        
        con.close()

    except Exception as e:
            return jsonify({'error': str(e)})
    
# Aquí se establecen las rutas para los archivos de html, ya la navegacion se va a relacionar con flask

@app.route('/membresia')
def membresia():
    return render_template('membresia1.html')


@app.route('/registro') 
def registro():
    return render_template('registro.html')

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/admin')
def admin():
    return render_template('datos.html')

@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

@app.route('/precios')
def precios():
    return render_template ('precios.html')

@app.route('/header')
def header():
    return render_template ('header.html')


if __name__=='__main__':
    app.run(debug=True)