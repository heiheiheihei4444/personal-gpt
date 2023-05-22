import React from 'react';
import { Button, Input } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import './index.css';

function Slider() {
  return (
    <div className="slider">
      <div className="slider-header">
        <Input placeholder="搜索" prefix={<SearchOutlined />} size="large" />
        <PlusOutlined className="slider-header-add" />
      </div>
    </div>
  );
}

export default Slider;
