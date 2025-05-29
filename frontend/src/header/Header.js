import './Header.css'
import Button from '@mui/material/Button';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { bgcolor, borderColor, boxSizing, fontFamily, fontSize, gap, minWidth } from '@mui/system';


const buttonstyle = {
  bgcolor: '#743014',
  color: '#E8D1A7',
  height: ['50px', '55px', '50px'],        // smaller on mobile, bigger on desktop
  minWidth: ['90px', '110px', '100px'],   // adjust width responsively
  fontSize: ['1rem', '1.15rem', '1.2rem'], // font size smaller on mobile
  padding: ['8px 16px', '10px 20px', '10px 24px'], // smaller padding on mobile
  border: '1px solid #BFA6A0',
  borderRadius: '12px',
  fontFamily: 'Myfont',
  '@media (hover: hover)': {
    '&:hover': {
      opacity: 0.9, // slightly faded
      transform: 'scale(1.08)', // increase size on hover
      transition: 'transform 0.2s, opacity 0.2s',
      bgcolor: '#84592b', // darken background on hover
    },
  },
  transition: 'transform 0.2s, opacity 0.2s', // smooth transition for hover
};


function Header({handleOnClick}) {

 
    return (
     
      <div className="headerstyle">
        <Button
        startIcon={<MenuBookIcon  />}
        sx = {buttonstyle}
        onClick={handleOnClick}
      >הוסף מתכון
        
        </Button>
       
         </div>
    )
  }
  export default Header;
