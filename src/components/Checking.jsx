import React, { useEffect, useState } from 'react';

import '../scss/auth.scss';
import { Link, useNavigate } from 'react-router-dom';
import ProfileLogo from '../img/profileLogo.png';
import Cookies from 'js-cookie';

const Checking = () => {
  const [token, setToken] = useState(Cookies.get('token') || '');
  const [refresh, setRefresh] = useState(Cookies.get('refresh') || '');
  const [refresh_token, setRefresh_token] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    checkAuthorization();
  }, []);

  const checkAuthorization = async () => {
    if (token) {
      console.log('Пользователь авторизован');
      console.log('token:', token);
      console.log('refresh:', refresh);

      try {
        let res = await fetch('https://m1.itsk.pw/newsfeed/auth/check_client', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.status);
        // if (res.status === 401) {
        //   let resRefresh = await fetch('https://m1.itsk.pw/newsfeed/auth/refresh', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //       refresh_token: refresh_token,
        //     }),
        //   });
        // }
        // if (res.status === 200) {
        //   const responseJson = await res.json();
        //   const token = responseJson.token;
        //   const refresh = responseJson.refresh;
        //   Cookies.set('token', token);
        //   setToken(token);
        //   Cookies.set('refresh', refresh);
        //   setToken(refresh);

        //   console.log('Code verified successfully');
        //   navigate('/profile');
        // }
        if (res.status === 403) {
          navigate('/Bxod');
        }
      } catch (error) {
        console.log(error);
      }

      //navigate('/profile');
    } else {
      console.log('Пользователь не авторизован');
      navigate('/auth');
    }
  };
  return <div className="header"></div>;
};

export default Checking;
