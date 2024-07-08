import { FC, ReactNode } from 'react';
import { Animated, StyleSheet } from 'react-native';

type ElevationLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface ElevationProps {
  children: ReactNode;
  level?: ElevationLevel;
}

const Elevation: FC<ElevationProps> = ({ children, level = 0 }) => {
  const styles = StyleSheet.create({});

  return <Animated.View>{children}</Animated.View>;
};

export default Elevation;
