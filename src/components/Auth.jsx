import React, { useEffect } from 'react';

import '../scss/auth.scss';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import { json, useNavigate } from 'react-router-dom';

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
  const [nickname, setNickname] = useState(Cookies.get('nickname') || '');
  const [feed, setFeed] = useState(Cookies.get('feed'));

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: code,
        }),
      });
      if (res.status === 401) {
        let resRefresh = await fetch('https://m1.itsk.pw/newsfeed/auth/refresh', {
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
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              code: code,
            }),
          });
          if (resCode.status === 200) {
            const responseJson = await resCode.json();
            let nickname = responseJson.nickname;
            console.log(nickname);
            Cookies.set('token', nickname);
            setNickname(nickname);
            let resGetFeed = await fetch('https://m1.itsk.pw/newsfeed/channels/get_feed', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (resGetFeed.status === 200) {
              let responseJson = await resGetFeed.json();
              console.log(responseJson);
              let feed = responseJson || [];
              console.log(feed);
              //Cookies.set('feed', feed);
              setFeed(feed);
            }

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
      if (res.status === 200) {
        let responseJson = await res.json();
        let nickname = responseJson.nickname;
        console.log(nickname);
        Cookies.set('nickname', nickname);
        setNickname(nickname);
        let resGetFeed = await fetch('https://m1.itsk.pw/newsfeed/channels/get_feed', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (resGetFeed.status === 200) {
          let responseJson = await resGetFeed.json();
          console.log(responseJson);
          let feed = responseJson || [];
          console.log(feed);
          //Cookies.set('feed', JSON.stringify(feed));
          setFeed(feed);
        }
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
