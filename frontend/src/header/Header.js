import './Header.css'
import Button from '@mui/material/Button';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { borderColor, boxSizing, fontFamily, fontSize, gap, minWidth } from '@mui/system';


const buttonstyle  = {
    bgcolor: '#84592B',
    color: '#E8D1A7',
    height: '60px',
    minWidth: '120px',
    fontSize: '1.3rem',
    padding: '12px 24px',
    border: '1px solid #BFA6A0', // מסגרת חומה כהה
    borderRadius: '12px',
    fontFamily: 'Myfont'

    
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
  