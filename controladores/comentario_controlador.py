from flask import  jsonify,request  #,Flask# del modulo flask importar la clase Flask y los métodos jsonify,request
from app import app, db,ma
from modelos.comentario_modelo import *


class ComentarioSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','email','mensaje','genero','pais','id_usuario')


comentario_schema=ComentarioSchema()            # El objeto producto_schema es para traer un producto
comentarios_schema=ComentarioSchema(many=True)  # El objeto productos_schema es para traer multiples registros de producto


# crea los endpoint o rutas (json)
@app.route('/comentarios', methods=['GET'])
def get_Comentarios():
    query = Comentario.query

    # Búsqueda por ID
    id = request.args.get('id')
    if id:
        query = query.filter(Comentario.id == id)

    # Búsqueda por nombre
    nombre = request.args.get('nombre')
    if nombre:
        query = query.filter(Comentario.nombre.ilike(f'%{nombre}%'))

    # Búsqueda por email
    email = request.args.get('email')
    if email:
        query = query.filter(Comentario.email.ilike(f'%{email}%'))

    # Búsqueda por contenido del mensaje
    mensaje = request.args.get('mensaje')
    if mensaje:
        query = query.filter(Comentario.mensaje.ilike(f'%{mensaje}%'))

    # Filtrar por género
    genero = request.args.get('genero')
    if genero:
        query = query.filter(Comentario.genero == genero)

    # Filtrar por país
    pais = request.args.get('pais')
    if pais:
        query = query.filter(Comentario.pais.ilike(f'%{pais}%'))


    all_comentarios = query.all()
    result = comentarios_schema.dump(all_comentarios)
    return jsonify(result)                      # retorna un JSON de todos los registros de la tabla


@app.route('/comentarios/<id>',methods=['GET'])
def get_comentario(id):
    comentario=Comentario.query.get(id)
    return comentario_schema.jsonify(comentario)   # retorna el JSON de un producto recibido como parametro


@app.route('/comentarios/<id>',methods=['DELETE'])
def delete_comentario(id):
    comentario=Comentario.query.get(id)
    db.session.delete(comentario)
    db.session.commit()
    return comentario_schema.jsonify(comentario)   # me devuelve un json con el registro eliminado


@app.route('/comentarios', methods=['POST']) # crea ruta o endpoint
def create_comentario():
    #print(request.json)  # request.json contiene el json que envio el cliente
    nombre=request.json['nombre']
    email=request.json['email']
    mensaje=request.json['mensaje']
    genero=request.json['genero']
    pais=request.json['pais']
    id_usuario=request.json['id_usuario']
    new_comentario=Comentario(nombre,email,mensaje,genero,pais,id_usuario)
    db.session.add(new_comentario)
    db.session.commit()
    return comentario_schema.jsonify(new_comentario)


@app.route('/comentarios/<id>' ,methods=['PUT'])
def update_comentario(id):
    comentario=Comentario.query.get(id)

    comentario.nombre=request.json['nombre']
    comentario.email=request.json['email']
    comentario.mensaje=request.json['mensaje']
    comentario.genero=request.json['genero']
    comentario.pais=request.json['pais']


    db.session.commit()
    return comentario_schema.jsonify(comentario)


@app.route('/')
def bienvenida_2():
    return "Bienvenidos al backend"   # retorna el JSON de un usuario recibido como parametro