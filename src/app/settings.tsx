import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet, Platform } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";

export default function Settings() {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);
  const [selectedValue, setSelectedValue] = useState("1");
  const [selectedValue2, setSelectedValue2] = useState("1");
  const [selectedValue3, setSelectedValue3] = useState("1");
  const dropdownData = [
    {
      label: "Option 1",
      value: "1",
      image: {
        uri: "https://cdn.icon-icons.com/icons2/2348/PNG/512/x_warning_badged_outline_icon_142947.png",
      },
    },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
  ];
  const dropdownData2 = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
  ];
  const dropdownData3 = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
  ];
  const handleToggle1 = (value: boolean) => {
    setToggle1(value);
    // Save the toggle state to storage or perform any other action
  };

  const handleToggle2 = (value: boolean) => {
    setToggle2(value);
    // Save the toggle state to storage or perform any other action
  };

  const handleToggle3 = (value: boolean) => {
    setToggle3(value);
    // Save the toggle state to storage or perform any other action
  };

  const handleToggle4 = (value: boolean) => {
    setToggle4(value);
    // Save the toggle state to storage or perform any other action
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.divider} />

      <View>
        <Text>Select Language:</Text>
        <SelectCountry
          style={styles.dropdownContainer}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
          imageStyle={styles.imageStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          maxHeight={200}
          value={selectedValue}
          data={dropdownData}
          valueField="value"
          labelField="label"
          imageField="image"
          placeholder="Select country"
          searchPlaceholder="Search..."
          onChange={(e) => {
            setSelectedValue(e.value);
          }}
        />
      </View>

      <View style={styles.toggleContainer}>
        <Text>Save Scans to Phone</Text>
        <Switch value={toggle1} onValueChange={handleToggle1} />
      </View>
      <Text style={styles.header}>ACCESSIBILITY SETTINGS</Text>
      <View style={styles.toggleContainer}>
        <Text>High Contrast UI</Text>
        <Switch value={toggle2} onValueChange={handleToggle2} />
      </View>
      <View style={styles.toggleContainer}>
        <Text>Audio Narration </Text>
        <Switch value={toggle3} onValueChange={handleToggle3} />
      </View>
      <View style={styles.toggleContainer}>
        <Text>Capture with Volume Button</Text>
        <Switch value={toggle4} onValueChange={handleToggle4} />
      </View>
      <View>
        <Text>Select Text color:</Text>
        <SelectCountry
          style={styles.dropdownContainer}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
          imageStyle={styles.imageStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          maxHeight={200}
          value={selectedValue2}
          data={dropdownData2}
          valueField="value"
          labelField="label"
          imageField="image"
          placeholder="Select country"
          searchPlaceholder="Search..."
          onChange={(e) => {
            setSelectedValue2(e.value);
          }}
        />
      </View>
      <View>
        <Text>Select Text Size</Text>
        <SelectCountry
          style={styles.dropdownContainer}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
          imageStyle={styles.imageStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          maxHeight={200}
          value={selectedValue3}
          data={dropdownData3}
          valueField="value"
          labelField="label"
          imageField="image"
          placeholder="Select country"
          searchPlaceholder="Search..."
          onChange={(e) => {
            setSelectedValue3(e.value);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 30,
    fontSize: 16,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "black",
    marginBottom: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  dropdownContainer: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  imageStyle: {
    width: 24,
    height: 24,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
