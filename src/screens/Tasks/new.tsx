import { useNavigation } from '@react-navigation/native';
import ScreenContainer from 'components/General/screen-container';
import { useAppDispatch } from 'hooks/useStore';
import {
  Box,
  HStack,
  Input,
  Pressable,
  Text,
  View,
  useTheme,
} from 'native-base';
import { NewListNavigationProp } from 'navigation/types';
import { useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { addNewList } from 'store/Slice/tasks';
import { getUuid } from 'utils/get-uuid';

type Props = {};

export default function NewList(props: Props) {
  const [listName, setListName] = useState('');
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NewListNavigationProp>();

  const onDone = () => {
    //
    dispatch(addNewList({ id: getUuid(), title: listName }));
    navigation.goBack();
  };

  const onBack = () => {
    //
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <Box safeArea>
        <HStack justifyContent={'space-between'} px={4} py="5">
          <Pressable onPress={onBack}>
            <HStack alignItems={'center'} justifyContent={'flex-start'}>
              <FontAwesome5 name="chevron-left" color={colors.blue} size={18} />
              <Text
                fontSize={'md'}
                ml={2}
                textDecorationColor={'blue'}
                textDecorationLine={'underline'}
                color={'blue'}
              >
                Back
              </Text>
            </HStack>
          </Pressable>
          <Text
            disabled={!Boolean(listName)}
            fontSize={'md'}
            color={Boolean(listName) ? 'blue' : 'tabBarInactive'}
            textDecorationColor={Boolean(listName) ? 'blue' : 'tabBarInactive'}
            textDecorationLine={'underline'}
            onPress={onDone}
          >
            Done
          </Text>
        </HStack>
        <View my={5} bg={'#CCC'} height={'100%'}>
          <Input
            onChangeText={setListName}
            placeholder="Enter list title"
            fontFamily={'product'}
            variant="unstyled"
            size={'lg'}
            autoFocus
            backgroundColor={'#FFF'}
            borderRadius={0}
            height={50}
          />
        </View>
      </Box>
    </ScreenContainer>
  );
}
