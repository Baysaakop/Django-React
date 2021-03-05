import React, { useEffect } from 'react';
import { Form, Input, Button, Typography, Spin, Row, Col, Divider } from 'antd';
import { FacebookFilled, FacebookOutlined, GoogleOutlined, GooglePlusOutlined, LoadingOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import svg from './signin.svg';

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
        <Row gutter={[16, 16]}>            
            <Col xs={24} sm={12}>
                <div style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>            
                    {props.loading ? (
                        <Spin indicator={loadingIcon} />
                    ) : (
                        <div style={{ width: '500px' }}>
                            <div className="form-title" style={{ textAlign: 'center' }}>
                                <Typography.Title level={2} style={{ background: 'transparent' }}>
                                    Sign in with your account   
                                </Typography.Title>
                                <Typography.Title level={5} style={{ background: 'transparent' }}>
                                    Or <a href="/signup" style={{ background: 'transparent' }}>create an account</a>
                                </Typography.Title>
                            </div>                                                        
                            <Form                            
                                form={form}                                                    
                                name="login"
                                className="login"
                                layout="vertical"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}   
                                style={{ borderRadius: '5px', padding: '16px' }}                     
                            >
                                <Form.Item            
                                    label="E-mail"                    
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        }
                                    ]}
                                >
                                    <Input prefix={<MailOutlined style={{ color: '#555' }} />} placeholder="Email" />
                                </Form.Item>

                                <Form.Item         
                                    label="Password"                             
                                    name="password"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    ]}
                                >
                                    <Input.Password prefix={<LockOutlined style={{ color: '#555' }} />} placeholder="Password" />
                                </Form.Item>
                                <Form.Item>
                                    <Button size="large" type="primary" htmlType="submit" style={{ width: '100%' }}>
                                        Sign in
                                    </Button>
                                </Form.Item>
                                <Divider>OR</Divider>
                                <Button size="large" danger type="primary" icon={<GoogleOutlined style={{ fontSize: '18px' }} />} style={{ width: '100%', marginBottom: '16px' }}>
                                    Sign in with Google
                                </Button>
                                <Button size="large" type="primary" icon={<FacebookFilled style={{ fontSize: '18px' }} />} style={{ width: '100%' }}>
                                    Sign in with Facebook
                                </Button>
                            </Form>                    
                        </div>
                    )}  
                </div>   
            </Col>
            <Col xs={24} sm={12}>
                <div style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={svg} alt="illustration-login" style={{ width: '70%', height: 'auto' }} />
                </div>
            </Col>
        </Row>             
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