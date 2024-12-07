from app.models import Task, db

def todas_as_tarefas():
    """Puxa todas as tarefas do banco"""
    return Task.query.all()

def adicionar_tarefa(*args):
    """Adiciona uma nova tarefa ao banco"""
    tarefa = Task(tarefa_titulo=args[0], tarefa_data=args[1], tarefa_descricao=args[2], tarefa_status=args[3])
    db.session.add(tarefa)
    db.session.commit()

def concluir_tarefa(id):
    """Altera o status da tarefa para concluída"""
    tarefa = Task.query.get(id)
    if tarefa:
        tarefa.tarefa_status = not tarefa.tarefa_status
        db.session.commit()
        return True
    return False
    
def deletar_tarefa(id):
    """Deleta uma tarefa pelo ID"""
    tarefa = Task.query.get(id)
    if tarefa:
        db.session.delete(tarefa)
        db.session.commit()
        return True
    return False
