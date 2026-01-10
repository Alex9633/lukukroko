import "./App.css";
import logo from "./assets/logo.png";
import youtube from "./assets/youtube.png";
import facebook from "./assets/facebook.png";
import instagram from "./assets/instagram.png";
import tiktok from "./assets/tiktok.png";

function App() {
  return (
    <div className="app">

      <img src={logo} alt="LUKUKROKO" className="logo"/>

      <div className="socials">
        <a href="https://www.youtube.com/@LUKUKROKO" target="_blank" rel="noopener noreferrer">
          <img src={youtube} alt="YouTube"/>
        </a>

        <a href="https://www.facebook.com/profile.php?id=61573951087624" target="_blank" rel="noopener noreferrer">
          <img src={facebook} alt="Facebook"/>
        </a>

        <a href="https://www.instagram.com/lukukroko/" target="_blank" rel="noopener noreferrer">
          <img src={instagram} alt="Instagram"/>
        </a>

        <a href="https://www.tiktok.com/@lukukroko" target="_blank" rel="noopener noreferrer">
          <img src={tiktok} alt="TikTok"/>
        </a>
      </div>

      <p className="title">Hauska tutustua!</p>

      <input type="email" className="email-input" placeholder="Sähköposti"/>

      <button className="submit-btn">TILAA</button>

      <footer className="footer">Copyright © 2026 LUKUKROKO</footer>
    </div>
  );
}

export default App;
