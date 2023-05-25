import React, { useState } from 'react';
import './Modal.scss';
import Cookies from 'js-cookie';

const Modal = ({ active, setActive, updateFeededTest, subs }) => {
  const [token, setToken] = useState(Cookies.get('token') || '');
  const [feed, setFeed] = useState(Cookies.get('feed') || []);
  const [sub, setSub] = useState(subs);

  const removeSubs = async (index) => {
    const removedSub = feed[index];
    const updatedFeededTest = feed.filter((item, i) => i !== index);
    setFeed(updatedFeededTest);
    updateFeededTest(updatedFeededTest);
    setSub([...sub, removedSub]);
    try {
      let resDel = await fetch('https://m1.itsk.pw/newsfeed/channels/remove_feed', {
        mode: 'cors',
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: removedSub.name,
          tag: removedSub.tag,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addSubs = async (index) => {
    const addedSub = subs[index];

    try {
      let resAdd = await fetch('https://m1.itsk.pw/newsfeed/channels/add_feed', {
        mode: 'cors',
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: addedSub.name,
          tag: addedSub.tag,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    const updatedFeededTest = [...feed, addedSub];
    setFeed(updatedFeededTest);
    updateFeededTest(updatedFeededTest);
    const updatedSubsTest = subs.filter((item, i) => i !== index);
    setSub(updatedSubsTest);
  };
  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div className="modal__content" onClick={(event) => event.stopPropagation()}>
        <div className="get__feed">
          <h2 className="modal__feed">Добавленные подписки</h2>
          <ul>
            {feed.map((item, index) => (
              <li key={index} className="modal__li">
                <p className="modal__p">{item.name}</p>
                <button onClick={() => removeSubs(index)} className="modal__button">
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="get__subs">
          <h2 className="modal__feed">Добавить подписки</h2>
          <ul>
            {subs.map((item, index) => (
              <li className="modal__li" key={index}>
                <p className="modal__p">{item.name}</p>
                <button onClick={() => addSubs(index)} className="modal__button">
                  Добавить
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Modal;
