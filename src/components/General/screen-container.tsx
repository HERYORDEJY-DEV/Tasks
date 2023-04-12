import { Box, IBoxProps } from 'native-base';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';

interface Props extends IBoxProps {
  children: JSX.Element;
}

export default function ScreenContainer(props: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Box
      safeAreaX
      safeAreaBottom
      width={'full'}
      height={'full'}
      bgColor={'screenBg'}
      {...props}
    >
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      {props.children}
    </Box>
  );
}
