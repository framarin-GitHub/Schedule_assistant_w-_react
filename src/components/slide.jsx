import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import sun_icon from './icons/sun.svg'
import board_icon from './icons/chessboard.svg'
import meet_icon from './icons/meet.svg'
import sport_icon from './icons/sport.svg'
import './slide.css'
import './fonts/AirstreamNF.ttf'

function Slide(props) {
let img_source = ''
let group = props.group_array.filter((g) => g.group_title == props.task.group_title)
if(group.length > 0){
  switch(group[0].category){
    case 'Sport':
      img_source = sport_icon
      break;
    case 'Boardgame':
      img_source = board_icon
      break;
    case 'Meeting':
      img_source = meet_icon
      break;
    default:
      img_source = sun_icon
      break;
  }
}
else
  img_source = sun_icon
  return (
    <Card className='slide'>
      <Card.Img style={{width: '20em', flexShrink:'0', borderRight:'5px solid rgb(255, 90, 90)',}}variant="top" src={img_source}/>
      <Card.Body className='slide-content'>
        <Card.Title className='slide-title'>{props.task.date}</Card.Title>
        <Card.Text>
          {props.task.description}
        </Card.Text>
        <Card.Text>
          {props.task.event_title}
        </Card.Text>
        <Button variant="primary">{props.task.group_title}</Button>
      </Card.Body>
    </Card>
  );
}

export default Slide;
