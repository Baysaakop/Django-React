import { Button, Col, Result, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import api from '../api';
import Avatar from 'antd/lib/avatar/avatar';
import { CalendarOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';

function Profile (props) {

    const [user, setUser] = useState();

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

    return (
        <div>
            {user ? (
                <Row gutter={[16, 16]} style={{ width: 400 }}>
                    <Col span={8}>
                        <Avatar size={96} icon={<UserOutlined />} />
                    </Col>
                    <Col span={16} style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography.Title level={3}>{user.username}</Typography.Title>
                        <a href="/">[Edit]</a>
                        {/* <p>E-mail: {user.email}</p> */}
                    </Col>                    
                    <Col span={24} style={{ paddingLeft: '16px' }}>
                        <p ><MailOutlined /> {user.email}</p>                        
                        <p><PhoneOutlined /> 99113355</p>
                        <p><CalendarOutlined /> 2000-05-20</p>
                    </Col>
                </Row>
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
        token: state.token
    }
}

export default connect(mapStateToProps)(Profile)