import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Modal, Portal} from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import colors from '../../constants/colors';

const DatePicker = ({onDateSelect}: any) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateConfirm = (date: any) => {
    setDatePickerVisible(false);
    setSelectedDate(date);
    onDateSelect(date);
  };

  const handleDateCancel = () => {
    setDatePickerVisible(false);
  };

  return (
    <View>
      <Button
        mode="outlined"
        onPress={() => setDatePickerVisible(true)}
        style={styles.button}
        labelStyle={styles.buttonLabel}>
        {selectedDate
          ? moment(selectedDate).format('MMM D, YYYY')
          : 'Select a Date'}
      </Button>
      <Portal>
        <Modal
          visible={isDatePickerVisible}
          onDismiss={handleDateCancel}
          contentContainerStyle={styles.modal}>
          <DateTimePicker
            isVisible={isDatePickerVisible}
            onConfirm={handleDateConfirm}
            onCancel={handleDateCancel}
            mode={'date'}
          />
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  button: {
    width: '100%',
    alignSelf: 'center',
    // marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: colors.background1,
    elevation: 0,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default DatePicker;
