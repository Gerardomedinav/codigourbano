from app import app, db   #,ma
from sqlalchemy import Column, ForeignKey, Integer, Table
from sqlalchemy.orm import declarative_base, relationship
from werkzeug.security import generate_password_hash, check_password_hash

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    contrasena = db.Column(db.String(1000))
    email = db.Column(db.String(100))
    tipo_usuario = db.Column(db.Integer)

    def __init__(self, nombre, contrasena, email, tipo_usuario):
        self.nombre = nombre
        self.contrasena = contrasena
        '''self.set_password(contrasena)'''
        self.email = email
        self.tipo_usuario = tipo_usuario
    '''
    def set_password(self, password):
        self.contrasena = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.contrasena, password)
    '''
    def _init_(self,nombre,contrasena,email,tipo_usuario): #crea el  constructor de la clase
        self.nombre=nombre # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.contrasena=contrasena
        self.email=email
        self.tipo_usuario=tipo_usuario

    #  si hay que crear mas tablas , se hace aqui

#  ********************