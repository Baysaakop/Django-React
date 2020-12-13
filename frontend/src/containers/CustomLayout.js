import React from 'react';
import { Layout } from 'antd';
import './CustomLayout.css';
import CustomMenu from '../components/CustomMenu';

const { Header, Content, Footer } = Layout;

function CustomLayout (props) {    

    return(
        <Layout className="layout">
            <Header id="header">
                <CustomMenu {...props} />
            </Header>
            <Content id="content">                
                <div className="content-item">
                    {props.children}
                </div>                
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );  
};

export default CustomLayout;