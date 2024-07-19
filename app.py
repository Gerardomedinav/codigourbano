from flask import Flask ,jsonify ,request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate


app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://felixcanosa:1234567890_@felixcanosa.mysql.pythonanywhere-services.com/felixcanosa$default'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)

from controladores.producto_controlador import *
from controladores.usuario_controlador import *
from controladores.comentario_controlador import *
from controladores.datos_transaccion_controlador import *

with app.app_context():
    db.create_all()  # crea todas las tablas si es que no están creadas

if __name__ == '__main__':
    app.run(debug=True, port=5000)
