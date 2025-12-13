import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Text } from "../components";
import { useState } from "react";
import AddButton from "../components/addButton";

export default function Index() {
  const [activeTab, setActiveTab] = useState("All");

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
            // backgroundColor: "#202027",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <Text>
            This is a placeholder for{" "}
            {activeTab === "All"
              ? "all content."
              : "bookmarked content."}
          </Text>
        </ScrollView>
      </View>
      <AddButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
    justifyContent: "flex-start",
    alignItems: "center",
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
