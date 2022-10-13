import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import loader from '../assets/loader.gif';
import { Buffer } from 'buffer';
import { setAvatarRoute } from '../utils/APIRoutes';

function SetAvatar() {
  const api = 'https://api.multiavatar.com/45678945';

  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

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
    avatarFun();

    async function avatarFun() {
      if(!localStorage.getItem('chatty-user')) {
        navigate('/login');
      }
    }
  },[]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error('Please select an avatar', toastOptions);
    }else {
      const user = await JSON.parse(localStorage.getItem('chatty-user'));
      
      const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      // console.log(data.isSet);  //flase

      if(data.isSet) {
         user.isAvatarImageSet = true;
         user.avatarImage = data.image;
         localStorage.setItem('chatty-user',JSON.stringify(user));
         navigate('/');
      }
    }
  };

  useEffect(() => {
    makeAvatar();

    async function makeAvatar() {
      let data = [];

      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );

        const buffer = new Buffer(image.data);

        data.push(buffer.toString('base64'));
      }

      setAvatars(data);

      setLoading(false);
    }

  }, []);

  return (
    <>
      {loading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? 'selected' : ''
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt={`avatar${index}`}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as Profile Picture
          </button>
        </Container>
      )
      }
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #131324;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
      text-align: center;
    }
  }

  .avatars {
    display: flex;
    grap: 2rem;
    cursor: pointer;

    .avatar {
      border: 1px solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.5s ease-in-out;
      margin-left: 1rem;
      &:hover {
        border: 3px solid #4e0eff;
      }

      img {
        height: 6rem;

        @media screen and (min-width: 120px) and (max-width: 480px) {
          height: 3rem;
        }
      }
      
    }
    .selected {
      border: 3px solid #4e0;
    }
  }

  .submit-btn {
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
`;

export default SetAvatar;
