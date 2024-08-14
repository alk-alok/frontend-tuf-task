import React, { useState, useEffect } from "react";
import Banner from "./components/Banner/Banner";
import Dashboard from './components/Dashboard/Dashboard';
import "./App.css";

function App() {
  const [bannerData, setBannerData] = useState({
    description: "",
    timer: 0,
    visible: false,
    link: "",
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/banner")
      .then((response) => response.json())
      .then((data) => {
        const bannerVisible = data.visible === 1;
        setBannerData({
          description: data.description,
          timer: data.timer,
          visible: bannerVisible,
          link: data.link,
        });
      })
      .catch((error) => {
        console.error("Error fetching banner data:", error);
      });
  }, []);

  return (
    <div className="App">
      <div className="banner-container">
        <Banner
          description={bannerData.description}
          timer={bannerData.timer}
          visible={bannerData.visible}
          link={bannerData.link}
        />
      </div>
      <h1>Below is the internal Dashboard component, which can be updated internally.</h1>
      <div className="dashboard-container">
        <Dashboard setBannerData={setBannerData} />
      </div>
    </div>
  );
}

export default App;
