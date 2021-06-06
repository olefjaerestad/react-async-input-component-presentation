import './App.css';
import logo from './logo.svg';
import React from 'react';
import { getName, setName, setNameAsync } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const name = useSelector(getName);
  const dispatch = useDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newName = e.target.value;
    dispatch(setName({name: newName}));
    // dispatch(setNameAsync({name: newName}));
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br /><br />
        <input type="text" value={name} onChange={handleChange} />
        <input type="text" value={name} onChange={handleChange} />
      </header>
    </div>
  );
}

export default App;
