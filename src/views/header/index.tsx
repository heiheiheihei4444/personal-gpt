import React, { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '@views/GlobalContext';
import { SettingOutlined } from '@ant-design/icons';
import { Form, Drawer, Input, Select, Collapse, Slider } from 'antd';
import { MODEL_OPTIONS } from '../../contants';
import './index.less';

function Header() {
  const { config, setConfig } = useContext(GlobalContext);

  const [isOpen, setIsOpen] = useState(false);
  const [formInst] = Form.useForm();

  const onOpenSetting = () => {
    setIsOpen(true);
  };

  const onCloseSetting = () => {
    const values = formInst.getFieldsValue();
    setConfig((pre) => ({ ...pre, ...values }));
    setIsOpen(false);
  };

  return (
    <header className="header">
      <div className="header-title">{config.title}</div>
      <div className="header-operate">
        <SettingOutlined
          className="header-operate-setting"
          onClick={onOpenSetting}
        />
      </div>
      <Drawer
        title="配置中心"
        placement="right"
        onClose={onCloseSetting}
        open={isOpen}
        getContainer={() => document.getElementById('views')}
        keyboard
        motion={false}
        // style={{ width: 400 }}
      >
        <Form form={formInst} initialValues={config}>
          <Collapse accordion>
            <Collapse.Panel header="聊天相关" key="1">
              <Form.Item label="名称:" name="title">
                <Input />
              </Form.Item>
              <Form.Item label="Api Key:" name="apiKey">
                <Input></Input>
              </Form.Item>
              <Form.Item label="模型:" name="model">
                <Select options={MODEL_OPTIONS} />
              </Form.Item>
              <Form.Item label="温度" name="temperature">
                <Slider min={0} max={1} step={0.1} />
              </Form.Item>
            </Collapse.Panel>
            <Collapse.Panel header="图像生成" key="2">
              <p>Hi, bytedance dance dance. This is the docsite of Semi UI. </p>
            </Collapse.Panel>
          </Collapse>
        </Form>
      </Drawer>
    </header>
  );
}

export default Header;
