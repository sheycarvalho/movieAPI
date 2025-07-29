## Usando a CLI Publicada

1. Instale a CLI globalmente: ***npm install -g cineverse***
   
2. Use-a: ***movie-cli search "Avatar"***
   
3. Outras opções: ***movie-cli --help***

## Configuração Inicial e Instalação de Pacotes

> Diretório no terminal: 

    mkdir movie-cli

    cd movie-cli

> Inicializando o projeto Node.js: 

    npm init -y

> Instalando pacotes necessários: 

    npm install node-fetch commander chalk

> Estrutura da CLI e Busca de Dados da API: 

    crie arquivo index.js

    torne o arquivo executável (no Linux/macOS): chmod +x index.js

> Escolha uma API de filmes: 

    Uma boa opção é a OMDb API (The Open Movie Database). Você precisará de uma chave de API gratuita. Vá para www.omdbapi.com/apikey.aspx para obtê-la. Substitua SEU_API_KEY no código abaixo pela sua chave.

> Implemente o código para buscar e exibir os dados. No seu arquivo index.js, adicione o seguinte: 

    #!/usr/bin/env node

    const { Command } = require('commander');
    const fetch = require('node-fetch');
    const chalk = require('chalk');

    const program = new Command();

    // Substitua 'SEU_API_KEY' pela sua chave da OMDb API
       const OMDb_API_KEY = '79f18c9f';
       const OMDb_BASE_URL = `http://www.omdbapi.com/?apikey=79f18c9f`;

      program
     .name('movie-cli')
     .description('Uma CLI simples para buscar informações de filmes.')
     .version('1.0.0');

      program
     .command('search <title>')
     .description('Busca informações de um filme pelo título.')
     .action(async (title) => {
    try {
      console.log(chalk.blue(`Buscando informações para: ${title}...`));
      const response = await fetch(`${OMDb_BASE_URL}&t=${encodeURIComponent(title)}`);
      const data = await response.json();

      if (data.Response === 'True') {
        console.log('\n--- Detalhes do Filme ---');
        console.log(chalk.green(`Título: ${data.Title}`));
        console.log(chalk.cyan(`Ano: ${data.Year}`));
        console.log(chalk.magenta(`Diretor: ${data.Director}`));
        console.log(chalk.yellow(`Gênero: ${data.Genre}`));
        console.log(`Enredo: ${data.Plot}`);
        console.log(`IMDb Rating: ${chalk.bold(data.imdbRating)}`);
        if (data.BoxOffice) {
            console.log(`Bilheteria: ${data.BoxOffice}`);
        }
        console.log('-------------------------\n');
      } else {
        console.error(chalk.red(`Erro: ${data.Error}`));
      }
    } catch (error) {
      console.error(chalk.red('Ocorreu um erro ao buscar os dados:', error.message));
    }
    });

    program.parse(process.argv);

    // Se nenhum comando for especificado, mostra o help
    if (!process.argv.slice(2).length) {
    program.outputHelp();
    }

  > Testando a CLI Localmente: 

    node index.js search "Inception"

  > Publicando a CLI no NPM: 

    Verifique seu package.json: Certifique-se de que o campo "name" seja único no NPM (ex: movie-cli-seunome). O campo "version" deve ser 1.0.0 inicialmente. Adicione a propriedade "bin" no seu package.json para mapear o comando da sua CLI para o arquivo executável:

    {
    "name": "movie-cli-seunome", // Escolha um nome único
    "version": "1.0.0",
    "description": "Uma CLI simples para buscar informações de filmes.",
    "main": "index.js",
    "bin": {
    "movie-cli": "./index.js" // 'movie-cli' será o comando que as pessoas usarão
    },

    Altere movie-cli-seunome para um nome de pacote único no NPM, e movie-cli dentro de bin será o comando que os usuários digitarão no terminal.

    npm login

    npm publish
