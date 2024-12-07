from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def criar_aplicativo(configs):
    app = Flask(__name__)

    app.config.from_object(configs)

    db.init_app(app)

    from app.controllers import main
    app.register_blueprint(main)

    return app