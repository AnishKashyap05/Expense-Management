import React, { useState } from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'


const Login = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const formSubmitHandler = async (values) => {
        try {
            setLoading(true);
            const { data } = await axios.post('/users/login', values)
            message.success('Login successful')
            localStorage.setItem('user', JSON.stringify({ ...data.user, password: '' }))
            setLoading(false)
            navigate('/')
        } catch (error) {
            setLoading(false)
            message.error('Somethimg went wrong')
        }
    }
        return (
            <>
                <div className='register-page'>
                    {loading && <Spinner/>}
                    <Form layout='vertical' onFinish={formSubmitHandler}>
                        <h1>Login</h1>
                        <Form.Item label="Email" name="email">
                            <Input />
                        </Form.Item>

                        <Form.Item label="Password" name="password">
                            <Input />
                        </Form.Item>
                        <div className='d-flex'>
                            <Link to="/register">Not registered? click here</Link>
                            <button className='btn btn-primary' >Login</button>
                        </div>
                    </Form>
                </div>
            </>
        )
    }

export default Login