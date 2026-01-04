import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Text } from "../components";

interface TaskInputProps {
  onSubmit: (data: {
    title: string;
    description: string;
    bookmark: boolean;
  }) => void;
  onCancel: () => void;
}

const TaskInput = ({ onSubmit, onCancel }: TaskInputProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      bookmark: isBookmarked,
    });
    setTitle("");
    setDescription("");
    setIsBookmarked(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.wrapper}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Add Task</Text>
        <TextInput
          placeholder="Title"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          placeholderTextColor="#999"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.textarea]}
          multiline
          numberOfLines={4}
        />
        <View
          style={{
            position: "absolute",
            top: 60,
            // bottom: 80,
            right: 30,
          }}
        >
          {!isBookmarked ? (
            <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
              <Image
                source={require("../assets/images/bookmark.png")}
                style={{
                  width: 26,
                  height: 26,
                  marginLeft: 8,
                  tintColor: "#494848ff",
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
              <Image
                source={require("../assets/images/bookmark.png")}
                style={{
                  width: 26,
                  height: 26,
                  marginLeft: 8,
                  tintColor: "#f0c419ff",
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: {
    width: "90%",
    backgroundColor: "#17171b",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 12,
    color: "#fff",
    fontFamily: "SatoshiBold",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#0f0f11",
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  textarea: {
    height: 90,
    textAlignVertical: "top",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cancelBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
  },
  cancelText: { color: "#fff" },
  submitBtn: {
    backgroundColor: "#c7fce8ff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  submitText: { color: "#202027", fontFamily: "SatoshiBold" },
});

export default TaskInput;
