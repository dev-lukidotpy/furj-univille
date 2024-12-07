from app import criar_aplicativo, db
import config

ProjetoFinal = criar_aplicativo(config.DevelopmentEnv)

with ProjetoFinal.app_context():
    db.create_all()

if __name__ == "__main__":
    ProjetoFinal.run()