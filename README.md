# Catálogo de produtos — Grupo Mateus

Projeto desenvolvido nas aulas de Front-end para praticar HTML, CSS, JavaScript e comunicação com uma API.

- **Aula 1 — 22/10:** consulta de produtos com GET e exibição na página.
- **Aula 2 — 29/10:** formulário, validação e simulação de cadastro com POST.

## Funcionalidades

- Consultar três produtos na API DummyJSON.
- Exibir nome e preço na página.
- Mostrar mensagens de carregamento, sucesso e erro.
- Capturar e validar nome e preço pelo formulário.
- Enviar uma requisição POST e mostrar a resposta.
- Desabilitar os botões enquanto as requisições estão em andamento.

> **Importante:** a DummyJSON simula o cadastro, mas não salva o produto permanentemente. O produto enviado não aparecerá nas consultas seguintes.
>
> Documentação: https://dummyjson.com/docs/products

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Fetch API
- API DummyJSON

## Estrutura do projeto

```text
catalogo-mateus/
├── index.html
├── style.css
└── app.js
```

- **index.html:** estrutura da página, botão de consulta, lista e formulário.
- **style.css:** aparência dos elementos e estados dos botões.
- **app.js:** eventos, validações, requisições e atualização da interface.

Se os arquivos estiverem com os nomes das cópias enviadas, renomeie:

- `index(2).html` → `index.html`
- `style(1).css` → `style.css`
- `app(2).js` → `app.js`

Mantenha os três arquivos na mesma pasta, pois o HTML referencia `style.css` e `app.js`.

## Como executar

1. Abra a pasta no VS Code.
2. Abra `index.html` com o Live Server.
3. Mantenha conexão com a internet para acessar a API.
4. Abra o Console do navegador e confira a mensagem `Javascript is running!`.
5. Use a aba **Network** para observar as requisições e respostas.

O projeto não exige backend próprio, framework ou instalação de dependências com npm.

## Aula 1 — Consultar produtos e mostrar na página

### Objetivo

Entender o caminho entre uma ação na interface, uma requisição HTTP, a resposta da API e a atualização da página.

### Conceitos trabalhados

- **HTML:** estrutura dos elementos da página.
- **CSS:** apresentação visual.
- **JavaScript:** comportamento e interação.
- **DOM:** representação da página que o JavaScript pode consultar e modificar.
- **Eventos:** executar uma função quando o usuário interage com um elemento.
- **API e HTTP:** comunicação entre o navegador e um serviço.
- **GET:** consulta de dados.
- **JSON:** formato utilizado na troca de dados.
- **Assincronismo:** lidar com operações que levam tempo para terminar.
- **async/await:** organizar a espera por operações assíncronas, sem bloquear toda a página.
- **Repetição:** percorrer os produtos com `for...of`.
- **Template strings:** combinar textos e valores.
- **Tratamento de erros:** utilizar `try`, `catch` e `finally`.

### Passo a passo

#### 1. Preparar a interface

Criar os elementos usados na consulta:

- Botão `#buscar`.
- Mensagem de status `#mensagem`.
- Lista `#lista`.

Carregar o JavaScript com `defer` para executá-lo depois que o HTML tiver sido analisado pelo navegador:

```html
<script src="app.js" defer></script>
```

#### 2. Selecionar os elementos

Usar `document.querySelector()` para guardar referências aos elementos:

```js
const botao = document.querySelector('#buscar');
const mensagem = document.querySelector('#mensagem');
const lista = document.querySelector('#lista');
```

O seletor com `#` encontra o elemento pelo seu `id`.

#### 3. Definir o endereço da API

```js
const API = 'https://dummyjson.com/products';
```

A consulta acrescenta os parâmetros:

```text
?limit=3&select=title,price
```

- `limit=3`: limita a resposta a três produtos.
- `select=title,price`: solicita os campos usados na exibição.

#### 4. Criar a função de consulta

Criar a função assíncrona `buscarProdutos()`.

No início da função:

```js
mensagem.textContent = 'Carregando...';
botao.disabled = true;
```

Isso informa que a consulta está acontecendo e evita novos cliques enquanto ela não termina.

#### 5. Fazer a requisição GET

Dentro do bloco `try`, chamar `fetch()` e aguardar a resposta:

```js
const resposta = await fetch(API + '?limit=3&select=title,price');
```

Quando não informamos outro método nessa chamada, o `fetch` utiliza GET.

#### 6. Conferir o status HTTP

```js
if (!resposta.ok) {
    throw new Error(`HTTP ${resposta.status}`);
}
```

Uma resposta HTTP de erro não faz o `fetch` cair automaticamente no `catch`. Por isso, verificamos o status e lançamos um erro quando necessário.

#### 7. Ler o JSON da resposta

```js
const dados = await resposta.json();
```

Esse método lê o corpo da resposta e interpreta o JSON. A lista de produtos fica em `dados.products`.

#### 8. Atualizar a lista no DOM

```js
lista.textContent = '';

for (const produto of dados.products) {
    const item = document.createElement('li');
    item.textContent = `${produto.title} - R$ ${produto.price}`;
    lista.appendChild(item);
}
```

Nesse trecho:

1. Limpamos os resultados anteriores.
2. Percorremos a lista de produtos.
3. Criamos um elemento `li` para cada produto.
4. Preenchemos seu texto.
5. Adicionamos o elemento à página.

A limpeza evita acumular os mesmos itens a cada nova consulta.

#### 9. Finalizar a consulta

- No sucesso, mostrar `Consulta concluída com sucesso!`.
- No `catch`, mostrar uma mensagem com o erro.
- No `finally`, habilitar novamente o botão.

```js
catch (erro) {
    mensagem.textContent = `Erro ao buscar produtos: ${erro.message}`;
} finally {
    botao.disabled = false;
}
```

O `finally` executa tanto no sucesso quanto na falha.

#### 10. Ligar o botão à função

```js
botao.addEventListener('click', buscarProdutos);
```

Passamos a função sem parênteses para que ela seja chamada quando o clique acontecer.

### Resultado da aula 1

Uma página que consulta produtos e mostra os resultados, com mensagens de status e tratamento de erros.

## Aula 2 — Formulário, validação e envio POST

### Objetivo

Capturar dados digitados pelo usuário, validar esses dados e enviar um objeto para a API, acompanhando o resultado na interface.

### Conceitos trabalhados

- Formulários, campos, rótulos e botão de envio.
- Evento `submit`.
- `preventDefault()` para impedir o envio padrão do formulário.
- Leitura dos campos com `.value`.
- `trim()` para remover espaços das extremidades do texto.
- `Number()` para converter o preço em número.
- Condicionais e retorno antecipado com `return`.
- Objetos JavaScript.
- Método HTTP POST.
- Cabeçalhos e corpo da requisição.
- `JSON.stringify()` para transformar um objeto em texto JSON.
- Limpeza do formulário com `reset()`.
- Controle de foco com `focus()`.

### Passo a passo

#### 1. Acrescentar o formulário

Criar os elementos:

- Formulário `#formulario`.
- Campo de nome `#nome`.
- Campo de preço `#preco`.
- Botão `#salvar`.
- Mensagem de resultado `#resultado`.

No HTML, utilizar:

- `required` nos campos.
- `maxlength="80"` no nome.
- `type="number"`, `min="0.01"` e `step="0.01"` no preço.

Esses atributos oferecem uma primeira validação pelo navegador.

#### 2. Selecionar os elementos no JavaScript

```js
const formulario = document.querySelector('#formulario');
const campoNome = document.querySelector('#nome');
const campoPreco = document.querySelector('#preco');
const botaoSalvar = document.querySelector('#salvar');
const resultado = document.querySelector('#resultado');
```

#### 3. Criar a função de envio

Criar `async function salvarProduto(evento)`.

No início:

```js
evento.preventDefault();

if (botaoSalvar.disabled) {
    return;
}
```

O `preventDefault()` mantém o controle do envio pelo JavaScript, sem a navegação padrão do formulário.

A verificação do botão evita iniciar outro envio enquanto uma requisição já está em andamento.

#### 4. Ler e preparar os dados

```js
const nome = campoNome.value.trim();
const preco = Number(campoPreco.value);
campoNome.value = nome;
```

- `.value` lê o conteúdo do campo.
- `trim()` remove espaços no início e no final do nome.
- `Number()` converte o preço em número.

Exemplo: `"  Caderno  "` passa a ser `"Caderno"`.

#### 5. Validar antes de enviar

```js
if (!nome || Number.isNaN(preco) || preco <= 0) {
    resultado.textContent = 'Preencha os campos corretamente.';
    return;
}
```

O código interrompe o envio quando:

- O nome está vazio após o `trim()`.
- O preço convertido é `NaN`.
- O preço é menor ou igual a zero.

A validação JavaScript complementa a validação do HTML. Em um sistema real, o servidor também precisa validar os dados.

#### 6. Montar o objeto do produto

```js
const produto = {
    title: nome,
    price: preco
};
```

Os nomes `title` e `price` correspondem aos campos esperados pela API.

Nesse momento, `produto` ainda é um objeto JavaScript na memória do navegador.

#### 7. Informar que o envio começou

```js
botaoSalvar.disabled = true;
resultado.textContent = 'Enviando dados...';
```

#### 8. Configurar a requisição POST

Dentro do `try`:

```js
const resposta = await fetch(API + '/add', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(produto)
});
```

- `method`: informa o método HTTP.
- `headers`: informa o formato do conteúdo enviado.
- `body`: contém os dados da requisição.
- `JSON.stringify()`: transforma o objeto em texto JSON.

#### 9. Tratar a resposta

```js
if (!resposta.ok) {
    throw new Error(`HTTP ${resposta.status}`);
}

const dados = await resposta.json();

resultado.textContent =
    'Simulação concluída com sucesso! Produto cadastrado: ' +
    dados.title + ' - R$ ' + dados.price;
```

A mensagem mostra os dados retornados pela API. Isso confirma a resposta da simulação, não um cadastro permanente.

#### 10. Limpar o formulário e finalizar

Depois do sucesso:

```js
formulario.reset();
campoNome.focus();
```

Tratar falhas e liberar o botão:

```js
catch (erro) {
    resultado.textContent = `Erro ao enviar dados: ${erro.message}`;
} finally {
    botaoSalvar.disabled = false;
}
```

Os campos são limpos apenas no caminho de sucesso. O botão é liberado tanto no sucesso quanto no erro.

#### 11. Registrar o evento do formulário

```js
formulario.addEventListener('submit', salvarProduto);
```

O evento pertence ao formulário, permitindo tratar o envio pelo botão e pelo teclado.

### Resultado da aula 2

O projeto mantém a consulta GET e passa a ter formulário com validação, envio POST e retorno visual ao usuário.

O produto enviado não é acrescentado automaticamente à lista da página e não é salvo permanentemente pela API.

## Sugestões de testes

- [ ] Buscar produtos e conferir a lista.
- [ ] Buscar novamente e verificar que os itens não se acumulam.
- [ ] Tentar enviar o formulário vazio.
- [ ] Testar um nome composto apenas por espaços.
- [ ] Testar preço zero ou negativo.
- [ ] Enviar um nome e um preço válidos.
- [ ] Conferir a mensagem de sucesso, a limpeza e o foco no nome.
- [ ] Simular falha de rede e verificar a mensagem de erro.
- [ ] Confirmar que o botão volta a ficar disponível após sucesso ou falha.

Alguns dados inválidos são barrados pelo navegador antes que o evento `submit` chegue ao JavaScript.

## Observações sobre a versão atual

- Os valores são fictícios. O prefixo `R$` não realiza conversão de moeda.
- A frase inicial `Formulário ainda sem JavaScript.` ficou da etapa anterior. Pode ser substituída por `Preencha os campos para simular o cadastro.`.
- Ainda não há persistência local, edição ou exclusão de produtos.
- O projeto utiliza funções e objetos simples. Classes, herança e TypeScript ainda não fazem parte desta implementação.
- Os trechos de código deste README explicam etapas do `app.js`; não são scripts independentes para executar isoladamente.
- O conteúdo documenta o ponto alcançado nas aulas, sem pressupor domínio completo de todos os conceitos pela turma.
