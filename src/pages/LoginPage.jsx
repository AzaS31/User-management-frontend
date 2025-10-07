import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/admin');
        } catch (err) {
            if (!err.response) {
                setError('Server is asleep or unavailable. Please try again.');
            } else {
                setError(err.response.data?.message || 'Login failed');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="login-container">
            <Row className="justify-content-center mt-5">
                <Col md={6} lg={4}>
                    <div className="login-card shadow p-4 rounded">
                        <h2 className="text-center mb-4">Login</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button type="submit" className="w-100 login-btn" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        /> Loading...
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </Button>
                        </Form>
                        <div className="text-center mt-3">
                            <a href="/register">Don't have an account? Register</a>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;
