from app import db

class Task(db.Model):
    __tablename__ = 'tarefas'
    tarefa_id = db.Column(db.Integer, primary_key=True)
    tarefa_titulo = db.Column(db.String(64), nullable=False)
    tarefa_data = db.Column(db.Date, nullable=False)
    tarefa_descricao = db.Column(db.String(128))
    tarefa_status = db.Column(db.Boolean, default=False)
