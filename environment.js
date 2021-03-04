const fs = require('fs');

if(${process.env.ENVIRONMENT} !== null || ${process.env.ENVIRONMENT} !== undefined) {
    const heroku = `export const environment = {
        production: true,
        ambiente: '${process.env.ENVIRONMENT}'
    }`
    
    fs.writeFile('src/environments/environment.prod.ts', heroku, (err, result) => {
        if(err){
            console.log('Falha ao escrever arquivo com variavel de ambiente');
        }
    });
}