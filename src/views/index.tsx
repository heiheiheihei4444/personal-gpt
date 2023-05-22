import React from 'react';
import Slider from './slider';
import Header from './header';
import Main from './main';
import { ConfigProvider } from 'antd';

import './index.css';

function Views() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#51c4d3',
          borderRadius: 2,
        },
      }}
    >
      <div className="views">
        <Slider />
        <div className="views-right">
          <Header />
          <Main />
        </div>
        {/* <div className="test">这是一段对话</div> */}
      </div>
    </ConfigProvider>
  );
}

export default Views;
