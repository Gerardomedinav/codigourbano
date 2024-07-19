from app import app, db   #,ma
from sqlalchemy import Column, ForeignKey, Integer, Table
from sqlalchemy.orm import declarative_base, relationship



# defino las tablas
class Producto(db.Model):   # la clase Producto hereda de db.Model de SQLAlquemy
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    nombre=db.Column(db.String(100))
    precio=db.Column(db.Integer)
    marca=db.Column(db.String(40))
    origen=db.Column(db.String(40))
    stock=db.Column(db.Integer)
    imagen=db.Column(db.String(400))
    tipoProducto=db.Column(db.String(40))
    descripcion=db.Column(db.String(100))


    def __init__(self,nombre,precio,marca,origen,stock,tipoProducto,imagen,descripcion): #crea el  constructor de la clase
        self.nombre=nombre # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.precio=precio
        self.marca=marca
        self.origen=origen
        self.stock=stock
        self.tipoProducto=tipoProducto
        self.imagen=imagen
        self.descripcion=descripcion

    #  si hay que crear mas tablas , se hace aqui


#  ********************