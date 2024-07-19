from flask import jsonify, request
from app import app, db, ma
from modelos.producto_modelo import Producto

class ProductoSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre', 'precio','marca','origen', 'stock', 'tipoProducto', 'imagen','descripcion')

producto_schema = ProductoSchema()
productos_schema = ProductoSchema(many=True)

@app.route('/productos', methods=['GET'])
def get_productos():
    query = Producto.query

    # Búsqueda por ID
    id = request.args.get('id')
    if id:
        query = query.filter(Producto.id == id)

    # Búsqueda por nombre
    nombre = request.args.get('nombre')
    if nombre:
        query = query.filter(Producto.nombre.ilike(f'%{nombre}%'))

    # Filtrar por tipoProducto
    tipo_producto = request.args.get('tipoProducto')
    if tipo_producto:
        query = query.filter(Producto.tipoProducto.ilike(f'%{tipo_producto}%'))

    # Filtrar por género
    genero = request.args.get('genero')
    if genero and genero != 'Todo':
        query = query.filter(Producto.tipoProducto.ilike(f'%{genero}%'))

    # Filtrar por subcategoría
    sub_categoria = request.args.get('subCategoria')
    if sub_categoria:
        query = query.filter(Producto.tipoProducto.ilike(f'%{sub_categoria}%'))

    all_productos = query.all()
    result = productos_schema.dump(all_productos)
    return jsonify(result)

@app.route('/productos/tipos', methods=['GET'])
def get_tipos_productos():
    tipos = db.session.query(Producto.tipoProducto.distinct()).all()
    tipos_list = [tipo[0] for tipo in tipos]
    return jsonify(tipos_list)

@app.route('/productos/<id>', methods=['GET'])
def get_producto(id):
    producto = Producto.query.get(id)
    return producto_schema.jsonify(producto)

@app.route('/productos/<id>', methods=['DELETE'])
def delete_producto(id):
    producto = Producto.query.get(id)
    db.session.delete(producto)
    db.session.commit()
    return producto_schema.jsonify(producto)

@app.route('/productos', methods=['POST']) # crea ruta o endpoint
def create_producto():
    #print(request.json)  # request.json contiene el json que envio el cliente
    nombre=request.json['nombre']
    precio=request.json['precio']
    marca=request.json['marca']
    origen=request.json['origen']
    stock=request.json['stock']
    tipoProducto=request.json['tipoProducto']
    imagen=request.json['imagen']
    descripcion=request.json['descripcion']
    new_producto=Producto(nombre,precio,marca,origen,stock,tipoProducto,imagen,descripcion)
    db.session.add(new_producto)
    db.session.commit() # confirma el alta
    return producto_schema.jsonify(new_producto)


@app.route('/productos/<id>', methods=['PUT'])
def update_producto(id):
    producto = Producto.query.get(id)
    if not producto:
        return jsonify({"error": "Producto no encontrado"}), 404

    try:
        if 'nombre' in request.json:
            producto.nombre = request.json['nombre']
        if 'precio' in request.json:
            producto.precio = request.json['precio']
        if 'marca' in request.json:
            producto.marca = request.json['marca']
        if 'origen' in request.json:
            producto.origen = request.json['origen']
        if 'stock' in request.json:
            producto.stock = request.json['stock']
        if 'tipoProducto' in request.json:
            producto.tipoProducto = request.json['tipoProducto']
        if 'imagen' in request.json:
            producto.imagen = request.json['imagen']
        if 'descripcion' in request.json:
            producto.descripcion = request.json['descripcion']

        db.session.commit()
        return producto_schema.jsonify(producto), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    return producto_schema.jsonify(producto)