import { Card, Fab, Grid, Icon, lighten, styled, useTheme, Box } from '@mui/material';

const ContentBox = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
}));

const FabIcon = styled(Fab)(() => ({
  width: '44px !important',
  height: '44px !important',
  boxShadow: 'none !important',
}));

const H3 = styled('h3')(({ textcolor }) => ({
  margin: 0,
  color: textcolor,
  fontWeight: '500',
  marginLeft: '12px',
}));

const H1 = styled('h1')(({ theme }) => ({
  margin: 0,
  flexGrow: 1,
  color: theme.palette.text.secondary,
}));

const Span = styled('span')(({ textcolor }) => ({
  fontSize: '13px',
  color: textcolor,
  marginLeft: '4px',
}));

const IconBox = styled('div')(() => ({
  width: 16,
  height: 16,
  color: '#fff',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '300px ',
  justifyContent: 'center',
  '& .icon': { fontSize: '14px' },
}));

const StatCards2 = () => {
  const { palette } = useTheme();
  const textError = palette.error.main;
  const bgError = lighten(palette.error.main, 0.85);

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={1} md={6}>
        <Card elevation={3} sx={{ p: 1 }}>
          <ContentBox>
            <H1 textcolor={'#08ad6c'}>Video Title</H1>
          </ContentBox>
          <Box
  component="img"
  sx={{
   
    maxHeight: { xs: 233, md: 167 },
    maxWidth: { xs: 350, md: 250 },
  }}
  alt="The house from the offer."
  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
/>
          <ContentBox sx={{ pt: 2 }}>
            <H1>10.8k</H1>
            
          </ContentBox>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StatCards2;
