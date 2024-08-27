import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import calendar from './components/img/6274.jpg'
import Header from './components/header.jsx'
import Latbar from './components/latbar.jsx'
import SlideList from './components/slideList.jsx'
import { useState, useEffect } from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

function App() {


//task_array keeps trace for all inserted events
//{id: uuidv4(), event_title:'', group_title:'', description:'', date:''}
const [task_array,setTaskArray] = useState([])
//group_array keeps trace for all groups
//{id: uuidv4(), group_title:'', members:[], category:''}
const [group_array,setGroupArray] = useState([])

//for filtering purpose
const [task_render_array, setTaskRenderArray] = useState([])
const filterTaskForRender = () => {
  let to_rend = task_array.filter(()=>{return true})
  setTaskRenderArray(to_rend)
}

//[] to activate on first render
useEffect(() => {
  const data = JSON.parse(localStorage.getItem('task_array'));
  if (data) {
    setTaskArray(data);
  }
}, []);
//[] to activate on first render
useEffect(() => {
  const data = JSON.parse(localStorage.getItem('group_array'));
  if (data) {
    setGroupArray(data);
  }
}, []);

//whenever array is modified
useEffect(() => {
  localStorage.setItem('task_array', JSON.stringify(task_array));
}, [task_array]);
//whenever array is modified
useEffect(() => {
  localStorage.setItem('group_array', JSON.stringify(group_array));
}, [group_array]);
return (
  <>
  <Parallax pages={2}> 
  <ParallaxLayer 
  offset={0} 
  speed={1}
  factor={1}
  style={{backgroundSize:'cover', backgroundImage: `url(${calendar})`}}>
  </ParallaxLayer>
  <ParallaxLayer offset={1}>
    <Header/>
    <div id='central-body'>
      <Latbar task_array={task_array} setTaskArray={setTaskArray}
        group_array={group_array} setGroupArray={setGroupArray}/>
      <div id='slides'>
        <SlideList task_array={task_array} group_array={group_array}/>
      </div>
    </div>
  </ParallaxLayer>
  </Parallax>
</>
);
}


export default App
