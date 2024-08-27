import React from 'react';
import Popup from 'reactjs-popup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import 'reactjs-popup/dist/index.css';
import './groupForm.css'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'
import './fonts/AirstreamNF.ttf'

export default function GroupFormPopup(props) {
const [mem_arr,setMemArr] = useState([])
const [group_tit,setGroupTit] = useState('')
const [cat,setCat] = useState('')
let group = {id: uuidv4(), group_title:'', members:[], category: ''}
let member = ''
const handleChange = (e) => {
    const input = e.target
    switch(e.target.getAttribute('name')){
      case 'group':
        setGroupTit(e.target.value)
        break;
      case 'member':
        member = e.target.value
        break;
      case 'category':
        setCat(e.target.value)
        break;      
    }
}
const resetVariables = () => {
  setMemArr([])
  setGroupTit('')
  setCat('')
}
    return (
        <Popup 
            trigger={open => (<button className="button">{open ? 'Creating...' : 'CREATE A GROUP'}</button>)} 
                modal>
            {close => (
              <>
              <button className="close-button" onClick={()=>{
                resetVariables()
                close()}}>
                &times;
              </button>
              <h1 style={{fontFamily:'AirstreamNF',color:'rgb(255, 90, 90)',borderBottom:'5px dotted rgb(255, 90, 90)',}}>CREATE YOUR GROUP</h1>
              <form id='group-form' action='POST' onSubmit={
                (e) => {
                  e.preventDefault();
                  group.members = mem_arr
                  group.group_title = group_tit
                  group.category = cat
                  resetVariables()
                  props.setGroupArray([...props.group_array,group])
                  close();
                }}>
    
                <FloatingLabel
                  controlId="floatingGroup"
                  label="GROUP"
                  className="mb-3"
                >
                  <Form.Control name='group' type="text" placeholder="group" onChange={handleChange}/>          
                </ FloatingLabel>
                    
                <FloatingLabel controlId="floatingCategory" label="select category">
                  <Form.Select name='category' aria-label="select category" onChange={handleChange}>
                    <option>Open this select menu</option>
                    <option>Sport</option>
                    <option>Boardgame</option>
                    <option>Meeting</option>
                    <option>Other</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingMember"
                  label="MEMBER"
                  className="mb-3"
                >
                  <Form.Control name='member' type="text" placeholder="member" onChange={handleChange}/>    
                  <button type='button' id='add-button' onClick={(e)=>
                    {
                      let new_mem = {id: uuidv4(), name: `${member}`}
                      let form_input_member = document.getElementById('floatingMember')
                      form_input_member.value = ''
                      setMemArr([...mem_arr,new_mem])
                    }}>
                    ADD</button>      
                </ FloatingLabel>
                <div>
                    <h1 style={{fontFamily:'AirstreamNF',color:'rgb(255, 90, 90)'}}>MEMBERS</h1>
                    <ul>
                    {mem_arr.map(m => {
                        return <li key={m.id}> {m.name} </li>
                    })}
                    </ul>
                </div>
                <button type="submit">submit</button>
              </form>
              </>
            )}
        </Popup>
        )
}
