import React, { useEffect, useState } from 'react';
import '../scss/profile.scss';
import Header from '../components/Header';
import Cookies from 'js-cookie';
import newsData from '../example.json';
import { useNavigate } from 'react-router-dom';
import subsTest from '../subsTest.json';
import feedTest from '../feedTest.json';
import Modal from '../components/Modal/Modal';

const News = ({ group }) => {
  const [showMore, setShowMore] = useState(false);

  const handleClick = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="news">
      <div>
        <h1 className="news__h1">{group[0].source_channel}</h1>
        <p className="news__p">{group[0].text}</p>
      </div>
      {group.length > 1 && (
        <div>
          {showMore &&
            group.slice(1).map((item, index) => (
              <div key={index}>
                <h1 className="news__h1">{item.source_channel}</h1>
                <p className="news__p">{item.text}</p>
              </div>
            ))}
          <button className="news__button" onClick={handleClick}>
            {showMore ? 'Скрыть' : 'Подробнее'}
          </button>
        </div>
      )}
    </div>
  );
};

const Profile = () => {
  const [feededTest, setFeededTest] = useState(feedTest);
  const updateFeededTest = (newFeededTest) => {
    setFeededTest(newFeededTest);
  };
  // const [subedTest, setSubedTest] = useState(subsTest);

  const navigate = useNavigate();
  const [token, setToken] = useState(Cookies.get('token') || '');
  const [refresh, setRefresh] = useState(Cookies.get('refresh') || '');
  const [names, setSubsName] = useState(Cookies.get('names') || []);
  const [tags, setSubsTag] = useState(Cookies.get('tags') || []);
  const [subs, setSubs] = useState(Cookies.get('subs') || []);

  const [feed, setFeed] = useState(Cookies.get('feed') || '' || []);
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
        //Cookies.set('subs', JSON.stringify(subs));
        setSubs(subs);
        console.log(subs);

        const names = responseJson.map((item) => item.name);
        const tags = responseJson.map((item) => item.tag);

        console.log('names', names);
        console.log('tags', tags);

        // Записываем массивы в куки
        //Cookies.set('names', JSON.stringify(names));
        setSubsName(names);
        //Cookies.set('tags', JSON.stringify(tags));
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
            //Cookies.set('subs', JSON.stringify(subs));
            setSubs(subs);
            console.log(subs);

            const names = responseJson.map((item) => item.name);
            const tags = responseJson.map((item) => item.tag);

            console.log('names', names);
            console.log('tags', tags);

            // Записываем массивы в куки
            //Cookies.set('names', JSON.stringify(names));
            setSubsName(names);
            //Cookies.set('tags', JSON.stringify(tags));
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
      //navigate('/');
    }
  };

  return (
    <div className="background">
      <Header />
      <div className="profile">
        <div className="container">
          <div className="newsBlock">
            {newsData.map((item, index) => (
              <News key={index} group={item.group} />
            ))}
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
            </button>
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
