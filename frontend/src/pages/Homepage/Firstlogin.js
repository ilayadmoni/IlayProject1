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
  bgcolor: '#e2dad2',
  color: '#4f5141',
};

const styleavatar = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '16px',
  width: { xs: 120, sm: 200 },
  height: { xs: 120, sm: 200 },
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
        <h1 className="firstlogin-title">ברוכים הבאים</h1>

        <Avatar
            sx={styleavatar}
            src="/favicon.ico"
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/favicon.ico';
            }}
        />

        <div className="firstlogin-message">
  {activeStep === 0 && (
    <>
      עדיין לא יצרת מתכונים – וזה בדיוק הזמן להתחיל<br />
      הגיע הרגע לכבוש את המטבח ולתת למתכונים שלך מקום משל עצמם<br /><br />
      ברוכים הבאים ל<strong> "טעים לי טעים לך" </strong>
    </>
  )}

  {activeStep === 1 && (
    <>
      בין אם זו שקשוקה שמסובבת ראשים, עוגת גבינה שממיסה לבבות<br />
      או סלט שגורם לעשבי תיבול לקנא – זה המקום שלך<br /><br />
      שתף, גלה, והתאהב מחדש בבישול הביתי
    </>
  )}

  {activeStep === 2 && (
    <>
      תוכל לשמור מתכונים כפרטיים או לשתף אותם עם הקהילה<br />
      כל מתכון שתשתף יוכל לעזור לאחרים למצוא השראה<br /><br />
      בהצלחה – ותנו למתכון שלכם לזרוח ✨
    </>
  )}
</div>


        <MobileStepper
            variant="dots"
            steps={3}
            position="static"
            activeStep={activeStep}
            sx={stylemobile}
            nextButton={
                <IconButton
                    onClick={handleNext}
                    disabled={activeStep === 2}
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

        <IconButton
            sx={stylebuttonaddrecipe1}
            onClick={onCreateRecipe}
        >
            יצירת מתכון <EditDocumentIcon style={{ marginRight: '8px' }} />
        </IconButton>
    </div>
);
}

export default Firstlogin;
