import { render } from '@testing-library/react-native';
import { Button } from '..';

describe('Button Component', () => {
  it('should match snapshot', () => {
    const button = render(<Button></Button>).toJSON();
    expect(button).toMatchSnapshot();
  });
});
