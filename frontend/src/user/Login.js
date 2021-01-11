import React, { useEffect } from 'react';
import { Form, Input, Button, Typography, Spin, Row, Col } from 'antd';
import { LoadingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Login = (props) => {
    const [form] = Form.useForm();    

    useEffect(() => {
        if (props.token) {
            props.history.goBack();
        }  
    }, [props.token, props.history])
    
    const onFinish = (values) => {                
        props.onAuth(values.username, values.password);       
        // props.history.goBack();
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
                            Login                    
                        </Typography.Title>                        
                        <Form                            
                            form={form}                            
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
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
                            >
                                <Input.Password prefix={<LockOutlined style={{ color: '#a1a1a1' }} />} placeholder="Password" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                    Login
                                </Button>
                                <p> or 
                                    <NavLink to="/signup/"> register here</NavLink>
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
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);