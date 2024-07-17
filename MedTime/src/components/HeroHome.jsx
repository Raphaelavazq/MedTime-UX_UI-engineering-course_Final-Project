import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { useEffect } from "react";
import layerBack from "../assets/images/layer_back.png";
import layerMiddle from "../assets/images/layer_middle.png";
import layerFront from "../assets/images/layer_front.png";
import rocket from "../assets/images/rocket.svg";
import bubblesBackground from "../assets/images/layer_bubbles.png";
import smallDeviceImage from "../assets/images/hero-rocket.png";
import waves from "../assets/images/waves.png";
import "./HeroHome.css";

const HeroHome = () => {
  useEffect(() => {
    const bubblesBackground = document.querySelector(".bubbles-background");
    const layers = document.querySelectorAll(".layer");
    const mainContent = document.querySelector(".main-content");

    const handleScroll = () => {
      const rect = mainContent.getBoundingClientRect();

      if (rect.top < window.innerHeight && rect.top > 0) {
        bubblesBackground.style.animation = "fadeIn 2s forwards, dance 1.5s infinite";
        layers.forEach(layer => {
          if (layer.classList.contains('layer-rocket')) {
            layer.style.animation = "fadeIn 2s forwards, rocketDance 1s infinite";
          } else {
            layer.style.animation = "fadeIn 2s forwards, dance 1.5s infinite";
          }
        });
      } else {
        bubblesBackground.style.animation = "fadeOut 2s forwards";
        layers.forEach(layer => {
          layer.style.animation = "none";
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ParallaxProvider>
      <div className="hero-home-container">
        <Parallax className="bubbles-background" y={[-20, 20]}>
          <img src={bubblesBackground} alt="Bubbles Background" />
        </Parallax>
        <div className="waves-container">
          <img src={waves} alt="Waves" className="waves-image" />
        </div>
        <div className="main-content">
          <div className="header">
            <p className="subtitle">LAUNCH INTO THE FUTURE</p>
            <p className="description">
            Make it Easy and Fast!
              <br />
              <br />
              <a href="#" className="cta-link">Let’s get started!</a>
            </p>
          </div>
          <div className="grid-container">
            <Parallax className="layer layer-back" y={[20, -20]}>
              <img src={layerBack} alt="Layer Back" />
            </Parallax>
            <Parallax className="layer layer-middle" y={[30, -30]}>
              <img src={layerMiddle} alt="Layer Middle" />
            </Parallax>
            <Parallax className="layer layer-front" y={[40, -40]}>
              <img src={layerFront} alt="Layer Front" />
            </Parallax>
            <Parallax className="layer layer-rocket" y={[50, -50]}>
              <img src={rocket} alt="Rocket" />
            </Parallax>
          </div>
          <img src={smallDeviceImage} alt="Small Device Image" className="small-device-image" />
        </div>
      </div>
    </ParallaxProvider>
  );
}

export default HeroHome;





