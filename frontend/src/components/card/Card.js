import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import './Card.css';
import React, { useEffect } from 'react';
import axios from 'axios';

const styleCard = {
  width: {
    xs: '90vw',
    sm: '70vw',
    md: '35vw',
  },
  height: '200px',
  bgcolor: '#e5e0d8',
  borderRadius: '20px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'row-reverse', // RTL layout
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: 24,
  border: '3px solid #726352',
  margin: '10px auto',
  padding: '16px',




};

const styleMedia = {
  height: '100%',
  width: '35%',
  objectFit: 'cover',
  borderRadius: '12px',
};

const styleContent = {
  display: 'flex',
  margin: '12px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-end', // Right-align for Hebrew
  padding: '0 16px',
  width: '60%',
  textAlign: 'right',
};

const styleButton = {
  marginTop: '12px',
  backgroundColor: '#4f5141',
  color: '#fff',
  fontWeight: 'bold',
  borderRadius: '12px',
  padding: '8px 24px',
  '&:hover': {
    backgroundColor: '#e67828',
  },
  fontFamily: 'inherit',
};

const loadingRecipe = {
  FoodSupplies: 'loading...',
  ImageId: '682c4494d2b01a4365182405',
  OrderRecipe: 'loading...',
  RecipeName: 'loading...',
  Description: 'loading...',
  _id: 'loading',
};

export default function CardComponent({ recipe, IPServer, handleCardClick, publicRecipe }) {
  const [userInfo, setUserInfo] = React.useState(null);
  const displayRecipe = recipe || loadingRecipe;

  React.useEffect(() => {
    if (displayRecipe.UserId) {
      const fetchAuthorDetail = async () => {
        try {
          const response = await axios.get(
            `${IPServer}/api/userdetail/${displayRecipe.UserId}`
          );
          setUserInfo(response.data);
        } catch (error) {
          setUserInfo(null);
        }
      };
      fetchAuthorDetail();
    }
  }, [displayRecipe.UserId, IPServer]);


  return (
    <Card sx={styleCard}>
      <CardActionArea
        onClick={handleCardClick}
        sx={{ height: '100%', display: 'flex', flexDirection: 'row-reverse' }}
      >
        <CardMedia
          component="img"
          image={`${IPServer}/api/image/${displayRecipe.ImageId}`}
          sx={styleMedia}
        />
        <CardContent sx={styleContent}>
          <h2 style={{ margin: 0 }}>{displayRecipe.RecipeName}</h2>
          <p style={{ margin: '8px 0', color: '#333', fontSize: '16px' }}>
            {displayRecipe.RecipeDescription || 'מתכון קל וטעים'}
          </p>
          <Button sx={styleButton}>צפה במתכון</Button>

          {/* Author info bottom left */}
          {publicRecipe && (
          <div className='styleauthorrecipe'>
            <span style={{ color: '#726352', fontWeight: 600, fontSize: '1rem' }}>
              {(userInfo && (userInfo.displayName || userInfo.UserName)) || 'אורח'}
            </span>
            <Avatar
              src={(userInfo && (userInfo.PhotoUrl)) || '/guest.jpg'}
              alt="author avatar"
              sx={{ width: 36, height: 36, border: '2px solid #bfa6a0', objectFit: 'cover' }}
            />
          </div>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
