import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Login from './login.jsx'
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header(props){

const clickClear = () => {
    localStorage.clear()
}
return(
<>
  <Navbar bg="light" expand="lg" className="bg-body-tertiary" style={{
    minHeight:'10%',opacity:'0.9',fontSize:'32px',  
  }}>
  <Container>
    <Navbar.Brand href="#home" style={{fontSize:'40px'}}>Schedule Assistant</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#home" style={{marginLeft:'10em'}}>Home</Nav.Link>
        <Nav.Link href="" onClick={clickClear} style={{marginLeft:'5em'}}>Clear</Nav.Link>
        <Nav.Link style={{marginLeft:'5em'}}><Login logged={props.logged} handleLogin={props.handleLogin}/></Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
  </Navbar>
</>  
);
}
export default Header