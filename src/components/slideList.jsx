import Slide from './slide.jsx'

export default function slideList(props){
    return (
        <>
        {props.task_array.map(t => {
            //list rendered with react needs to have unique key
            return <Slide key={t.id} task={t} group_array={props.group_array} />
            }
        )}
        </>
    )
}