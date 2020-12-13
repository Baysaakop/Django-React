import React, { useState } from 'react';
import { Button, Divider, Grid, Menu, Input } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { BulbOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, MailOutlined, MenuOutlined, ProfileOutlined, SearchOutlined, SkinOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import SubMenu from 'antd/lib/menu/SubMenu';

const { useBreakpoint } = Grid;

function CustomMenu (props) {
    const screens = useBreakpoint();
    const [current, setCurrent] = useState('home');
    const [collapsed, setCollapsed] = useState(true);  
    const [searchValue, setSearchValue] = useState('');

    const handleMenuClick = (e) => {        
        if (e.key === 'search') {
            return;
        }        
        setCurrent(e.key);
        setCollapsed(true);
        setSearchValue('');
    };

    const handleMenuCollapsed = () => {
        setCollapsed(!collapsed);
    }

    const onChange = e => {
        setSearchValue(e.target.value);
    }

    const onSearch = e => {        
        var name = e.target.value;
        props.history.push(`/items?search=${name}`)
    }    

    return (
        <div>
            <div className="logo">
                Logo    
            </div>
            { screens.xs ? (
                <div>
                    <Button type="primary" onClick={handleMenuCollapsed} style={{ float: 'right', margin: '16px 0' }}>
                        <MenuOutlined />
                    </Button>
                    <Menu id="menu" theme="light" mode="inline" hidden={collapsed} onClick={handleMenuClick} defaultSelectedKeys={[current]}>
                        <Menu.Item key="home" icon={<HomeOutlined />}>
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Divider style={{ margin: 0 }} />
                        <Menu.Item key="items" icon={<SkinOutlined />}>
                            <Link to="/items">Items</Link>
                        </Menu.Item>
                        <Divider style={{ margin: 0 }} />
                        <Menu.Item key="help" icon={<BulbOutlined />}>
                            <Link to="/">Help</Link>
                        </Menu.Item>
                        <Divider style={{ margin: 0 }} />
                        <Menu.Item key="contact" icon={<MailOutlined />}>
                            <Link to="/">Contact</Link>
                        </Menu.Item>
                        <Divider style={{ margin: 0 }} />
                        { props.username !== null ? (
                             <SubMenu key="user" icon={<UserOutlined />} title={props.username} >
                                <Menu.Item key="profile" icon={<ProfileOutlined />} >
                                    <Link to="/profile">Profile</Link>
                                </Menu.Item>
                                <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={props.logout}>
                                    Log out
                                </Menu.Item>
                            </SubMenu>
                        ) : (
                            <Menu.Item key="signin" icon={<LoginOutlined />} >
                                <Link to="/login">Sign in</Link>
                            </Menu.Item>
                        ) } 
                        <Divider style={{ margin: 0 }} />
                    </Menu>
                </div>
            ) : (
                <Menu id="menu" theme="light" mode="horizontal" onClick={handleMenuClick} defaultSelectedKeys={[current]}>
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="items" icon={<SkinOutlined />}>
                        <Link to="/items">Items</Link>
                    </Menu.Item>
                    <Menu.Item key="help" icon={<BulbOutlined />}>
                        <Link to="/">Help</Link>
                    </Menu.Item>
                    <Menu.Item key="contact" icon={<MailOutlined />}>
                        <Link to="/">Contact</Link>
                    </Menu.Item>                    
                    { props.username !== null ? (
                        <SubMenu key="user" icon={<UserOutlined />} title={props.username} style={{ float: 'right' }} >
                            <Menu.Item key="profile" icon={<ProfileOutlined />} >
                                <Link to="/profile">Profile</Link>
                            </Menu.Item>
                            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={props.logout}>
                                Log out
                            </Menu.Item>
                        </SubMenu>
                    ) : (
                        <Menu.Item key="login" icon={<LoginOutlined />} style={{ float: 'right' }} >
                            <Link to="/login">Sign in</Link>
                        </Menu.Item>
                    ) }    
                    <Menu.Item key="search" style={{ float: 'right' }}>                        
                        <Input 
                            placeholder="Search..."
                            allowClear
                            prefix={<SearchOutlined />}
                            style={{ width: 200 }}
                            onChange={onChange}
                            onPressEnter={onSearch}
                            value={searchValue}
                        />                           
                    </Menu.Item>
                </Menu>
            )}                
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomMenu));