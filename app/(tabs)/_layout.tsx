import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerStyle: styles.header,
                headerTintColor: "#FFF",
                headerTitleStyle: styles.headerTitle,

                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: "#2E7D32",
                tabBarInactiveTintColor: "#999",
                tabBarLabelStyle: styles.tabLabel,
                tabBarItemStyle: styles.tabItem,

                tabBarIcon: ({ color, focused }) => {
                    let iconName: any;

                    if (route.name === "manageStudent") {
                        iconName = focused ? "person" : "person-outline";
                    } else if (route.name === "manageAdmins") {
                        iconName = focused ? "people" : "people-outline";
                    }

                    return (
                        <View style={[styles.iconWrapper, focused && styles.activeIconWrapper]}>
                            <Ionicons name={iconName} size={20} color={focused ? "#2E7D32" : color} />
                        </View>
                    );
                },
            })}
            
        >
            <Tabs.Screen
                name="manageStudent"
                options={{
                    title: "Students",
                    headerShown: false,
                }}
            />

            <Tabs.Screen
                name="manageAdmins"
                options={{
                    title: "Admins",
                    headerShown: false,
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#2E7D32",
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },

    headerTitle: {
        fontWeight: "700",
        fontSize: 20,
        letterSpacing: 0.5,
    },

    tabBar: {
        backgroundColor: "#FFF",
        height: 85,
        borderTopWidth: 0,
        elevation: 10,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
    },

    tabItem: {
        justifyContent: "center",
        alignItems: "center",
    },

    tabLabel: {
        fontSize: 11,
        fontWeight: "700",
        marginTop: 20,
    },

    iconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },

    activeIconWrapper: {
        backgroundColor: "#2E7D3215",
    },
});
