
from app import app, db   #,ma
from sqlalchemy import Column, ForeignKey, Integer, Table
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime


# defino las tablas
class Transaccion(db.Model):   # la clase Transaccion hereda de db.Model de SQLAlquemy   
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    hora_transaccion = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __init__(self,usuario_id,hora_transaccion): #crea el  constructor de la clase
        # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.hora_transaccion=hora_transaccion
        self.usuario_id=usuario_id

    #  si hay que crear mas tablas , se hace aqui


#  ************************************************************
