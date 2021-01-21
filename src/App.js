import React, {Component} from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './component/Navigation/Navigation';
import Signin from './component/Signin/Signin';
import Register from './component/Register/Register';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import Rank from './component/Rank/Rank';
import Particles from 'react-particles-js';

const app = new Clarifai.App( {
  apiKey: '05801666535849c18dcb0813448cb880'
});

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
      imageUrl: '',
      box: '',
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '125',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState( {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict( Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response =>  {
          if(response){
            fetch('http://localhost:3000/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify( {
                id: this.state.user.id 
              })
            })
            .then( response => response.json())
            .then( count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
          }
      this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch( err => console.log(err))
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if( route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({route: route});
  }

render() {
  const {isSignedIn, imageUrl, route, box} = this.state;
  return (
    <div className="App" style={{padding: 50}}>
      <Particles className="particles" params={particlesOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
      { route === 'home' 
        ? <div> 
          <Logo />
          <Rank />
          <ImageLinkForm 
            onInputChange ={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition box = {box} imageUrl={imageUrl}/>
        </div> 
      : (route === 'signin' 
      ? <Signin onRouteChange={this.onRouteChange} /> 
      : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
      ) 
    }
    </div>
  )
}
}

export default App;
