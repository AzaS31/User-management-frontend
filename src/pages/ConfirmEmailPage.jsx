import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';

const ConfirmEmailPage = () => {
    const { token } = useParams();
    const [status, setStatus] = useState('loading'); 

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                await api.get(`/auth/confirm/${token}`);
                setStatus('success');
            } catch (err) {
                setStatus('error');
            }
        };

        confirmEmail();
    }, [token]);

    if (status === 'loading') {
        return <p style={{ textAlign: 'center', marginTop: '50px' }}>Confirming your email...</p>;
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
            {status === 'success' ? (
                <>
                    <h2>Your email has been confirmed!</h2>
                    <p>You can now <Link to="/login">login</Link>.</p>
                </>
            ) : (
                <h2>Invalid or expired token</h2>
            )}
        </div>
    );
};

export default ConfirmEmailPage;
