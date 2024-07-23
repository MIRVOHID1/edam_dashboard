import React from 'react';
import { Card, Typography, Input, Button } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { loginUser } from '../../api';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const { Text } = Typography;

const Login = () => {
    const { handleSubmit, formState: { errors }, control, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const token = await loginUser(data);
            if (token) {
                localStorage.setItem('token', token);
                reset();
                navigate('/');
                alert('Login Successful');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed');
        }
    };

    return (
        <div className="container">
            <Card className="card" hoverable title="Login" bordered={false} style={{ width: 300 }}>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: 'Email is required' }}
                            render={({ field }) => (
                                <Input
                                    placeholder="Email Address"
                                    {...field}
                                    status={errors.email ? 'error' : ''}
                                />
                            )}
                        />
                        {errors.email && <Text type="danger">{errors.email.message}</Text>}
                    </div>
                    <div className="form-group">
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: 'Password is required' }}
                            render={({ field }) => (
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    {...field}
                                    status={errors.password ? 'error' : ''}
                                />
                            )}
                        />
                        {errors.password && <Text type="danger">{errors.password.message}</Text>}
                    </div>
                    <Button type="primary" htmlType="submit" className="login-button">
                        Submit
                    </Button>
                </form>
                <Text>Don't have an account? <a href="/register">Register</a></Text>
            </Card>
        </div>
    );
};

export default Login;
