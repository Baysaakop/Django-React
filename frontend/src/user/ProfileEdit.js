import { Button, Result, Typography, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import api from '../api';
import ImageUpload from '../components/ImageUpload';

const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 12,
            offset: 6,
        },
    },
};

function ProfileEdit (props) {
    const [user, setUser] = useState();
    const [form] = Form.useForm()        
    const [image, setImage] = useState();    

    useEffect(() => {        
        axios({
            method: 'GET',
            url: api.profile,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            }
        }).then(response => {
            console.log(response.data)
            setUser(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [props.token])

    const onFinish = values => {                                     
        // Image upload
        if (image) {
            var formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('token', props.token);
            formData.append('image', image);
            axios({
                method: 'PUT',
                url: `${api.users}/${user.id}/`,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        } else {
            const data = {
                "name": values.name ? values.name : user.name,
                "description": values.description ? values.description : user.description,            
                "token": props.token,                
                "image": image
            }            
            axios({
                method: 'PUT',
                url: `${api.items}/${user.id}/`,
                data: data                
            })            
            .then(res => {
                console.log(res)
                message.info(res.statusText)                
            })
            .catch(err => {                
                console.log(err)
                message.info(err)
            })  
        }
    };

    const onReset = () => {
        form.resetuser();
    }

    const onDelete = () => {        
        axios({
            method: 'DELETE',
            url: `${api.items}/${props.user.id}/`         
        })            
        .then(res => {
            console.log(res)
            message.info("Deleted")
            props.history.push('/items')            
        })
        .catch(err => {                
            console.log(err)
            message.info(err)
        })
    }

    const onImageSelected = (path) => {        
        setImage(path);
    } 

    return (
        <div>
            {user ? (                
                <>
                    {/* <Row gutter={[16, 16]} style={{ width: 400 }}>
                        <Col span={8}>
                            <Avatar size={96} icon={<UserOutlined />} />
                        </Col>
                        <Col span={16} style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography.Title level={3}>{user.username}</Typography.Title>
                            <a href="/editprofile">[Edit]</a>                            
                        </Col>                    
                        <Col span={24} style={{ paddingLeft: '16px' }}>
                            <p ><MailOutlined /> {user.email}</p>                        
                            <p><PhoneOutlined /> 99113355</p>
                            <p><CalendarOutlined /> 2000-05-20</p>
                        </Col>
                    </Row> */}
                    <Typography.Title level={3}>
                        Edit profile
                    </Typography.Title>
                    <Form
                        {...formItemLayout}             
                        form={form}                                
                        name="itemform"                        
                        initialValues={{
                            name: user.username,
                            email: user.email,
                            description: user.profile.description,
                            birth_date: user.profile.birth_date,
                            phone_number: user.profile.phone_number
                        }}       
                        onFinish={onFinish}                              
                    >
                        <Form.Item                    
                            name="name"                            
                            label="Name"      
                            rules={[{ required: true, message: 'Please input item name!' }]}                                                             
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"                                     
                        >
                            <TextArea rows={6} />
                        </Form.Item>
                        <Form.Item
                            name="image"
                            label="Image"
                        >                               
                            <ImageUpload onImageSelected={onImageSelected} image={user.profile.avatar} />                        
                        </Form.Item>                        
                        <Form.Item {...tailFormItemLayout}>
                            <div>
                                <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
                                    Submit
                                </Button>
                                <Button type="ghost" onClick={onReset} style={{ marginRight: '8px' }}>
                                    Reset
                                </Button>
                                <Button danger type="primary" onClick={onDelete}>
                                    Delete
                                </Button>
                            </div>                                        
                        </Form.Item>
                    </Form> 
                </>
            ) : (
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authenticated. Please log in first."
                    extra={<Button type="primary" href="/login">Go to login page</Button>}
                />
            )}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(ProfileEdit)