import React, { useEffect, useState } from 'react';
import '../scss/profile.scss';
import Header from '../components/Header';
import Cookies from 'js-cookie';

const Profile = () => {
  const [token, setToken] = useState(Cookies.get('token') || '');
  const [refresh, setRefresh] = useState(Cookies.get('refresh') || '');

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
    }
  };
  return (
    <div className="background">
      <Header />
      <div className="profile">
        <div className="container">
          <div className="newsBlock">
            <div className="news">
              <h1 className="news__h1">Издание №1</h1>
              <p className="news__p">
                Владельцев электросамокатов обяжут ставить транспорт на учёт и получать номера.За
                нарушения ПДД водителям средств индивидуальной мобильности будут грозить санкции:
                штрафы от 500 ₽ до 5000 ₽, а также арест до 15 суток за управление в нетрезвом виде.
              </p>
            </div>
            <div className="news">
              <h1 className="news__h1">Издание №1</h1>
              <p className="news__p">
                Владельцев электросамокатов обяжут ставить транспорт на учёт и получать номера.За
                нарушения ПДД водителям средств индивидуальной мобильности будут грозить санкции:
                штрафы от 500 ₽ до 5000 ₽, а также арест до 15 суток за управление в нетрезвом виде.
              </p>
            </div>
            <div className="news">
              <h1 className="news__h1">Издание №1</h1>
              <p className="news__p">
                Владельцев электросамокатов обяжут ставить транспорт на учёт и получать номера.За
                нарушения ПДД водителям средств индивидуальной мобильности будут грозить санкции:
                штрафы от 500 ₽ до 5000 ₽, а также арест до 15 суток за управление в нетрезвом виде.
              </p>
            </div>
            <div className="news">
              <h1 className="news__h1">Издание №1</h1>
              <p className="news__p">
                Владельцев электросамокатов обяжут ставить транспорт на учёт и получать номера.За
                нарушения ПДД водителям средств индивидуальной мобильности будут грозить санкции:
                штрафы от 500 ₽ до 5000 ₽, а также арест до 15 суток за управление в нетрезвом виде.
              </p>
            </div>

            <div className="news">
              <h1 className="news__h1">Издание №1</h1>
              <p className="news__p">
                Владельцев электросамокатов обяжут ставить транспорт на учёт и получать номера.За
                нарушения ПДД водителям средств индивидуальной мобильности будут грозить санкции:
                штрафы от 500 ₽ до 5000 ₽, а также арест до 15 суток за управление в нетрезвом виде.
              </p>
            </div>
            <div className="news">
              <h1 className="news__h1">Издание №1</h1>
              <p className="news__p">
                Владельцев электросамокатов обяжут ставить транспорт на учёт и получать номера.За
                нарушения ПДД водителям средств индивидуальной мобильности будут грозить санкции:
                штрафы от 500 ₽ до 5000 ₽, а также арест до 15 суток за управление в нетрезвом виде.
              </p>
            </div>
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
            <button className="subscription__button">+</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
