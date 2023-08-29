const operacoesAnterioresTexto = document.querySelector('#operacoesAnteriores')
const operacaoAtualTexto = document.querySelector('#operacaoAtual')
const botoes = document.querySelectorAll('#containerBotoes button')

class Calculadora {
    constructor(operacoesAnterioresTexto, operacaoAtualTexto) {
        this.operacoesAnterioresTexto = operacoesAnterioresTexto;
        this.operacaoAtualTexto = operacaoAtualTexto;
        this.operacaoAtual = '';
        // para unificar o dom e o objeto
    }
    // adiciona digito na tela
    adicionaDigito(digito) {
        // checar se a operação ja tem um ponto
        if (digito === '.' && this.operacaoAtualTexto.innerText.includes('.')) {
            return;
        }
        this.operacaoAtual = digito;
        this.updateTela()
    }

    // para processar todas as operaçoes da calculadora
    processarOperacao(operacao) {
        // checar se o valor atual esta vazio
        if (this.operacaoAtualTexto.innerText === '' && operacao !== 'C') {
            // mudar operação
            if (this.operacoesAnterioresTexto.innerText !== '') {
                this.mudarOperacao(operacao)
            }
            return
        }

        // capta o valor atual
        let valorOperacao;
        const anterior = +this.operacoesAnterioresTexto.innerText.split(' ')[0];
        const atual = +this.operacaoAtualTexto.innerText;

        switch (operacao) {
            case '+':
                valorOperacao = anterior + atual
                this.updateTela(valorOperacao, operacao, atual, anterior);
                break
            case '-':
                valorOperacao = anterior - atual
                this.updateTela(valorOperacao, operacao, atual, anterior);
                break
            case '/':
                valorOperacao = anterior / atual
                this.updateTela(valorOperacao, operacao, atual, anterior);
                break
            case '*':
                valorOperacao = anterior * atual
                this.updateTela(valorOperacao, operacao, atual, anterior);
                break
            case 'DEL':
                this.processaOperadorDel();
                break
            case 'CE':
                this.processaLimparOperacaoAtual();
                break
            case 'C':
                this.processaLimparTudo();
                break
            case '=':
                this.processaOperadorIgual();
                break
            default:
                return;
        }

    }
    // muda os valores na tela
    updateTela(
        valorOperacao = null,
        operacao = null,
        atual = null,
        anterior = null) {

        console.log(valorOperacao, operacao, atual, anterior);

        if (valorOperacao === null) {
            this.operacaoAtualTexto.innerText += this.operacaoAtual;
        } else {
            // checar se o valor é zero,se for adicionar o valor atual
            if (anterior === 0) {
                valorOperacao = atual;
            }
            // adicionar o valor atual para o anterior
            this.operacoesAnterioresTexto.innerText = `${valorOperacao} ${operacao}`;
            this.operacaoAtualTexto.innerText = '';
        }
    }
    // mudar a oprecao matematica
    mudarOperacao(operacao){
        const operacoesMatematicas = ['*','/','+','-'];

        if (!operacoesMatematicas.includes(operacao)){
            return
        }
        this.operacoesAnterioresTexto.innerText = 
        this.operacoesAnterioresTexto.innerText.slice(0,-1) + operacao;
    }
    // deleta o ultimo digito
    processaOperadorDel(){
        this.operacaoAtualTexto.innerText = this.operacaoAtualTexto.innerText.slice(0,-1);
    }
    // apaga a operacao atual
    processaLimparOperacaoAtual(){
        this.operacaoAtualTexto.innerText = '';
    }
    // limpa todas as operacoes
    processaLimparTudo(){
        this.operacaoAtualTexto.innerText = '';
        this.operacoesAnterioresTexto.innerText = '';
    }
    // processa resultado
    processaOperadorIgual(){
        const operacao = operacoesAnterioresTexto.innerText.split(" ")[1];

        this.processarOperacao(operacao)
    }
}

const calc = new Calculadora(operacoesAnterioresTexto,operacaoAtualTexto);


botoes.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText;
        // codigo que recebe o valor de texto dos botoes quando são clicados
        if (+value >= 0 || value === '.') {
            calc.adicionaDigito(value)
        } else{
            calc.processarOperacao(value);
        }
        // esse if separa quando o btn for clicado se ele é numero ou operação
    });
});



