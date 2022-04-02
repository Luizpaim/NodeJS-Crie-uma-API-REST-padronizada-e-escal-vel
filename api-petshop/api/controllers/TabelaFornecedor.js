//importar arquivos
const Modelo = require("../models/ModeloTabelaFornecedor");
const NaoEncontrado = require("../erros/NaoEncontrado");
//exportando metodos
module.exports = {
  listar() {
    return Modelo.findAll({
      raw: true,
    });
  },
  inserir(fornecedor) {
    return Modelo.create(fornecedor);
  },
  async pegarPorId(id) {
    const encontrado = await Modelo.findOne({
      where: {
        id: id,
      },
    });
    if (!encontrado) {
      throw new NaoEncontrado();
    }
    return encontrado;
  },
  atualizar(id, dadosParaAtualizar) {
    return Modelo.update(dadosParaAtualizar, { where: { id: id } });
  },
  async remover(id) {
    return await Modelo.destroy({
      where: { id: id },
    });
  },
};
