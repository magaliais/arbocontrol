import React from 'react'
import * as S from './styles'

import Hero from '../../components/Hero';
import Form from '../../components/Form';
import FAQ from '../../components/FAQ';
import Footer from '../../components/Footer';

import Fade from 'react-reveal/Fade'

export default function Home() {

  async function handleSubmit() {}

  return (
    <S.Container>

      <Hero />
      
      <Fade bottom >
        <Form />
      </Fade>

      <FAQ />

      <Footer />
      
    </S.Container>
  );
}