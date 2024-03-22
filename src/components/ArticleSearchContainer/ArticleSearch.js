import React, { useState } from 'react'

// styles
import { ThemeProvider } from '@mui/material/styles';
import { StyledSearchField } from '../StyledComponents/StyledComponents';
import { DC_site_theme } from '../../styles/DC_site_theme';


export default function ArticleSearch({ contentType = 'ARTICLES', onChangeFn = () => { } }) {
  // styled mui search field
  return (
    <ThemeProvider theme={DC_site_theme}>
      <StyledSearchField
        fullWidth
        size='small'
        variant="standard"
        color="primary"
        // color="secondary"
        label={'SEARCH ' + contentType}
        onChange={(e) => { onChangeFn(e.target.value) }}
      />
    </ThemeProvider>
  )
}
