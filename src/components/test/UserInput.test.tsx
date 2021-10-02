import UserInput from '../UserInput';
import { render } from '@testing-library/react';


/* Declared because it is being used as a props in UserInput*/
function dummyFunction(arg0: any, arg1: any) {
    console.log(`${arg0} ---- ${arg1}`)
}

test('test that it renders with success', () => {
  render(<UserInput defaultValue="" label ="Test" type ="text" callBack = {dummyFunction} keyName = "ads"  />);
});

test('test that label is Project ID', () => {
    const { getByText } = render(<UserInput defaultValue="" label ="Project ID" type ="text" callBack = {dummyFunction} keyName = "ads"  />);
    const linkElement = getByText(/Project ID/i);
    expect(linkElement).toBeInTheDocument();
  });


  test('test that label is Project access token', () => {
    const { getByText } = render(<UserInput defaultValue="" label ="Project access token" type ="text" callBack = {dummyFunction} keyName = "ads"  />);
    const linkElement = getByText(/Project access token/i);
    expect(linkElement).toBeInTheDocument();
  });

  

  



