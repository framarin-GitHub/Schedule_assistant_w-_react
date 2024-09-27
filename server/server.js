import http from 'http' 
import mongoose from 'mongoose'
import { MongoClient, ServerApiVersion } from 'mongodb'
import { Console } from 'console'

mongoose.set("strictQuery", false)

const user = process.env.USERNAME
const password = process.env.PASSWORD

const uri = `mongodb+srv://${user}:${password}@devdb.1bvql.mongodb.net/?retryWrites=true&w=majority&appName=DevDB`;

const account_schema = mongoose.Schema({
  username : String,
  password : String,
})
const Account = mongoose.model("Account", account_schema)
const group_schema = mongoose.Schema({
  user : String,
  group_title : String,
  category : String,
  members : [String]
})
const Group = mongoose.model("Group", group_schema)
const task_schema = mongoose.Schema({
  user : String,
  events: [
    {
      id : String,
      event_title : String,
      group_title : String,
      description : String,
      date : String,
    }
  ],
})
const UserTask = mongoose.model("UserTask", task_schema)

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
const DBCheckCredentialsAccount = async (account) =>{
  try{
    let db_account = await Account.findOne({username: account.username})
    if(!db_account)
      return "username not found"
    if(db_account.password == account.password)
      return 0
    return "wrong password"
  } catch (error) {console.log(error)}
}
//SAVE METHODS
const DBSaveEvents = async (usertask) =>{
  let db_user_task = await UserTask.findOne({user: usertask.user})
  if(!db_user_task){
    await UserTask.create(usertask)
    return 0
  }
  await UserTask.replaceOne({_id : db_user_task._id}, usertask)
  return 0
}

let server = http.createServer((req,res) => {
    const headers = {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
        'Access-Control-Max-Age': 2592000, 
    }
    if(req.method == 'GET') {
      console.log("GET requested")
      let body = ''
      req.on('data', (chunk) => {
        body += chunk;
      }) 
      req.on('end', () => {
        res.writeHead(200, headers)
        res.write("ciaaooo")
        res.end()
      })
    }
    if(req.method == 'POST') {
      console.log("POST requested")
      let body = ''
      req.on('data', (chunk) => {
        body += chunk;
      }) 
      req.on('end', () => {
        let parsed_body = JSON.parse(body)
        let {groups, ...usertask} = parsed_body
        if(groups){

        }
        else{
          DBSaveEvents(usertask)
          .then((result) => {
            console.log(result)
            res.writeHead(200, headers)
            res.write(`${result}`)
            res.end()
          })
        }
      })
    }
    if(req.method == 'PUT') {
      console.log("PUT requested")
      let body = ''
      req.on('data', (chunk) => {
        body += chunk;
      })      
      req.on('end', () => {
        let parsed_body = JSON.parse(body)
        let account = {username:parsed_body.username,password:parsed_body.password}
        if(parsed_body.registration){
          DBEnrollAccount(account)
          .then(
            (result) => {
              console.log(result)
              res.writeHead(200, headers)
              res.write(`${result}`)
              res.end()
            })
        }
        else{
          console.log(account)
          DBCheckCredentialsAccount(account)
          .then(
            (result) => {
              console.log(result)
              res.writeHead(200, headers)
              res.write(`${result}`)
              res.end()
            })
        }

      })
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