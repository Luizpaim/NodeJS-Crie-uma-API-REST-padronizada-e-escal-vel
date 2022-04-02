//importando arquivos
const ModeloTabelaFornecedor = require("./ModeloTabelaFornecedor");
const TabelaFornecedor = require("../controllers/TabelaFornecedor");
const CampoInvalido = require("../erros/CampoInvalido");

class Fornecedor {
  //contrutor define o padrão que as informações da classe que serão instanciadas
  constructor({
    id,
    empresa,
    email,
    categoria,
    dataCriacao,
    dataAtualizacao,
    versao,
  }) {
    this.id = id;
    this.empresa = empresa;
    this.email = email;
    this.categoria = categoria;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
    this.versao = versao;
  }

  async criar() {
    this.validar();
    const resultado = await TabelaFornecedor.inserir({
      empresa: this.empresa,
      email: this.email,
      categoria: this.categoria,
    });

    this.id = resultado.id;
    this.dataCriacao = resultado.dataCriacao;
    this.dataAtualizacao = resultado.dataAtualizacao;
    this.versao = resultado.versao;
  }

  async carregar() {
    const encontrado = await TabelaFornecedor.pegarPorId(this.id);
    this.empresa = encontrado.empresa;
    this.email = encontrado.email;
    this.categoria = encontrado.categoria;
    this.dataCriacao = encontrado.dataCriacao;
    this.dataAtualizacao = encontrado.dataAtualizacao;
    this.versao = encontrado.versao;
  }

  async atualizar() {
    this.validar();
    await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar);
  }
  async remover() {
    return await TabelaFornecedor.remover(this.id);
  }
  validar() {
    const campos = ["empresa", "email", "categoria"];

    campos.forEach((campo) => {
      const valor = this[campo];

      if (typeof valor !== "string" || typeof valor.length === 0) {
        throw new CampoInvalido(campo);
      }
    });
  }
}
module.exports = Fornecedor;
