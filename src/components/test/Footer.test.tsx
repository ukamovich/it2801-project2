import Footer from '../Footer';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

//Snapshot test
describe("Header", () => {
  it("renders correctly", () => {
      const tree = renderer.create(
          <Footer/>
          ).toJSON();
          expect(tree).toMatchSnapshot();
  });
});

test('test that it renders with success', () => {
    render(<Footer/>);
  });

  test('test if the name of the footer is in app', () => {
    const { getByText } = render(<Footer />);
    const linkElement = getByText(/By Team43/i); // Must fix this in the end.
    expect(linkElement).toBeInTheDocument();
  });