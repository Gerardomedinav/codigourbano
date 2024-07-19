from flask import jsonify, request
from app import app, db, ma
from modelos.usuario_modelo import Usuario
from modelos.producto_modelo import Producto
from modelos.transaccion_modelo import Transaccion
from modelos.datos_transaccion_modelo import Datos_transaccion
from datetime import datetime




class DatosTransaccionSchema(ma.Schema):
    class Meta:
        fields = ('id', 'cantidad_producto', 'id_producto', 'id_transaccion')
        model = Datos_transaccion

datos_transaccion_schema = DatosTransaccionSchema()
datos_transacciones_schema = DatosTransaccionSchema(many=True)

@app.route('/transacciones', methods=['GET'])
def get_transacciones():
    todas_transacciones = Datos_transaccion.query.all()
    resultado = []

    for transaccion in todas_transacciones:
        producto = Producto.query.get(transaccion.id_producto)
        if not producto:
            continue  # Skip this transaction if the product doesn't exist

        transaccion_info = Transaccion.query.get(transaccion.id_transaccion)
        if not transaccion_info:
            continue  # Skip this transaction if the transaction info doesn't exist

        usuario = Usuario.query.get(transaccion_info.usuario_id)
        if not usuario:
            continue  # Skip this transaction if the user doesn't exist

        precio_total = transaccion.cantidad_producto * producto.precio

        transaccion_dict = datos_transaccion_schema.dump(transaccion)
        transaccion_dict['nombre_producto'] = producto.nombre
        transaccion_dict['hora_transaccion'] = transaccion_info.hora_transaccion
        transaccion_dict['nombre_usuario'] = usuario.nombre
        transaccion_dict['precio_total'] = precio_total

        resultado.append(transaccion_dict)

    return jsonify(resultado)

@app.route('/usuarios', methods=['GET'])
def get_usuarios():
    usuarios = Usuario.query.all()
    return jsonify([{"id": u.id, "nombre": u.nombre, "email": u.email} for u in usuarios])


@app.route('/transacciones/<id>', methods=['GET'])
def get_transaccion(id):
    transaccion = Datos_transaccion.query.get(id)
    if not transaccion:
        return jsonify({'mensaje': 'Transacción no encontrada'}), 404

    producto = Producto.query.get(transaccion.id_producto)
    if not producto:
        return jsonify({'mensaje': 'Producto no encontrado'}), 404

    transaccion_info = Transaccion.query.get(transaccion.id_transaccion)
    if not transaccion_info:
        return jsonify({'mensaje': 'Información de transacción no encontrada'}), 404

    usuario = Usuario.query.get(transaccion_info.usuario_id)
    if not usuario:
        return jsonify({'mensaje': 'Usuario no encontrado'}), 404

    precio_total = transaccion.cantidad_producto * producto.precio

    resultado = datos_transaccion_schema.dump(transaccion)
    resultado['nombre_producto'] = producto.nombre
    resultado['hora_transaccion'] = transaccion_info.hora_transaccion
    resultado['nombre_usuario'] = usuario.nombre
    resultado['precio_total'] = precio_total

    return jsonify(resultado)

@app.route('/transacciones', methods=['POST'])
def crear_transaccion():
    datos = request.get_json()
    print("Datos recibidos:", datos)

    if 'cantidad_producto' not in datos or 'id_producto' not in datos or 'usuario_id' not in datos:
        return jsonify({"error": "Faltan datos requeridos"}), 400

    usuario = Usuario.query.get(datos['usuario_id'])
    if not usuario:
        print(f"Usuario con ID {datos['usuario_id']} no encontrado")
        return jsonify({"error": f"Usuario con ID {datos['usuario_id']} no encontrado"}), 404

    producto = Producto.query.get(datos['id_producto'])
    if not producto:
        return jsonify({"error": "Producto no encontrado"}), 404

    nueva_transaccion = Transaccion(
        usuario_id=datos['usuario_id'],
        hora_transaccion=datetime.utcnow()
    )
    db.session.add(nueva_transaccion)
    db.session.flush()

    nuevo_dato_transaccion = Datos_transaccion(
        cantidad_producto=datos['cantidad_producto'],
        id_producto=datos['id_producto'],
        id_transaccion=nueva_transaccion.id
    )
    db.session.add(nuevo_dato_transaccion)
    db.session.commit()

    respuesta = {
        'id_transaccion': nueva_transaccion.id,
        'usuario_id': nueva_transaccion.usuario_id,
        'hora_transaccion': nueva_transaccion.hora_transaccion.isoformat(),
        'cantidad_producto': nuevo_dato_transaccion.cantidad_producto,
        'id_producto': nuevo_dato_transaccion.id_producto
    }

    return jsonify(respuesta), 201