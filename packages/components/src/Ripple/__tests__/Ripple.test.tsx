import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import Ripple from '../Ripple';
import RippleWeb from '../Ripple.web';
import { Platform, Text } from 'react-native';
import { RippleElementTestId } from '../utils';

const EventData = {
  nativeEvent: {
    locationX: 0,
    locationY: 0,
    timestamp: 1,
    layout: {},
  },
};

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('Export ripple base on Platform', () => {
  Platform.OS = 'web';
  const comp = jest.mock('../index.tsx');
  expect(comp).toEqual(Ripple);
});

describe('Ripple Component', () => {
  it('should render children correctly', () => {
    const ripple = render(
      <Ripple>
        <Text>Button</Text>
      </Ripple>,
    ).toJSON();

    expect(ripple).toMatchSnapshot();
  });

  describe('ripple effect', () => {
    afterEach(cleanup);
    it('ripple effect props match snapshot', async () => {
      const { toJSON } = render(
        <Ripple centered foreground rippleColor="red" rippleOpcity={1}>
          <Text>Button</Text>
        </Ripple>,
      );
      const comp = await screen.getByText('Button');
      fireEvent(comp, 'press', EventData);
      expect(toJSON()).toMatchSnapshot();
    });

    it('onPress render ripple effect', async () => {
      render(
        <Ripple>
          <Text>Button</Text>
        </Ripple>,
      );
      const comp = await screen.getByText('Button');
      fireEvent(comp, 'press', EventData);
      await waitForElementToBeRemoved(
        () => screen.getByTestId(RippleElementTestId),
        { timeout: 500 },
      );
    });

    it('onLongPress render ripple effect', async () => {
      render(
        <Ripple>
          <Text>Button</Text>
        </Ripple>,
      );
      const comp = await screen.getByText('Button');
      fireEvent(comp, 'longPress', EventData);
      await waitForElementToBeRemoved(
        () => {
          fireEvent(comp, 'pressOut', EventData);
          return screen.getByTestId(RippleElementTestId);
        },
        { timeout: 500 },
      );
    });

    it('rippleDuration prop', async () => {
      render(
        <Ripple rippleDuration={800}>
          <Text>Button</Text>
        </Ripple>,
      );
      const comp = await screen.getByText('Button');
      fireEvent(comp, 'press', EventData);
      await waitFor(
        () => expect(screen.getByTestId(RippleElementTestId)).toBeDefined,
        { timeout: 400 },
      );
      await waitForElementToBeRemoved(
        () => screen.getByTestId(RippleElementTestId),
        { timeout: 800, interval: 400 },
      );
    });
  });

  describe('fire event', () => {
    afterEach(cleanup);
    it('check PressableState', async () => {
      const mockedChildren = jest.fn();
      render(
        <Ripple testID="pressable" testOnly_pressed>
          {mockedChildren}
        </Ripple>,
      );
      const comp = await screen.getByTestId('pressable');
      fireEvent(comp, 'press', EventData);
      expect(mockedChildren).toHaveBeenCalledWith({ pressed: true });
    });

    it.each`
      type
      ${'onLayout'}
      ${'onPress'}
      ${'onLongPress'}
      ${'onPressOut'}
    `('call $type when event fired', async ({ type }) => {
      const mockFn = jest.fn();
      const props = {
        children: <Text>{type}</Text>,
        [type]: mockFn,
      };
      render(<Ripple {...props} />);
      const comp = await screen.getByText(type);
      const event = type
        .substr(2)
        .replace(/^[A-Z]/, (f: string) => f.toLowerCase());
      fireEvent(comp, event, EventData);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it.each`
      type
      ${'onPressIn'}
      ${'onPressOut'}
      ${'onPress'}
      ${'onLongPress'}
    `('not call $type when event fired', async ({ type }) => {
      const mockFn = jest.fn();
      const props = {
        children: <Text>{type}</Text>,
        disabled: true,
        [type]: mockFn,
      };
      render(<Ripple {...props} />);
      const comp = await screen.getByText(type);
      const event = type
        .substr(2)
        .replace(/^[A-Z]/, (f: string) => f.toLowerCase());
      fireEvent(comp, event, EventData);
      expect(mockFn).not.toHaveBeenCalled();
    });
  });
});

describe('RippleWeb Component', () => {
  const Ripple = RippleWeb;
  it('should render children correctly', () => {
    const { getByText } = render(
      <Ripple>
        <Text>Button</Text>
      </Ripple>,
    );

    expect(getByText('Button')).toBeTruthy();
  });

  describe('ripple effect', () => {
    afterEach(cleanup);
    it('ripple effect props match snapshot', async () => {
      const { toJSON } = render(
        <Ripple centered foreground rippleColor="red" rippleOpcity={1}>
          <Text>Button</Text>
        </Ripple>,
      );
      const comp = await screen.getByText('Button');
      fireEvent(comp, 'pressIn', EventData);
      expect(toJSON()).toMatchSnapshot();
    });

    it('onPressIn render ripple effect', async () => {
      render(
        <Ripple>
          <Text>Button</Text>
        </Ripple>,
      );
      const comp = await screen.getByText('Button');
      fireEvent(comp, 'pressIn', EventData);
      expect(screen.getByTestId(RippleElementTestId)).toBeDefined();
      fireEvent(comp, 'pressOut', EventData);
      await waitForElementToBeRemoved(() =>
        screen.getByTestId(RippleElementTestId),
      );
    });
  });

  describe('fire event', () => {
    afterEach(cleanup);
    it('check PressableState', async () => {
      const mockedChildren = jest.fn();
      render(
        <Ripple testID="pressable" testOnly_pressed>
          {mockedChildren}
        </Ripple>,
      );
      const comp = await screen.getByTestId('pressable');
      fireEvent(comp, 'pressIn', EventData);
      expect(mockedChildren).toHaveBeenCalledWith({ pressed: true });
    });

    it.each`
      type
      ${'onLayout'}
      ${'onPressIn'}
      ${'onPressOut'}
    `('call $type when event fired', async ({ type }) => {
      const mockFn = jest.fn();
      const props = {
        children: <Text>{type}</Text>,
        [type]: mockFn,
      };
      render(<Ripple {...props} />);
      const comp = await screen.getByText(type);
      const event = type
        .substr(2)
        .replace(/^[A-Z]/, (f: string) => f.toLowerCase());
      fireEvent(comp, event, EventData);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it.each`
      type
      ${'onPressIn'}
      ${'onPressOut'}
    `('not call $type when event fired', async ({ type }) => {
      const mockFn = jest.fn();
      const props = {
        children: <Text>{type}</Text>,
        disabled: true,
        [type]: mockFn,
      };
      render(<Ripple {...props} />);
      const comp = await screen.getByText(type);
      const event = type
        .substr(2)
        .replace(/^[A-Z]/, (f: string) => f.toLowerCase());
      fireEvent(comp, event, EventData);
      expect(mockFn).not.toHaveBeenCalled();
    });
  });
});
