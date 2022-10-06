import React from 'react';
import { useRef } from 'react';
import './App.css';
import useSlideScroll from './useSlideScroll';
import slideData from './data';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelCount = useSlideScroll(containerRef);
  return (
    <div className="App" >
      <h1>Gamma Presentation Mode DEMO</h1>
      <div className="container" ref={containerRef}>
        {slideData.map((data, i) => (
          <div data-slide-index={i.toString()} key={data.backgroundColor} className='slide hidden-slide' style={data}>{i}</div>
        ))}
      </div>
      {wheelCount}
    </div>
  );
}

export default App;
