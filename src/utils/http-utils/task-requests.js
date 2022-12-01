import axios from 'axios';
import { getLoggeduser } from './user-requests';

export const TaskStatus = {
    NEW: 'New',
    IN_PROGRESS: 'In progress',
    IN_REVIEW: 'In review',
    DONE: 'Done'
}
const apiUrl = 'http://localhost:3005/tasks';

//.then => resolved correctly
//.catch => has error
//.finally => executed always
export function getAllTasks(){
    return axios.get(apiUrl);
}

export function getAllTasksForAuthor(authorId){
    return axios.get(`${apiUrl}?authorId=${authorId}`);
}

export function getTaskById(taskId){
    return axios.get(`${apiUrl}/${taskId}`);
}

export function deleteTask(taskId){
    return axios.delete(`${apiUrl}/${taskId}`);
}

export function saveTask(task){
       //create
    if(!task.id) {
        const loggedUser = getLoggeduser();

        task.authorId = loggedUser.id;
        task.authorName = loggedUser.name;
        task.status = TaskStatus.NEW;
        task.createdDate = new Date().toDateString();
        task.dueDate = new Date(task.dueDate).toDateString();
        return axios.post(apiUrl, task);
    }
    task.dueDate = new Date(task.dueDate).toDateString();
    return axios.put(`${apiUrl}/${task.id}`, task);
}