import React, { useEffect } from 'react';
import { Form, Input, Button, Typography, Spin, Row, Col } from 'antd';
import { LoadingOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Signup = (props) => {
    const [form] = Form.useForm();    

    useEffect(() => {
        if (props.token) {
            props.history.goBack();
        }  
    }, [props.token, props.history])
    
    const onFinish = (values) => {        
        props.onAuth(values.username, values.email, values.password, values.confirm);        
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>            
            {props.loading ? (
                <Spin indicator={loadingIcon} />
            ) : (
                <Row>            
                    <Col xs={0} sm={4} md={6} lg={8}></Col> 
                    <Col xs={24} sm={16} md={12} lg={8} style={{ border: '1px solid #a1a1a1', padding: '16px' }}>
                        <Typography.Title level={3} style={{ textAlign: 'center' }}>
                            Sign up                    
                        </Typography.Title>                        
                        <Form                            
                            form={form}
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                name="email"                                
                                rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                                ]}
                            >
                                <Input prefix={<MailOutlined style={{ color: '#a1a1a1' }} />} placeholder="E-mail" />
                            </Form.Item>
                            <Form.Item
                                name="username"                                                          
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                                ]}
                            >
                                <Input prefix={<UserOutlined style={{ color: '#a1a1a1' }} />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"                                
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                ]}
                                hasFeedback
                            >
                                <Input.Password prefix={<LockOutlined style={{ color: '#a1a1a1' }} />} placeholder="Password" />
                            </Form.Item>
                            <Form.Item
                                name="confirm"                                
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                }),
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined style={{ color: '#a1a1a1' }} />} placeholder="Confirm Password" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                    Sign up
                                </Button>
                                <p> or 
                                    <NavLink to="/login/"> login here</NavLink>
                                </p>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col xs={0} sm={4} md={6} lg={8}></Col> 
                </Row>
            )}  
        </div>      
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,        
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);