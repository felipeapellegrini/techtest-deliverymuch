# Challenge Delivery Much

## API Giphy e Puppy Recipes
API em Node.js desenvolvida para o processo seletivo da Delivery Much, que busca receitas a partir de ingredientes.

### Pré-requisitos e dependências
* [Node](https://nodejs.org/en/)^12.18
* [axios](https://www.npmjs.com/package/axios)^0.19.2
* [dotenv](https://www.npmjs.com/package/dotenv)^8.2.0
* [express](https://www.npmjs.com/package/express)^4.17.1
* [tsyringe](https://github.com/microsoft/tsyringe)^4.3.0
* [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)^0.1.13

### Clonagem
Para clonar este projeto, execute o comando:

``https://github.com/felipeapellegrini/techtest-deliverymuch.git``

Agora você deve ter uma chave de acesso à API do [Giphy](https://developers.giphy.com/docs/sdk) e inseríla na variável ``GIPHY_API_KEY`` em ``env.example`` e em seguida renomar este arquivo para ``.env``.

Em seguida você poderá instalar os pacotes utilizando o ``npm`` ou ``yarn``

``
# yarn
yarn install
yarn start

# npm
npm install
npm start
``
Ao fazer uma requisição à ``localhost:3333`` temos:

``
{
  "message": "Hello Delivery Much"
}

### Docker
Se você preferir, pode executar o projeto em um container do docker, desde que tenha instalado em sua máquina o [Docker](https://www.docker.com/get-started) e o [Docker Compose](https://docs.docker.com/compose/install/#prerequisites)

### Configurações gerais
O projeto depende de 3 variáveis que estão em um arquivo ``.env``, são elas:

``GIPHY_API``: URL da API de busca no Giphy, é *obrigatória* e já vem preenchida

``GIPHY_API_KEY``: chave de acesso à API do Giphy, é obrigatória e vem vazia, deve ser preenchida com o valor da chave de acesso. Essa chave é grátis e você pode obtê-la [aqui](https://developers.giphy.com/docs/sdk)

``RECIPE_PUPPY_API``: URL da API pública do Recipe Puppy, é *obrigatória* e como a ``GIPHY_API``, já vem preenchida.

Um arquivo de modelo é disponibilizado na raiz do projeto (`.env`). Basta criar uma cópia na mesma pasta, editar e renomear.

## API
Este projeto tem apenas um endpoint, uma rota:

### GET/recipes
Esta rota espera um parâmetro `i`, contendo uma lista de ingredientes separados por vírgula e espaço, como no exemplo:

`http://{HOST}/recipes/?i={ingredient_1}, {ingredient_2}, {ingredient_3}`

Este parâmetro `i` espera no mínimo 1 e no máximo 3 ingredientes, e retorna um erro caso o usuário passe mais ou menos do que esses parâmetros.

Caso alguma das API's esteja indisponível, é retornado um erro HTTP 503.
