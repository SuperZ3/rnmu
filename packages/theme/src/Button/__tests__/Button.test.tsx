import { render } from '@testing-library/react-native';
import { Button } from '../index';

describe('Button Component With Theme', () => {
  it('should match snapshot', () => {
    const button = render(<Button></Button>).toJSON();
    expect(button).toMatchSnapshot();
  });
});
