
import './App.css';
import Homepage from './pages/Homepage';
import Header from './header/Header';
import ModalBox from './components/modal/Modal';
import Addreciepe from './pages/Addreciepe';
import * as React from 'react';

function App() {
   const [openAddreciepe, setOpenAddreciepe] = React.useState(false);
   const handleOnClickAdd = () =>
    {
      setOpenAddreciepe(true);
      console.log("hii");
    }


  return (
    <div className='bodystyleheader'>
      <Header handleOnClick={handleOnClickAdd} />
      <div className='headertextstyle'>
        ספר מתכונים
      </div>
      <Homepage></Homepage>
      <ModalBox
        open={openAddreciepe} 
        setOpen={setOpenAddreciepe}
        BodyFunction={Addreciepe} 
        />
      
    </div>
  );
}

export default App;
