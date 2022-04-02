import  express  from "express";
import bodyParser from "body-parser";
import congig from 'config'

/**instancia express */
const app = express()
app.use(bodyParser.json())

/**levantando servidor */
app.listen(congig.get("api.porta"), () => console.log("a api esta funcionado"))