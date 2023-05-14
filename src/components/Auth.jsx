import React from 'react';

import '../scss/auth.scss';
import { useState } from 'react';
import InputMask from 'react-input-mask';
function PhoneInput(props) {
  return (
    <InputMask mask="+7 (999) 999 99-99" value={props.value} onChange={props.onChange}></InputMask>
  );
}

const Auth = () => {
  const [phone, setPhone] = useState('');
  const handleInput = ({ target: { value } }) => setPhone(value);

  return (
    <div className="container__form background">
      <div className="form">
        <div className="form__center">
          <h1 className="form__h1">Введите номер телефона</h1>
          <form action="">
            <p>
              <PhoneInput value={phone} onChange={handleInput}></PhoneInput>
            </p>
            <input type="submit" className="formInput" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
