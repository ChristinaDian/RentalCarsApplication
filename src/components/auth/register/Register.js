import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../utils/http-utils/user-requests";
import './Register.scss';

export function Register() {

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    const onInputChange = (event) => {
        setUser((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });

        setError('');
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        registerUser(user).then(() => {
            navigate('/users-list');
        })
            .catch(error => setError(error.message));
    }

    return (
        <div className="user-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                {error && <span className="text-danger">{error}</span>}
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="name" value={user.name} onChange={onInputChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={onInputChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone number" name="phone" value={user.phone} onChange={onInputChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" name="password" value={user.password} onChange={onInputChange} required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Link to='/login'> Already have an account?</Link>
            </Form>

        </div>
    );
}