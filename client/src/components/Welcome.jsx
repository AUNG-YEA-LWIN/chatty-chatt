import React,{ useEffect, useState } from 'react';
import styled from 'styled-components';
import Robot from '../assets/robot.gif';

function Welcome({currentUser}) {

  const [userName, setUserName] = useState("");

  useEffect(() => {
    usernameFun();
  
    async function usernameFun() {
      setUserName(await JSON.parse(localStorage.getItem('chatty-user')).username);
    }

  },[])

  return (
    <Container>
        <img src={Robot} alt="robot" />
        <h1>
            Welcome, <span>{userName}!</span>
        </h1>
        <h3>
            Please select a chat to Start Message. 
        </h3>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: no-wrap;
    gap: 1rem;
    color: white;
     img{
        height: 20rem;
     }
     span{
        color: #4e00ff;
     }
     @media screen and (min-width:120px) and (max-width: 480px){
      display: none;
     }
`;

export default Welcome