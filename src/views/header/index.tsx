import React, { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '@views/GlobalContext';
import { SettingOutlined, ClearOutlined } from '@ant-design/icons';
import { Form, Drawer, Input, Select, Collapse, Slider, Tooltip } from 'antd';
import {
  MODEL_OPTIONS,
  SIZE_OPTIONS,
  generateConverstationInit,
} from '../../contants';
import './index.less';

function Header() {
  const { config, setConfig, setCurrentConversation, setAllConversations } =
    useContext(GlobalContext);

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

  const onCleanAll = () => {
    const data = generateConverstationInit('text');
    setCurrentConversation(data);
    setAllConversations({ [data.id]: data });
    setConfig((pre) => ({ ...pre, currentId: data.id }));
  };

  return (
    <header className="header">
      <div className="header-title">{config.title}</div>
      <div className="header-operate">
        <Tooltip title="清除全部对话">
          <ClearOutlined
            className="text-gray-400 cursor-pointer ml-3 hover:text-gray-600"
            onClick={onCleanAll}
          />
        </Tooltip>
        <Tooltip title="配置中心">
          <SettingOutlined
            className="text-gray-400 cursor-pointer ml-3 hover:text-gray-600"
            onClick={onOpenSetting}
          />
        </Tooltip>
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
              <Form.Item label="随机性：" name="temperature">
                <Slider min={0} max={1} step={0.1} />
              </Form.Item>
            </Collapse.Panel>
            <Collapse.Panel header="图像生成" key="2">
              <Form.Item label="生成图片数量" name="n">
                <Slider min={1} max={10} step={1} />
              </Form.Item>
              <Form.Item label="图片大小" name="size">
                <Select options={SIZE_OPTIONS} />
              </Form.Item>
            </Collapse.Panel>
          </Collapse>
        </Form>
      </Drawer>
    </header>
  );
}

export default Header;
