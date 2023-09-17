import * as React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

type Props = {
  value: number;
  onChange: (value: number) => void;
  label: string;
  placeholder: string;
};

export const NumericInput = ({label, placeholder, value, onChange}: Props) => {
  return (
    <View>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        value={value.toString()}
        keyboardType="numeric"
        style={styles.input}
        placeholder={placeholder}
        onChangeText={text => {
          onChange(+text.replace(/[^0-9]/g, ''));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    height: 40,
    padding: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 5,
  },
});
