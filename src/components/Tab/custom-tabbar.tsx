import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Box, HStack, Pressable, Text, View, useTheme } from 'native-base';
import { TasksNavigationProp } from 'navigation/types';
import React, { useCallback, useRef } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface TabBarProps {
  tabs: string[];
  activeTab: number;
  scrollValue: number;
  containerWidth: number;
  goToPage?: (i: number) => void;
}

export default function CustomTabBar(props: TabBarProps) {
  const { colors } = useTheme();
  const navigation = useNavigation<TasksNavigationProp>();

  const scrollRef = useRef<ScrollView>(null);

  const onLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) =>
    console.log('\n\nlayout', layout.width, windowWidth);

  const { width: windowWidth } = useWindowDimensions();
  const _tabs = [...props.tabs, 'New'];

  const getTabIcon = (tab: string, index: number, isActive: Boolean) => {
    switch (tab) {
      case 'Star':
        return (
          <Pressable
            paddingX={3}
            justifyContent={'space-between'}
            height={'30px'}
            onPress={() => props?.goToPage?.(0)}
          >
            <Ionicons
              name="md-star"
              color={isActive ? colors.tabBarActive : colors.tabBarInactive}
              size={16}
            />
            {isActive && (
              <View
                height={'1px'}
                minWidth={'1px'}
                borderWidth={1}
                borderTopLeftRadius={100}
                borderTopRightRadius={100}
                borderColor={'tabBarActive'}
              />
            )}
          </Pressable>
        );

      case 'My':
        return (
          <Pressable
            paddingX={3}
            justifyContent={'space-between'}
            height={'30px'}
            onPress={() => props?.goToPage?.(1)}
          >
            <Text
              color={isActive ? 'tabBarActive' : 'tabBarInactive'}
              fontSize={'xs'}
            >
              My Tasks
            </Text>
            {isActive && (
              <View
                height={'1px'}
                minWidth={'1px'}
                borderWidth={1}
                borderTopLeftRadius={100}
                borderTopRightRadius={100}
                borderColor={'tabBarActive'}
                mx={1}
              />
            )}
          </Pressable>
        );

      case 'New':
        return (
          <Pressable
            paddingX={3}
            justifyContent={'space-between'}
            height={'30px'}
            onPress={() => navigation.navigate('NewList')}
          >
            <HStack alignItems={'center'} justifyContent={'center'}>
              <Ionicons name="md-add" color={colors.tabBarInactive} size={12} />
              <Text color={colors.tabBarInactive} fontSize={'xs'}>
                New List
              </Text>
            </HStack>
            {isActive && (
              <View
                height={'1px'}
                minWidth={'1px'}
                borderWidth={1}
                borderTopLeftRadius={100}
                borderTopRightRadius={100}
                borderColor={'transparent'}
              />
            )}
          </Pressable>
        );

      default:
        return (
          <Pressable
            paddingX={3}
            justifyContent={'space-between'}
            height={'30px'}
            onPress={() => props?.goToPage?.(index)}
          >
            <Text
              color={isActive ? 'tabBarActive' : 'tabBarInactive'}
              fontSize={'xs'}
            >
              {tab}
            </Text>
            {isActive && (
              <View
                height={'1px'}
                minWidth={'1px'}
                borderWidth={1}
                borderTopLeftRadius={100}
                borderTopRightRadius={100}
                borderColor={'tabBarActive'}
                mx={1}
              />
            )}
          </Pressable>
        );
    }
  };

  const onSelectPaginator = (index: number) => {
    scrollRef.current?.scrollTo({
      x: 0,
      animated: true,
    });
  };

  useFocusEffect(
    useCallback(() => {
      scrollRef.current?.scrollTo({
        x: 0,
        animated: true,
      });
    }, [props.tabs]),
  );

  return (
    <Box
      width={'full'}
      borderBottomWidth={1}
      borderColor={'#DDDDDD'}
      //onLayout={onLayout}
    >
      <Animated.ScrollView
        horizontal
        ref={scrollRef}
        style={{ width: windowWidth }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        directionalLockEnabled={true}
        bounces={false}
        // scrollsToTop={true}
        // onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <HStack
          // onLayout={onLayout}
          width={'full'}
          // justifyContent={'center'}
          alignItems={'center'}
        >
          {_tabs.map((tab, index) => (
            <View
              key={`${tab}-${index}`}
              // flex={_tabs.length < 5 ? 0.25 : 1}
              justifyContent={'center'}
              alignItems={'center'}
            >
              {getTabIcon(tab, index, props.activeTab === index)}
            </View>
          ))}
        </HStack>
      </Animated.ScrollView>
    </Box>
  );
}
