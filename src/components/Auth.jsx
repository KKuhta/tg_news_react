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

const Auth = () => {
  const [number, setMobileNumber] = useState('');
  const [showCodeForm, setShowCodeForm] = useState(false);
  const [code, setCode] = useState('');
  const [token, setToken] = useState(Cookies.get('token') || '');
  const [refresh, setRefresh] = useState(Cookies.get('refresh') || '');
  const [refresh_token, setRefresh_token] = useState(Cookies.get('refresh_token') || '');
  const [message, setMessage] = useState(Cookies.get('message') || '');

  const navigate = useNavigate();

  let handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let res = await fetch('https://m1.itsk.pw/newsfeed/auth/signup_number', {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
          number: number,
        }),
      });

      if (res.status === 200) {
        let responseJson = await res.json();
        console.log(responseJson);
        // let message = responseJson.message;
        // console.log('message:', message);
        // Cookies.set('message', message);
        // setMessage(message);

        let token = responseJson.token;
        console.log('token:', token);
        Cookies.set('token', token);
        setToken(token);

        let refresh = responseJson.refresh;
        console.log('refresh:', refresh);
        Cookies.set('refresh', refresh);
        setRefresh(refresh);

        setShowCodeForm(true);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let handleCodeSubmit = async (event) => {
    event.preventDefault();
    try {
      let res = await fetch('https://m1.itsk.pw/newsfeed/auth/code', {
        method: 'POST',
        body: JSON.stringify({
          code: code,
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

          let token = responseJson.token;
          console.log('token:', token);
          Cookies.set('token', token);
          setToken(token);

          let refresh = responseJson.refresh;
          console.log('refresh:', refresh);
          Cookies.set('refresh', refresh);
          setRefresh(refresh);

          let resCode = await fetch('https://m1.itsk.pw/newsfeed/auth/code', {
            method: 'POST',
            body: JSON.stringify({
              code: code,
            }),
          });
          if (resCode.status === 200) {
            navigate('/profile');
          }

          // const token = responseJson.token;
          // const refresh = responseJson.refresh;
          // setToken(token);
          //setRefresh(refresh);
          // setRefresh_token(refresh);
          // console.log('token:', token);
          // console.log('refresh:', refresh);
          // Cookies.set('token', token);
          // Cookies.set('refresh', refresh);
          //checkAuthorization();
          //navigate('/profile');
        } else {
          console.log('Code verification failed');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container__form background">
      <div className="form">
        <div className="form__center">
          {!showCodeForm ? (
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
          ) : (
            <>
              <h1 className="form__h1">Введите код</h1>
              <form onSubmit={handleCodeSubmit}>
                <p>
                  <CodeInput
                    type="text"
                    placeholder="Введите код"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                  />
                </p>

                <button type="submit" className="formInput">
                  Отправить
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
