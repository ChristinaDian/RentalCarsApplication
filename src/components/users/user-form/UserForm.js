import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './UserForm.scss';
import { getLoggeduser } from "../../../utils/http-utils/user-requests";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUser, getUserByIdFromAPI, saveUserinAPI } from "../../../redux/actions/user-actions";

export function UserForm() {

    const loggedUser = getLoggeduser();
    const params = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (params.id) {
            dispatch(getUserByIdFromAPI(params.id));
        }
    }, [params.id])

    const onFormSubmit = async (event) => {
        event.preventDefault();

        await dispatch(saveUserinAPI(user));
        navigate('/users-list');
    }
    const onInputChange = (event) => {

        let value = event.target.value;
        if (event.target.name === 'isActive') {
            value = event.target.checked;
        }
        dispatch(editUser({ [event.target.name]: value }));
    }
    const getAdminControls = () => {
        if (loggedUser.role === "admin") {
            return (
                <>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox" >
                        <Form.Select aria-label="Select role" placeholder="Select role" name="role" value={user.role} onChange={onInputChange}>
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </Form.Select>
                    </Form.Group>
                </>
            );
        }
    }

    return (
        <div className="user-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="name" value={user.name} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone number" name="phone" value={user.phone} onChange={onInputChange} />
                </Form.Group>

                {getAdminControls()}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}