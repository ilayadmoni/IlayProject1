import React, { useState } from 'react';
import './Firstlogin.css';
import {
  Button,
  Avatar,
  MobileStepper,
  IconButton,
} from '@mui/material';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material';

const stylebuttonaddrecipe1 = {
  bgcolor: '#f0efee',
  color: '#4f5141',
  border: '3px solid #4f5141',
  boxShadow: 24,
  borderRadius: '12px',
  fontSize: ['1.1rem', '1.15rem', '1.2rem'],
  width: ['60vw', '70vw', '250px'],
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mx: 'auto',
  fontFamily: 'MyFont',
  '& .MuiButton-endIcon': {
    marginRight: '12px',
    marginLeft: '0px',
  },
};

const styleStepperButton = {
  color: '#4f5141',
  width: 44,
  height: 44,
  cursor: 'pointer',
  fontSize: ['1rem', '1.05rem', '1.1rem'],
  px: 1,
  mx: 1,
};

const stylemobile = {
  bgcolor: '#e5e0d8',
  color: '#4f5141',
  width: { xs: '90%', sm: '80%' }, // 90vw on mobile, 50% on desktop
  alignItems: 'center',
  mx: 'auto', // Center horizontally in MUI
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  '& .MuiMobileStepper-dot': {
    backgroundColor: '#bfa6a0',
  },
  '& .MuiMobileStepper-dotActive': {
    backgroundColor: '#4f5141',
  },
};
const styleavatar = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '16px',
  width: { xs: 200, sm: 200 },
  height: { xs: 200, sm: 200 },
};

function Firstlogin({ onCreateRecipe }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < 2) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

return (
    <div className="firstlogin-container">
        <h1 className="firstlogin-title"> ברוכים הבאים לאתר "טעים לי טעים לך"</h1>

      

        <div className="firstlogin-message">
  {activeStep === 0 && (
    <> 
    <div>
     <Avatar
            sx={styleavatar}
            src="/favicon.ico"
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/favicon.ico';
            }}
        />
      עדיין לא יצרת מתכונים – וזה בדיוק הזמן להתחיל
      הגיע הרגע לכבוש את המטבח ולתת למתכונים שלך מקום משל עצמם
    </div>
    </>
  )}

  {activeStep === 1 && (
    <>
    <div>
       <Avatar
            sx={styleavatar}
            src="/shakshuka.png"
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/favicon.ico';
            }}
        />
      בין אם זו שקשוקה שמסובבת ראשים, עוגת גבינה שממיסה לבבות
      או סלט שגורם לעשבי תיבול לקנא – זה המקום שלך<br /><br />
    </div> 
   </>
  )}

  {activeStep === 2 && (
    <>
    <div>
      תוכל לשמור מתכונים כפרטיים או לשתף אותם עם הקהילה<br />
      כל מתכון שתשתף יוכל לעזור לאחרים למצוא השראה<br /><br />
      בהצלחה – ותנו למתכון שלכם לזרוח ✨
    </div>
    </>
  )}
</div>


        <MobileStepper
            variant="dots"
            className='firstlogin-stepper'
            steps={5}
            position='static'
            activeStep={activeStep}
            sx={stylemobile}
            nextButton={
                <IconButton
                    onClick={handleNext}
                    disabled={activeStep === 4}
                    sx={styleStepperButton}
                >
                    <KeyboardArrowLeft />
                </IconButton>
            }
            backButton={
                <IconButton
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    sx={styleStepperButton}
                >
                    <KeyboardArrowRight />
                </IconButton>
            }
        />
    

    </div>
);
}

export default Firstlogin;
