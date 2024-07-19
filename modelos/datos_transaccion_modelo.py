from app import app, db   #,ma
from sqlalchemy import Column, ForeignKey, Integer, Table
from sqlalchemy.orm import declarative_base, relationship

# defino las tablas
class Datos_transaccion(db.Model):   # la clase Datos_transaccion hereda de db.Model de SQLAlquemy   
    id = db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    cantidad_producto = db.Column(db.Integer, nullable=False)
    id_producto = db.Column(db.Integer, db.ForeignKey('producto.id'), nullable=False)
    id_transaccion = db.Column(db.Integer, db.ForeignKey('transaccion.id'), nullable=True) # Hacemos que sea nullable

    def __init__(self, cantidad_producto, id_producto, id_transaccion=None): #crea el  constructor de la clase
        self.cantidad_producto = cantidad_producto # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.id_producto = id_producto
        self.id_transaccion = id_transaccion

    #  si hay que crear mas tablas , se hace aqui