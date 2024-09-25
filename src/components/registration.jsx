import React from 'react';
import Popup from 'reactjs-popup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import 'reactjs-popup/dist/index.css';
import './registration.css'

const url=new URL("http://localhost:8080");

export default function Registration(props) {
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
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
return (
    <Popup 
    trigger={open => (<button className="button" id='registration-button'>do you want to save your stuff? <b><u>REGISTER</u></b></button>)} 
        modal>
    {close => (
    <>
        <form id='registration-form' action='POST' onSubmit={
                (e) => {
                  e.preventDefault()
                  if(password == "")
                    return
                  if(username == "")
                    return
                  fetch(url,{
                    mode:'cors',
                    method: 'POST',
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                  })    
                  .then((response) =>{
                    return response.text()
                  })
                  .then((prom) =>{
                    console.log(prom)
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
        <button type="submit">registration</button>
        </form>
    </>)}
    </Popup>
    )
}
