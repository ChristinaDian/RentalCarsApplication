import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getRentalById, saveRental} from "../../../utils/http-utils/rental-requests";
import { getAllVehicles } from "../../../utils/http-utils/vehicle-requests";
import { VehiclesList } from "../../vehicles/vehicle-list/VehiclesList";
import './RentalForm.scss';

export function RentalForm(){

    const navigate = useNavigate();
    const params = useParams();
    const [rental, setRental] = useState({
        startDate: '',
        endDate: '',
        vehicle: ''
    });
    const VehiclesList = 
    useEffect(() => {
        if (params.id){
            getRentalById(params.id).then((response) => {
                setRental(response.data);
            });
        }
    }, [params.id]);
    const onRentalSubmit = (event) => {
        event.preventDefault();

        saveRental(rental).then(() =>{
            navigate('/rentals-list');
        });
    }
    const onInputChange = (event) =>{
        setRental((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    return(
        <div className="rental-form-wrapper">
            <Form onSubmit={onRentalSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter Start Date" name="startDate" value={rental.startDate} onChange={onInputChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter End Date" name="endDate" value={rental.endDate} onChange={onInputChange}/>
                </Form.Group>
             {/* <Form.Group className="mb-3" controlId="formBasicSelect" >
                    <Form.Select aria-label="Select vehicle" placeholder="Select vehicle" name="vehicle" value={vehicle.model} onChange={onInputChange}>
                        {Object.keys(VehiclesList).map(vehicle => <option key={vehicle.id} value={vehicle.model} >{vehicle.model}</option>)}
                    </Form.Select>
                </Form.Group>*/ }
                <Button variant="primary" type="submit">
                    {rental.id ? 'Edit' : 'Create'} Rental
                </Button>
            </Form>
        </div>
    );
}