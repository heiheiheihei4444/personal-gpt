import React, { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '@views/GlobalContext';
import { IconSetting } from '@douyinfe/semi-icons';
import { Form, SideSheet, Collapse } from '@douyinfe/semi-ui';
import { MODEL_OPTIONS } from '../../contants';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import './index.less';

function Header() {
  const { config, setConfig } = useContext(GlobalContext);

  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<FormApi>();

  const onOpenSetting = () => {
    setIsOpen(true);
  };

  const onCloseSetting = () => {
    const values = formRef.current.getValues();
    setConfig({ ...values });
    setIsOpen(false);
  };

  console.log(5345, config);

  return (
    <header className="header">
      <div className="header-title">{config?.title || 'PERSONAL GPT'}</div>
      <div className="header-operate">
        <IconSetting
          className="header-operate-setting"
          onClick={onOpenSetting}
        />
      </div>
      <SideSheet
        title="配置中心"
        placement="right"
        keepDOM={false}
        onCancel={onCloseSetting}
        visible={isOpen}
        getPopupContainer={() => document.getElementById('views')}
        closeOnEsc
        motion={false}
        style={{ width: 400 }}
      >
        <Form
          initValues={config}
          getFormApi={(formapi) => (formRef.current = formapi)}
        >
          <Collapse accordion>
            <Collapse.Panel header="聊天相关" itemKey="1">
              <Form.Input label="名称:" field="title" />
              <Form.Input label="Api Key:" field="apiKey" />
              <Form.Select
                label="模型:"
                field="model"
                optionList={MODEL_OPTIONS}
                style={{ width: '100%' }}
              />
              <Form.Slider
                label="温度"
                field="temperature"
                min={0}
                max={1}
                step={0.1}
              />
            </Collapse.Panel>
            <Collapse.Panel header="图像生成" itemKey="2">
              <p>Hi, bytedance dance dance. This is the docsite of Semi UI. </p>
            </Collapse.Panel>
          </Collapse>
        </Form>
      </SideSheet>
    </header>
  );
}

export default Header;
