import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const StudentDashboard = () => {
  return (
    <View style={styles.container}>
      <Text>StudentDashboard</Text>
    </View>
  );
};

export default StudentDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
