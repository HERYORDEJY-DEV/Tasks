import { Circle, HStack, Pressable, View, useDisclose } from 'native-base';
import * as React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Path, SvgXml } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NewTask from './new-task';

const tabBarHeight = 60;
const middleIconSize = 50;
const midRadius = 25;
const midBoundary = 60;

interface Props {
  list: string;
}

export default function MyTabBar(props: Props) {
  const { width } = useWindowDimensions();
  const newTaskDisclose = useDisclose();

  const path = [
    'M0 0',
    `H${width / 2 - midBoundary / 2}`,
    `A 10 10 0 0 0 ${width / 2 + midBoundary / 2} 0`,
    `H${width}`,
    `V${tabBarHeight}`,
    'H0',
    `z`,
  ].join(',');

  const linePath = [
    'M0 0',
    `H${width / 2 - midBoundary / 2}`,
    `A 10 10 0 0 0 ${width / 2 + midBoundary / 2} 0`,
    `H${width}`,
  ].join(',');
  return (
    <View
      style={{ alignSelf: 'stretch', height: tabBarHeight, paddingBottom: 20 }}
    >
      <Svg
        viewBox={`0 0 ${width} ${tabBarHeight}`}
        height={tabBarHeight}
        width={width}
      >
        <Path d={path} fill="white" />
        <Path d={linePath} fill="transparent" strokeWidth={1} stroke="#ccc" />
      </Svg>

      <Pressable onPress={newTaskDisclose.onOpen}>
        <Circle
          size={middleIconSize}
          borderRadius={middleIconSize}
          bg="#FFF"
          style={{
            position: 'absolute',

            left: width / 2 - midRadius,
            bottom: tabBarHeight - midRadius,

            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}
        >
          <SvgXml xml={xml} width="250%" height="250%" />
        </Circle>
      </Pressable>
      <View
        pointerEvents="none"
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
      >
        <HStack justifyContent={'space-between'} height={'full'}>
          <Pressable
            height={'80%'}
            width={'50px'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Ionicons name="md-menu-outline" size={25} color={'#111'} />
          </Pressable>
          <Pressable
            height={'80%'}
            width={'50px'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Ionicons name="md-ellipsis-horizontal" size={25} color={'#111'} />
          </Pressable>
        </HStack>
      </View>
      {newTaskDisclose.isOpen && (
        <NewTask {...newTaskDisclose} list={props.list} />
      )}
    </View>
  );
}

//
const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="260" height="260" xml:space="preserve" version="1.1" viewBox="0 0 260 260">
    <image width="260" height="260" xlink:href="data:image/png;base64,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IIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACbwuB/wFoY0ikyFP/8QAAAABJRU5ErkJggg=="/>
  </svg>
`;
