import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableWithoutFeedback } from 'react-native';

const DropdownComponent = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const items = ['Item 1', 'Item 2', 'Item 3'];

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleItemPress = (item:any) => {
    setSelectedValue(item);
    toggleDropdown();
    console.log('Selected value:', item);
    // Perform any other actions based on the selected value
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={toggleDropdown}>
        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>{selectedValue || 'Select an item...'}</Text>
        </View>
      </TouchableWithoutFeedback>
      <Modal animationType="fade" transparent visible={showDropdown}>
        <View style={styles.modalContainer}>
          {items.map((item) => (
            <TouchableWithoutFeedback key={item} onPress={() => handleItemPress(item)}>
              <View style={styles.modalItem}>
                <Text style={styles.modalItemText}>{item}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  dropdownText: {
    fontSize: 16,
    color:"black"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
  },
  modalItem: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 1,
    borderRadius: 5,
  },
  modalItemText: {
    fontSize: 16,
    color:"black"
  },
});

export default DropdownComponent;
