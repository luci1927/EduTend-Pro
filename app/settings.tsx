import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Switch, ScrollView, Alert, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Settings() {

    const [name, setName] = useState("Admin User");
    const [email, setEmail] = useState("admin@school.com");
    const [phone, setPhone] = useState("0771234567");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [autoLogout, setAutoLogout] = useState("10"); // minutes
    const [sessionTimeout, setSessionTimeout] = useState("30"); // minutes

    const handleSaveProfile = () => {
        Alert.alert("Success", "Profile updated successfully");
    };

    const handleChangePassword = () => {
        if (!currentPassword || !newPassword) {
            Alert.alert("Error", "Please fill all password fields");
            return;
        }
        Alert.alert("Success", "Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Your Profile</Text>
                    <Text style={styles.headerSubtitle}>
                        Manage your account & system preferences
                    </Text>
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Account Settings</Text>

                    <View style={styles.inputGroup}>
                        <Ionicons name="person-outline" size={18} color="#777" />
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Full Name"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Ionicons name="mail-outline" size={18} color="#777" />
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Ionicons name="call-outline" size={18} color="#777" />
                        <TextInput
                            style={styles.input}
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="Phone"
                            keyboardType="phone-pad"
                        />
                    </View>

                    <TouchableOpacity style={styles.primaryButton} onPress={handleSaveProfile}>
                        <Text style={styles.primaryButtonText}>Save Profile</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Change Password</Text>

                    <View style={styles.inputGroup}>
                        <Ionicons name="lock-closed-outline" size={18} color="#777" />
                        <TextInput
                            style={styles.input}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            placeholder="Current Password"
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Ionicons name="lock-open-outline" size={18} color="#777" />
                        <TextInput
                            style={styles.input}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            placeholder="New Password"
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity style={styles.primaryButton} onPress={handleChangePassword}>
                        <Text style={styles.primaryButtonText}>Update Password</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>System Settings</Text>

                    {/* Theme Toggle */}
                    <View style={styles.rowBetween}>
                        <View style={styles.rowAlign}>
                            <Ionicons name="moon-outline" size={18} color="#777" />
                            <Text style={styles.rowLabel}>Dark Mode</Text>
                        </View>
                        <Switch
                            value={isDarkMode}
                            onValueChange={setIsDarkMode}
                            trackColor={{ false: "#DDD", true: "#2E7D32" }}
                            thumbColor="#FFF"
                        />
                    </View>

                    <View style={styles.divider} />

                    {/* Auto Logout */}
                    <View style={styles.inputGroup}>
                        <Ionicons name="time-outline" size={18} color="#777" />
                        <TextInput
                            style={styles.input}
                            value={autoLogout}
                            onChangeText={setAutoLogout}
                            placeholder="Auto Logout (minutes)"
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Ionicons name="hourglass-outline" size={18} color="#777" />
                        <TextInput
                            style={styles.input}
                            value={sessionTimeout}
                            onChangeText={setSessionTimeout}
                            placeholder="Session Timeout (minutes)"
                            keyboardType="numeric"
                        />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#F4F6F9" },

    header: { paddingHorizontal: 20, paddingTop: 20, marginBottom: 15 },
    headerTitle: { fontSize: 28, fontWeight: "800", color: "#1A1A1A" },
    headerSubtitle: { fontSize: 14, color: "#666", marginTop: 4 },

    sectionCard: {
        backgroundColor: "#FFF",
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 16,
        padding: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 15,
        color: "#1A1A1A",
    },

    inputGroup: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 50,
        marginBottom: 15,
    },

    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: "#1A1A1A",
    },

    primaryButton: {
        backgroundColor: "#2E7D32",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 5,
    },

    primaryButtonText: {
        color: "#FFF",
        fontWeight: "700",
        fontSize: 14,
    },

    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    rowAlign: {
        flexDirection: "row",
        alignItems: "center",
    },

    rowLabel: {
        marginLeft: 10,
        fontSize: 14,
        color: "#1A1A1A",
        fontWeight: "600",
    },

    divider: {
        height: 1,
        backgroundColor: "#F0F0F0",
        marginVertical: 15,
    },
});
