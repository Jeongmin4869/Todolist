import React, { useState } from "react";
import '../css/Form.css'

/* Form.js에서 Hook(useState) 사용으로 인한 수정 */
//const Form = ({value, onChange, onCreate, onKeyPress}) => {
const Form = ({onCreate}) => {
  
  // React Hook - 클래스타입에서는 사용하지 않는다. 함수형 컴포넌트에서만 사용한다. 
  const[input, setInput] = useState('');

  // input 값 변경
  const handleChange = (event) => {
    setInput(event.target.value);
  }

  // Enter key event
  const handelKeyPress = (event) => {
    if(event.key === 'Enter'){
      onCreate(input);
      setInput('');
    }
  }  
  
  return (
    <div className="form">
      <input
          value={input}
          placeholder="input to-do list"
          onChange={handleChange}
          onKeyPress={handelKeyPress} />
      <div className="create-button" onClick = {() => {
        onCreate(input);
        setInput('');
      }}>
          ADD
      </div>
    </div>  
  );
};

export default Form;