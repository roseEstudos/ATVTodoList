const botaoAdicionarTarefa = document.getElementById('botao-adicionar-tarefa')
const containerTarefasAFazer = document.querySelector('.container-tarefas-a-fazer')
const containerTarefaAndamento = document.querySelector('.container-tarefas-andamento')
const containerTarefaFinalizada = document.querySelector('.container-tarefas-realizadas')


function adionaTarefaFazerLocalStorage(tarefa){
    const tarefasAdicionadas = localStorage.getItem('tarefasFazer')
    
    let tarefasAdicionadasArray = []
    if (tarefasAdicionadas != null || tarefasAdicionadas != undefined){
      tarefasAdicionadasArray = JSON.parse(tarefasAdicionadas)
    }

    tarefasAdicionadasArray.push(tarefa)

    const jsonLista = JSON.stringify(tarefasAdicionadasArray)

    localStorage.setItem('tarefasFazer', jsonLista)
}

function criarTarefaAFazer(nomeTarefa){
    const div = document.createElement('div')
    div.classList.add('tarefa-a-fazer')

    div.innerHTML = `
         <div class="task-nome">
              <img src="./imgs/esperar.svg" alt="Icone de um circulo com 3 pontos">
              <p class="nome-tarefa">${nomeTarefa}</p>
            </div>

            <div class="task-acoes">
              <button class="botao-mover-andamento">
                <img src="./imgs/relogio1.svg" alt="Icone de um relogio com seta pra cima">
              </button>

              <button class="botao-excluir">
                <img src="./imgs/lixeira.svg" alt="Icone de uma lixeira">
              </button>
        </div>
    `

    containerTarefasAFazer.appendChild(div)

}

botaoAdicionarTarefa.addEventListener('click', function(){
    const nomeTarefa = document.getElementById('mensagem').value

    if (nomeTarefa == null || nomeTarefa == ''){
        alert("Adicione um nome a sua tarefa")
        return
    }

    criarTarefaAFazer(nomeTarefa)

    const tarefa = {
        nome: nomeTarefa,
        coluna: 'fazer'
    }

    adionaTarefaFazerLocalStorage(tarefa)

    document.getElementById('mensagem').value = ''

    botaoExcluir()
    moverParaAndamento()
})


function buscarTarefasFazer(){
    const tarefas = localStorage.getItem('tarefasFazer')

    if (tarefas != null || tarefas != undefined){
      const listaTarefas = JSON.parse(tarefas)

      for(let index = 0; index < listaTarefas.length; index++){
        criarTarefaAFazer(listaTarefas[index].nome)
      }
    }
}
buscarTarefasFazer()


function botaoExcluir(){
  const botaoLixeira = document.querySelectorAll('.botao-excluir')

  botaoLixeira.forEach ((botao) => {
    botao.removeEventListener('click', handleExcluirFazer)
    botao.addEventListener('click', handleExcluirFazer)
  })
}


function handleExcluirFazer(event){
  const elementoPai = event.target.closest('.tarefa-a-fazer')
  elementoPai.remove()

  const nomeTarefa = elementoPai.querySelector('.nome-tarefa').textContent

  const tarefasLocalStorage = JSON.parse(localStorage.getItem('tarefasFazer'))

  const listaAtualizada = tarefasLocalStorage.filter((tarefa) => tarefa.nome != nomeTarefa)

  localStorage.setItem('tarefasFazer', JSON.stringify(listaAtualizada))
}
botaoExcluir()


function adicionarTarefaAndamentoLocalStorage(tarefa){
  const tarefasAdicionadas = localStorage.getItem('tarefasAndamento')

  let tarefasAdicionadasArray = []
  if (tarefasAdicionadasArray != null || tarefasAdicionadasArray != undefined){
    tarefasAdicionadasArray = JSON.parse(tarefasAdicionadas)
  }

  tarefasAdicionadasArray.push(tarefa)
  localStorage.setItem('tarefasAndamento', JSON.stringify(tarefasAdicionadasArray))
}


function criarTarefaAndamento(nomeTarefa){
  const div = document.createElement('div')
  div.classList.add('tarefa-a-fazer')

  div.innerHTML = `
    <div class="task-nome">
      <img src="./imgs/relogio.svg" alt="Icone de relógio">
      <p class="nome-tarefa">${nomeTarefa}</p>
    </div>

    <div class="task-acoes task-acoes-andamento">
      <button class="botao-concluido">
        <img src="./imgs/check.svg" alt="Icone de um check">
      </button>

      <button class="botao-excluir-andamento">
        <img src="./imgs/lixeira.svg" alt="Icone de uma lixeira">
      </button>
    </div>
  `
  containerTarefaAndamento.appendChild(div)
}


function moverParaAndamento(){
  const botoesAndamento = document.querySelectorAll('.botao-mover-andamento')

  botoesAndamento.forEach((botao) => {
    botao.removeEventListener('click', handleMoverAndamento)
    botao.addEventListener('click', handleMoverAndamento)
  })
}


function handleMoverAndamento(event){
  const elementoPai = event.target.closest('.tarefa-a-fazer')
  const nomeTarefa = elementoPai.querySelector('.nome-tarefa').textContent
  const tarefasLocalStorage = JSON.parse(localStorage.getItem('tarefasFazer'))
  const listaAtualizada = tarefasLocalStorage.filter((tarefa) => tarefa.nome != nomeTarefa)

  localStorage.setItem('tarefasFazer', JSON.stringify(listaAtualizada))
  elementoPai.remove()

  criarTarefaAndamento(nomeTarefa)
  adicionarTarefaAndamentoLocalStorage({
    nome: nomeTarefa,
    coluna: 'andamento'
  })

  botaoExcluirAndamento()
  moverParaRealizado()
}
moverParaAndamento()


function botaoExcluirAndamento(){
  const botoesExcluir = document.querySelectorAll('.botao-excluir-andamento')

  botoesExcluir.forEach((botao) => {
    botao.removeEventListener('click', handleExcluirAndamento)
    botao.addEventListener('click', handleExcluirAndamento)
  })
}


function handleExcluirAndamento(event){
  const elementoPai = event.target.closest('.tarefa-a-fazer')
  elementoPai.remove()

  const nomeTarefa = elementoPai.querySelector('.nome-tarefa').textContent
  const tarefasLocalStorage = JSON.parse(localStorage.getItem('tarefasAndamento'))
  const listaAtualizada = tarefasLocalStorage.filter((tarefa) => tarefa.nome != nomeTarefa)

  localStorage.setItem('tarefasAndamento', JSON.stringify(listaAtualizada))
}


function buscarTarefasAndamento(){
  const tarefas = localStorage.getItem('tarefasAndamento')

  if(tarefas != null || tarefas != undefined){
    const lista = JSON.parse(tarefas)
    lista.forEach(tarefa => {
      criarTarefaAndamento(tarefa.nome)
    })

    botaoExcluirAndamento()
    moverParaRealizado()
  }
}
buscarTarefasAndamento()


function adicionarTarefaFinalizadaLocalStorage(tarefa){
  const tarefasAdicionadas = localStorage.getItem('tarefasFinalizadas')

  let tarefasAdicionadasArray = []
  if (tarefasAdicionadas != null || tarefasAdicionadas != undefined){
    tarefasAdicionadasArray = JSON.parse(tarefasAdicionadas)
  }

  tarefasAdicionadasArray.push(tarefa)

  localStorage.setItem('tarefasFinalizadas', JSON.stringify(tarefasAdicionadasArray))
}


function criarTarefaFinalizada(nomeTarefa){
  const div = document.createElement('div')
  div.classList.add('tarefa-a-fazer')

  div.innerHTML = `
    <div class="task-nome">
      <img src="./imgs/check1.svg" alt="Icone de tarefa concluída">
      <p class="nome-tarefa">${nomeTarefa}</p>
    </div>

    <div class="task-acoes task-acoes-feito">
      <button class="botao-excluir-concluido">
        <img src="./imgs/lixeira.svg" alt="Icone de uma lixeira">
      </button>
    </div>
  `

  containerTarefaFinalizada.appendChild(div)
}


function moverParaRealizado(){
  const botoesFinalizado = document.querySelectorAll('.botao-concluido')
  botoesFinalizado.forEach((botao) => {
    botao.removeEventListener('click', handleMoverRealizado)
    botao.addEventListener('click', handleMoverRealizado)
  })
}


function handleMoverRealizado(event){
  const elementoPai = event.target.closest('.tarefa-a-fazer')
  const nomeTarefa = elementoPai.querySelector('.nome-tarefa').textContent
  const tarefasLocalStorage = JSON.parse(localStorage.getItem('tarefasAndamento'))
  const listaAtualizada = tarefasLocalStorage.filter((tarefa) => tarefa.nome != nomeTarefa)

  localStorage.setItem('tarefasAndamento', JSON.stringify(listaAtualizada))
  elementoPai.remove()

  criarTarefaFinalizada(nomeTarefa)
  adicionarTarefaFinalizadaLocalStorage({
    nome: nomeTarefa,
    coluna: 'finalizada'
  })

  botaoExcluirFinalizado()
}


function botaoExcluirFinalizado(){
  const botoesExcluir = document.querySelectorAll('.botao-excluir-concluido')
  botoesExcluir.forEach((botao) => {
    botao.removeEventListener('click', handleExcluirFinalizado)
    botao.addEventListener('click', handleExcluirFinalizado)
  })
}


function handleExcluirFinalizado(event){
  const elementoPai = event.target.closest('.tarefa-a-fazer')
  elementoPai.remove()

  const nomeTarefa = elementoPai.querySelector('.nome-tarefa').textContent
  const tarefasLocalStorage = JSON.parse(localStorage.getItem('tarefasFinalizadas'))
  const listaAtualizada = tarefasLocalStorage.filter((tarefa) => tarefa.nome != nomeTarefa)

  localStorage.setItem('tarefasFinalizadas', JSON.stringify(listaAtualizada))
}


function buscarTarefasFinalizado() {
  const tarefas = localStorage.getItem('tarefasFinalizadas')

  if(tarefas != null || tarefas != undefined){
    const lista = JSON.parse(tarefas)

    lista.forEach(tarefa => {
      criarTarefaFinalizada(tarefa.nome)
    })
    botaoExcluirFinalizado()
  }
}
buscarTarefasFinalizado()