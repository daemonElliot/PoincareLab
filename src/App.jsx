import React from "react";
import FirstBlock from "./comp/FirstBlock.jsx";
import SecondBlock from "./comp/SecondBlock.jsx";
import ThirdBlock from "./comp/ThirdBlock.jsx";
import AboutBlock from "./comp/AboutBlock.jsx";
import "./App.css";

function App() {
  return (
    <>
      <FirstBlock />
      <AboutBlock />
      <SecondBlock />
      <ThirdBlock />
    </>
  );
}

export default App;
