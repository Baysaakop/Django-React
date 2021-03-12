import React, { useEffect, useState } from 'react';
import { Form, Input, Popconfirm, Button, message, Row, Col, DatePicker } from 'antd';
import { UserOutlined, EditOutlined, MobileOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import api from '../api';
import moment from 'moment';
import ImageUpload from '../components/ImageUpload';

function AccountDetail (props) {
    const [form] = Form.useForm();    
    const [image, setImage] = useState();  

    useEffect(() => {       
        console.log(props.user)
        if (props.user) { 
            setImage(props.user.profile.avatar)
            form.setFieldsValue({                
                email: props.user.email,             
                username: props.user.username,                
                first_name: props.user.first_name,
                last_name: props.user.last_name,                           
                mobile: props.user.profile.phone_number,      
                birth_date: props.user.profile.birth_date ? moment(props.user.profile.birth_date, "YYYY-MM-DD") : undefined,
                role: props.user.profile.role === "1" ? "Admin" : props.user.profile.role === "2" ? "Moderator" : "User"
            })              
        }
    }, [props.user])

    function onFinish (values) {                          
        console.log(values)
        // var formData = new FormData();
        // formData.append('username', values.username);
        // formData.append('last_name', values.last_name);        
        // formData.append('first_name', values.first_name);        
        // formData.append('image', image);
        // formData.append('token', props.token);
        // axios({
        //     method: 'PUT',
        //     url: `${api.customers}/${props.user.profile.id}/`,
        //     data: data
        // })            
        // .then(res => {
        //     if (res.status === 200 || res.status === 201) {
        //         message.info("Амжилттай засварлалаа.")   
        //     }                        
        //     form.resetFields()                             
        // })
        // .catch(err => {                            
        //     message.error("Засвар амжилтгүй боллоо. Та дахин оролдоно уу.")
        // })          
    }

    const onImageSelected = (path) => {
        setImage(path);
    }

    return (
        <div style={{ padding: '16px 0' }}>
            <Form layout="vertical" form={form} onFinish={onFinish} style={{ padding: '16px', border: '1px solid rgba(0, 0, 0, 0.5)' }}>
                <Row gutter={[16, 16]}>
                    <Col xs={12} sm={8} md={6}>
                        <Form.Item name="avatar" label="Avatar">
                            <ImageUpload onImageSelected={onImageSelected} image={image} />    
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={16} md={18}>
                        <Form.Item name="email" label="E-mail:">
                            <Input disabled prefix={<MailOutlined style={{ color: '#a1a1a1' }} />} />
                        </Form.Item>
                        <Form.Item name="username" label="Username:">
                            <Input prefix={<UserOutlined style={{ color: '#a1a1a1' }} />} />
                        </Form.Item>   
                        <Form.Item name="mobile" label="Phone Number:">
                            <Input prefix={<MobileOutlined style={{ color: '#a1a1a1' }} />} />
                        </Form.Item> 
                    </Col>
                </Row>           
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item name="last_name" label="Last Name:">
                            <Input prefix={<UserOutlined style={{ color: '#a1a1a1' }} />} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item name="first_name" label="First Name:">
                            <Input prefix={<UserOutlined style={{ color: '#a1a1a1' }} />} />
                        </Form.Item>  
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item name="birth_date" label="Birth Date:">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item> 
                    </Col>
                </Row>                                                                                                       
                <Form.Item name="role" label="Role:">
                    <Input prefix={<LockOutlined style={{ color: '#a1a1a1' }} />} disabled />
                </Form.Item>
                <Form.Item>                                                                  
                    <Popconfirm title="Are you sure to update your account？" okText="Yes" cancelText="No" onConfirm={form.submit}>
                        <Button type="primary" icon={<EditOutlined />} style={{ width: '100%' }}>
                            Submit
                        </Button>
                    </Popconfirm>                                                                                                            
                </Form.Item>         
            </Form>
        </div>
    )
};

export default AccountDetail;