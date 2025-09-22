//criar a lista de produtos com id, nome e preço
var produtos = [
    {id: 1, nome: "Ração para cães", preco: 60, categoria: "cães", estoque: 15, imagem: "img/1.png"},
    {id: 2, nome: "Petisco para gatos", preco: 10, categoria: "gatos", estoque: 20, imagem: "img/2.png"},
    {id: 3, nome: "Brinquedo para gatos", preco: 15, categoria: "gatos", estoque: 8, imagem: "img/3.png"},
    {id: 5, nome: "Biscoito para cães", preco: 15, categoria: "cães", estoque: 10, imagem: "img/4.png"},
    {id: 6, nome: "Ração para gatos", preco: 70, categoria: "gatos", estoque: 0, imagem: "img/5.png"},
    {id: 7, nome: "Brinquedo para cães", preco: 25, categoria: "cães", estoque: 15, imagem: "img/6.png"},
    {id: 8, nome: "Coleira para cães", preco: 30, categoria: "cães", estoque: 20, imagem: "img/7.png"},
    {id: 9, nome: "Guia para cães", preco: 28, categoria: "cães", estoque: 0, imagem: "img/8.png"},
    {id: 10, nome: "Ração úmida para cães", preco: 23, categoria: "cães", estoque: 0, imagem: "img/9.png"},
    {id: 11, nome: "Colar para gatos", preco: 28, categoria: "gatos", estoque: 10, imagem: "img/10.png"},
    {id: 12, nome: "Ração úmida para gatos", preco: 25, categoria: "gatos", estoque: 5, imagem: "img/11.png"}
];


//criar a lista/array do carrinho (inicialmente vazia)
var carrinho = [];


function renderizarProdutos (lista = produtos) {
    var listaProdutos = document.getElementById("listaProdutos");
    listaProdutos.innerHTML = "";

    lista.forEach(produto=> {
        var elemento = document.createElement("div"); //elemento = bloco que mostra o objeto produto

        var img = document.createElement("img");
        img.src = produto.imagem;
        img.alt = produto.nome;
        img.classList.add("icone-produto");

        var info = document.createElement("span");
        info.textContent = produto.nome + " " + formatarPreco(produto.preco); //mostra o nome e o preço do produto dentro do bloco

        var botaoAdd = document.createElement("button"); //cria o botão de adicionar ao carrinho
        botaoAdd.textContent = "Adicionar ao carrinho"; //adiciona o texto do botão
        botaoAdd.addEventListener("click", function(){ //adiciona a ação ao clicar no botão por função anônima
            let itemNoCarrinho = carrinho.find(item => item.id === produto.id); //verifica se o item já tá no carrinho
            if (itemNoCarrinho) {
                itemNoCarrinho.quantidade++;
            } else {
                carrinho.push({
                    id: produto.id,
                    nome: produto.nome,
                    preco: produto.preco,
                    quantidade: 1,
                    imagem: produto.imagem
                });
            }
            atualizarCarrinho();
        });

        elemento.appendChild(img);
        elemento.appendChild(info);
        elemento.appendChild(botaoAdd); //coloca o botão de adicionar dentro do bloco que mostra o produto
        listaProdutos.appendChild(elemento);
    });

    document.getElementById("total-produtos").textContent = listaProdutos.length;
}


function atualizarCarrinho() {
    var listaCarrinho = document.getElementById("listaCarrinho");
    listaCarrinho.innerHTML = "";

    var ul = document.createElement("ul");
    var total = 0;

    carrinho.forEach(item => {
        var li = document.createElement("div");
        li.classList.add("item-produto");
        var subtotal = item.preco * item.quantidade; //subtotal é o total por produto, calculando preço por quantidade
        var img = document.createElement("img");
        img.src = item.imagem;
        img.alt = item.nome;
        img.classList.add("icone-produto");

        var nome = document.createElement("span");
        nome.textContent = item.nome;

        var preco = document.createElement("span");
        preco.textContent = formatarPreco(item.preco);

        var quantidade = document.createElement("span");
        var quantidadeBox = document.createElement("div");
        quantidadeBox.classList.add("quantidade");

        var botaoMenos = document.createElement("button");
        botaoMenos.textContent = "-";
        botaoMenos.addEventListener("click", function() {
            diminuirQuantidade(item.id);
        });

        var contador = document.createElement("span");
        contador.textContent = item.quantidade;

        var botaoMais = document.createElement("button");
        botaoMais.textContent = "+";
        botaoMais.addEventListener("click", function() {
            aumentarQuantidade(item.id);
        });

        quantidadeBox.appendChild(botaoMenos);
        quantidadeBox.appendChild(contador);
        quantidadeBox.appendChild(botaoMais);


        li.appendChild(img);
        li.appendChild(nome);
        li.appendChild(preco);
        li.appendChild(quantidadeBox);

        ul.appendChild(li); //coloca os itens da lista (li) dentro da lista (ul)

        total += subtotal; //indica que o total do carrinho vai ser a soma dos subtotais dos itens
    });

    listaCarrinho.appendChild(ul); //coloca a lista ul dentro do div listaCarrinho

    document.getElementById("valorTotal").textContent = formatarPreco(total);
}


function aumentarQuantidade(id) {
    let item = carrinho.find(produto => produto.id === id);
    if (item) {
        item.quantidade++;
        atualizarCarrinho()
    }
}


function diminuirQuantidade(id) {
    let item = carrinho.find(produto => produto.id === id);
    if (item) {
        item.quantidade--;
        if (item.quantidade === 0) {
            carrinho = carrinho.filter(produto => produto.id !== id); //percorre o array e filtra todos os itens que tem o id diferente daquele que tô excluindo, deixando só eles no array 
        }
        atualizarCarrinho();
    }
}


function aplicarFiltros() {
    var textoBusca = document.getElementById("busca").value.toLowerCase();
    var estoque = document.getElementById("estoque").value;
    var precoMin = parseFloat(document.getElementById("preco-min").value) || 0;
    var precoMax = parseFloat(document.getElementById("preco-max").value) || Infinity;
    var filtroCaes = document.getElementById("filtro-caes").checked;
    var filtroGatos = document.getElementById("filtro-gatos").checked;
    var classificar = document.getElementById("classificar").value;

    var filtrados = produtos.filter(produto => {
        var nomeOk = produto.nome.toLowerCase().includes(textoBusca);
        var precoOk = produto.preco >= precoMin && produto.preco <= precoMax;

        var categoriaOk = true;
        if (filtroCaes && !filtroGatos) categoriaOk = produto.categoria === "cães";
        else if (!filtroCaes && filtroGatos) categoriaOk = produto.categoria === "gatos";
        else if (!filtroCaes && !filtroGatos) categoriaOk = true; //nenhum marcado = todos

        var estoqueOk = true;
        if (estoque === "disponivel") estoqueOk = produto.estoque > 0;
        else if (estoque === "indisponivel") estoqueOk = produto.estoque === 0;

        return nomeOk && categoriaOk && precoOk && estoqueOk;
    })

        if (classificar === "preco-asc") {
            filtrados.sort((a, b) => a.preco - b.preco);
        } else if (classificar === "preco-desc") {
            filtrados.sort((a, b) => b.preco - a.preco);
        } else if (classificar === "alfabetica") {
            filtrados.sort((a, b) => a.nome.localeCompare(b.nome));
        }

    renderizarProdutos(filtrados);

}


function limparFiltros() {
    document.getElementById("busca").value = "";
    document.getElementById("filtro-caes").checked = false;
    document.getElementById("filtro-gatos").checked = false;
    document.getElementById("classificar").value = "nenhum"; 
    document.getElementById("estoque").value = "todos";
    document.getElementById("preco-min").value = "";
    document.getElementById("preco-max").value = "";

    aplicarFiltros();
}


function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


aplicarFiltros();

atualizarCarrinho();