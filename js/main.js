const form = document.getElementById("novoItem");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

console.log(itens);
itens.forEach(element => {
    criarElemento(element);
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    //Verifica se o item adicionado já existe na lista
    const existe = itens.find(elemento => elemento.nome === nome.value )

    const itemAtual = {"nome": nome.value, "quantidade":  quantidade.value};

    if(existe){
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    }else{
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;
        criarElemento(itemAtual);
        itens.push(itemAtual);
    }

    //Salva a list de itens no localStorage
    localStorage.setItem("itens", JSON.stringify(itens));

    //Limpa o formulário após adicionar um item
    nome.value = "";
    quantidade.value = "";
})

//Modifica apenas o frontend para mostrar o item
function criarElemento(item){

    //Cria um elemento
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    //Cria um elemento
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;

    //Coloca um elemento dentro do outro
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;
    novoItem.appendChild(botaoDeleta(item.id));

    //Coloca um elemento dentro do outro
    const lista  = document.getElementById('lista');
    lista.appendChild(novoItem);

}

function atualizaElemento(item){
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}

function botaoDeleta(id){
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener("click", function() {
        deletarElemento(this.parentNode, id);
    })

    return elementoBotao;
}

function deletarElemento(tag, id){
    tag.remove();

    itens.splice(itens.findIndex(element => element.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens));
}