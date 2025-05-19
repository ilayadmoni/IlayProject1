import './Header.css'
import Button from '@mui/material/Button';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { borderColor, boxSizing, fontFamily, fontSize, gap, minWidth } from '@mui/system';


const buttonstyle = {
  bgcolor: '#743014',
  color: '#E8D1A7',
  height: ['50px', '55px', '60px'],        // smaller on mobile, bigger on desktop
  minWidth: ['90px', '110px', '120px'],   // adjust width responsively
  fontSize: ['1rem', '1.15rem', '1.3rem'], // font size smaller on mobile
  padding: ['8px 16px', '10px 20px', '12px 24px'], // smaller padding on mobile
  border: '1px solid #BFA6A0',
  borderRadius: '12px',
  fontFamily: 'Myfont',
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
  