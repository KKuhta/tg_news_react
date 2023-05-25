import '../scss/profile.scss';
import React, { useState } from 'react';

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

export default News;
