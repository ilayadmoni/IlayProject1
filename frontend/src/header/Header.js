import './Header.css'
import Button from '@mui/material/Button';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { borderColor, boxSizing, fontFamily, fontSize, gap, minWidth } from '@mui/system';


const buttonstyle  = {
    bgcolor: '#D2B48C',
    color: 'black',
    height: '60px',
    minWidth: '120px',
    fontSize: '1.5rem',
    padding: '12px 24px',
    border: '1px solid #BFA6A0', // מסגרת חומה כהה
    borderRadius: '12px',
    fontFamily: 'Arial'

    
};


function Header() {
    return (
     
      <div className="headerstyle">
        <Button
        startIcon={<MenuBookIcon  />}
        sx = {buttonstyle}
      >הוסף מתכון
        
        </Button>
       
         </div>
    )
  }
  export default Header;
  