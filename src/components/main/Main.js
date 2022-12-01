import { Route, Routes } from "react-router-dom";
import { RentalForm } from "../rentals/rental-form/RentalForm";
import { RentalsList } from "../rentals/rentals-list/RentalsList";
import { TaskForm } from "../tasks/task-form/TaskForm";
import { TasksList } from "../tasks/tasks-list/TasksList";
import { UserForm } from "../users/user-form/UserForm";
import { User } from "../users/user/User";
import { UsersList } from "../users/users-list/UsersList";
import { VehicleForm } from "../vehicles/vehicle-form/VehicleForm";
import { VehiclesList } from "../vehicles/vehicle-list/VehiclesList";

export function Main(){

    return(
        <div className="main-content">
            <Routes>
                <Route exact path = "/users-list" element={<UsersList/>}/>
                <Route exact path ="/user/:id" element={<User/>}/>
                <Route path="/user/create" element={<UserForm/>}/>
                <Route path="/user/edit/:id" element={<UserForm/>}/>
                <Route exact path = "/tasks-list" element={<TasksList/>}/>
                <Route path="/tasks/:id" element={<TasksList />} />
                <Route path="/task/create" element={<TaskForm/>}/>
                <Route path="/task/edit/:id" element={<TaskForm/>}/>
                <Route exact path = "/vehicles-list" element={<VehiclesList/>}/>
                <Route path="/vehicles/:id" element={<VehiclesList />} />
                <Route path="/vehicle/create" element={<VehicleForm/>}/>
                <Route path="/vehicle/edit/:id" element={<VehicleForm/>}/>
                <Route exact path = "/rentals-list" element={<RentalsList/>}/>
                <Route path="/rentals/:id" element={<RentalsList />} />
                <Route path="/rental/create" element={<RentalForm/>}/>
                <Route path="/rental/edit/:id" element={<RentalForm/>}/>
            </Routes>
        </div>
    );
}