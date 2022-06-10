const form = document.querySelector('#novoItem');
const lista = document.querySelector('#lista');
const itens = JSON.parse(localStorage.getItem('itens')) || []; //declarando um array buscando direto do localStorage e, caso esse array não exista, será declarado um array aberto

itens.forEach(element => {
    criaItem(element);
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    var nome = evento.target.elements['nome']; //captando a tag onde consta o elemento nome
    var quantidade = evento.target.elements['quantidade']; //captando a tag onde consta o elemento quantidade

    const itemAtual = {
        "nome": nome.value, //recebendo o valor dentro da tag nome
        "quantidade": quantidade.value 
    }

    var existe = itens.find(elemento => elemento.nome === nome.value);
    //elemento.nome é o nome de um elemento que já consta no array *itens*
    //nome.value é o nome do item atual que foi criado acima

    if(existe)
    {
        itemAtual.id = existe.id;  //se há outro item de mesmo nome na lista *itens*, então, esse novo item recebe o mesmo id do item que já existia
        //esse id ficará como uma nova propriedade do objeto, assim como 'nome' e 'quantidade'
        atualizaItem(existe, itemAtual.quantidade);        
    }
    else
    {
        if(itens[(itens.length)-1])
        {
            itemAtual.id = itens[(itens.length)-1].id +1 
        }
        else
        {
            itemAtual.id = 0;
        }
         //se não há outro item de mesmo nome na lista *itens*, então, esse novo item recebe um id de mesmo número que o tamanho da lista
        criaItem(itemAtual); //cria elemento com o id criado acima (mesmo numero do tamanho da lista)
        itens.push(itemAtual); //colocando o item atual dentro do vetor de itens
    }

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = ""
    quantidade.value = ""
})


function criaItem (item)
{
    const quantidadeItem = document.createElement('strong');
    quantidadeItem.textContent = item.quantidade;

    quantidadeItem.dataset.id = item.id; //setando um novo data-attributes do tipo id para controle que recebe a propriedade id do objeto *item*

    const novoItem = document.createElement('li');
    novoItem.classList.add('item');
    novoItem.appendChild(quantidadeItem);
    novoItem.innerHTML += item.nome;

    lista.appendChild(novoItem);

    novoItem.appendChild(botaoDeleta(item.id));
}

function atualizaItem(itemAntigo, quantidadeAtual)
{
    tagQuantidade = document.querySelector("[data-id='"+itemAntigo.id+"']");
    tagQuantidade.textContent = quantidadeAtual;
    itemAntigo.quantidade = quantidadeAtual; 
}

function botaoDeleta(id)
{
    var botao = document.createElement("button");
    botao.innerText = "X";

    botao.addEventListener("click", (elemento) => {
 
        deletaElemento(elemento.target.parentNode, id);
    })
    return botao;
}

function deletaElemento(elemento,id)
{
    itens.splice(itens.findIndex(element => element.id === id), 1)
    elemento.remove();
    localStorage.setItem("itens", JSON.stringify(itens));
}