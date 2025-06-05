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
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExploreIcon from '@mui/icons-material/Explore';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



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
  cursor: 'pointer',
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

const iconButtonProfileStyle = {
  bgcolor: 'transparent',
  color: '#4f5141',
  borderRadius: '50%', // make it circular
  width: 44,
  height: 44,
  cursor: 'pointer',
  marginLeft: 1,
  // Prevent background color change on mobile active/click
  '@media (hover: hover) and (pointer: fine)': {
    '&:hover': {
      transform: 'scale(1.08)',
      bgcolor: 'transparent',
    },
  },
};


function Header({handleOnClickAddrecipe,currentUser,setOpenUserProfile}) {
  const [openbutton, setOpenButton] = useState(false);
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

        <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 8, left: 8, zIndex: 10 }}>
                <IconButton 
              sx={{...iconButtonStyle }} 
              onClick={handleOnClickAddrecipe}
              title="הוסף מתכון" 
            >
              <EditDocumentIcon/>
            </IconButton>
       
          <IconButton 
              sx={{...iconButtonStyle }} 
              onClick={() => navigate('/') }
              title="המתכונים שלי"
            >
              <MenuBookIcon/>
            </IconButton>
               <IconButton 
              sx={{ ...iconButtonStyle }} 
              onClick={() => navigate('/aboutme')}
              title="מתכונים משותפים"
            >
              <ExploreIcon/>
            </IconButton>
     </Stack>
        <Stack direction="column-reverse" spacing={1} sx={{ position: 'absolute', top: 8, right: 8, zIndex: 10, alignItems: 'center' }}>
         {openbutton ? (  
          <>
            <IconButton 
              sx={{ ...iconButtonProfileStyle }} 
              onClick={() => setOpenButton(false)}
              title="הסתר לחצנים" 
            >
              <KeyboardArrowUpIcon/>
            </IconButton>
      
            <IconButton 
              sx={{ ...iconButtonStyle }} 
              onClick={() => navigate('/aboutme')}
              title="על הפרוייקט"
            >
              <InfoIcon/>
            </IconButton>
            <IconButton 
              sx={{ ...iconButtonStyle }} 
              onClick={handleLogout}
              title="יציאה מהחשבון"
            >
              <LogoutIcon/>
            </IconButton>
          </>
         ) : (
           <IconButton 
            sx={{ ...iconButtonProfileStyle }} 
            onClick={() => setOpenButton(true)}
            title="גלה לחצנים"
          >
            <KeyboardArrowDownIcon/>
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
