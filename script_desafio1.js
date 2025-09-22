var produtos = [
  { id: 1, nome: "Produto A", preco: 40, imagem: "img/1.png" },
  { id: 2, nome: "Produto B", preco: 50, imagem: "img/2.png" },
  { id: 3, nome: "Produto C", preco: 60, imagem: "img/3.png" },
  { id: 4, nome: "Produto D", preco: 70, imagem: "img/4.png" }
];


var carrinho = [];


function renderizarProdutos() {
  var listaProdutos = document.getElementById("listaProdutos");
  listaProdutos.innerHTML = "";

  produtos.forEach(produto => {
    var elemento = document.createElement("div");

    var img = document.createElement("img");
    img.src = produto.imagem;
    img.alt = produto.nome;
    img.style.width = "100px";
    img.style.display = "block";
    img.style.marginBottom = "8px";

    var info = document.createElement("span");
    info.textContent = produto.nome + " - " + formatarPreco(produto.preco);

    var botaoAdd = document.createElement("button");
    botaoAdd.textContent = "Adicionar ao carrinho";
    botaoAdd.addEventListener("click", function () {
        let itemNoCarrinho = carrinho.find(item => item.id === produto.id);
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
  elemento.appendChild(botaoAdd);

  listaProdutos.appendChild(elemento);
  });
}


function atualizarCarrinho() {
  var listaCarrinho = document.getElementById("listaCarrinho");
  listaCarrinho.innerHTML = "";

  var ul = document.createElement("ul");
  var total = 0;

  carrinho.forEach(item => {
    var li = document.createElement("li");
    var subtotal = item.preco * item.quantidade;

    li.textContent = `${item.nome} - ${formatarPreco(item.preco)} x ${item.quantidade} = ${subtotal}`;

    var botaoMais = document.createElement("button");
    botaoMais.textContent = "+";
    botaoMais.addEventListener("click", function () {
      aumentarQuantidade(item.id);
    });

    var botaoMenos = document.createElement("button");
    botaoMenos.textContent = "-";
    botaoMenos.addEventListener("click", function () {
      diminuirQuantidade(item.id);
    });

    li.appendChild(botaoMais);
    li.appendChild(botaoMenos);
    ul.appendChild(li);

    total += subtotal;
  });

  listaCarrinho.appendChild(ul);

  var totalTexto = document.createElement("p");
  totalTexto.textContent = `Total: ${formatarPreco(total)}`;
  listaCarrinho.appendChild(totalTexto);
}


function aumentarQuantidade(id) {
  let item = carrinho.find(produto => produto.id === id);
  if (item) {
    item.quantidade++;
    atualizarCarrinho();
  }
}


function diminuirQuantidade(id) {
  let item = carrinho.find(produto => produto.id === id);
  if (item) {
    item.quantidade--;
    if (item.quantidade === 0) {
      carrinho = carrinho.filter(produto => produto.id !== id);
    }
    atualizarCarrinho();
  }
}


function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}


renderizarProdutos();
atualizarCarrinho();
