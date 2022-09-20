import styled from "styled-components";

export const Container = styled.section`
  max-width: 1120px;
  margin: 0 auto;
  padding: 4rem 2rem 10rem;

  h1 {
    font-size: 3.75rem;
    font-family: "Roboto Slab";
    font-weight: 500;
    text-align: center;
    color: var(--green-500);
    margin-bottom: 3rem;
  }

  p {
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }

  form {
    padding: 3.125rem;
    box-shadow: 13px 10px 44px -20px rgba(0, 0, 0, 0.35);
    border-radius: 5px;

    a {
      display: inline-block;
      font-weight: 400;
      color: var(--green-500);
      margin-bottom: 1.25rem;
    }

    button {
      background-color: var(--green-500);
      border: none;
      outline: none;
      padding: 1rem 2rem;
      width: 100%;
      font-family: "Roboto";
      font-size: 1.125rem;
      font-weight: 500;
      letter-spacing: 2px;
      color: var(--white);
      border-radius: 5px;
      transition: all 0.2s;
      align-self: center;
      margin-top: 1rem;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
  
        &:hover {
          background-color: var(--green-500);
        }
      }
      
      &:hover {
        background-color: var(--green-600);
        color: var(--white);
      }
    }

    p {
      color: var(--red-500);
      text-align: left;
    }
    
    @media(max-width: 468px) {
      padding: 3.125rem 2rem;
    }
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ddd;
    outline: none;
    margin-bottom: 1.25rem;
  }

  textarea {
    resize: none;
    outline: none;
    border: 1px solid #ddd;
    padding: 0.5rem;
    height: 8rem;
    margin-bottom: 1.25rem;
  }

  select {
    outline: none;
    border: 1px solid #ddd;
    padding: 0.5rem;
    margin-bottom: 1.25rem;
  }

  span {
    color: var(--red-500);
    margin-bottom: 2rem;
    font-weight: 500;
  }
`;
