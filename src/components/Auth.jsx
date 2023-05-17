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
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем авторизацию пользователя при загрузке страницы
    checkAuthorization();
  }, []);

  const checkAuthorization = async () => {
    // Проверяем наличие токена
    if (token) {
      // Здесь можно выполнить проверку токена на сервере, чтобы убедиться, что он действителен
      // Если токен действителен, пользователь авторизован
      console.log('Пользователь авторизован');
      console.log('token:', token);
      //navigate('/profile');
    } else {
      console.log('Пользователь не авторизован');
    }
  };

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
        let token = responseJson.token;
        let refresh = responseJson.refresh;
        console.log('token:', token);
        console.log('refresh:', refresh);
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
      let res = await fetch('https://m1.itsk.pw/newsfeed/auth/signup_number', {
        method: 'POST',
        body: JSON.stringify({
          code: code,
        }),
      });

      if (res.status === 200) {
        const responseJson = await res.json();
        const token = responseJson.token;
        Cookies.set('token', token); // Сохраняем токен в куки
        setToken(token);
        setCode('');
        console.log('Code verified successfully');
        navigate('/profile');
      } else {
        alert('Failed');
        console.log('Code verification failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container__form background">
      <div className="form">
        <div className="form__center">
          {!showCodeForm ? ( // Проверяем состояние showCodeForm для отображения старой формы или новой формы
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
