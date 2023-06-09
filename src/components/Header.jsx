import React, { useState } from 'react';

import '../scss/header.scss';
import { Link } from 'react-router-dom';
import ProfileLogo from '../img/profileLogo.png';
import Cookies from 'js-cookie';

const Header = () => {
  const [nickname, setNickname] = useState(Cookies.get('nickname') || '');

  return (
    <div className="header">
      <div className="container">
        <div className="header__logo">
          <Link to="/profile" className="header__logoUrl">
            TELEGRAM NEWS FEED
          </Link>
        </div>

        <div className="header__user">
          <img src={ProfileLogo} alt="ProfileLogo" className="header__user__Logo" />
          <h1 className="header__user__Name">{nickname}</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
