import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { lastUpdated, articlesASE, infoASE } from './InfoASE';
import ColorMap from './BargainingColorMap';
import NumberMap from './BargainingNumberMap';

const accordionColors = new Map();
let tentativeAgreements = 0;

articlesASE.map((item) => (

  infoASE[item].proposals.map((proposal) => (

    accordionColors.set(item, ColorMap.get(proposal.color)),
    tentativeAgreements += NumberMap.get(proposal.color)

  ))));

const ProposalsASE = () => (
  <div>
    <p>
      <i>
        As of
        {' '}
        {lastUpdated}
        ,
        {' '}
        <strong>
          {tentativeAgreements}
          {' '}
          tentative agreements
        </strong>
        {' '}
        were met between the UC system and the UAW Local 2865.
      </i>
    </p>
    {
        articlesASE.map((item) => (

          <Accordion sx={{
            backgroundColor: accordionColors.get(item),
          }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography><i>{item}</i></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {infoASE[item].intro}
                <br />
                <br />
                <ButtonGroup orientation="vertical" fullWidth>
                  {
                        infoASE[item].proposals.map((proposal) => (
                          <Button href={proposal.link} color={proposal.color} target="_blank" variant="outlined">
                            {proposal.name}
                          </Button>
                        ))
                    }
                </ButtonGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))
}
  </div>
);

export default ProposalsASE;
