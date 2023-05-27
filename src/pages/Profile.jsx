import React, { useEffect, useState } from 'react';
import '../scss/profile.scss';
import Header from '../components/Header';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import News from '../components/News';

const Profile = () => {
  const [feed, setFeed] = useState(Cookies.get('feed') || []);
  const updateFeededTest = (newFeededTest) => {
    setFeed(newFeededTest);
  };
  const navigate = useNavigate();
  const [token, setToken] = useState(Cookies.get('token') || '');
  const [refresh, setRefresh] = useState(Cookies.get('refresh') || '');
  const [names, setSubsName] = useState(Cookies.get('names') || []);
  const [tags, setSubsTag] = useState(Cookies.get('tags') || []);
  const [subs, setSubs] = useState(Cookies.get('subs') || []);
  const [recommendation, setRecommendation] = useState('');
  const [modalActive, setModalActive] = useState(false);

  const subClick = async (event) => {
    event.preventDefault();
    try {
      let res = await fetch('https://m1.itsk.pw/newsfeed/user/get_subs', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const responseJson = await res.json();
        console.log(responseJson);
        let subs = responseJson;
        setSubs(subs);
        console.log(subs);
        const names = responseJson.map((item) => item.name);
        const tags = responseJson.map((item) => item.tag);
        console.log('names', names);
        console.log('tags', tags);
        Cookies.set('names', JSON.stringify(names));
        setSubsName(names);
        Cookies.set('tags', JSON.stringify(tags));
        setSubsTag(tags);
      }
      if (res.status === 401) {
        const resRefresh = await fetch('https://m1.itsk.pw/newsfeed/auth/refresh', {
          method: 'POST',
          body: JSON.stringify({
            refresh_token: refresh,
          }),
        });
        if (resRefresh.status === 200) {
          const responseJson = await resRefresh.json();
          console.log(responseJson);
          const token = responseJson.token;
          const refresh = responseJson.refresh;
          setToken(token);
          setRefresh(refresh);
          Cookies.set('token', token);
          Cookies.set('refresh', refresh);

          let res = await fetch('https://m1.itsk.pw/newsfeed/user/get_subs', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.status === 200) {
            const responseJson = await res.json();
            console.log(responseJson);
            let subs = responseJson;
            setSubs(subs);
            console.log(subs);
            const names = responseJson.map((item) => item.name);
            const tags = responseJson.map((item) => item.tag);
            console.log('names', names);
            console.log('tags', tags);
            setSubsName(names);
            setSubsTag(tags);
          }
        } else {
          console.log('failed');
        }
      }
    } catch (error) {
      console.log(error);
    }
    setModalActive(true);
  };

  const recClick = async (event) => {
    event.preventDefault();
    try {
      let res = await fetch('https://m1.itsk.pw/newsfeed/user/get_recommendation', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const responseJson = await res.json();
        console.log(responseJson);
        let recommendation = responseJson;
        setRecommendation(recommendation);
        console.log(recommendation);
        // const names = responseJson.map((item) => item.name);
        // const tags = responseJson.map((item) => item.tag);
        // console.log('names', names);
        // console.log('tags', tags);
        // Cookies.set('names', JSON.stringify(names));
        // setSubsName(names);
        // Cookies.set('tags', JSON.stringify(tags));
        // setSubsTag(tags);
      }
      if (res.status === 401) {
        const resRefresh = await fetch('https://m1.itsk.pw/newsfeed/auth/refresh', {
          method: 'POST',
          body: JSON.stringify({
            refresh_token: refresh,
          }),
        });
        if (resRefresh.status === 200) {
          const responseJson = await resRefresh.json();
          console.log(responseJson);
          const token = responseJson.token;
          const refresh = responseJson.refresh;
          setToken(token);
          setRefresh(refresh);
          Cookies.set('token', token);
          Cookies.set('refresh', refresh);

          let res = await fetch('https://m1.itsk.pw/newsfeed/user/get_recommendation', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.status === 200) {
            const responseJson = await res.json();
            console.log(responseJson);
            let recommendation = responseJson;
            setRecommendation(recommendation);
            console.log(recommendation);
          }
        } else {
          console.log('failed');
        }
      }
      setRec(!showRec);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkAuthorization();
  }, []);

  const checkAuthorization = async () => {
    if (token) {
      console.log('Пользователь авторизован');
      console.log('token:', token);
      console.log('refresh:', refresh);
      
    } else {
      console.log('Пользователь не авторизован');
      navigate('/');
    }
  };

  const [showMore, setShowMore] = useState(false);
  const [showRec, setRec] = useState(false);
  const [newsLenta, setNewsLenta] = useState('');

  const handleClick = async () => {
    let res = await fetch('https://m1.itsk.pw/newsfeed/user/form_feed', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      let responseJson = await res.json();
      let newsLenta = responseJson;
      console.log(newsLenta);
      setNewsLenta(newsLenta);
    }
    setShowMore(!showMore);
  };

  return (
    <div className="blocks">
      <Header />
      <div className="profile">
        <div className="container">
          <div className="news__lentabutton">
            <button onClick={handleClick} className="news__lentabut">
              {showMore ? 'Скрыть ленту' : 'Загрузить ленту'}
            </button>

            {showMore && (
              <div className="newsBlock">
                {newsLenta.map((item, index) => (
                  <News key={index} group={item.group} />
                ))}
              </div>
            )}
          </div>

          <div className="subscription">
            <h1 className="subscription__h1">Подписки</h1>
            <ul>
              {feed.map((item, index) => (
                <li key={index}>
                  <p className="subscription__p">{item.name}</p>
                </li>
              ))}
            </ul>
            <button onClick={subClick} className="subscription__button">
              +
            </button><div className='recommendation'>
            <button onClick={recClick} className="recommendation__button">
            {showRec ? 'Закрыть' : 'Рекомендации'}
            </button>
            {showRec && (
              <div className="recommendation__block">
                <h1 className="subscription__h1">Рекомендации</h1>

                {recommendation.map((item, index) => (
                <li key={index}>
                  <p className="subscription__p">{item}</p>
                </li>
              ))}
              </div>
            )}
          </div>
          </div>
          
        </div>
      </div>
      <Modal
        subs={subs}
        active={modalActive}
        setActive={setModalActive}
        updateFeededTest={updateFeededTest}
      />
    </div>
  );
};

export default Profile;
