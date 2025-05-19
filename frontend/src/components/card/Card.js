import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const styleCard = {
  width: {
    xs: '30vw',   // mobile
    sm: '70vw',   // small tablets
    md: '500px',  // desktops and up
  },
    height: {
    xs: 'auto',     // Let content determine height on mobile
    sm: 'auto',     // Still flexible for tablets
    md: '500px',    // Fixed height for desktop
  },
  maxWidth: '500px',
  maxHeight: '500px', 
  bgcolor: '#9D9167',
  border: '3px solid #442d1c',
  boxShadow: 24,
  borderRadius: '10px',
  padding: '20px',
  margin: 'auto'
};


export default function CardComponent() {
  return (
    <Card sx={styleCard}>
        
      <CardActionArea>
        <CardMedia
          component="img"
          image="/Omlet.jpg"
          
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
         
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
