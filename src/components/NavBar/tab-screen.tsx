import {imageAssets} from 'assets';
import {Box, Center, Circle, HStack, Pressable, Text, View} from 'native-base';
import React from 'react';
import {Image, ViewStyle, useColorScheme} from 'react-native';

interface Props {
  title?: string;
  onGoBack?: () => void;
  renderLeft?: JSX.Element;
  renderCenter?: JSX.Element;
  renderRight?: JSX.Element;
  containerStyles?: ViewStyle;

  showSearch?: boolean;
  onSearch?: () => void;
}

const {userAvatar} = imageAssets;

export default function TabScreenNavBar({showSearch = true, ...props}: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  const renderRight = (
    <Pressable>
      <Circle height={'30px'} width={'30px'} overflow={'hidden'}>
        <Image source={userAvatar} alt="user" style={{height: 30, width: 30}} />
      </Circle>
    </Pressable>
  );

  return (
    <Box
      backgroundColor={'tabNavbarBg'}
      safeAreaTop
      style={props.containerStyles}>
      <HStack
        justifyContent={'space-between'}
        alignItems={'center'}
        height={'64px'}
        px={4}>
        <View flex={0.1}>{props.renderLeft}</View>
        <Center flex={0.8}>
          <Text fontSize={22} lineHeight={28}>
            {props.title}
          </Text>
        </Center>
        <View flex={0.1}>{renderRight}</View>
      </HStack>
    </Box>
  );
}
