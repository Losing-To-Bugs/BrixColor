import React from "react";
import { View, Text } from "react-native";

const Onboarding = ({
  pages,
  onDone,
  NextButtonComponent,
  DoneButtonComponent,
}) => {
  return (
    <View style={{ flex: 1 }}>
      {pages.map((page, index) => (
        <View
          key={index}
          style={{
            flex: 1,
            backgroundColor: page.backgroundColor,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {page.image}
          <Text>{page.title}</Text>
          <Text>{page.subtitle}</Text>

          {index < pages.length - 1 && (
            <NextButtonComponent onPress={() => {}} />
          )}
          {index === pages.length - 1 && (
            <DoneButtonComponent onPress={onDone} />
          )}
        </View>
      ))}
    </View>
  );
};

export default Onboarding;
