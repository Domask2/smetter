import * as React from 'react';
import Routing from './routing/Routing';
import {ConfigProvider} from 'antd';
import './index.scss';

const globalStyles = {
    token: {
        fontFamily: 'Inter',
        colorLink: '#252C32',
        colorLinkHover: 'black',
        colorLinkActive: 'black'
    },
};

const App = () => {
    return (
        <ConfigProvider theme={globalStyles}>
            <Routing/>;
        </ConfigProvider>
    );
};

export default App;
