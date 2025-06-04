import './Header.css'
import Button from '@mui/material/Button';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { IconButton, Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import {  useState} from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';


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
  bgcolor: '#4f5141', // light brown background
  color: '#f0efee',
  borderRadius: '50%', // make it circular
  width: 44,
  height: 44,
  boxShadow: 2,
  border: '3px solid #4f5141',
  marginLeft: 1,
  // Prevent background color change on mobile active/click
  '&:hover': {
    bgcolor: '#4f5141',
  },
  '&:active': {
    bgcolor: '#4f5141',
  },
  '@media (hover: hover) and (pointer: fine)': {
    '&:hover': {
      transform: 'scale(1.08)',
      bgcolor: '#4f5141',
    },
  },
};


function Header({handleOnClickAddrecipe,currentUser,setOpenUserProfile}) {
  const [openbutton, setOpenButton] = useState(false);
  console.log(currentUser.photoURL);
    const navigate = useNavigate();

    const handleLogout = async () => {
      const auth = getAuth();
      await signOut(auth);
      navigate('/loginpage', { replace: true });
    };

    const handleOnClickUserProfile = () => {
      setOpenUserProfile(true);
    }
    return (
      <div className="headerstyle" style={{ position: 'relative' }}>
     
        <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}>
         
         
         
         {openbutton ? (  
          <>
            <IconButton 
              sx={{ ...iconButtonStyle, cursor: 'pointer' }} 
              onClick={() => setOpenButton(false)}
              title="הסתר לחצנים" 
            >
              <ChevronRightIcon/>
            </IconButton>
            <IconButton 
              sx={{ ...iconButtonStyle, cursor: 'pointer' }} 
              onClick={handleOnClickAddrecipe}
              title="הוסף מתכון" 
            >
              <AddIcon/>
            </IconButton>
            <IconButton 
              sx={{ ...iconButtonStyle, cursor: 'pointer' }} 
              onClick={() => navigate('/aboutme')}
              title="על הפרוייקט"
            >
              <InfoIcon/>
            </IconButton>
            <IconButton 
              sx={{ ...iconButtonStyle, cursor: 'pointer' }} 
              onClick={() => navigate('/') }
              title="דף הבית"
            >
              <HomeIcon/>
            </IconButton>
            <IconButton 
              sx={{ ...iconButtonStyle, cursor: 'pointer' }} 
              onClick={handleLogout}
              title="יציאה מהחשבון"
            >
              <LogoutIcon/>
            </IconButton>
          </>
         ) : (
           <IconButton 
            sx={{ ...iconButtonStyle, cursor: 'pointer' }} 
            onClick={() => setOpenButton(true)}
            title="גלה לחצנים"
          >
            <ChevronLeftIcon/>
          </IconButton>
         )}
         
         
         
         
         
         
         
          {currentUser.photoURL ? (
            <Avatar 
              sx={{ ...iconButtonStyle, cursor: 'pointer' }} 
              src={currentUser.photoURL} 
              title={currentUser.displayName} 
              onClick={handleOnClickUserProfile}
              onError={e => { e.target.onerror = null; e.target.src = '/favicon.ico'; }}
            />
          ) : (
            <Avatar 
                sx={{ ...iconButtonStyle, cursor: 'pointer' }}
                src="\guest.jpg" 
                title="אורח"
                onClick={handleOnClickUserProfile} />
          )}
          
        </Stack>
      </div>
    )
  }
  export default Header;
