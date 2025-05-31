import './Loadingpage.css'; // Import the CSS file

function LoadingPage() {
  return (
    <div className="loading-container">
      <img src="/favicon.ico" alt="Logo" className="logo" />
      <div className="wave-loader">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};

export default LoadingPage;
