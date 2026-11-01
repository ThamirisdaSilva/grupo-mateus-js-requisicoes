console.log('Javascript is running!');
const API = 'https://dummyjson.com/products';
const botao = document.querySelector('#buscar')
const mensagem = document.querySelector('#mensagem')
const lista = document.querySelector('#lista')

async function buscarProdutos() {
    mensagem.textContent = 'Carregando...';
    botao.disabled = true;
    try {
        const resposta = await fetch(API + '?limit=3&select=title,price');
        if (!resposta.ok) {
            throw new Error(`HTTP ${resposta.status}`);
        }
        const dados = await resposta.json();
        lista.textContent = '';
        for (const produto of dados.products) {
            const item = document.createElement('li');
            item.textContent = `${produto.title} - R$ ${produto.price}`;
            lista.appendChild(item);
        }
        mensagem.textContent = 'Consulta concluída com sucesso!';
    } catch (erro) {
        mensagem.textContent = `Erro ao buscar produtos: ${erro.message}`;
    } finally {
        botao.disabled = false;
    }
}
botao.addEventListener('click', buscarProdutos);

const formulario = document.querySelector('#formulario');
const campoNome = document.querySelector('#nome');
const campoPreco = document.querySelector('#preco');
const botaoSalvar = document.querySelector('#salvar');
const resultado = document.querySelector('#resultado');

async function salvarProduto(evento) {
    evento.preventDefault();
    if (botaoSalvar.disabled) {
        return;
    }
    const nome = campoNome.value.trim();
    const preco = Number(campoPreco.value);
    campoNome.value = nome;
    if (!nome || Number.isNaN(preco) || preco <= 0) {
        resultado.textContent = 'Preencha os campos corretamente.';
        return;
    }

    const produto = {title: nome, price: preco};
    botaoSalvar.disabled = true;
    resultado.textContent = 'Enviando dados...';

    try {
        const resposta = await fetch(API + '/add',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(produto)
        });
        if (!resposta.ok) {
            throw new Error(`HTTP ${resposta.status}`);
        }
        const dados = await resposta.json();
        resultado.textContent = 'Simulação concluida com sucesso! Produto cadastrado: ' + dados.title + ' - R$ ' + dados.price;
        formulario.reset();
        campoNome.focus();
    } catch (erro) {
        resultado.textContent = `Erro ao enviar dados: ${erro.message}`;
    } finally {
        botaoSalvar.disabled = false;
    }
}
formulario.addEventListener('submit', salvarProduto);