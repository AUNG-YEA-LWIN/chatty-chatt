import React, { useState } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

const ChatInput = ({handleSendMsg}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [msg, setMsg] = useState('');

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji) => {
    //  console.log(emoji);
     let message = msg;
     message += emoji.emoji;
     setMsg(message);
  };

  const sendChat = (e) => {
    e.preventDefault();

    if(msg.length>0){
       handleSendMsg(msg);
       setMsg('')
    }

  } 

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            <Picker 
            width={300}
            height={400}
            onEmojiClick={handleEmojiClick} />
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input type="text"
         placeholder="type your message in here"
         value={msg}
         onChange={(e) => setMsg(e.target.value)} />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 2rem;
    gap: 1rem;
  }
  @media screen and (min-width: 480px) and (max-width: 720px) {
    grid-template-columns: 10% 90%;
    padding: 0 2rem;
    gap: 1rem;
  }
  @media screen and (min-width: 120px) and (max-width: 480px) {
    grid-template-columns: 15% 85%;
    padding: 0 2rem;
    gap: 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: white;

    .emoji {
      position: relative;
       svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
       }
        .EmojiPickerReact{
         position: absolute;
         top: -26rem;
         background-color: #080420;
         border-color: #9186f3;
          .epr-body::-webkit-scrollbar{
            background-color: #080420;
            width: 5px;
            &-thumb{
              background-color: #9a86f3;
            }
          }
        
          .EmojiCategories{
            button{
              fileter: contrast(0);

            }
          }
          .epr-search{
            background-color: transparent;
            border-color: #9186f3;
          }
          .epr-emoji-category-label{
            background-color: #080420;
          }
       }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;

    input {
      width: 90%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      aling-items: center;
      background-color: #9a86f3;
      border: none;
      cursor: pointer;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg{
          font-size: 1rem;
        }
      }
      @media screen and (min-width: 480px) and (max-width: 720px) {
        padding: 0.3rem 0.5rem;
        svg{
          font-size: 0.5rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

export default ChatInput;
