import Sequelize from 'sequelize'
import { instancia } from '../database/banco-de-dados'

/**Criando objeto para colunas da tabela */
const colunas = {
  empresa: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  categoria: {
    type: Sequelize.ENUM('ração', 'brinquedos'),
    allowNull: false
  }
}
// configurar opçoes da tabela
const opcoes = {
  freezeTableName: true,
  tableName: 'fornecedores',
  timestamps: true,
  createdAt: 'dataCriacao',
  updatedAt: 'dataAtualizacao',
  version:'versao'
}
//exportando modulo // tres parametros 
export const Instancia = instancia.define('fornecedor', colunas, opcoes)