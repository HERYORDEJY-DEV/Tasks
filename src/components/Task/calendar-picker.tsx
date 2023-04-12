import _ from 'lodash';
import moment, { Moment } from 'moment';
import {
  Actionsheet,
  Box,
  Circle,
  HStack,
  IModalProps,
  Pressable,
  Text,
  useDisclose,
  useTheme,
  View,
} from 'native-base';
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { fontFamily } from 'theme/font';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const years = _.range(
  new Date().getUTCFullYear() - 200,
  new Date().getUTCFullYear() + 1,
);

interface Props extends IModalProps {
  onConfirm?: (value: Date) => void;
  onCancel?: () => void;
  multipleSelect?: boolean;
  maxDate?: Date | Moment;
  minDate?: Date | Moment;
}

export default function CalendarPicker(props: Props) {
  const isDarkMode = useColorScheme() === 'dark';
  const toggleYearPicker = useDisclose();
  const toggleDateInput = useDisclose();

  const { height: windowHeight } = useWindowDimensions();

  const { colors } = useTheme();

  const [selectedDate, setSelectedDate] = useState({
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    yearIndex: years.length - 1,
    day: new Date(),
    selected: new Date(),
  });

  const [dateInput, setDateInput] = useState({ error: '' });

  const onSetDateInput = (key: keyof typeof dateInput, value: any) =>
    setDateInput(prevState => ({ ...prevState, [key]: value }));

  const onSetSelectedDate = (key: keyof typeof selectedDate, value: any) =>
    setSelectedDate(prevState => ({ ...prevState, [key]: value }));

  const onSetSelectedDateSelected = (
    key: keyof typeof selectedDate,
    value: any,
  ) =>
    setSelectedDate(prevState => ({
      ...prevState,
      [key]: value,
      selected: new Date(prevState.year, prevState.month, value),
    }));

  const onSetSelectedDateYear = (
    key: keyof typeof selectedDate,
    value: number,
    yearIndex: number,
  ) =>
    setSelectedDate(prevState => ({
      ...prevState,
      [key]: value,
      yearIndex,
      selected: new Date(value, prevState.month, prevState.date),
    }));

  const onSetSelectedDateInput = (year: number, month: number, date: number) =>
    setSelectedDate(prevState => ({
      ...prevState,
      year,
      month,
      date,
      yearIndex: years.indexOf(year),
      selected: new Date(year, month, date),
    }));

  const generateMatrix = () => {
    const date = new Date(
      selectedDate.year,
      selectedDate.month,
      selectedDate.date,
    );

    let matrix: Array<number | any> = [],
      year = date.getFullYear(),
      month = date.getMonth();
    let firstDay = new Date(year, month, 1).getDay();
    firstDay = firstDay === 0 ? 6 : firstDay - 1;

    let maxDays = new Date(year, month + 1, 0).getDate();
    let counter = 1;

    for (let row = 0; row < 6; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if ((row == 0 && col >= firstDay) || (row > 0 && counter <= maxDays)) {
          matrix[row][col] = counter++;
        }
      }
    }

    return matrix;
  };

  const renderDays = () => {
    return (
      <View style={style.headerStyle} justifyContent={'space-between'}>
        {weekDays.map((item, index) => (
          <Circle size={'40px'} key={'key' + item} mb={0}>
            <Text
              style={[style.textHeader, { fontFamily: fontFamily?.Regular }]}
              color={'#999'}
            >
              {item}
            </Text>
          </Circle>
        ))}
      </View>
    );
  };

  const isSelectedDate = (date: number) => {
    let textStyles = {},
      bodyStyles = {};

    const selectedDateState = moment(selectedDate.selected).format(
      'YYYY-MM-DD dddd E',
    );

    const selectedDateNew = moment(
      new Date(selectedDate.year, selectedDate.month, date),
    ).format('YYYY-MM-DD dddd E');

    const todayDate =
      moment().format('YYYY-MM-DD dddd E') ===
      moment(new Date(selectedDate.year, selectedDate.month, date)).format(
        'YYYY-MM-DD dddd E',
      );

    if (todayDate) {
      textStyles = { color: colors.blue, fontFamily: fontFamily?.Regular };
      bodyStyles = {
        backgroundColor: 'transparent',
      };
    }
    if (selectedDateState === selectedDateNew) {
      textStyles = {
        color: colors.blue,
        fontSize: 18,
        fontFamily: fontFamily?.Bold,
      };
      bodyStyles = { backgroundColor: colors.blue + '30' };
    }
    // else {
    //   textStyles = { color: colors.text };
    //   bodyStyles = {
    //     backgroundColor: 'transparent',
    //   };
    // }

    return { textStyles, bodyStyles };
  };

  const outOfRangeDate = (date: number) => {
    const minDate = moment(props.minDate);
    const maxDate = moment(props.maxDate);
    const theDate = moment(
      new Date(selectedDate.year, selectedDate.month, date),
    );

    if (props.minDate && props.maxDate) {
      return !theDate.isBetween(minDate, maxDate);
    }

    if (props.minDate) {
      return minDate.isAfter(theDate);
    }

    if (props.maxDate) {
      return minDate.isBefore(theDate);
    }

    return false;
  };

  const flatListRef = useRef(null);

  const getItemLayout = (data: any, index: number) => ({
    length: 52,
    offset: 52 * index,
    index,
  });

  const onDone = () => {
    props.onConfirm?.(selectedDate.selected);
    props.onClose?.();
  };

  const onChangeDateInput = (text: string) => {
    onSetDateInput('error', '');
    const formatText = text?.split('/')?.reverse()?.join('-');
    const splitText = text?.split('/')?.reverse();

    if (formatText.length === 10) {
      if (!moment(formatText, 'YYYY-MM-DD', true).isValid()) {
        onSetDateInput('error', 'Invalid date format');
        return true;
      }

      onSetSelectedDateInput(
        Number(splitText[0]),
        Number(splitText[1]) - 1,
        Number(splitText[2]),
      );
    }
  };

  const renderDates = () => {
    let matrix = generateMatrix();
    return matrix.map((row, rowIndex) => (
      <HStack
        key={'key' + rowIndex}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        {row.map((item: number, colIndex: number) => {
          const isOutOfRange = outOfRangeDate(item);
          return item != -1 ? (
            <Pressable
              disabled={isOutOfRange}
              mt={2}
              key={'key' + colIndex}
              width={'40px'}
              height={'40px'}
              borderRadius={'40px'}
              onPress={() => onSetSelectedDateSelected('date', item)}
              style={[isSelectedDate(item).bodyStyles]}
            >
              <Circle width={'full'} height={'full'} size={'40px'}>
                <Text
                  fontSize={'md'}
                  style={[isSelectedDate(item).textStyles]}
                  textAlign={'center'}
                  color={isOutOfRange ? 'inputOutline' : 'text'}
                >
                  {item != -1 ? item : ''}
                </Text>
              </Circle>
            </Pressable>
          ) : (
            <View key={'key' + colIndex} width={'40px'} />
          );
        })}
      </HStack>
    ));
  };

  return (
    <Actionsheet
      {...props}
      safeArea={true}
      hideDragIndicator
      safeAreaBottom={false}
    >
      <Actionsheet.Content>
        <Box
          backgroundColor={'searchFamilyBg'}
          maxWidth={'100%'}
          borderRadius={28}
        >
          <View>
            <HStack
              width={'full'}
              px={5}
              py={5}
              justifyContent={'space-between'}
            >
              <Text
                color={'transparent'}
                fontWeight={'medium'}
                style={{ fontFamily: fontFamily?.Regular }}
              >
                Done
              </Text>
              <Text fontWeight={'bold'}>Date and time</Text>
              <Text
                fontWeight={'medium'}
                fontSize={'sm'}
                color={'blue'}
                textDecorationColor={'blue'}
                textDecorationLine={'underline'}
                onPress={onDone}
              >
                Done
              </Text>
            </HStack>
            {!toggleDateInput.isOpen && (
              <View
                style={style.viewTitle}
                height={'56px'}
                width={'full'}
                pl={5}
                pr={2.5}
              >
                <TouchableOpacity
                  onPress={toggleYearPicker.onToggle}
                  style={{ height: '100%', justifyContent: 'center' }}
                >
                  <HStack alignItems={'center'}>
                    <Text mr={0} fontSize={'md'} fontWeight={'bold'}>
                      {months[selectedDate.month]} {selectedDate.year}
                    </Text>
                    <Entypo
                      name={'chevron-right'}
                      color={colors.blue}
                      size={18}
                    />
                  </HStack>
                </TouchableOpacity>

                <View>
                  <HStack>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() =>
                        onSetSelectedDate('month', selectedDate.month - 1)
                      }
                    >
                      <Circle width={'46px'}>
                        <Entypo
                          name={'chevron-left'}
                          color={colors.blue}
                          size={25}
                        />
                      </Circle>
                    </TouchableOpacity>
                    <View mx={1} />
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() =>
                        onSetSelectedDate('month', selectedDate.month + 1)
                      }
                    >
                      <Circle width={'46px'} alignItems={'flex-end'}>
                        <Entypo
                          name={'chevron-right'}
                          color={colors.blue}
                          size={25}
                        />
                      </Circle>
                    </TouchableOpacity>
                  </HStack>
                </View>
              </View>
            )}
            <View>
              <View px={2.5} minHeight={windowHeight * 0.3 + 'px'}>
                <View>
                  {renderDays()}
                  {renderDates()}
                </View>
              </View>
            </View>

            <View style={style.bottomView} mt={2}>
              <Pressable
                px={5}
                height={'50px'}
                justifyContent={'center'}
                borderTopWidth={1}
                borderColor={'#DDD'}
              >
                <Text>Set time</Text>
              </Pressable>
              <Pressable
                px={5}
                flexDir={'row'}
                alignItems={'center'}
                height={'50px'}
                justifyContent={'space-between'}
                borderTopWidth={1}
                borderColor={'#DDD'}
              >
                <Text>Does not repeat</Text>
                <Entypo name={'chevron-right'} color={'#999'} size={20} />
              </Pressable>
            </View>
          </View>
          {/*</Modal>*/}
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

const style = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
  },

  textHeader: {
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  viewTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textTitle: {
    fontSize: 18,
    paddingHorizontal: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  viewAvail: {
    height: 2,
    width: 10,
    backgroundColor: '#ffae00',
    marginBottom: 2,
  },
  bottomView: {},
  button: {
    padding: 10,
    backgroundColor: '#08016A',
    color: 'white',
    overflow: 'hidden',
    borderRadius: 5,
  },
});
