import styled from "styled-components";

export const Container = styled.section`
  padding: 4rem 0 10rem;
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
    margin-bottom: 3rem;
  }

  p {
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }
`;
