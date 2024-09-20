import http from 'http' 
import mongoose from 'mongoose'
import { MongoClient, ServerApiVersion } from 'mongodb'
import { Console } from 'console'

mongoose.set("strictQuery", false)

const user = process.env.USERNAME
const password = process.env.PASSWORD

const uri = `mongodb+srv://${user}:${password}@devdb.1bvql.mongodb.net/?retryWrites=true&w=majority&appName=DevDB`;

const account_schema = mongoose.Schema({
  username: String,
  password: String,
})

const Account = mongoose.model("Account", account_schema)
function DBConnect() {
    mongoose.connect(uri)
    .then(() => {
      console.log("connected to MongoDB")
    })
  }
DBConnect()
const db_connection = mongoose.connection
db_connection.on("error", (err) => console.log(err))

//ACCOUNT METHODS
const DBEnrollAccount = async (new_account) =>{
    try{
      let flag = await Account.findOne({username: new_account.username})
      if(flag)
        return "username already used"
      await Account.create(new_account)
      return 0
    }catch (error) {console.log(error)}
}


let server = http.createServer((req,res) => {
    const headers = {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
        'Access-Control-Max-Age': 2592000, 
    }
    if (req.method == 'POST') {
        console.log("POST requested")
        res.writeHead(200, headers)
        res.write("CIAONEEE")
        res.end()
    }
    if(req.method == 'OPTIONS') {
        res.writeHead(200, headers)
        res.end()
    }
})
server.listen(process.env.PORT)
console.log(`server listening port ${process.env.PORT}`)
process.on('SIGINT', () => {
  console.log('Log that Ctrl + C has been pressed')
  mongoose.connection.close()
  process.exit()
})