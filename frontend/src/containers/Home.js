import { Carousel } from 'antd';
import React from 'react';
  
const contentStyle = {
    height: '360px',
    color: '#fff',
    lineHeight: '280px',
    textAlign: 'center',
    background: '#364d79',
};

function Home () {

    function onChange(a, b, c) {
        console.log(a, b, c);
    }

    return (
        <Carousel afterChange={onChange} style={{ zIndex: '1' }}>
            <div>
                <h3 style={contentStyle}>1</h3>
            </div>
            <div>
                <h3 style={contentStyle}>2</h3>
            </div>
            <div>
                <h3 style={contentStyle}>3</h3>
            </div>
            <div>
                <h3 style={contentStyle}>4</h3>
            </div>
        </Carousel>
    )
}

export default Home;