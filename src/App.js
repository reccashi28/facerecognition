import React, {Component} from 'react';
import './App.css';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';



function App() {
  return (
    <div className="App" style={{padding: 50}}>
      <Navigation />
      <Logo />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
