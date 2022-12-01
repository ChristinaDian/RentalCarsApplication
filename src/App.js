import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Login } from './components/auth/login/Login';
import { Register } from './components/auth/register/Register';
import { Layout } from './components/layout/Layout';
import { RentalForm } from './components/rentals/rental-form/RentalForm';
import { RentalsList } from './components/rentals/rentals-list/RentalsList';
import { TaskForm } from './components/tasks/task-form/TaskForm';
import { TasksList } from './components/tasks/tasks-list/TasksList';
import { UserForm } from './components/users/user-form/UserForm';
import { User } from './components/users/user/User';
import { UsersList } from './components/users/users-list/UsersList';
import { VehicleForm } from './components/vehicles/vehicle-form/VehicleForm';
import { VehiclesList } from './components/vehicles/vehicle-list/VehiclesList';
import { AuthenticatedRoute } from './utils/guards/AuthenticatedRoute';
import { NonAuthenticatedGuard } from './utils/guards/NonAuthenticatedGuard';

function App() {
  return (
    <div className="App">     
    <Routes>
      <Route exact path="/register" element={<NonAuthenticatedGuard><Register /></NonAuthenticatedGuard> } />
      <Route exact path="/login" element={<NonAuthenticatedGuard><Login /></NonAuthenticatedGuard>} />
      <Route exact path="/" element={<AuthenticatedRoute><Layout /></AuthenticatedRoute>}>      
           
            <Route path="/users-list" element={<UsersList />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/user/create" element={<UserForm />} />
            <Route path="/user/edit/:id" element={<UserForm />} />
           
            <Route path="/tasks-list" element={<TasksList />} />
            <Route path="/tasks/:id" element={<TasksList />} />
            <Route path="/task/create" element={<TaskForm />} />
            <Route path="/task/edit/:id" element={<TaskForm />} />
           
            <Route path="/vehicles-list" element={<VehiclesList/>}/>
            <Route path="/vehicles/:id" element={<VehiclesList />} />
            <Route path="/vehicle/create" element={<VehicleForm/>}/>
            <Route path="/vehicle/edit/:id" element={<VehicleForm/>}/>
           
            <Route path="/rentals-list" element={<RentalsList/>}/>
            <Route path="/rentals/:id" element={<RentalsList />} />
            <Route path="/rental/create" element={<RentalForm/>}/>
            <Route path="/rental/edit/:id" element={<RentalForm/>}/>
      </Route>
    </Routes>
    </div>
  );
}

export default App;
