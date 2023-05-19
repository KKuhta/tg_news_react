import React, { useEffect, useState } from 'react';
import '../scss/profile.scss';
import Header from '../components/Header';
import Cookies from 'js-cookie';
import newsData from '../example.json';
import { useNavigate } from 'react-router-dom';

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
                <hr className="news__line" />
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
  const navigate = useNavigate();
  const [token, setToken] = useState(Cookies.get('token') || '');
  const [refresh, setRefresh] = useState(Cookies.get('refresh') || '');

  const subClick = (event) => {
    event.preventDefault();
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
              <li>
                <p className="subscription__p">Издание 1</p>
              </li>
              <li>
                <p className="subscription__p">Издание 2</p>
              </li>
              <li>
                <p className="subscription__p">Издание 3</p>
              </li>
            </ul>
            <button onClick={subClick} className="subscription__button">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
