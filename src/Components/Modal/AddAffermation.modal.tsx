import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Modal, Portal } from 'react-native-paper';
import colors from '../../constants/colors';

const AddAffermationModal = ({ visible, hideModal }: any) => {
  const [affirmation, setAffirmation] = useState('');

  const handleAddAffirmation = () => {
    // TODO: Implement adding affirmation to database or store
    console.log('Adding affirmation:', affirmation);
    // Clear input field
    setAffirmation('');
    // Close modal
    hideModal();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}
      >
        <Text style={styles.title}>Add New Affirmation</Text>
        <TextInput
          style={styles.input}
          value={affirmation}
          onChangeText={text => setAffirmation(text)}
          placeholder="Type your affirmation here"
          placeholderTextColor={colors.white}
        />
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            style={{
              backgroundColor: colors.danger,
            }}
            labelStyle={{ color: colors.white }}
            onPress={hideModal}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            style={{ backgroundColor: colors.primary }}
            labelStyle={{ color: colors.white }}
            onPress={handleAddAffirmation}
          >
            Add Affirmation
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.white,
  },
  input: {
    height: 80,
    borderWidth: 1,
    borderColor: colors.background2,
    borderRadius: 5,
    padding: 10,
    // marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
});

export default AddAffermationModal;
