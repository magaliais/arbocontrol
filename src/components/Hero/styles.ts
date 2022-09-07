import styled from 'styled-components';


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