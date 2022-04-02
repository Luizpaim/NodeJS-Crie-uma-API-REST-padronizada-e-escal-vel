

class DadosnaoFornecido extends Error {
  constructor(campo) {
    const mensagem = `Nao foram informado os dados para atualizar`;
    super(mensagem);
    this.name = "DadosNaoFornecido";
    this.idErro = 2;
  }
}
module.exports = DadosnaoFornecido;
