import { Button, Result } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

function Profile (props) {

    const [user, setUser] = useState();

    useEffect(() => {
        console.log(props.token)
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/rest-auth/user/',
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
                <div>
                    <p>Username: {user.username}</p>
                    <p>E-mail: {user.email}</p>
                </div>
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