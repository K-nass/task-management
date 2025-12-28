import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authApi.login(formData);
            login(response);
            navigate('/tasks');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{ width: '100%', maxWidth: '450px' }}>
                <div className="glass-card">
                    <div className="text-center mb-xl">
                        <h1 style={{
                            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            marginBottom: 'var(--spacing-sm)'
                        }}>
                            Welcome Back
                        </h1>
                        <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                            Sign in to manage your tasks
                        </p>
                    </div>

                    {error && (
                        <div className="alert alert-error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your@email.com"
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Enter your password"
                            required
                        />

                        <Button type="submit" variant="primary" loading={loading} style={{ width: '100%' }}>
                            Sign In
                        </Button>
                    </form>

                    <div className="text-center mt-lg">
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Don't have an account?{' '}
                            <Link to="/register" style={{ color: 'var(--color-primary-light)', fontWeight: 600 }}>
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
