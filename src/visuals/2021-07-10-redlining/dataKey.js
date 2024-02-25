import React from 'react';
import PropTypes from 'prop-types';
import { styled } from "@mui/material/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const StyledTable = styled(Table)({
  margin: 20,
  maxWidth: '100%'
});

const BasicTable = ({ rows }) => {

  return (
    <TableContainer>
      <StyledTable aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <h4> Indicator </h4>
            </TableCell>
            <TableCell align="center">
              <h4> Description (percentile of...) </h4>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.indicator}>
              <TableCell>{row.indicator}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default BasicTable;

BasicTable.propTypes = {
  rows: PropTypes.any,
};
