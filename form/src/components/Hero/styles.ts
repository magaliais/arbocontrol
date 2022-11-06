import { HashLink } from 'react-router-hash-link';
import styled from 'styled-components';
import heroBg from '../../assets/images/hero.jpg';

export const Container = styled.section`
  min-height: 100vh;
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
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    .images {
      width: 100%;
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
    }
  }

  @media (max-width: 768px) {
    background-image: url(${heroBg});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

export const HashLinkButton = styled(HashLink)`
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
  box-shadow: 10px 10px 20px rgb(4, 21, 17, 0.3);

  &:hover {
    background-color: var(--white);
    color: var(--green-500);
  }
`;