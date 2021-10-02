import React from 'react';
import '../styles/App.css';

import Footer from './Footer';
import Header from './Header';
import Content from './Content'



// ---------------------------------------------------------------------
// Run the following commands in terminal before 'npm start':
// npm install
// ---------------------------------------------------------------------

// Inspiration: https://www.amcharts.com/demos/line-graph/?theme=dataviz#code

type props = {
  theme: any
  setTheme: (arg0: any) => void
}

class App extends React.Component<props> {
  static theme: string;
    static setTheme: (arg0: string) => void;

  render() {
    return (
      <div className="App">
        <div className="wrapperContainer">
          <Header theme={this.props.theme} setTheme={this.props.setTheme}/>
          <Content/>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
