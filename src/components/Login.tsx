import axios from 'axios';
import { useState } from 'react'
import '../App.css'
import { useNavigate, Route, BrowserRouter, Routes } from 'react-router-dom';
import App from '../App';


const Login = () => {
  let navigate = useNavigate();
  function handleClick() {
    navigate('/Home');
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkSign, setCheckSign] = useState(false);
  const onChangeusername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }
  const onChangepassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }
  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var account = {
      username: username,
      password: password
    }
    console.log(account);
    axios({
      method: 'POST',
      url: 'http://localhost:5000/login',
      data: account
    }).then((response) => {
      localStorage.setItem('accessToken', response.data.accessToken);
      handleClick();
    }).catch((err) => {
      setCheckSign(true);
    });
  }
  const messageError = () => {
    if (checkSign) {
      return (
        <div>
          <h5 style={{ color: 'red' }}>username or password incorrect!!!!</h5>
        </div>
      )
    }
  }
  console.log(checkSign);
  return (
    <div>
      <div>
        <div className="container containerform" id="formContainer">
          <form onSubmit={onSave}>

            <h3>Sign in</h3>
            {messageError()}
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
              required
              onChange={onChangeusername}
            />
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              required
              onChange={onChangepassword}
            />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>

          </form>
        </div>
      </div>
    </div>
  )


}
export default Login;