from app import app, db   #,ma
from sqlalchemy import Column, ForeignKey, Integer, Table
from sqlalchemy.orm import declarative_base, relationship



# defino las tablas
class Comentario(db.Model):   # la clase Producto hereda de db.Model de SQLAlquemy   
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    nombre=db.Column(db.String(100))
    email=db.Column(db.String(40))
    mensaje=db.Column(db.String(400))
    genero=db.Column(db.String(40))
    pais=db.Column(db.String(40))
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    usuario = db.relationship('Usuario', backref=db.backref('comentarios', lazy=True))
    
    def __init__(self,nombre,email,mensaje,genero,pais,id_usuario): #crea el  constructor de la clase
        self.nombre=nombre # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.email=email
        self.mensaje=mensaje
        self.genero=genero
        self.pais=pais
        self.id_usuario=id_usuario
    #  si hay que crear mas tablas , se hace aqui

#  ********************