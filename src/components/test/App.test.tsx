import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// SNAPSHOT TEST HERE 

/* Declared because it is being used as a props in Header*/
function dummyFunction(arg0: any) {
  console.log(`${arg0}`);
}

test('test if the app renders properly', () => {
  //render(<App theme = "as" setTheme = {dummyFunction}/>);

});



