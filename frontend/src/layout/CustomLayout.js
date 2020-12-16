import React, { useEffect } from 'react';
import { Layout } from 'antd';
import CustomMenu from './CustomMenu';
import { connect } from 'react-redux';

const { Header, Content, Footer } = Layout;

function CustomLayout (props) {    

    useEffect(() => {
        console.log(props)   
        if (props.isDark) {                     
            require('./CustomLayoutDark.css')
        } else {
            require('./CustomLayoutLight.css')
        }
    }, [props.isDark]);

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

const mapStateToProps = state => {
    return {                
        isDark: state.theme.isDark === 'true'
    }
}

export default connect(mapStateToProps)(CustomLayout);