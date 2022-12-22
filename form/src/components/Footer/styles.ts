import styled from "styled-components";

export const Container = styled.section`
  padding: 4rem 0;
`;

export const Content = styled.article`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 2rem;

  h2 {
    font-size: 3.75rem;
    font-family: "Roboto Slab";
    font-weight: 500;
    text-align: center;
    color: var(--green-500);
    margin-bottom: 1.5rem;
  }

  p {
    text-align: center;
    font-size: 1rem;
  }
  
  section {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    margin-top: 4rem;
    
    @media(max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  strong {
    font-family: "Roboto Slab";
    text-transform: uppercase;
    text-align: center;
  }

  p {
    line-height: 1.4rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    max-width: 420px;
    margin: 0 auto;
  }
`;

export const Logos = styled.div`
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
`;