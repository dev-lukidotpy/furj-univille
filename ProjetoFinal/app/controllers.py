from flask import Blueprint, render_template, request, redirect, url_for, jsonify
from app.services import *
from datetime import date

main = Blueprint('main', __name__)

@main.route('/')
def carregar():
    return render_template('tarefas.html')

@main.route('/render')
def renderizar_todas():
    tasks = todas_as_tarefas()
    tasks_data = [{"tarefa_id": task.tarefa_id,
                   "tarefa_titulo": task.tarefa_titulo,
                   "tarefa_data": task.tarefa_data,
                   "tarefa_descricao": task.tarefa_descricao,
                   "tarefa_status": task.tarefa_status} for task in tasks]
    
    return jsonify(tasks_data)

@main.route('/add_tarefa', methods=['POST'])
def add_tarefa():
    dados = request.get_json()
    titulo = dados.get('titulo')
    data_bruta = dados.get('data')

    data_bruta = data_bruta.split("-")

    data = date(int(data_bruta[0]), int(data_bruta[1]), int(data_bruta[2]))

    descricao = dados.get('descricao')
    status = dados.get('status')
    adicionar_tarefa(titulo, data, descricao, status)
    
    return jsonify({"message": f"Tarefa adicionada"})

@main.route('/concluir_tarefa/<int:tarefa_id>', methods=['POST'])
def marcar_conclusao(tarefa_id):
    concluir_tarefa(tarefa_id)
    
    return jsonify({"message": f"Tarefa {tarefa_id} concluida"})

@main.route('/deletar_tarefa/<int:tarefa_id>', methods=['POST'])
def apagar_tarefa(tarefa_id):
    deletar_tarefa(tarefa_id)

    return jsonify({"message": f"Tarefa {tarefa_id} apagada"})
