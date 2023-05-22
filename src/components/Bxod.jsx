import React, { useEffect } from 'react';

import '../scss/auth.scss';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Cookies from 'js-cookie';
function PhoneInput(props) {
  return <InputMask mask="+79999999999" value={props.value} onChange={props.onChange}></InputMask>;
}

function CodeInput(props) {
  return <InputMask mask="99999" value={props.value} onChange={props.onChange}></InputMask>;
}

const Bxod = () => {
  const [number, setMobileNumber] = useState('');
  const [showCodeForm, setShowCodeForm] = useState(false);
  const [token, setToken] = useState(Cookies.get('token') || '');
  const [refresh, setRefresh] = useState(Cookies.get('refresh') || '');
  const [refresh_token, setRefresh_token] = useState(Cookies.get('refresh_token') || '');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthorization();
  }, []);

  const checkAuthorization = async () => {
    if (token) {
      console.log('Пользователь авторизован');
      //console.log('token:', token);
      //navigate('/profile');
    } else {
      console.log('Пользователь не авторизован');
      navigate('/auth');
    }
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let res = await fetch('https://m1.itsk.pw/newsfeed/auth/signin_number', {
        mode: 'cors',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          number: number,
        }),
      });

      if (res.status === 401) {
        const resRefresh = await fetch('https://m1.itsk.pw/newsfeed/auth/refresh', {
          method: 'POST',
          body: JSON.stringify({
            refresh_token: refresh,
          }),
        });
        console.log(refresh_token);
        if (resRefresh.status === 200) {
          const responseJson = await resRefresh.json();
          console.log(responseJson);
          const token = responseJson.token;
          const refresh = responseJson.refresh;
          setToken(token);
          setRefresh(refresh);
          Cookies.set('token', token);
          Cookies.set('refresh', refresh);
          //checkAuthorization();
          navigate('/profile');
        } else {
          console.log('Code verification failed');
        }
      }
      if (res.status === 200) {
        const responseJson = await res.json();
        console.log(responseJson);
        const token = responseJson.token;
        const refresh = responseJson.refresh;
        setToken(token);
        setRefresh(refresh);
        Cookies.set('token', token);
        Cookies.set('refresh', refresh);
        //checkAuthorization();
        navigate('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container__form background">
      <div className="form">
        <div className="form__center">
          <>
            <h1 className="form__h1">Введите номер телефона</h1>
            <form onSubmit={handleSubmit}>
              <p>
                <PhoneInput
                  type="text"
                  value={number}
                  placeholder="Введите номер"
                  onChange={(event) => setMobileNumber(event.target.value)}
                />
              </p>

              <button type="submit" className="formInput">
                Отправить
              </button>
            </form>
          </>
        </div>
      </div>
    </div>
  );
};

export default Bxod;
