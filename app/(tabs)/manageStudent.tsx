import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TextInput,
    Linking,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Mock Data Type
interface Student {
    id: string;
    name: string;
    grade: string;
    studentNo: string;
    guardianContact: string;
    status: "Present" | "Absent" | "On Leave";
}

export default function StudentManagement() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    // 1. Mock Data
    const [students] = useState<Student[]>([
        { id: "101", name: "Sahan Perera", grade: "Grade 10-A", studentNo: "202401", guardianContact: "0775550101", status: "Present" },
        { id: "102", name: "Nihal Kesara", grade: "Grade 10-B", studentNo: "202405", guardianContact: "0745550102", status: "Absent" },
        { id: "103", name: "Daham Pandula", grade: "Grade 9-C", studentNo: "202412", guardianContact: "0715550103", status: "On Leave" },
    ]);

    // 2. Action Helpers
    const handleCall = (number: string) => {
        Linking.openURL(`tel:${number}`);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Present": return "#2E7D32";
            case "Absent": return "#D32F2F";
            case "On Leave": return "#F57C00";
            default: return "#777";
        }
    };

    // 3. Render Student Card
    const renderStudentItem = ({ item }: { item: Student }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>{item.name.split(' ').map(n => n[0]).join('')}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <Text style={styles.idText}>Student No: {item.studentNo}</Text>
                </View>
                <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) + '15' }]}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
                </View>
            </View>

            <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                    <Ionicons name="school-outline" size={14} color="#777" />
                    <Text style={styles.detailText}>{item.grade}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Ionicons name="call-outline" size={14} color="#777" />
                    <Text style={styles.detailText}>{item.guardianContact}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.actionRow}>
                <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/studentProfile")}>
                    <Text style={styles.secondaryButtonText}>View Profile</Text>
                </TouchableOpacity>

                <View style={styles.iconActions}>
                    <TouchableOpacity style={styles.circleIcon} onPress={() => handleCall(item.guardianContact)}>
                        <Ionicons name="call" size={18} color="#2E7D32" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circleIcon}>
                        <Ionicons name="create-outline" size={18} color="#2E7D32" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Manage Students</Text>
                <Text style={styles.headerSubtitle}>Total Students: {students.length}</Text>
            </View>

            <View style={styles.searchBar}>
                <Ionicons name="search-outline" size={20} color="#999" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name or student number..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <FlatList
                data={students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.studentNo.includes(searchQuery))}
                keyExtractor={(item) => item.id}
                renderItem={renderStudentItem}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            <TouchableOpacity style={styles.fab} onPress={() => router.push("/addStudent")}>
                <Ionicons name="person-add" size={24} color="#FFF" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#F4F6F9" },
    header: { paddingHorizontal: 20, paddingTop: 20, marginBottom: 15 },
    headerTitle: { fontSize: 28, fontWeight: "800", color: "#1A1A1A" },
    headerSubtitle: { fontSize: 14, color: "#666", marginTop: 4 },

    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        marginHorizontal: 20,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 12,
        height: 50,
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },

    card: {
        backgroundColor: "#FFF",
        marginHorizontal: 20,
        marginBottom: 15,
        borderRadius: 16,
        padding: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    cardHeader: { flexDirection: "row", alignItems: "center" },
    avatarPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 12,
        backgroundColor: "#F0F0F0",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    avatarText: { fontWeight: "700", color: "#555", fontSize: 16 },
    infoContainer: { flex: 1 },
    nameText: { fontSize: 17, fontWeight: "700", color: "#1A1A1A" },
    idText: { fontSize: 13, color: "#888", marginTop: 2 },

    statusIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusDot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
    statusText: { fontSize: 11, fontWeight: "700" },

    detailsRow: { flexDirection: "row", marginTop: 15 },
    detailItem: { flexDirection: "row", alignItems: "center", marginRight: 20 },
    detailText: { fontSize: 13, color: "#666", marginLeft: 6 },

    divider: { height: 1, backgroundColor: "#F0F0F0", marginVertical: 15 },

    actionRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    secondaryButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: "#F5F5F5",
    },
    secondaryButtonText: { fontSize: 13, fontWeight: "600", color: "#555" },

    iconActions: { flexDirection: "row" },
    circleIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "#FAFAFA",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        borderWidth: 1,
        borderColor: "#EEE",
    },

    fab: {
        position: "absolute",
        bottom: 30,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 14,
        backgroundColor: "#2E7D32",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#2E7D32",
        shadowOpacity: 0.4,
        shadowRadius: 10,
    }
});