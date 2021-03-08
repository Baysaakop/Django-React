import React, { useEffect, useState } from 'react';
import { Grid, Button, Layout, Tooltip } from 'antd';
import CustomMenu from '../components/Menu';
import './Layout.css';
import { BulbFilled, BulbOutlined, FacebookFilled, GithubFilled, InstagramOutlined, TwitterOutlined, YoutubeFilled } from '@ant-design/icons';

const { useBreakpoint } = Grid;
const { Header, Content, Footer } = Layout;

const styleContentWeb = {
    padding: '0',
    zIndex: '1',    
    position: 'relative',            
}

const styleContentSwitch = {
    position: 'fixed',
    zIndex: '2',
    top: '50%',
    right: '8%'
}

const styleContentItemWeb = {
    padding: '24px 15%' 
}

const styleContentItemMobile = {
    padding: '5%' 
}

function CustomLayout (props) {    
    const screens = useBreakpoint();
    const [darkMode, setDarkMode] = useState(getInitialMode());

    useEffect(() => {
        localStorage.setItem('dark', JSON.stringify(darkMode))
    }, [darkMode])

    function getInitialMode() {
        const isReturningUser = "dark" in localStorage;
        const savedMode = JSON.parse(localStorage.getItem('dark'));
        const userPrefersDark = getPrefColorScheme();
        if (isReturningUser) {
            return savedMode;
        } else if (userPrefersDark) {
            return true;
        } else {
            return false;
        }        
    }

    function getPrefColorScheme() {
        if (!window.matchMedia) return;

        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    return(
        <Layout className={darkMode ? "layout-dark" : "layout-light"}>
            <Header className="header">
                <CustomMenu {...props} darkMode={darkMode} />                
            </Header>
            <Content className="content" style={styleContentWeb}>                                     
                <div className="content-item" style={screens.xs ? styleContentItemMobile : styleContentItemWeb}>
                    {props.children}                    
                </div>                
                <div className="theme-switch-container" style={styleContentSwitch}>
                    <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                        <Button 
                            type={darkMode ? "primary" : "default"}
                            shape="circle" 
                            size="large" 
                            icon={darkMode ? <BulbFilled /> : <BulbOutlined />} 
                            onClick={() => setDarkMode(prevMode => !prevMode)}
                        />
                    </Tooltip>
                </div>
            </Content>
            <Footer className="footer">
                <div>
                    <Tooltip title="Facebook">
                        <Button shape="circle" icon={<FacebookFilled />} style={{ margin: '8px' }} size="large" /> 
                    </Tooltip>
                    <Tooltip title="Twitter">
                        <Button shape="circle" icon={<TwitterOutlined />} style={{ margin: '8px' }} size="large" /> 
                    </Tooltip>
                    <Tooltip title="Instagram">
                        <Button shape="circle" icon={<InstagramOutlined />} style={{ margin: '8px' }} size="large" /> 
                    </Tooltip>
                    <Tooltip title="Youtube">
                        <Button shape="circle" icon={<YoutubeFilled />} style={{ margin: '8px' }} size="large" /> 
                    </Tooltip>
                    <Tooltip title="Github">
                        <Button shape="circle" icon={<GithubFilled />} style={{ margin: '8px' }} size="large" /> 
                    </Tooltip>
                    <p>
                        © 2021 Django and React Project. All Rights Reserved. Designed and developed by On Plus Tech.
                    </p>
                </div>                
            </Footer>
        </Layout>
    );  
};

export default CustomLayout;