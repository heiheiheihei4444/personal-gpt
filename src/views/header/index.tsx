import React, { useContext } from 'react';
import { GlobalContext } from '@views/GlobalContext';
import './index.less';

function Header() {
  const { title } = useContext(GlobalContext);
  return (
    <header className="header">
      <div className="header-title">{title}</div>
    </header>
  );
}

export default Header;
