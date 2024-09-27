import React from 'react';
import Popup from 'reactjs-popup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import 'reactjs-popup/dist/index.css';

const url=new URL("http://localhost:8080");

export default function Login(props) {
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [get_flag, setGetFlag] = useState(false)
const handleChange = (e)=>{
  const input = e.target
  switch(e.target.getAttribute('name')){
    case 'username':
      setUsername(e.target.value)
      break;
    case 'password':
      setPassword(e.target.value)
      break;
    }
}
const handleCheck = (e) =>{setGetFlag(e.target.checked)}
return (
    <Popup 
    trigger={open => (<button className="button" id='login-button' style={{border:"none"}}><b><u>
      {props.logged != "" ? `${props.logged}` : "login" }</u></b></button>)} 
        modal>
    {close => (
    <>
        <form id='login-form' action='PUT' onSubmit={
                (e) => {
                  e.preventDefault()
                  if(password == "")
                    return
                  if(username == "")
                    return
                  fetch(url,{
                    mode:'cors',
                    method: 'PUT',
                    body: JSON.stringify({
                        registration: false,
                        username: username,
                        password: password
                    })
                  })    
                  .then((response) =>{
                    return response.text()
                  })
                  .then((msg) =>{
                    if(msg != "username not found" && msg != "wrong password"){
                      if(get_flag){
                        fetch(url,{
                          mode:'cors',
                          method: 'GET',
                        })
                        .then((response) =>{
                          return response.text()
                        })
                        .then((data) =>{
                          console.log(data)
                        })
                        .then(() => {
                          props.handleLogin(`${username}`)
                        })
                      }
                      else
                        props.handleLogin(`${username}`)
                      setGetFlag(false)
                      close()
                    }
                    else
                      console.log(msg)
                  })
                }}>
        <FloatingLabel
          controlId="floatingGroup"
          label="USERNAME"
          className="mb-3"
        >
          <Form.Control name='username' type="text" placeholder="username" onChange={handleChange}/>          
        </ FloatingLabel>
        <FloatingLabel
          controlId="floatingGroup"
          label="PASSWORD"
          className="mb-3"
        >
          <Form.Control name='password' type="password" placeholder="password" onChange={handleChange}/>          
        </ FloatingLabel>
        <Form.Check 
          type="switch"
          id="get-checkbox"
          label="check this if you want to download your saved work"
          onChange={handleCheck}
        />
        <button type="submit">login</button>
        </form>
    </>)}
    </Popup>
    )
}
