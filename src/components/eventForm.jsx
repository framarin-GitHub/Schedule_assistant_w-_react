import React from 'react';
import Popup from 'reactjs-popup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
import 'reactjs-popup/dist/index.css';
import './eventForm.css'
import './fonts/AirstreamNF.ttf'


export default function EventFormPopup(props) {
  let task_submitted = {id: uuidv4(), event_title:'', group_title:'', description:'', date:''}
  //update on each change because Form.Control use value prop
  //so, can't use onSubmit because react clears input
  const handleChange = (e) => {
    const input = e.target    
    switch(e.target.getAttribute('name')){
      case 'event_title':
        task_submitted.event_title = e.target.value
        break;
      case 'group_title':
        task_submitted.group_title = e.target.value
        break;
      case 'description':
        task_submitted.description = e.target.value
        break;
      case 'date':
        task_submitted.date = e.target.value
        break;
    }
  }
  //popup trigger is the element that is rendered to trigger the popup
  //close allows to use close() Popup's api
  //close returns the popup's jsx content
  return (
    <Popup 
        trigger={open => (<button className="button">{open ? 'Creating...' : 'CREATE AN EVENT'}</button>)} 
            modal>
        {close => (
          <>
          <button className="close-button" onClick={()=>
            {task_submitted = {id: uuidv4(), event_title:'', group_title:'', description:'', date:''};close()}}>
            &times;
          </button>
          <h1 style={{fontFamily:'AirstreamNF',color:'rgb(255, 90, 90)',borderBottom:'5px dotted rgb(255, 90, 90)',}}>INSERT EVENT DETAILS</h1>
          <form id='event-form' action='POST' onSubmit={
            (e) => {
              e.preventDefault();
              props.setTaskArray([...props.task_array,task_submitted]);
              close();
            }}>

            <FloatingLabel
              controlId="floatingTitle"
              label="TITLE"
              className="mb-3"
            >
              <Form.Control name='event_title' type="text" placeholder="event title" onChange={handleChange}/>          
            </ FloatingLabel>

            <FloatingLabel controlId="floatingGroup" label="select group">
              <Form.Select name='group_title' aria-label="select group" onChange={handleChange}>
                <option>Open this select menu</option>
                  {props.group_array.map(g =>{
                    return <option key={g.id}>{g.group_title}</option>
                  })}
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel
            controlId="floatingDescription"
            label="DESCRIPTION"
            className="mb-3"
            >
            <Form.Control name='description' as="textarea" placeholder="description" onChange={handleChange}/>
            </ FloatingLabel>

            <FloatingLabel
            controlId="floatingDate"
            label="DATE"
            className="mb-3"
            >
            <Form.Control name='date' type="date" onChange={handleChange}/>
            </ FloatingLabel>    

            <button type="submit">submit</button>
          </form>
          </>
        )}
    </Popup>
    )
};
