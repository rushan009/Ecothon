import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setMessage('Hello World!')}>
        <Text style={styles.buttonText}>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  message: { fontSize: 30, marginBottom: 20 },
  button: { backgroundColor: '#6200ee', padding: 15, borderRadius: 10 },
  buttonText: { color: 'white', fontSize: 18 },
});