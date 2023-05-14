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
    <View style={styles.container}>
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
  container: {
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: colors.background,
    borderWidth: 0.3,
    borderColor: colors.grayText,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
});

export default DatePicker;
