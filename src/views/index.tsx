import React, { useEffect, useState } from 'react';
import Slider from './slider';
import Header from './header';
import Main from './main';
import { GlobalContext, type IConversation } from './GlobalContext';
import { generateUniqueString } from '../utils/common';
import {
  ALL_CONVERSTATIONS,
  CURRENT_CONVERSATION,
  GLOBAL_CONFIG,
  getLocalStorage,
  setLocalStorage,
} from '../contants';

import './index.css';

function Views() {
  const [allConversations, setAllConversations] = useState<IConversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<IConversation>(
    {}
  );
  const [config, setConfig] = useState<IConfig>({});
  const [isInit, setIsInit] = useState(true);

  useEffect(() => {
    const allData = getLocalStorage(ALL_CONVERSTATIONS);
    const currentData = getLocalStorage(CURRENT_CONVERSATION);
    const globalConfig = getLocalStorage(GLOBAL_CONFIG);
    if (!allData?.length) {
      const data: IConversation = {
        id: generateUniqueString(8),
        temperature: 1,
        messages: [],
      };
      setAllConversations([data]);
      setCurrentConversation(data);
    } else {
      setAllConversations(allData);
      setCurrentConversation(currentData);
      setConfig(globalConfig);
    }
    console.log(4442224555);
  }, []);

  useEffect(() => {
    if (!isInit) {
      setLocalStorage(ALL_CONVERSTATIONS, allConversations);
      setLocalStorage(CURRENT_CONVERSATION, currentConversation);
      setLocalStorage(GLOBAL_CONFIG, config);
    }
    setIsInit(false);
  }, [config, allConversations, currentConversation]);

  return (
    <GlobalContext.Provider
      value={{
        config,
        allConversations,
        currentConversation,
        setCurrentConversation,
        setConfig,
      }}
    >
      <div id="views" className="views">
        <Slider />
        <div className="views-right">
          <Header />
          <Main />
        </div>
      </div>
    </GlobalContext.Provider>
  );
}

export default Views;
