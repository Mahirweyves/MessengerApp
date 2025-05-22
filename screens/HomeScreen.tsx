import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type RootStackParamList = {
  Home: undefined;
  Messages: { inboxName: string };
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const inboxes = [
  { name: 'School', icon: 'school' },
  { name: 'Home', icon: 'home' },
  { name: 'Love', icon: 'heart' },
  { name: 'Family', icon: 'account-group' },
  { name: 'Friends', icon: 'account-multiple' },
  { name: 'Work', icon: 'briefcase' },
];

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Important Directories</Text>
      <FlatList
        data={inboxes}
        keyExtractor={(item) => item.name}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Messages', { inboxName: item.name })}
            activeOpacity={0.8}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name={item.icon} size={36} color="#4a90e2" />
            </View>
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#f5f7fa' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 28, color: '#222', alignSelf: 'center' },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 28,
    margin: 12,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 5,
    minWidth: 0,
    minHeight: 140,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e6f0fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  text: { fontSize: 24, fontWeight: '600', color: '#333', textAlign: 'center' },
});