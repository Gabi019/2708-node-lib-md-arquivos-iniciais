import fs from 'fs';
import chalk from 'chalk';
import { Console } from 'console';

//throw é pra jogar algo para fora , e o Error ja é metodo que é reconhecido no javascript
function trataErro (erro){
    throw new Error(chalk.red(erro.code, 'não há arquivo no diretorio'))
}

//Trata as informações do texto com expressoes regulares para pegar apenas oque é necessario
function extraLinks (texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}));
    return resultados.length !== 0 ? resultados : 'não há links no arquivo';
}

//essa é uma forma de trabalhar com algo assincrono usando promises, then e catch
/*function pegaArquivo (caminhoDoArquivo) {
    const enconding = 'utf-8';
    fs.promises
        .readFile(caminhoDoArquivo, enconding)
        .then((texto) => console.log(chalk.green(texto)))
        .catch(trataErro)
}*/

//forma de trabalhar com algo assincrono com async pra avisar que vai ser assincrono e await onde ele deve aguardar a resposta antes de seguir
async function pegaArquivo (caminhoDoArquivo) {
    try{
        const enconding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, enconding)
        return extraLinks(texto);
    }
    catch (erro) {
        trataErro(erro);
    }
    
}

//sem trabalhar com algo assincrono e nem sincrono
// function pegaArquivo(caminhoDoArquivo){
//     const enconding = 'utf-8'
//     fs.readFile(caminhoDoArquivo, enconding, (erro, texto) => {
//         if (erro) {
//             trataErro(erro);
//         }
//         console.log(chalk.green(texto))
//     } )
// }

export default pegaArquivo;