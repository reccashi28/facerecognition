import React, {Component} from 'react';
import './App.css';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import Rank from './component/Rank/Rank';
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    },
    line_linked: {
      color: '#dce0e3'
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (e) => {
    console.log(e.target.value);
  }

  onButtonSubmit = () => {
    console.log('click');
  }

render() {
  return (
    <div className="App" style={{padding: 50}}>
      <Particles className="particles" params={particlesOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
        onInputChange ={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit} />
      {/* <FaceRecognition /> */}
    </div>
  );
}
}

export default App;
