import { emptyListXml } from 'assets/svgs/empty-note';
import { useAppDispatch, useAppSelector } from 'hooks/useStore';
import moment from 'moment';
import {
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  Text,
  View,
  useDisclose,
  useTheme,
} from 'native-base';
import React, { PropsWithChildren } from 'react';
import { FlatList } from 'react-native';
import { SvgXml } from 'react-native-svg';
import MIc from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { updateTask } from 'store/Slice/tasks';
import { TaskType } from 'store/Types/tasks';

type Props = PropsWithChildren<{
  tabLabel: string;
}>;

export default function TaskList(props: Props): JSX.Element {
  const tasksState = useAppSelector(state => state.tasks.tasks);
  const { colors } = useTheme();
  const allCompletedDisclose = useDisclose();
  const dispatch = useAppDispatch();
  const isStarredTasks = tasksState
    ?.map(task => task.isStarred && `${task.id}`)
    ?.filter(id => Boolean(id));

  const onCompleteTask = (task: TaskType) => {
    dispatch(
      updateTask({
        id: task.id,
        data: { ...task, isCompleted: !task.isCompleted },
      }),
    );
  };

  const onStarTask = (task: TaskType) => {
    dispatch(
      updateTask({
        id: task.id,
        data: { ...task, isStarred: !task.isStarred },
      }),
    );
  };

  const renderItem = ({ item, index }: { item: TaskType; index: number }) => {
    return (
      <HStack
        px={4}
        py={2}
        mb={2}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Pressable
          onPress={() => onCompleteTask(item)}
          height={'30px'}
          width={'30px'}
          justifyContent={'center'}
        >
          <Octicons name="circle" size={16} color={'#999'} />
        </Pressable>
        <Pressable flex={1} mx={3}>
          <Text fontSize={'md'}>{item?.title}</Text>
          {Boolean(item.details?.trim()) && (
            <Text fontSize={'xs'}>{item.details}</Text>
          )}
          {Boolean(item.date) && renderDatePill(item.date)}
        </Pressable>
        <Pressable
          height={'30px'}
          width={'30px'}
          justifyContent={'center'}
          alignItems={'flex-end'}
          onPress={() => onStarTask(item)}
        >
          <MIc
            name={
              isStarredTasks.includes(item.id) ? 'star-rate' : 'star-outline'
            }
            color={isStarredTasks.includes(item.id) ? colors.blue : '#999'}
            size={20}
          />
        </Pressable>
      </HStack>
    );
  };

  const renderCompletedItem = ({
    item,
    index,
  }: {
    item: TaskType;
    index: number;
  }) => {
    return (
      <HStack
        px={4}
        py={1}
        mb={1}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Pressable onPress={() => onCompleteTask(item)}>
          <Octicons name="check" size={16} color={colors.blue} />
        </Pressable>
        <Pressable flex={1} mx={5}>
          <Text textDecorationLine={'line-through'} fontSize={'md'}>
            {item.title}
          </Text>
        </Pressable>
      </HStack>
    );
  };

  const getUncompletedTasks = () => {
    if (isStarredList) {
      return [
        ...tasksState.filter(
          (task, index) => task.isStarred && !task.isCompleted,
        ),
      ];
    }

    return [
      ...tasksState.filter(
        (task, index) => task.list === props.tabLabel && !task.isCompleted,
      ),
    ];
  };

  const getCompletedTasks = () => [
    ...tasksState.filter(
      (task, index) => task.list === props.tabLabel && task.isCompleted,
    ),
  ];

  const renderDatePill = (date?: Date) => {
    const isOutOfRange = moment().isAfter(moment(date));
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
        <Pressable mr={2}>
          <Text color={isOutOfRange ? colors.red : '#5A5A5A'} fontSize={'xs'}>
            {moment(date).format('ddd, DD MMM')}
          </Text>
        </Pressable>
        <Pressable>
          <MIc name="close" color={'#5A5A5A'} size={13} />
        </Pressable>
      </HStack>
    );
  };

  const renderEmpty = (
    <View
      flex={1}
      height={'full'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <SvgXml xml={emptyListXml} width={300} height={300} />
      <Center>
        <Text fontWeight={'bold'} fontSize={18}>
          No task yet
        </Text>
        <Text color={'#777'}>Add your to-dos and keep track of them.</Text>
      </Center>
    </View>
  );

  const renderCompletedTaskList = (
    <FlatList
      data={[...getCompletedTasks()]}
      renderItem={renderCompletedItem}
      ListEmptyComponent={renderEmpty}
      keyExtractor={(item, index) => `${item.id}`}
    />
  );

  const renderAllTasksCompleted = (
    <Box safeAreaBottom>
      <Center height={'full'} width={'full'}>
        <Image
          source={require('../../assets/images/task_completed.png')}
          alt="all completed"
          height={'50%'}
          width={'50%'}
        />
        <Center>
          <Text fontWeight={'bold'} fontSize={18}>
            All tasks completed
          </Text>
          <Text color={'#777'}>Nice work!</Text>
        </Center>
      </Center>
    </Box>
  );

  const isStarredList = props.tabLabel === 'Star';
  const isNewList = props.tabLabel === 'New';
  const thereIsUncompletedTasks = Boolean(getUncompletedTasks().length);
  const thereIsCompletedTasks = Boolean(getCompletedTasks().length);

  return (
    <View flex={1}>
      <Box flex={1}>
        <Box>
          {!thereIsUncompletedTasks && thereIsCompletedTasks ? null : (
            <>
              <FlatList
                data={[...getUncompletedTasks()]}
                renderItem={renderItem}
                ListEmptyComponent={renderEmpty}
                keyExtractor={(item, index) => `${item.id}`}
              />
            </>
          )}
        </Box>
        {thereIsCompletedTasks && (
          <Box flex={1}>
            {
              <HStack
                p={4}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Text fontWeight={'bold'}>
                  Completed ( {getCompletedTasks().length} )
                </Text>
                {thereIsCompletedTasks && !thereIsUncompletedTasks && (
                  <Pressable onPress={allCompletedDisclose.onToggle}>
                    <Octicons
                      name={
                        allCompletedDisclose.isOpen
                          ? 'chevron-up'
                          : 'chevron-down'
                      }
                      size={20}
                    />
                  </Pressable>
                )}
              </HStack>
            }
            {!isNewList &&
              !isStarredList &&
              thereIsCompletedTasks &&
              (thereIsCompletedTasks && thereIsUncompletedTasks
                ? renderCompletedTaskList
                : allCompletedDisclose.isOpen
                ? renderCompletedTaskList
                : renderAllTasksCompleted)}
          </Box>
        )}
      </Box>
    </View>
  );
}
