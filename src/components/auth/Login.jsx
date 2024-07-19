import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading, token } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            dispatch({ type: 'auth/login/fulfilled', payload: { token: storedToken, user: null } });
        }
    }, [dispatch]);

    const handleLogin = async (e) => {
        e.preventDefault();
        await dispatch(login({ email, password }));
    };

    useEffect(() => {
        if (token) {
            navigate('/employees');
        }
    }, [token, navigate]);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="mt-5">
                        <Card.Body>
                            <Card.Title className="text-center">Login</Card.Title>
                            {error && <p className="text-danger">{error}</p>}
                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" disabled={loading} className="d-block w-100">
                                    {loading ? 'Loading...' : 'Login'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
