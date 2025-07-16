class BancoDeHoras{
    #tempo
    constructor(){
        this.#tempo = "";
    }

    verificarTempo(valorCredito){
       return valorCredito <= 0.99
    }

    calcular(valorCredito){
       if (valorCredito <= 1.74){
            return this.#tempo = "30 minutos";
        }else if ( valorCredito <= 2.99){
            return this.#tempo = "60 minutos";
        }else if (valorCredito >= 3.00){
            return this.#tempo = "120 minutos";
        }
    }

    get tempo(){
        return this.#tempo;
    }

}

class Troco{
    #troco
    constructor(){
        this.#troco = 0;
    }

    calculoTroco(valorCredito){
        if (valorCredito === 1.00 || valorCredito === 1.75 || valorCredito === 3.00){
            return this.#troco = "Sem troco";
        }else if (valorCredito <=1.74){
            return this.#troco = valorCredito - 1.00;
        }else if (valorCredito <=2.99){
            return this.#troco = valorCredito - 1.75;
        }else if (valorCredito >=3.01){
            return this.#troco = valorCredito - 3.00;
        }
    }

    get troco(){
        return this.#troco;
    }
}
class Sistema{
    constructor(final,troco){
        this.final = final;
        this.troco = troco;
    }

    solicitacoes(){
        const valorRecebido = parseFloat(document.getElementById("valorCreditado").value)
        if (isNaN(valorRecebido)){
            this.mostrarMinutos("Insira um valor válido","");
        }else if(this.final.verificarTempo(valorRecebido)){
            this.mostrarMinutos("Valor insuficiente. Use a tabela como auxílio","");
        }else{
            this.final.calcular(valorRecebido);
            this.troco.calculoTroco(valorRecebido);
            this.mostrarMinutos(this.final.tempo, this.troco.troco);
        }
    }    
    
    mostrarMinutos(tempo, troco){
        document.getElementById("tempoEstacionado").textContent = `${tempo}`;
        if (typeof troco ==="number"){
        document.getElementById("troco").textContent = `Troco: ${troco.toFixed(2).replace(".",",")}`;
        }else {
            document.getElementById("troco").textContent = `${troco}`;
        }
        document.getElementById("valorCreditado").value = "";
    }
}

const banco = new BancoDeHoras();
const troco = new Troco();
const solicitacao = new Sistema(banco,troco);