import styled from 'styled-components';


export const Container = styled.main`
  width: 100%;
`;

export const Hero = styled.section`
  height: 100vh;
  padding: 1.5rem;

  video {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
    z-index: -1;
  }

  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;

    .images {
      display: flex;
      align-items: center;
      justify-content: space-around;

      img {
        max-width: 100%;
      }

      @media (max-width: 768px) {
        flex-direction: column;
      }
    }

    header {
      text-align: center;
      font-size: 2.5rem;
      font-family: "Roboto Slab", sans-serif;
      color: var(--white);
      line-height: 6.5rem;
      text-shadow: 10px 10px 20px rgb(4, 21, 17, 0.8);
      margin-top: 3rem;
    }

    button {
      background-color: var(--green-500);
      border: none;
      outline: none;
      padding: 1rem 2rem;
      width: max-content;
      font-family: "Roboto";
      font-size: 1.125rem;
      font-weight: 500;
      letter-spacing: 2px;
      color: var(--white);
      border-radius: 5px;
      transition: all 0.2s;
      align-self: center;
      margin-top: 5rem;

      &:hover {
        background-color: var(--white);
        color: var(--green-500);
      }
    }
  }
`;

// FORM COMPONENT ------

export const Form = styled.section`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem;

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

      &:hover {
        background-color: var(--green-600);
        color: var(--white);
      }
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
`;