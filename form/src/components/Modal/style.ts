import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
  z-index: 5;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 5px;

  display: flex;
  flex-direction: column;

  p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  span {
    margin-bottom: 2rem;
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: 1px;
    color: var(--green-500);
  }

  button {
    background-color: var(--green-500);
    border: none;
    outline: none;
    padding: 0.5rem 2rem;
    width: max-content;
    font-size: 1.125rem;
    font-weight: 500;
    letter-spacing: 2px;
    color: var(--white);
    border-radius: 2px;
    transition: all 0.2s;
    align-self: center;
    box-shadow: 10px 10px 20px rgb(4, 21, 17, 0.3);

    &:hover {
      background-color: #00aa8c;
    }
  }
`;