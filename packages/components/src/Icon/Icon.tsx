import { FC } from 'react';
import { Image, View } from 'react-native';
// import IconComponent from 'react-native-vector-icons/MaterialCommunityIcons';

// Icons are visual indicators usually used to describe action or intent.
// They are also used for displaying information.

// support images、animation、customize
export interface IconProps {
  source: string;
}

// @typescript-eslint/no-explicit-any
function isImageSource(data: number | string) {
  return (
    typeof data === 'number' ||
    (typeof data === 'string' &&
      (/\.(bmp|jpg|jpeg|png|gif|svg)$/.test(data) ||
        data.startsWith('data:image')))
  );
}

export const Icon: FC<IconProps> = props => {
  const { source } = props;

  if (isImageSource(source)) {
    return <Image style={{ width: 18, height: 18 }} source={{ uri: source }} />;
  }

  return <View></View>;
};
