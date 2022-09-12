import styled from "styled-components";

export const Container = styled.section`
  background-color: var(--gray-100);
  padding: 4rem 0 5rem;
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

  h3 {
    font-family: "Roboto";
    font-size: 2.5rem;
    color: var(--green-500);
    font-weight: 600;
    letter-spacing: 1px;
    text-align: center;
    margin-top: 6rem;
  }

  p {
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }

  .iframeContainer {
    overflow: hidden;
    /* 16:9 aspect ratio */
    padding-top: 56.25%;
    position: relative;
    border-radius: 10px;
    margin-top: 2rem;

    iframe {
      border: 0;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }
`;

export const AccordionsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
  margin-top: 6rem;
  
  @media(max-width: 768px) {
    grid-template-columns: 1fr;
    grid-row-gap: 1rem;
  }
`;