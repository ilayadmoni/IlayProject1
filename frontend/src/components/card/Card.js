import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import './Card.css'
import React, { useEffect } from 'react';

const styleCard = {
  width: {
    xs: '30vw',
    sm: '70vw',
    md: '200px',
  },
  height: {
    xs: '50vw',
    sm: '80vw',
    md: '260px',
  },
  maxWidth: '200px',
  maxHeight: '500px',
  bgcolor: '#726352',
  border: '3px solid #726352',
  boxShadow: 24,
  borderRadius: '10px',
  padding: '20px',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.2s, opacity 0.2s',
  '@media (hover: hover)': {
    '&:hover': {
      opacity: 0.9, // slightly faded
      transform: 'scale(1.08)', // increase size on hover
      transition: 'transform 0.2s, opacity 0.2s',
      bgcolor: '#726352', // darken background on hover
    },
  },
};

const loadingRecipe = {
  FoodSupplies: 'loading...',
  ImageId: '682c4494d2b01a4365182405',
  OrderRecipe: 'loading...',
  RecipeName: 'loading...',
  _id: 'loading'
};

export default function CardComponent({ recipe, IPServer,handleCardClick}) {
  const displayRecipe = recipe || loadingRecipe;

  useEffect(() => {
  }, [displayRecipe]);

 

  return (
    <Card sx={styleCard}>
      <CardActionArea
        onClick={handleCardClick}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <CardMedia
          component="img"
          image={`${IPServer}/api/image/${displayRecipe.ImageId}`}
          sx={{
            width: '85%',
            maxWidth: '1900px', // Limit the image width
            height: 'auto',
            aspectRatio: '1 / 1', // Force square aspect ratio
            objectFit: 'cover',   // Crop to fill the square
            flex: '0 0 auto',
            borderRadius: '10px',
            alignSelf: 'center', // Center the image horizontally
          }}
        />
        <CardContent
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            flex: '1 1 auto',
            padding: '8px 0 0 0'
          }}
        >
          <div className='ReciepeNamestyle'>{displayRecipe.RecipeName}</div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
