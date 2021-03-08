import React, { useEffect, useState } from 'react';
import { Button, Grid, Menu, Avatar, Dropdown } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { BellOutlined, CloseCircleOutlined, CoffeeOutlined, DownOutlined, MailOutlined, MenuOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import logo from './onplus-logo.png';
import axios from 'axios';
import api from '../api';

const { SubMenu, Item } = Menu;
const { useBreakpoint } = Grid;

const styleHeaderWeb = {
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: '0 15%',
    height: '80px',
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)'
}

const styleHeaderMobile = {
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: '5%',
    height: '80px',
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)'
}

const styleLogo = {
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',    
    height: '80px'
}

const styleMenuWeb = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
}

const styleMenuMobile = {
    width: '100%',    
}

const styleMenuItem = {
    fontSize: '18px'
}

const styleAccount = {
    display: 'flex',
    justifyContent: 'end', 
    alignItems: 'center',    
    height: '80px'
}

function CustomMenu (props) {    
    const accountMenu = (
        <Menu className="menu"  theme={props.darkMode ? "dark" : "light"} >
            <Item key="profile" style={styleMenuItem} icon={<UserOutlined style={{ fontSize: '16px' }} />}>
                <a href="/profile">Profile</a>                
            </Item>
            <Item key="notification" style={styleMenuItem} icon={<BellOutlined style={{ fontSize: '16px' }} />}>
                <a href="/notification">Notification</a>
            </Item>            
            <Item key="logout" style={styleMenuItem} icon={<CloseCircleOutlined style={{ fontSize: '16px' }} />}>
                <a href="/logout">Log Out</a>
            </Item>            
        </Menu>
    )

    const screens = useBreakpoint();
    const [current, setCurrent] = useState('home');
    const [collapsed, setCollapsed] = useState(true);      
    const [user, setUser] = useState();

    useEffect(() => {
        const menuItem = props.location.pathname.toString().split('/')[1]
        switch(menuItem) {
            case '':
                setCurrent('home')
                break
            case 'items':
                setCurrent('items')
                break
            case 'help':
                setCurrent('help')
                break
            case 'contact':
                setCurrent('contact')
                break
            case 'account':
                setCurrent('account')
                break
            default:
                setCurrent('home')
                break
        }
        if (props.token) {
            if (!user) {
                axios({
                    method: 'GET',
                    url: api.profile,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${props.token}`
                    }
                }).then(res => {
                    console.log(res.data)
                    setUser(res.data)
                }).catch(err => {
                    console.log(err.message)
                })
            }
        } else {
            setUser(null)
        }
    }, [props.location, props.token, user]);

    const handleMenuClick = (e) => {               
        setCurrent(e.key);
        setCollapsed(true);        
    };

    const handleMenuCollapsed = () => {
        setCollapsed(!collapsed);
    }     

    return (
        <div>              
            {screens.xs ? (
                <div>
                    <div style={styleHeaderMobile}>
                        <Link to="/">
                            <div style={styleLogo}>         
                                <div>
                                    <Avatar size="large" src={logo} /> 
                                </div>
                                <div style={{ color: props.darkMode ? '#fff' : '#000', fontSize: '24px', marginLeft: '8px' }}>                        
                                    On Plus                        
                                </div>                        
                            </div>       
                        </Link>
                        <Button type="primary" onClick={handleMenuCollapsed} style={ props.darkMode ? { background: '#161b22', color: '#fff', border: '1px solid #fff' } : { background: '#fff', color: '#000', border: '1px solid #000' }}>
                            <MenuOutlined />
                        </Button>
                    </div>
                    <Menu 
                        className="menu" 
                        theme={props.darkMode ? "dark" : "light"} 
                        mode="inline" 
                        hidden={collapsed} 
                        onClick={handleMenuClick}
                        selectedKeys={[current]}
                        style={styleMenuMobile}
                    >                
                        <Item key="items" icon={<CoffeeOutlined style={{ fontSize: '18px' }} />} style={styleMenuItem} >
                            <Link to="/items">Items</Link>
                        </Item>
                        <Item key="help" icon={<QuestionCircleOutlined style={{ fontSize: '18px' }} />} style={styleMenuItem} >
                            <Link to="/help">Help</Link>
                        </Item>
                        <Item key="contact" icon={<MailOutlined style={{ fontSize: '18px' }} />} style={styleMenuItem}>
                            <Link to="/contact">Contact</Link>
                        </Item>                   
                        { user && user !== null ? (
                            <SubMenu key="account" icon={<UserOutlined style={{ fontSize: '18px' }} />} style={styleMenuItem} title={user.username}>
                                <Item key="profile" style={styleMenuItem} icon={<UserOutlined style={{ fontSize: '16px' }} />}>
                                    <a href="/profile">Profile</a>                
                                </Item>
                                <Item key="notification" style={styleMenuItem} icon={<BellOutlined style={{ fontSize: '16px' }} />}>
                                    <a href="/notification">Notification</a>
                                </Item>            
                                <Item key="logout" style={styleMenuItem} icon={<CloseCircleOutlined style={{ fontSize: '16px' }} />}>
                                    <a href="logout">Log Out</a>
                                </Item>   
                            </SubMenu> 
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '16px' }}>
                                <Button href="/login" size="large" type="default" style={ props.darkMode ? { background: '#161b22', color: '#fff', fontSize: '18px', marginRight: '8px' } : { fontSize: '18px', marginRight: '8px' }}>Login</Button>
                                <Button href="/signup" size="large" type="primary" style={{ fontSize: '18px' }}>Sign Up</Button>
                            </div>
                        ) }                                                                             
                    </Menu>
                </div>
            ) : (
                <div style={styleHeaderWeb}>
                    <Link to="/">
                        <div style={styleLogo}>         
                            <div>
                                <Avatar size="large" src={logo} /> 
                            </div>
                            <div style={{ color: props.darkMode ? '#fff' : '#000', fontSize: '24px', marginLeft: '8px' }}>                        
                                On Plus                        
                            </div>                        
                        </div>       
                    </Link>
                    <Menu 
                        className="menu" 
                        theme={props.darkMode ? "dark" : "light"} 
                        mode="horizontal" 
                        onClick={handleMenuClick} 
                        selectedKeys={[current]} 
                        style={styleMenuWeb}
                    >                
                        <Menu.Item key="items" icon={<CoffeeOutlined style={{ fontSize: '18px' }} />} style={styleMenuItem} >
                            <Link to="/items">Items</Link>
                        </Menu.Item>
                        <Menu.Item key="help" icon={<QuestionCircleOutlined style={{ fontSize: '18px' }} />} style={styleMenuItem} >
                            <Link to="/help">Help</Link>
                        </Menu.Item>
                        <Menu.Item key="contact" icon={<MailOutlined style={{ fontSize: '18px' }} />} style={styleMenuItem}>
                            <Link to="/contact">Contact</Link>
                        </Menu.Item>                                                                      
                    </Menu>
                    <div style={styleAccount}>
                        { user && user !== null ? (
                            <div style={styleLogo}>
                                <div>
                                    <Avatar icon={<UserOutlined />} />
                                </div>
                                <div style={{ color: '#000', fontSize: '18px', marginLeft: '8px' }}>           
                                    <Dropdown overlay={accountMenu} placement="bottomRight" trigger={['click']}>
                                        <a href="/profile" className="ant-dropdown-link" style={{ color: props.darkMode ? '#fff' : '#000' }}>
                                            {user.username} <DownOutlined />
                                        </a>
                                    </Dropdown>                                         
                                </div>                                                    
                            </div>
                        ) : (
                            <div>
                                <Button href="/login" size="large" type="default" style={ props.darkMode ? { background: '#161b22', color: '#fff', fontSize: '18px', marginRight: '8px' } : { fontSize: '18px', marginRight: '8px' }}>Login</Button>
                                <Button href="/signup" size="large" type="primary" style={{ fontSize: '18px' }}>Sign Up</Button>
                            </div>
                        ) }   
                    </div>
                </div>
            )}                        
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomMenu));