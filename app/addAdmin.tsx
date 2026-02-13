import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AddAdmin() {
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<"Super Admin" | "Editor" | "Viewer">("Viewer");
    const [status, setStatus] = useState<"Active" | "Inactive">("Active");

    const handleAddAdmin = () => {
        if (!firstName.trim() || !lastName.trim() || !email.trim()) {
            Alert.alert("Validation Error", "Please complete all required fields.");
            return;
        }

        const newAdmin = {
            firstName,
            lastName,
            email,
            role,
            status,
        };

        console.log("Submitting Admin Data:", newAdmin);

        Alert.alert(
            "Admin Added",
            `Successfully added ${firstName} ${lastName}!`
        );

        setFirstName("");
        setLastName("");
        setEmail("");
        setRole("Viewer");
        setStatus("Active");

        router.back();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#111" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add New Admin</Text>
                <View style={{ width: 24 }} />
            </View>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                    <View style={styles.card}>
                        <Text style={styles.label}>First Name <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. Saman"
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.label}>Last Name <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. Perera"
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.label}>Email <Text style={styles.required}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. saman.perera@gmail.com"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.label}>Role <Text style={styles.required}>*</Text></Text>
                        <View style={styles.statusContainer}>
                            {["Super Admin", "Editor", "Viewer"].map(r => (
                                <TouchableOpacity
                                    key={r}
                                    style={[
                                        styles.statusButton,
                                        role === r && styles.statusButtonActive,
                                    ]}
                                    onPress={() => setRole(r as any)}
                                >
                                    <Text
                                        style={[
                                            styles.statusText,
                                            role === r && styles.statusTextActive,
                                        ]}
                                    >
                                        {r}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.label}>Active Status <Text style={styles.required}>*</Text></Text>
                        <View style={styles.statusContainer}>
                            {["Active", "Inactive"].map(s => (
                                <TouchableOpacity
                                    key={s}
                                    style={[
                                        styles.statusButton,
                                        status === s && styles.statusButtonActive,
                                    ]}
                                    onPress={() => setStatus(s as any)}
                                >
                                    <Text
                                        style={[
                                            styles.statusText,
                                            status === s && styles.statusTextActive,
                                        ]}
                                    >
                                        {s}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <TouchableOpacity style={styles.addButton} onPress={handleAddAdmin}>
                        <Text style={styles.addButtonText}>Add Admin</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F4F6F9",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#F4F6F9',
    },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
    backButton: { padding: 4 },

    card: {
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 16,
        marginHorizontal: 20,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        color: "#666",
        marginBottom: 8,
    },
    required: {
        color: "#D32F2F",
    },
    input: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        color: "#333",
        backgroundColor: "#FAFAFA",
    },

    statusContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    statusButton: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: "#F5F5F5",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "transparent",
    },
    statusButtonActive: {
        backgroundColor: "#E8F5E9",
        borderColor: "#2E7D32",
    },
    statusText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#777",
    },
    statusTextActive: {
        color: "#2E7D32",
    },

    addButton: {
        backgroundColor: "#2E7D32",
        marginHorizontal: 20,
        padding: 18,
        borderRadius: 16,
        alignItems: "center",
        marginTop: 25,
        shadowColor: "#2E7D32",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    addButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 17,
    },
});
