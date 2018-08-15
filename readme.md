# Carouseria 1.1 🎠
## Um carousel feito puramente em Javascript.

Em certos momentos, a simplicidade vai muito além de um humilde modo de viver. Para um ganho de eficiência, o uso da simplicidade torna-se uma ferramenta de extrema importância. Surge daí, a ideia de criar um carousel puramente em javascript sem a utilização de funções anexas que - por muitas vezes - acabam não sendo utilizadas e terminam justamente causando lentidão no carregamento da sua página. Dê uma checada e sinta-se a vontade pra usar essa ferramenta!

<p>
    <a href="https://tldrlegal.com/license/mit-license">
        <img src="https://img.shields.io/badge/Licensed%20under-MIT%20License-red.svg"/>
    </a>
    <a href="https://twitter.com/arrobarrella">
        <img src="https://img.shields.io/badge/Author-%40arrobarrella-blue.svg"/>
    </a>
    <img src="https://img.shields.io/badge/Version-1.1-brightgreen.svg"/>
</p>

--------------------------

## Como funciona?
A aplicação do **Carouseria** na sua página web é feita de forma simples e rápida. O script foi criado para detectar o bloco em que planeja-se inserir a ferramenta, reconhecer automaticamente (sob circunstâncias pré-definidas) os elementos dentro do bloco e então executar as funções desejadas, conforme indicado num método de definição que ocupa não mais que uma linha.

Confira a documentação abaixo.

--------------------------

## Configurando.
### Conteúdo do projeto.
* **carouseria.css:** inclui as modificações visuais necessárias, ainda mantendo a liberdade de customização total;
* **carouseria.js:** mantém o código completo e intocado, com a possibilidade de visualizar melhor as rotinas e realizar correções ou adições mais tranquilamente;
* **carouseria.min.css:** é uma versão reduzida da folha de estilo padrão da ferramenta, com a intenção de reforçar o propósito de criar uma ferramente concisa e eficiente;
* **carouseria.min.js:** é a versão reduzida do script (é recomendado o uso das versões reduzidas).

### Primeiros passos.
Simples como deve ser, é necessário somente que você faça o download dos arquivos deste repositório e copie a pasta `carouseria-src` para dentro do local do seu projeto. Pronto, a primeira etapa já está concluída.

### Carregamento.
No seu HTML estático, dentro da tag `<head>`, deve-se realizar o carregamento da folha de estilo do carousel inserindo a linha:
```HTML
<link rel="stylesheet" href="carouseria-src/carouseria.css" />
```

Já com a folha de estilo adicionada, deve-se então realizar o carregamento do plugin inserindo-o no final da tag `<body>` com a linha:
```HTML
<script type="application/javascript" src="carouseria-src/carouseria.min.js"></script>
```
Agora o plugin está preparado pra uso.

### Usabilidade.
Para que o carousel funcione, deve-se primeiramente configurar o bloco (`div`, `ul`, etc) em que exista a intenção de se utilizar a aplicação, com a definição do atributo `id="carouseria"` sendo a unica exigência aqui:

```HTML
<div id="carouseria"></div>
```

Em seguida, insira os itens (`div`, `a`, `img`, `span`, `li` etc) que deseja exibir dentro do bloco já criado anteriormente. Todo item inserido deve receber o atributo `class="carouseria-item"` para que o script reconheça-o própriamente como um elemento interno do carousel.

```HTML
<div id="carouseria">
    <div class="carouseria-item">Item 1</div>
    <div class="carouseria-item">Item 2</div>
    <div class="carouseria-item">Item 3</div>
    <div class="carouseria-item">Item 4</div>
</div>
```

Por fim, acrescenta-se ao final da tag `<body>` um script com a linha de inicialização do carousel com os parâmetros devidamente preenchidos e separados por espaço:

```HTML
<script>
    setCarousel("[size] [loop] [direction] [autoplay|millisecs] [index|orientation] [nav|orientation]");
</script>
```

>A partir daqui, seu carousel estará configurado e pronto para o uso!

### Parâmetros de inicialização.
| Parâmetro | Definição |
| ------ | ------ |
| `[size]` | Esse parâmetro deve ser substituído pela altura desejada para o carousel (em `px`, `em` ou `vh`). A largura é sempre definida por padrão como 100%, mas pode ser redefinida através da criação de uma folha de estilo própria. |
| `[loop]` | Indica a presença ou não de um loop entre os itens do carousel. Deve ser substituído por `true` ou `false`. |
| `[direction]` | Indica a direção da animação dos itens do carousel. Deve ser substituído por `vertical` ou `horizontal`. |
| <code>[autoplay&#124;millisecs]</code> | É um parâmetro em duas partes e indica a presença de transição automática entre os itens. O `autoplay` deve ser substituído por `true` ou `false`. Exclusivamente quando o parâmetro `autoplay` for `true`, deve-se indicar o tempo da transição automática substituindo `millisecs` pelo devido tempo em milissegundos, sempre precedido por uma barra vertical. Não é necessário a definição deste parâmetro (e nem a inclusão da barra) quando `autoplay` for `false`. |
| <code>[index&#124;orientation]</code> | Representa a presença de um índice visual no carousel. O `index` deve ser substituído por `true` ou `false`. O parâmetro `orientation` precedido por barra vertical representa a orientação do índice e só deve ser adicionado no caso da orientação desejada ser `vertical`. A orientação padrão de `index` é `horizontal` e dispensa o uso do parâmetro `orientation` precedido da barra. A dispensa também é aplicada no caso de `index` ser `false`. |
| <code>[nav&#124;orientation]</code> | Indica a presença dos botões de navegação nativos no carousel. O `nav` deve ser substituído por `true` ou `false`. O parâmetro `orientation` precedido por barra vertical representa a orientação dos botões e só deve ser adicionado no caso da orientação desejada ser `vertical`. A orientação padrão de `nav` é `horizontal` e dispensa o uso do parâmetro `orientation` precedido da barra. A dispensa também é aplicada no caso de `nav` ser `false`. |

Um exemplo de inicialização para um carousel pode ser:

    setCarousel("250px true vertical false true true");

### Métodos disponíveis no plugin.
* **`next()`** transiciona o carousel para o próximo item da fila;
* **`prev()`** transiciona o carousel para o item anterior da fila;
* **`setCarousel("parâmetros")`** inicializa o carousel usando parâmetros pré-definidos já descritos dentro das aspas;
* **`show(item, reverso)`** exibe um item especificado entre os parêntesis usando a animação normal ou invertida;
* **`hide(item, reverso)`** esconde um item especificado entre os parêntesis usando a animação normal ou invertida;
* **`changeFocus(item, reverso)`** muda o foco do item atual para o item passado como parâmetro dentro dos parêntesis também alternando entre a animação normal ou a invertida;
* **`refreshFocus(reverso)`** atualiza o item que está em foco no momento, permitindo a escolha entre a utilização da animação normal ou da invertida;

### Livre costumização.
É possível também a costumização das características visuais do carousel por meio da sobreposição dos elementos do css padrão na folha de estilo da sua página web.

### Open Source.
Você pode também contribuir para a melhoria do plugin em si criando uma [pull request](https://help.github.com/articles/creating-a-pull-request/) com suas propostas de inclusões ou modificações!

## Licença.
O plugin Carouseria está sob os termos de uso aplicados pela licença do [MIT](https://tldrlegal.com/license/mit-license).

****
>Idealizado e desenvolvido por Felipe Barrella Netto.
