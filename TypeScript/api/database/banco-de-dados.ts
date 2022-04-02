import { Sequelize } from 'sequelize'
import config from 'config'

/**instancia do sequelize */
const instancia = new Sequelize(
  config.get("mysql.banco-de-dados"),
  config.get("mysql.usuario"),
  config.get("mysql.senha"),
  {
    host: config.get("mysql.host"),
    dialect: "mysql",
  }
)
export { instancia}