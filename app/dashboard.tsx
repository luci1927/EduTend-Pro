import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function Dashboard() {

    type User = {
        username: string;
        role: string;
    };

    const [user, setUser] = React.useState<User>();
    const router = useRouter();

    useEffect(() => {
        async function loadUser() {
            const user = await AsyncStorage.getItem('user');
            if (user !== null) {
                const userData = JSON.parse(user);
                setUser(userData);
            } else {
                Alert.alert("No user found", "Please log in first.");
                router.replace("/");
            }
        }
        loadUser();
    }, []);

    function handleLogout() {
        Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Log Out",
                style: "destructive",
                onPress: async () => {
                    await AsyncStorage.removeItem('user');
                    router.replace("/");
                },
            },
        ]);
    }

    const today = new Date().toDateString();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>EduTend Pro</Text>
                        <Text style={styles.username}>
                            Welcome, {user?.username}
                        </Text>
                        <Text style={styles.role}>
                            Role: {user?.role}
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.avatar} onPress={() => router.push("/settings")}>
                        <AntDesign name="user" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.date}>{today}</Text>

                <Image
                    source={require("../assets/images/man-works.png")}
                    style={{ width: "100%", height: 200, marginBottom: 10, marginTop: 20 }}
                    resizeMode="cover"
                />

                <View style={{ height: 1, backgroundColor: "#DDD", marginVertical: 20, marginHorizontal: 20, }} />
                
                <View style={styles.statsContainer}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Total Students</Text>
                        <Text style={styles.cardValue}>120</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Present Today</Text>
                        <Text style={styles.cardValue}>88</Text>
                    </View>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Late</Text>
                        <Text style={styles.cardValue}>7</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Absent</Text>
                        <Text style={styles.cardValue}>5</Text>
                    </View>
                </View>


            </ScrollView>
            <TouchableOpacity style={styles.miniButton} onPress={() => router.push("/(tabs)/manageStudent")}>
                <Text style={styles.buttonText}>
                    Manage
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fabOut} onPress={handleLogout}>
                <AntDesign name="logout" size={24} color="#FFF" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F4F6F9",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },
    greeting: {
        fontSize: 36,
        color: "#000000",
        fontWeight: "bold",
    },
    username: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#111",
    },
    role: {
        fontSize: 14,
        color: "#777",
        marginTop: 2,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 14,
        position: "absolute",
        bottom: 30,
        right: 20,
        backgroundColor: "#2E7D32",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 10,
    },
    date: {
        paddingHorizontal: 20,
        color: "#555",
        marginBottom: 10,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    card: {
        backgroundColor: "#FFF",
        width: "48%",
        padding: 20,
        borderRadius: 14,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 14,
        color: "#777",
        marginBottom: 8,
    },
    cardValue: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#2E7D32",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    actionsContainer: {
        paddingHorizontal: 20,
    },
    mainButton: {
        backgroundColor: "#2E7D32",
        padding: 18,
        borderRadius: 14,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "600",
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: "#c5160d",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
    },

    miniButton: {
        backgroundColor: "#2E7D32",
        padding: 18,
        borderRadius: 14,
        alignItems: "center",
        position: "absolute",
        bottom: 30,
        right: 20,
        width: 160,
        height: 60,
        justifyContent: "center",
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 10,
    },
    fab: {
        position: "absolute",
        bottom: 30,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 14,
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 10,
    },
    fabOut: {
        position: "absolute",
        bottom: 30,
        left: 20,
        width: 60,
        height: 60,
        borderRadius: 14,
        backgroundColor: "#a10000",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 10,
    },

});
