import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

function Login() {
  
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  useEffect(() => {
    if(localStorage.getItem('chatty-user')) {
      navigate('/')
    }
  },[])

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(handleValidation(e)) {
      const { password, email } = values;
        const {data} = await axios.post(loginRoute,{
          email,
          password
        }); 

        if(data.status === 401) {
          toast.error(data.msg,toastOptions);

          e.target.email.style.border = '1px solid red';
          e.target.password.style.border = '1px solid red';

        }

        if(data.status === 201) {
          localStorage.setItem('chatty-user',JSON.stringify(data.emailCheck));
          navigate('/'); 
        }
    }
  };

  const handleValidation = (e) => {
    const { password, email } = values;

    e.target.password.style.border = '1px solid #4e0eff';
    e.target.email.style.border = '1px solid #4e0eff';

    if (email === " ") {
      toast.error('E-mail is required.', toastOptions);

      e.target.email.style.border = '1px solid red';

      return false;
    } else if (password === " ") {

      toast.error('Password must have atleast 8 characters.', toastOptions);

      e.target.password.style.border = '1px solid red';

      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value.trim() });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Chatty</h1>
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />

          <button type="submit">Login User</button>
          <span>
            Don't have an account ? <NavLink to="/register">Register</NavLink>{' '}
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  background-color: #131324;

  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    img {
      height: 5rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #000000;
    border-radius: 2rem;
    padding: 3rem 5rem;
  @media screen and (min-width: 120px) and (max-width: 480px) {
    background-color: inherit;
  }
    input {
      width: 100%;
      background-color: transparent;
      padding: 1rem;
      border: 1px solid #4e0eff;
      outline: none;
      border-radius: 0.4rem;
      color: white;
      fontsize: 1rem;
      &:focus {
        border: 1px solid #4e0;
      }
    }
    button {
      background-color: #4e0eff;
      color: white;
      padding: 1rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      outline: none;
      text-transform: uppercase;
      transition: all 0.3s ease-in-out;
      &:hover {
        background-color: #4e0;
      }
    }
    span {
      color: #fff;
      text-transform: uppercase;
      text-align: center;
      a {
        color: #4e0;
        text-decoration: none;
      }
    }
  }
`;

export default Login;
