import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getVehicleById, saveVehicle, VehicleType, FuelType } from "../../../utils/http-utils/vehicle-requests";
import './VehicleForm.scss'

export function VehicleForm() {

    const navigate = useNavigate();
    const params = useParams();
    const [vehicle, setVehicle] = useState({
        brand: '',
        model: '',
        constructionYear: '',
        type: '',
        fuelType: '',
        seatsNum: '',
        picture: '',
        privePerDay: '',
        availableCarsCount: ''
    });

    useEffect(() => {
        if (params.id) {
            getVehicleById(params.id).then((response) => {
                setVehicle(response.data);
            });
        }
    }, [params.id]);
    const onVehicleSubmit = (event) => {
        event.preventDefault();

        saveVehicle(vehicle).then(() => {
            navigate('/vehicles-list');
        });
    }
    const onInputChange = (event) => {
        setVehicle((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    return (
        <div className="vehicle-form-wrapper">
            <Form onSubmit={onVehicleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" placeholder="Enter brand" name="brand" value={vehicle.brand} onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" placeholder="Enter model" name="model" value={vehicle.model} onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Construction year</Form.Label>
                    <Form.Control type="text" placeholder="Enter construction year" name="constructionYear" value={vehicle.constructionYear} onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Number of seats</Form.Label>
                    <Form.Control type="text" placeholder="Enter number of seats" name="seatsNum" value={vehicle.seatsNum} onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Picture</Form.Label>
                    <Form.Control type="text" placeholder="Enter picture url" name="picture" value={vehicle.picture} onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Price per day</Form.Label>
                    <Form.Control type="text" placeholder="Enter price per day" name="pricePerDay" value={vehicle.pricePerDay} onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Available cars</Form.Label>
                    <Form.Control type="text" placeholder="Enter available cars count" name="availableCarsCount" value={vehicle.availableCarsCount} onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSelect" >
                    <Form.Label>Vehicle type</Form.Label>
                    <Form.Select aria-label="Select vehicle type" placeholder="Select vehicle type" name="type" value={vehicle.type} onChange={onInputChange}>
                        {Object.keys(VehicleType).map(type => <option key={type} value={VehicleType[type]}>{VehicleType[type]}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSelect" >
                    <Form.Label>Fuel type</Form.Label>
                    <Form.Select aria-label="Select fuel type" placeholder="Select fuel type" name="fuel" value={vehicle.fuel} onChange={onInputChange}>
                        {Object.keys(FuelType).map(fuel => <option key={fuel} value={FuelType[fuel]}>{FuelType[fuel]}</option>)}
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                    {vehicle.id ? 'Edit' : 'Create'} Vehicle
                </Button>
            </Form>
        </div>
    );
}