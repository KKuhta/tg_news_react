import React, { useState } from 'react';
import './Modal.scss';
import subsTest from '../../subsTest.json';
import feedTest from '../../feedTest.json';
import Cookies from 'js-cookie';

const Modal = ({ active, setActive, updateFeededTest }) => {
  const [feededTest, setFeededTest] = useState(feedTest);
  const [subedTest, setSubedTest] = useState(subsTest);
  const [token, setToken] = useState(Cookies.get('token') || '');


  const removeSubs = async (index) => {
    const removedSub = feededTest[index];
    const updatedFeededTest = feededTest.filter((item, i) => i !== index);
    setFeededTest(updatedFeededTest);
    updateFeededTest(updatedFeededTest); // Обновление данных в родительском компоненте

    setSubedTest([...subedTest, removedSub]);
    //console.log(removedSub);
    try {
      let res = await fetch('https://m1.itsk.pw/newsfeed/channels/remove_feed', {
        method: 'DELETE',
        body: JSON.stringify({
          tag: removedSub.tag,
        }),
        headers: {Autorization: `Bearer ${token}`}
      });

      if (res.status === 200) {
        let responseJson = await res.json();
        console.log(responseJson);

        let removeFeed = responseJson.name;
        console.log('token:', removeFeed);
        Cookies.set('token', removeFeed);
        setFeededTest(removeFeed);

      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addSubs = async (index) => {

    const selectedSub = subedTest[index];
    const updatedFeededTest = [...feededTest, selectedSub];
    setFeededTest(updatedFeededTest);
    updateFeededTest(updatedFeededTest); // Обновление данных в родительском компоненте

    const updatedSubedTest = subedTest.filter((item, i) => i !== index);
    setSubedTest(updatedSubedTest);
    console.log(updatedSubedTest);
    try {
      let res = await fetch('https://m1.itsk.pw/newsfeed/channels/add_feed', {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
          tag: updatedSubedTest,
        }),
        headers: {Autorization: `Bearer ${token}`}
      });

      if (res.status === 200) {
        let responseJson = await res.json();
        console.log(responseJson);
        

        let addFeed = responseJson.name;
        console.log('token:', addFeed);
        Cookies.set('token', addFeed);
        setSubedTest(addFeed);

      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div className="modal__content" onClick={(event) => event.stopPropagation()}>
        <div className="get__feed">
          <h2 className="modal__feed">Добавленные подписки</h2>
          <ul>
            {feededTest.map((item, index) => (
              <li key={index} className="modal__li">
                <p className="modal__p">{item.name}</p>
                <button onClick={() => removeSubs(index)}>Удалить</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="get__subs">
          <h2 className="modal__feed">Добавить подписки</h2>
          <ul>
            {subedTest.map((item, index) => (
              <li key={index} className="modal__li">
                <p className="modal__p">{item.name}</p>
                <button onClick={() => addSubs(index)}>Добавить</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Modal;
