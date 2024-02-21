import { Card, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";
import { DC_site_fonts } from "../../styles/DC_site_fonts";
import { DC_site_colors } from "../../styles/DC_site_colors";

// typography
export const HeaderTypography = styled(Typography)({
    fontFamily: DC_site_fonts.header,
    color: DC_site_colors.headerBlack,
    fontSize: '30px'
});
export const SubheaderTypography = styled(Typography)({
    fontFamily: DC_site_fonts.header,
    color: DC_site_colors.headerBlack,
    fontSize: '20px'
});
export const CategoryTypography = styled(Typography)({
    fontFamily: DC_site_fonts.category,
    fontSize: '15px'
});
export const SummaryTypography = styled(Typography)({
    fontFamily: DC_site_fonts.summary,
    fontSize: '14px'
});
export const BylineTypography = styled(Typography)({
    fontFamily: DC_site_fonts.byline,
    color: DC_site_colors.bylineGrey,
    fontSize: '14px'
});
export const TextTypography = styled(Typography)({
    fontFamily: DC_site_fonts.text,
    fontSize: '12px'
});

// card typography
export const CardHeaderTypography = styled(Typography)({
    fontFamily: DC_site_fonts.header,
    color: DC_site_colors.headerBlack,
    fontSize: '18px',
    '&:hover':{
        cursor: 'pointer',
        color: DC_site_colors.headerBlackHover
    }
});
// export const CategoryTypography = styled(Typography)({
//     fontFamily: DC_site_fonts.category,
//     fontSize: '15px'
// });
// export const SummaryTypography = styled(Typography)({
//     fontFamily: DC_site_fonts.summary,
//     fontSize: '14px'
// });
// export const BylineTypography = styled(Typography)({
//     fontFamily: DC_site_fonts.byline,
//     color: DC_site_colors.bylineGrey,
//     fontSize: '14px'
// });
// export const TextTypography = styled(Typography)({
//     fontFamily: DC_site_fonts.text,
//     fontSize: '12px'
// });


// cards
export const StyledArticleCard = styled(Card)({
    margin: '10px',
    padding: '7px',

    // outline: 'none',
    
    border: '1px solid ' + DC_site_colors.dividerGrey,
    borderRadius: '7px',
    
    boxShadow: 'none',
    transition: '0.5s ease-in-out',
    
    '&:hover':{
        cursor: 'pointer',
        border: '1px solid black',
    }
});