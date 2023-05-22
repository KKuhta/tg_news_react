import React, { useState } from 'react';
import './Modal.scss';
import subsTest from '../../subsTest.json';
import feedTest from '../../feedTest.json';

const Modal = ({ active, setActive, updateFeededTest }) => {
  const [feededTest, setFeededTest] = useState(feedTest);
  const [subedTest, setSubedTest] = useState(subsTest);

  const removeSubs = (index) => {
    const removedSub = feededTest[index];
    const updatedFeededTest = feededTest.filter((item, i) => i !== index);
    setFeededTest(updatedFeededTest);
    updateFeededTest(updatedFeededTest); // Обновление данных в родительском компоненте

    setSubedTest([...subedTest, removedSub]);
  };

  const addSubs = (index) => {
    const selectedSub = subedTest[index];
    const updatedFeededTest = [...feededTest, selectedSub];
    setFeededTest(updatedFeededTest);
    updateFeededTest(updatedFeededTest); // Обновление данных в родительском компоненте

    const updatedSubedTest = subedTest.filter((item, i) => i !== index);
    setSubedTest(updatedSubedTest);
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
