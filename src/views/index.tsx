import React, { useEffect, useState } from 'react';
import Slider from './slider';
import Header from './header';
import Main from './main';
import { GlobalContext, type IConversation } from './GlobalContext';
import { generateUniqueString } from '../utils/common';
import { useRequest } from 'ahooks';
import {
  ALL_CONVERSTATIONS,
  GLOBAL_CONFIG,
  generateConfigInit,
  generateConverstationInit,
  getLocalStorage,
  setLocalStorage,
} from '../contants';

function Views() {
  const [allConversations, setAllConversations] = useState<IConversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<IConversation>(
    {}
  );
  const [config, setConfig] = useState<IConfig>({});
  const [isInit, setIsInit] = useState(true);

  const { run: runSetConverstation } = useRequest(
    () => {
      setLocalStorage(ALL_CONVERSTATIONS, allConversations);
    },
    {
      debounceWait: 1000,
      manual: true,
    }
  );

  const { run: runSetConfig } = useRequest(
    () => {
      setLocalStorage(GLOBAL_CONFIG, config);
    },
    {
      debounceWait: 1000,
      manual: true,
    }
  );

  useEffect(() => {
    const globalConfig = getLocalStorage(GLOBAL_CONFIG);
    const allData = getLocalStorage(ALL_CONVERSTATIONS);
    let initObj;
    if (!allData || !Object.keys(allData)?.length) {
      initObj = generateConverstationInit('text');
      setAllConversations({ [initObj.id]: initObj });
      setCurrentConversation(initObj);
    } else {
      setAllConversations(allData);
      const curData = globalConfig?.currentId
        ? allData[globalConfig?.currentId]
        : allData[Object.keys(allData)[0]];
      setCurrentConversation(curData);
    }
    setConfig(
      globalConfig && Object.keys(globalConfig)?.length
        ? globalConfig
        : generateConfigInit(initObj?.id)
    );
  }, []);

  useEffect(() => {
    if (!isInit) {
      runSetConverstation();
    }
    setIsInit(false);
  }, [allConversations]);

  useEffect(() => {
    runSetConfig();
  }, [config]);

  return (
    <GlobalContext.Provider
      value={{
        config,
        allConversations,
        currentConversation,
        setCurrentConversation,
        setAllConversations,
        setConfig,
      }}
    >
      <div
        id="views"
        className="w-2/3 h-2/3 flex rounded-2xl relative"
        style={{
          boxShadow:
            'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
        }}
      >
        <Slider />
        <div className=" w-1/3 flex-1">
          <Header />
          <Main />
        </div>
      </div>
    </GlobalContext.Provider>
  );
}

export default Views;
