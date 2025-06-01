import './Header.css'
import Button from '@mui/material/Button';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { bgcolor, borderColor, boxSizing, fontFamily, fontSize, gap, minWidth } from '@mui/system';
import { IconButton, Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';


const buttonstyle = {
  bgcolor: '#4f5141', // light brown background
  color: '#f0efee', // light beige text color
  height: ['50px', '55px', '50px'],        // smaller on mobile, bigger on desktop
  minWidth: ['90px', '110px', '100px'],   // adjust width responsively
  fontSize: ['1rem', '1.15rem', '1.2rem'], // font size smaller on mobile
  padding: ['8px 16px', '10px 20px', '10px 24px'], // smaller padding on mobile
  border: '3px solid #4f5141',
  borderRadius: '12px',
  fontFamily: 'Myfont',
  '@media (hover: hover)': {
    '&:hover': {
      opacity: 0.9, // slightly faded
      transform: 'scale(1.08)', // increase size on hover
      transition: 'transform 0.2s, opacity 0.2s',
      bgcolor: '#726352', // darken background on hover
    },
  },
  transition: 'transform 0.2s, opacity 0.2s', // smooth transition for hover
};

const iconButtonStyle = {
  bgcolor: '#4f5141',
  color: '#f0efee',
  borderRadius: '50%', // make it circular
  width: 44,
  height: 44,
  boxShadow: 2,
  border: '3px solid #4f5141',
  marginLeft: 1,
  
  transition: 'background 0.2s, transform 0.2s',
  '@media (hover: hover)': {
    '&:hover': {
      bgcolor: '#726352',
      transform: 'scale(1.08)',
    },
  },
};


function Header({handleOnClick}) {
    const navigate = useNavigate();
    return (
      <div className="headerstyle" style={{ position: 'relative' }}>
        <Button
          startIcon={<MenuBookIcon  />}
          sx={buttonstyle}
          onClick={handleOnClick}
        >הוסף מתכון
        </Button>
        <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}>
          <IconButton sx={iconButtonStyle} onClick={() => navigate('/aboutme')}><InfoIcon/></IconButton>
          <IconButton sx={iconButtonStyle} onClick={() => navigate('/') }><HomeIcon/></IconButton>
        </Stack>
      </div>
    )
  }
  export default Header;
