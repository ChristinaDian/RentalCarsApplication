import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllTasksForAuthor, deleteTask, saveTask } from "../../../utils/http-utils/task-requests";
import { getUserById } from "../../../utils/http-utils/user-requests";
import { TaskCard } from "../../tasks/task-card/TaskCard";
import { UserCard } from "../users-card/UserCard";
import './User.scss'

export function User(props){

    const params = useParams();
    const [user, setUser] = useState(null);
    const [userTasks, setUserTasks] = useState([]);
    useEffect(() => {
        getUserById(params.id).then(response => setUser(response.data));
        getAllTasksForAuthor(params.id).then(response => setUserTasks(response.data));
    }, [params.id])
    
    const onChangeStatusHandler = (status, id) => {
        const task = userTasks.find(task => task.id === id);
        task.status = status;
        saveTask(task).then(() => {
            setUserTasks([...userTasks]);
        });
    }

    const onDeleteHandler = (id) => {
        deleteTask(id).then(() => {
            setUserTasks((prevState) => {
                return prevState.filter(task => task.id !== id);
            });
        });
    }

    return(
        <div className="user">
            <UserCard user={user} isInDetails={true} />
            <div className="user-tasks-holder">
                { userTasks.map(task => <TaskCard key={task.id} task={task} onTaskDelete={onDeleteHandler} changeStatus={onChangeStatusHandler} />) }
            </div>
        </div>
    )
}