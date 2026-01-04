import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  ScrollView,
  Modal,
} from "react-native";
import { Text } from "../components";
import { useState, useEffect } from "react";
import AddButton from "../components/addButton";
import API from "../constants/api";
import TaskInput from "./taskInput";
import { navigate } from "expo-router/build/global-state/routing";

interface Task {
  id: number;
  title: string;
  description: string;
  bookmark: boolean;
  completed: boolean;
}

export default function Index() {
  const [activeTab, setActiveTab] = useState("All");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [bookmarkedTasks, setBookmarkedTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchAllTasks();
    fetchBookmarkedTasks();
  }, [activeTab]);

  const fetchAllTasks = async () => {
    try {
      const response = await API.get("/tasks");
      setTasks(response.data);
      console.log("Fetched All Tasks:", response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchBookmarkedTasks = async () => {
    try {
      const response = await API.get("/tasks/bookmarked");
      setBookmarkedTasks(response.data);
      console.log("Fetched Bookmarked Tasks:", response.data);
    } catch (error) {
      console.error("Error fetching bookmarked tasks:", error);
    }
  };

  const handleBookmark = (taskId: number) => async () => {
    try {
      await API.patch(`/tasks/${taskId}/toggle-bookmark`);
      // Refresh tasks after bookmarking
      fetchAllTasks();
      fetchBookmarkedTasks();
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  const handleAddTask = async (data: { title: string; description: string, bookmark: boolean}) => {
    try {
      await API.post("/tasks", data);
      setModalVisible(false);
      // Refresh lists after adding
      fetchAllTasks();
      fetchBookmarkedTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }; 



  const tabs = [
    { id: "All", label: "ALL" },
    { id: "Bookmarked", label: "BOOKMARKED", isIcon: true },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>TiCKMe</Text>
      <Text style={styles.text}>Learning CRUD functionalities</Text>
      <View style={{ height: 20 }} />

      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabButton, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            {tab.isIcon ? (
              <Image
                source={require("../assets/images/bookmark.png")}
                style={[
                  styles.tabIcon,
                  activeTab === tab.id && styles.activeTabIcon,
                ]}
                resizeMode="contain"
              />
            ) : (
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText,
                ]}
              >
                {tab.label}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Content area based on active tab */}
      <View style={styles.contentArea}>
        <Text style={styles.contentText}>
          {activeTab === "All" ? "All TiCKMe" : "Bookmarked TiCKMe"}
        </Text>

        <View style={{ height: 20 }} />
        <ScrollView
          style={{
            minWidth: "80%",
            maxWidth: "85%",
            // backgroundColor: "#202027",
            borderRadius: 12,
            padding: 20,
          }}
        >
          {activeTab === "All"
            ? tasks.map((task, index) => (
              <TouchableOpacity
                key={task.id}
                style={{
                  marginBottom: 15,
                  borderBottomWidth: 2,
                  borderBottomColor: "#333340",
                  paddingBottom: 10,
                }}
              >
                
                  <View
                    style={{
                      position: "relative",
                      width: "95%",
                      paddingRight: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "SatoshiBold",
                        color: "#fff",
                      }}
                    >
                      {index + 1}. {task.title}
                    </Text>
                    <Text
                      style={{ fontSize: 14, color: "#7c7c7cff", marginTop: 1 }}
                    >
                      {task.description}
                    </Text>
                  </View>
                  <View style={{ position: "absolute", top: 0, right: 0 }}>
                    {task.bookmark ? (
                      <TouchableOpacity onPress={handleBookmark(task.id)}>
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
                    ) : (
                      <TouchableOpacity onPress={handleBookmark(task.id)}>
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
                    )}
                  </View>
                
              </TouchableOpacity>
              ))
            : bookmarkedTasks.map((task, index) => (
                <TouchableOpacity
                  key={task.id}
                  style={{
                    marginBottom: 15,
                    borderBottomWidth: 2,
                    borderBottomColor: "#333340",
                    paddingBottom: 10,
                  }}
                >
                  <View
                    style={{
                      position: "relative",
                      width: "95%",
                      paddingRight: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "SatoshiBold",
                        color: "#fff",
                      }}
                    >
                      {index + 1}. {task.title}
                    </Text>
                    <Text
                      style={{ fontSize: 14, color: "#7c7c7cff", marginTop: 1 }}
                    >
                      {task.description}
                    </Text>
                  </View>
                  <View style={{ position: "absolute", top: 0, right: 0 }}>
                    {task.bookmark ? (
                      <TouchableOpacity onPress={handleBookmark(task.id)}>
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
                    ) : (
                      <TouchableOpacity onPress={handleBookmark(task.id)}>
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
                    )}
                  </View>
                </TouchableOpacity>
              ))}
        </ScrollView>
      </View>

      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          <TaskInput onSubmit={handleAddTask} onCancel={() => setModalVisible(false)} />
        </View>
      </Modal>

      <AddButton action={() => setModalVisible(true)} />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    marginTop: 50,
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "#7b7b84ff",
    // objectFit: "contain",
    width: "100%",
  },
  textHeader: {
    fontSize: 28,
    fontFamily: "SatoshiBold",
  },
  text: {
    fontSize: 12,
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginTop: 20,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    backgroundColor: "#202027",
  },
  activeTab: {
    backgroundColor: "#c7fce8ff",
  },
  tabIcon: {
    width: 19,
    height: 19,
    tintColor: "#fff",
  },
  activeTabIcon: {
    tintColor: "#202027",
  },
  tabText: {
    color: "#fff",
    fontFamily: "SatoshiBold",
    fontSize: 14,
  },
  activeTabText: {
    color: "#202027",
  },
  contentArea: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    fontSize: 14,
    textDecorationLine: "underline",
    fontFamily: "SatoshiBold",
    color: "#fff",
    // textTransform: "capitalize",
  },
});
