import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function FilterByCourseScreen() {
  const [dishName, setDishName] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState('Starter');
  const [menuItems, setMenuItems] = useState([]);
  const [filter, setFilter] = useState('All');

  // Add dish
  const addDish = () => {
    if (dishName && price) {
      const newDish = { id: Date.now().toString(), name: dishName, price, course };
      setMenuItems([...menuItems, newDish]);
      setDishName('');
      setPrice('');
    }
  };

  // Filter dishes
  const filteredItems =
    filter === 'All' ? menuItems : menuItems.filter(item => item.course === filter);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Golden Restaurant Menu</Text>

      {/* Input Section */}
      <TextInput
        style={styles.input}
        placeholder="Enter dish name"
        value={dishName}
        onChangeText={setDishName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Select Course:</Text>
      <Picker
        selectedValue={course}
        onValueChange={(itemValue) => setCourse(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Starter" value="Starter" />
        <Picker.Item label="Main" value="Main" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>

      <Button title="Add Dish" onPress={addDish} />

      {/* Filter Section */}
      <Text style={styles.label}>Filter by Course:</Text>
      <Picker
        selectedValue={filter}
        onValueChange={(itemValue) => setFilter(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="All" value="All" />
        <Picker.Item label="Starter" value="Starter" />
        <Picker.Item label="Main" value="Main" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>

      {/* Display Section */}
      <Text style={styles.subtitle}>Menu Items ({filteredItems.length})</Text>
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name} - R{item.price} ({item.course})
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#b8860b',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  subtitle: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
  },
  item: {
    fontSize: 16,
    paddingVertical: 4,
  },
});
