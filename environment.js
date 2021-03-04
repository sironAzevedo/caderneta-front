const fs = require('fs');

const value = process.env.ENVIRONMENT || 'local'
const heroku = `export const environment = {
    production: true,
    ambiente: '${value}'
}`

fs.writeFile('src/environments/environment.prod.ts', heroku, (err, result) => {
    if(err){
        console.log('Falha ao escrever arquivo com variavel de ambiente');
    }
});