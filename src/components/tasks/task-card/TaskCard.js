import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TaskStatus } from "../../../utils/http-utils/task-requests";
import { getLoggeduser } from "../../../utils/http-utils/user-requests";

export function TaskCard({ task, onTaskDelete, changeStatus }){
    const navigate = useNavigate();
    const navigateToEdit = () => {
        navigate(`/task/edit/${task.id}`);
    } 

    const renderNextStateButton = () => {
        if(task.authorId !== loggedUser.id && loggedUser.role !== "admin"){
            return;
        }
        switch(task.status) {
            case TaskStatus.NEW: return <Button variant='warning' onClick={() => changeStatus(TaskStatus.IN_PROGRESS, task.id)}> Move to In Progress</Button>;
            case TaskStatus.IN_PROGRESS: return <Button variant='danger'onClick={() => changeStatus(TaskStatus.IN_REVIEW, task.id)}> Move to In Review</Button>;
            case TaskStatus.IN_REVIEW: return <Button variant='success' onClick={() => changeStatus(TaskStatus.DONE, task.id)}> Move to Done</Button>
            default:
        }
    }
    const renderEditButton = () => {
        if(loggedUser.role === "admin" || loggedUser.id === task.authorId){
            return <Button variant="primary" onClick={navigateToEdit}>Edit</Button>;}
        }
    const renderDeleteButton = () => {
        if(loggedUser.role === "admin" || loggedUser.id === task.authorId){
            return <Button variant="danger" onClick={() => onTaskDelete(task.id)}>Delete</Button>;}
        }

    const onDragHandler = (event) => {
        event.dataTransfer.setData("taskId", task.id);
    }

    const loggedUser = getLoggeduser();
    return(
    <div className="task-card-wrapper" draggable={true} onDragStart={onDragHandler}>
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>
                <span className='key'>Author: </span>
                <span className='value'>{task.authorName}</span>
                </Card.Text>
                <Card.Text>
                <span className='key'>Status: </span>
                <span className='value'>{task.status}</span>
                </Card.Text>
                <Card.Text>
                <span className='key'>Created: </span>
                <span className='value'>{task.createdDate}</span>
                </Card.Text>
                <Card.Text>
                <span className='key'>Due: </span>
                <span className='value'>{task.dueDate}</span>
                </Card.Text>
                <div className='btn-holder'>
                { renderNextStateButton() }
                { renderEditButton() }
                { renderDeleteButton() }
               </div>
            </Card.Body>
        </Card>
    </div>
);
}