import { useKeyboardBottomInset } from 'hooks/useKeyboardOffset';
import { useAppDispatch, useAppSelector } from 'hooks/useStore';
import moment from 'moment';
import {
  Actionsheet,
  Box,
  HStack,
  IActionsheetProps,
  Input,
  Modal,
  Pressable,
  Text,
  View,
  useDisclose,
  useTheme,
} from 'native-base';
import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MIc from 'react-native-vector-icons/MaterialIcons';
import { addNewTask } from 'store/Slice/tasks';
import { ListType, TaskType } from 'store/Types/tasks';
import { getUuid } from 'utils/get-uuid';
import CalendarPicker from './calendar-picker';

interface Props extends IActionsheetProps {
  list: string;
}

export default function NewTask(props: Props) {
  const dispatch = useAppDispatch();
  const listsState = useAppSelector(state => state.tasks.lists);
  const listsStateSelect: Array<ListType> = useAppSelector(
    state => state.tasks.lists,
  ).slice(1);
  const datePickerDisclose = useDisclose();
  const confirmDiscardDisclose = useDisclose();
  const allListsDisclose = useDisclose();
  const isStarList = props.list === 'Star';

  const [task, setTask] = useState<TaskType>({
    title: '',
    details: '',
    isStarred: isStarList ? true : false,
    list: isStarList ? listsStateSelect[0].title : props.list,
    id: '',
    isCompleted: false,
    date: undefined,
  });

  const [detailsInput, setDetailsInput] = useState({ isVisible: false });

  const onSetTask = (key: keyof typeof task, value: any) =>
    setTask(prev => ({ ...prev, [key]: value }));

  const onToggleStarred = () =>
    setTask(prev => ({ ...prev, isStarred: !prev.isStarred }));

  const onToggleInputVisibility = () =>
    setDetailsInput(prev => ({ ...prev, isVisible: !prev.isVisible }));

  const { colors } = useTheme();
  const bottomInset = useKeyboardBottomInset();

  const onSave = () => {
    dispatch(addNewTask({ ...task, id: getUuid() }));
    props.onClose?.();
  };

  const onSelectList = (title: string) => {
    onSetTask('list', title);
    allListsDisclose.onClose?.();
  };

  const renderDatePill = () => {
    const isOutOfRange = moment().isAfter(moment(task.date));
    return (
      <HStack
        my={1}
        alignItems={'center'}
        borderWidth={1}
        borderColor={'#CCC'}
        borderRadius={20}
        px={2.5}
        py={0.5}
        alignSelf={'flex-start'}
        justifyContent={'space-between'}
      >
        <Pressable mr={2} onPress={datePickerDisclose.onOpen}>
          <Text color={isOutOfRange ? colors.red : '#5A5A5A'} fontSize={'xs'}>
            {moment(task.date).format('ddd, DD MMM')}
          </Text>
        </Pressable>
        <Pressable onPress={() => onSetTask('date', null)}>
          <MIc name="close" color={'#5A5A5A'} size={13} />
        </Pressable>
      </HStack>
    );
  };

  const renderConfirmDiscard = (
    <Modal {...confirmDiscardDisclose}>
      <Box backgroundColor={'white'} width={'80%'} borderRadius={4} p={3}>
        <Text fontWeight={'bold'}>Discard Current task?</Text>
        <Text color={'#555'} fontSize={'xs'} my={2}>
          Are you sure you want to discard the current draft?
        </Text>
        <HStack justifyContent={'flex-end'} mt={5}>
          <Text
            pr={1.5}
            color={'blue'}
            textDecorationColor={'blue'}
            textDecorationLine={'underline'}
            onPress={confirmDiscardDisclose.onClose}
          >
            Cancel
          </Text>
          <View mx={2} />
          <Text
            pl={1.5}
            color={'blue'}
            textDecorationColor={'blue'}
            textDecorationLine={'underline'}
            onPress={() => {
              confirmDiscardDisclose.onClose();
              props.onClose?.();
            }}
          >
            Discard
          </Text>
        </HStack>
      </Box>
    </Modal>
  );

  const renderAllLists = (
    <Actionsheet {...allListsDisclose} hideDragIndicator>
      <Actionsheet.Content borderTopRadius="10px">
        <Box w="100%" px={4} justifyContent="center" mb={2}>
          <Text color="gray.500">Add to list</Text>
        </Box>
        {listsStateSelect?.map?.(({ id, title }, index) => (
          <Actionsheet.Item
            _text={{ fontSize: '14' }}
            height={'30px'}
            pt={0}
            pb={0}
            justifyContent={'center'}
            mb={1}
            onPress={() => onSelectList(title)}
            key={id}
            _pressed={{ backgroundColor: 'transparent' }}
          >
            {title}
          </Actionsheet.Item>
        ))}
      </Actionsheet.Content>
    </Actionsheet>
  );

  const onCloseEditor = () => {
    if (Boolean(task.title)) {
      confirmDiscardDisclose.onOpen();
      return true;
    }
    props.onClose?.();
  };

  return (
    <View>
      <Actionsheet
        {...props}
        hideDragIndicator
        pb={0}
        mb={0}
        onClose={onCloseEditor}
      >
        <Actionsheet.Content
          borderTopRadius="10"
          pb={0}
          mb={0}
          bottom={bottomInset}
        >
          <Box width={'full'} px={4} pt={2} pb={0} variant={'filled'}>
            {props.list === 'Star' && (
              <Pressable
                onPress={allListsDisclose.onOpen}
                flexDir={'row'}
                alignItems={'center'}
                py={1}
                mb={2}
              >
                <Text
                  color={'blue'}
                  textDecorationColor={'blue'}
                  textDecorationLine={'underline'}
                  mr={1}
                >
                  {task.list}
                </Text>
                <Ionicons name={'md-caret-down-sharp'} color={colors.blue} />
              </Pressable>
            )}
            <View mb={3}>
              <Input
                autoFocus={true}
                borderWidth={0}
                placeholder="New task"
                fontSize={'sm'}
                style={{ paddingLeft: 0 }}
                backgroundColor={'transparent'}
                onChangeText={text => onSetTask('title', text)}
              />
              {detailsInput.isVisible && (
                <Input
                  borderWidth={0}
                  placeholder="Add details"
                  style={{ paddingLeft: 0 }}
                  backgroundColor={'transparent'}
                  onChangeText={text => onSetTask('details', text)}
                />
              )}
              {Boolean(task.date) && renderDatePill()}
            </View>
            <HStack justifyContent={'space-between'}>
              <HStack>
                <Pressable onPress={onToggleInputVisibility}>
                  <MIc name="notes" color={colors.blue} size={20} />
                </Pressable>
                <Pressable
                  onPress={() => {
                    Keyboard.dismiss();
                    datePickerDisclose.onOpen();
                  }}
                  mx={5}
                >
                  <MIc name="event-available" color={colors.blue} size={20} />
                </Pressable>
                <Pressable onPress={onToggleStarred}>
                  <MIc
                    name={task.isStarred ? 'star' : 'star-outline'}
                    color={colors.blue}
                    size={20}
                  />
                </Pressable>
              </HStack>
              <Text
                disabled={!Boolean(task.title)}
                fontSize={'md'}
                color={Boolean(task.title) ? 'blue' : 'tabBarInactive'}
                textDecorationColor={
                  Boolean(task.title) ? 'blue' : 'tabBarInactive'
                }
                textDecorationLine={'underline'}
                onPress={onSave}
              >
                Save
              </Text>
            </HStack>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
      <CalendarPicker
        {...datePickerDisclose}
        onConfirm={date => onSetTask('date', date)}
      />
      {renderConfirmDiscard}
      {allListsDisclose.isOpen && renderAllLists}
    </View>
  );
}
