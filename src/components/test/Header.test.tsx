import Header from '../Header';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

let props = {
  theme: "light",
  setTheme: (arg0: string) => {
      props.theme = arg0
  }
}

//Snapshot test
describe("Header", () => {
  it("renders correctly", () => {
      const tree = renderer.create(
          <Header theme={props.theme} setTheme={props.setTheme}/>
          ).toJSON();
          expect(tree).toMatchSnapshot();
  });
});

/* Declared because it is being used as a props in Header*/
function dummyFunction(arg0: any) {
    console.log(`${arg0}`);
}

test('test that the Header-component renders successfully', () => {
    render(<Header theme = "" setTheme = {dummyFunction}/>);
  });

  test('test if <h1> (TEAM43) is contained when being rendered', () => {
    const { getByText } = render(<Header theme = "" setTheme = {dummyFunction}/>);
    const linkElement = getByText(/The Commit Grabber/i);
    expect(linkElement).toBeInTheDocument();
  });

  

