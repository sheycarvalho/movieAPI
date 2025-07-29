#!/usr/bin/env node

import { Command } from 'commander';
import fetch from "node-fetch";
import chalk from 'chalk';

const program = new Command();

// Substitua 'SEU_API_KEY' pela sua chave da OMDb API
const OMDb_API_KEY = '79f18c9f';
const OMDb_BASE_URL = `https://www.omdbapi.com/?apikey=79f18c9f`;

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