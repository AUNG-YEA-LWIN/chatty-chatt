import React from 'react';
import styled from 'styled-components';

const ErrorPage = () => {
  return (
    <Container>
        <h1>404 Page Not Found.</h1>
    </Container>
  )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
    background-color: #131324;
    
     h1{
        color: #ffffff;
        text-shadow: 5px 5px 10px red;
        cursor: pointer;
     }
`;

export default ErrorPage