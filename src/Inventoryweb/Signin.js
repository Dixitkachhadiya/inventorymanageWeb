import React,{useState} from 'react'
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import './Signin.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Authentication.js';
function Signin() {

    const [FormData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...FormData,
            [name]: value
        })
    }
    const auth = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (FormData.email !== "" && FormData.password !== "") {
            auth.loginAction(FormData);
        }
    }
    return (
        <>
            <Container className="d-flex justify-content-center align-items-center signin-container">
                <Card className="p-4 shadow-lg signin-card">
                    <h2 className="text-center mb-4">Sign In</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name='email'
                                placeholder="Enter email"
                                value={FormData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name='password'
                                placeholder="Password"
                                value={FormData.password}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Sign In
                        </Button>
                    </Form>
                    <Link as={Link} to={'/signup'} >
                        <div className="text-center mt-3">
                            <a href="#" className="text-decoration-none">Dont have a Account ? Sign Up</a>
                        </div>
                    </Link>
                </Card>
            </Container>
        </>
    )
}

export default Signin