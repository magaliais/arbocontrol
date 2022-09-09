import React from 'react'
import * as S from './styles';

import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

type Accordion = {
  summary: string;
  details: string[];
}

interface AccordionGroupProps {
  accordions: Accordion[];
}

export default function AccordionGroup({ accordions }: AccordionGroupProps) {
  return (
    <S.Container>

      {accordions.map(hit => (
        <Accordion sx={{
          boxShadow: 'none',
        }} square>
          <AccordionSummary 
            sx={{
              backgroundColor: "var(--green-500)",
              color: "var(--white)",
              fontWeight: "500",
            }} 
          >{hit.summary}</AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: "var(--gray-100)",
              padding: "1.5rem 1rem",
              letterSpacing: "1px",
              wordSpacing: "0.25rem",
              lineHeight: '1.5rem',
              fontSize: '0.9rem',
            }}
          >{hit.details.map(paragraph => <p style={{textAlign: 'left', marginBottom: '0'}}>{paragraph}</p>)}</AccordionDetails>
        </Accordion>
      ))}

    </S.Container>
  );
}