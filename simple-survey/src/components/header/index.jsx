import React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Container, Grid, } from '@mui/material';
import bgImg from '../../assets/bg-img.png';

const Header = () => {
  return (
 <>
     
      <Grid>
      <Container maxWidth="xxl">
      <Grid item xs={12} sx={{ p: 2 }}>
          <Box sx={{ color: '#fff' }}>
            <Typography variant="h6" align="left">
              Survey Form
            </Typography>
          </Box>
        </Grid>
  <img src={bgImg} alt="img" width={'100%'} style={{}}>
   </img>
 
     </Container>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '43vh',
            backgroundColor: 'rgba(0, 0, 255, 0.3)', 
            zIndex:-1
          }}
        />
       
      </Grid>
      </>
  );
};

export default Header;
