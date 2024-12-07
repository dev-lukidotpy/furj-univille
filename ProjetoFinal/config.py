import os
from flask_sqlalchemy import SQLAlchemy

basedir = os.path.abspath(os.path.dirname(__file__))

class EnvConfigs:
    # Classe base declara os principais campos que abrangem todos os envs de configuração
    SECRET_KEY = os.getenv('SECRET_KEY', 'devkey_dew1')
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI', 'sqlite:///' + os.path.join(basedir, 'dev.db'))
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentEnv(EnvConfigs):
    # Modo DEBUG permitido somente no env de desenvolvimento
    DEBUG = True

class ProductionEnv(EnvConfigs):
    # Em produção a chave secreta só poderá ser obtida nas variáveis de ambiente do server
    # DEBUG desativado para evitar que código seja executado no servidor caso ocorra algum erro em produção
    # Esse projeto obviamente não vai entrar em produção (ou vai?)
    DEBUG = False
    SECRET_KEY = os.getenv('SECRET_KEY')

class TestingEnv(EnvConfigs):
    pass
    # Testes não serão implementados para esse trabalho :)