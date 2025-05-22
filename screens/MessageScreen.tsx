import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Messages: { inboxName: string };
};

type MessageScreenRouteProp = RouteProp<RootStackParamList, 'Messages'>;
type Props = { route: MessageScreenRouteProp };

export default function MessageScreen({ route }: Props) {
  const { inboxName } = route.params;

  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const storageKey = `messages:${inboxName}`;

  // Load messages from AsyncStorage on mount
  useEffect(() => {
    AsyncStorage.getItem(storageKey)
      .then(data => {
        if (data) setMessages(JSON.parse(data));
      })
      .catch(console.error);
  }, []);

  // Save messages to AsyncStorage whenever they change
  useEffect(() => {
    AsyncStorage.setItem(storageKey, JSON.stringify(messages)).catch(console.error);
  }, [messages]);

  const addOrUpdateMessage = () => {
    if (!input.trim()) return;

    if (editingIndex === null) {
      // add new
      setMessages(prev => [...prev, input.trim()]);
    } else {
      // update existing
      setMessages(prev => {
        const copy = [...prev];
        copy[editingIndex] = input.trim();
        return copy;
      });
      setEditingIndex(null);
    }

    setInput('');
  };

  const startEdit = (idx: number) => {
    setEditingIndex(idx);
    setInput(messages[idx]);
  };

  const deleteMessage = (idx: number) => {
    Alert.alert(
      'Delete message?',
      `"${messages[idx]}"`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', style: 'destructive',
          onPress: () =>
            setMessages(prev => prev.filter((_, i) => i !== idx))
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{inboxName} Messages</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={addOrUpdateMessage} style={styles.iconButton}>
          <Entypo
            name={editingIndex === null ? 'plus' : 'check'}
            size={28}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.messageItem}>
            <Text style={styles.messageText}>{item}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => startEdit(index)}>
                <MaterialIcons name="edit" size={24} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteMessage(index)}>
                <MaterialIcons name="delete" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No messages yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  iconButton: { marginLeft: 10 },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 12,
    borderRadius: 6,
    marginVertical: 4,
  },
  messageText: { flex: 1, fontSize: 16 },
  actions: { flexDirection: 'row', width: 60, justifyContent: 'space-between' },
  empty: { textAlign: 'center', marginTop: 20, color: '#666' },
});
