import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getRentalById, saveRental } from "../../../utils/http-utils/rental-requests";
import { getLoggeduser } from "../../../utils/http-utils/user-requests";
import { getVehicleForRental, saveVehicle } from "../../../utils/http-utils/vehicle-requests";
import './RentalForm.scss';

export function RentalForm() {

    const vehicleForRental = getVehicleForRental();
    const navigate = useNavigate();
    const params = useParams();
    const [rental, setRental] = useState({
        startDate: '',
        endDate: '',
        vehicleId: 0,
        vehicleName: '',
        totalPrice: 0
    });

    useEffect(() => {
        if (params.id) {
            getRentalById(params.id).then((response) => setRental(response.data));
        }
    }, [params.id]);

    const loggedUser = getLoggeduser();

    /*function setUserRole(loggedUser){
            if(loggedUser.role !== "VIP customer"){

                let userRentalsForLast60Days = (getAllRentals())
                .data
                .filter(rental => rental.id === loggedUser.id &&
                    new Date(rental.startDate) > new Date(new Date().setDate(new Date().getDate() - 60)));
        
        
            if (userRentalsForLast60Days.length >= 2) {
                loggedUser.role = "VIP customer";
                saveUser(loggedUser);
            }
        }
    }*/

    function calculatePriceFunc() {
        let endDate = new Date(rental.endDate);
        let startDate = new Date(rental.startDate);
        let rentalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
        if (rentalDays < 1) {
            return <span className="span-error">You can't rent a car for less than 1 day! Please enter valid dates!</span>;
        }

        let totalPrice = vehicleForRental.pricePerDay * rentalDays;
        if (loggedUser.role === "VIP customer") {
            totalPrice -= totalPrice * 0.15;
        } else
            if (rentalDays > 10) {
                totalPrice -= totalPrice * 0.07;
            } else
                if (rentalDays > 5) {
                    totalPrice -= totalPrice * 0.05;
                } else
                    if (rentalDays > 3) {
                        totalPrice -= totalPrice * 0.03;
                    }

        rental.totalPrice = totalPrice.toFixed(2);
    }

    useEffect(() => {
        if (params.id) {
            getRentalById(params.id).then((response) => {
                setRental(response.data);
            });
        }
    }, [params.id]);

    const onRentalSubmit = (event) => {
        event.preventDefault();
        if (rental.vehicleId === 0) {
            vehicleForRental.availableCarsCount--;
            saveVehicle(vehicleForRental);
        }
        saveRental(rental).then(() => {
            navigate('/rentals-list');
        });
    }

    const onInputChange = (event) => {

        setRental((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
        try {
            calculatePriceFunc();
        } catch (error) {
            return;
        }

    }

    return (
        <div className="rental-form-wrapper">
            <Form onSubmit={onRentalSubmit}>
                <Form.Group>
                    <h2>Rent: {rental.vehicleId ? rental.vehicleName : vehicleForRental.brand + vehicleForRental.model}</h2>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter Start Date" name="startDate" value={rental.startDate} onChange={onInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter End Date" name="endDate" value={rental.endDate} onChange={onInputChange} />
                </Form.Group>
                {calculatePriceFunc()}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Total price is: </Form.Label>
                    <Form.Label>{rental.totalPrice}</Form.Label>
                </Form.Group>
                <Button id="button" variant="primary" type="submit">
                    {rental.id ? 'Edit' : 'Create'} Rental
                </Button>
            </Form>
        </div>
    );
}