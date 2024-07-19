from flask import jsonify, request
from app import app, db, ma
from modelos.usuario_modelo import Usuario

class UsuarioSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre', 'contrasena', 'email', 'tipo_usuario')

usuario_schema = UsuarioSchema()
usuarios_schema = UsuarioSchema(many=True)

@app.route('/usuarios', methods=['GET'])
def get_Usuarios():
    try:
        query = Usuario.query
        id = request.args.get('id')
        nombre = request.args.get('nombre')
        email = request.args.get('email')
        tipo_usuario = request.args.get('tipoUsuario')

        if id:
            query = query.filter(Usuario.id == id)
        if nombre:
            query = query.filter(Usuario.nombre.ilike(f'%{nombre}%'))
        if email:
            query = query.filter(Usuario.email.ilike(f'%{email}%'))
        if tipo_usuario:
            query = query.filter(Usuario.tipo_usuario == tipo_usuario)

        all_usuarios = query.all()
        result = usuarios_schema.dump(all_usuarios)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/usuarios/<id>', methods=['GET'])
def get_usuario(id):
    try:
        usuario = Usuario.query.get(id)
        if usuario:
            return usuario_schema.jsonify(usuario)
        return jsonify({"message": "Usuario no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/usuarios/<id>', methods=['DELETE'])
def delete_usuario(id):
    try:
        usuario = Usuario.query.get(id)
        if usuario:
            db.session.delete(usuario)
            db.session.commit()
            return usuario_schema.jsonify(usuario)
        return jsonify({"message": "Usuario no encontrado"}), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/usuarios', methods=['POST'])
def create_usuario():
    try:
        data = request.json
        nombre = data['nombre']
        contrasena = data['contrasena']
        email = data['email']
        tipo_usuario = data['tipo_usuario']

        new_usuario = Usuario(nombre, contrasena, email, tipo_usuario)
        db.session.add(new_usuario)
        db.session.commit()

        return usuario_schema.jsonify(new_usuario), 201
    except KeyError as e:
        return jsonify({"error": f"Falta el campo {str(e)}"}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route('/usuarios/<id>', methods=['PUT'])
def update_usuario(id):
    usuario = Usuario.query.get(id)
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404
    try:
        if 'nombre' in request.json:
            usuario.nombre = request.json['nombre']
        if 'contrasena' in request.json:
            usuario.contrasena = request.json['contrasena']
        if 'email' in request.json:
            usuario.email = request.json['email']
        if 'tipo_usuario' in request.json:
            usuario.tipo_usuario = request.json['tipo_usuario']

        db.session.commit()
        return usuario_schema.jsonify(usuario), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error en update_usuario: {str(e)}")  # Para logging
        return jsonify({"error": str(e)}), 500

@app.route('/')
def bienvenida():
    return "Bienvenidos al backend"