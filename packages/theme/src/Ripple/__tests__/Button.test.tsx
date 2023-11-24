import { render } from '@testing-library/react-native';
import { Ripple } from '../index';
import { Text, View } from 'react-native';

describe('Ripple Component With Theme', () => {
  it('should match snapshot', () => {
    const ripple = render(
      <Ripple>
        <Text>ripple</Text>
      </Ripple>,
    ).toJSON();
    expect(ripple).toMatchSnapshot();
  });
});
