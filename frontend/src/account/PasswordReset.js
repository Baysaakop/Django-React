import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import { Redirect } from 'react-router';
import { MailOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const PasswordReset = (props) => {    
    const [form] = Form.useForm();    

    if (props.token) {
        return <Redirect to="/" />
    }

    function onFinish(values) {
        console.log(values)
    }

    return (
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
           <div>
                <Typography.Title level={3}>Password Reset</Typography.Title>
                <Typography.Text>
                    <QuestionCircleOutlined /> Please enter your e-mail to receive password reset mail.
                </Typography.Text>
                <Form
                    form={form}
                    name="password-reset"
                    layout="vertical"
                    style={{ padding: '16px', borderRadius: '5px' }}
                    onFinish={onFinish}
                >
                    <Form.Item 
                        name="email" 
                        label="E-mail"
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
                    <Form.Item>
                        <Button size="large" type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
           </div>
       </div>          
    );
};

const mapStateToProps = (state) => {
    return {          
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);