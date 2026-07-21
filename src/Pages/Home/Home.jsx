import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Home.css";
import Footer from "../../Components/Footer/Footer";
import Img from '../../Assets/homeImg.jpg'

const Home = () => {
  return (
<>
    <Navbar />
    <div className="body">
      <div className="title--wrapper">
        <h1>TechBeetle</h1>
        <h1>Dungeons and Dragons</h1>
      </div>
      <div className="about">
        <h1>About</h1>
        <p>
          I am a father who plays Dungeons and Dragons with his kids. We started
          with the Humblewood campaign from{" "}
          <a href="https://hitpointpress.com/" target="_blank" rel="noreferrer" className="outside_link">
            HitPoint Press
          </a>
          . Since I couldn't find maps for my young kids to use during play I
          started creating them myself. All maps are created using{" "}
          <a href="https://inkarnate.com/" target="_blank" rel="noreferrer" className="outside_link">
            Inkarnate
          </a>{" "}
          map software. Please feel free to use any of the maps for your own
          campaigns Humblewood or otherwise. More maps will be added as my
          families campaign progresses and I create them. I also created the
          spell reference for one less book to bring to the table when we need
          to reference our character's spells.
        </p>
      </div>
       <img src={Img} alt="" className="homeImg" /> 
      <Footer />
    </div>
    </>
  );
};

export default Home;
