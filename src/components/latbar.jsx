import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import EventFormPopup from './eventForm.jsx'
import GroupFormPopup from './groupForm.jsx';
import './latbar.css'

function Latbar(props){
    return (
    <>
    <div style={
      {height:'100%',backgroundImage: "linear-gradient(to bottom right, rgba(255,0,0,1), rgba(255,0,0,0))",padding:'5%',}}>
    <Navbar className="bg-body-tertiary">
        <Container>
          <EventFormPopup task_array={props.task_array} setTaskArray={props.setTaskArray} 
            id_counter={props.id_counter} setIdCounter={props.setIdCounter}
            group_array={props.group_array}/>
        </Container>
      </Navbar>
      <br />
      <Navbar className="bg-body-tertiary">
        <Container>
          <GroupFormPopup group_array={props.group_array} setGroupArray={props.setGroupArray}/>
        </Container>
      </Navbar>
      <br />
    </div>
    </>
    );
}

export default Latbar