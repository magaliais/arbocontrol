import React, { useState } from 'react'
import * as S from './styles'

import Hero from '../../components/Hero';
import Form from '../../components/Form';
import FAQ from '../../components/FAQ';
import Footer from '../../components/Footer';

import Fade from 'react-reveal/Fade'
import Modal from '../../components/Modal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [complaintProtocol, setComplaintProtocol] = useState('12.05.22');

  async function handleSubmit() {}

  isModalOpen
    ? (document.getElementsByTagName("body")[0].style.overflowY = "hidden")
    : (document.getElementsByTagName("body")[0].style.overflowY = "auto");

  return (
    <S.Container>
      {isModalOpen && 
        <Modal 
          isModalOpen={isModalOpen} 
          setIsModalOpen={setIsModalOpen} 
          complaintProtocol={complaintProtocol}
        />
      }

      <Hero />
      
      <Fade bottom >
        <Form setIsModalOpen={setIsModalOpen} setComplaintProtocol={setComplaintProtocol}/>
      </Fade>

      <FAQ />

      <Footer />
      
    </S.Container>
  );
}