import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    FlatList,
    TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Mock Data Type
interface Admin {
    id: string;
    name: string;
    role: "Super Admin" | "Editor" | "Viewer";
    email: string;
    status: "Active" | "Inactive";
}

export default function ManageAdmins() {
    // 1. Mock Data State
    const [admins, setAdmins] = useState<Admin[]>([
        { id: "1", name: "Nimesh Gunawardane", role: "Super Admin", email: "nimeg@gmail.com", status: "Active" },
        { id: "2", name: "Rohan Peiris", role: "Editor", email: "rohan.p@gmail.com", status: "Active" },
        { id: "3", name: "Duriya Fernando", role: "Viewer", email: "duriya.f@gmail.com", status: "Inactive" },
        { id: "4", name: "Bhagya Nethmini", role: "Viewer", email: "bhagya.n@gmail.com", status: "Active" },
    ]);

    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    // 2. Handle Delete Action
    const handleDelete = (id: string, name: string) => {
        Alert.alert(
            "Remove Admin",
            `Are you sure you want to remove ${name}?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: () => setAdmins(prev => prev.filter(admin => admin.id !== id))
                }
            ]
        );
    };

    // 3. Render Individual Admin Card
    const renderAdminItem = ({ item }: { item: Admin }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>{item.name.split(' ').map(n => n[0]).join('')}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <Text style={styles.emailText}>{item.email}</Text>
                </View>
                <View style={[styles.badge, item.status === "Active" ? styles.badgeActive : styles.badgeInactive]}>
                    <Text style={[styles.badgeText, item.status === "Active" ? styles.textActive : styles.textInactive]}>
                        {item.status}
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.actionRow}>
                <View style={styles.roleContainer}>
                    <Ionicons name="shield-checkmark-outline" size={16} color="#555" />
                    <Text style={styles.roleText}>{item.role}</Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => Alert.alert("Edit", `Edit ${item.name}`)}>
                        <Ionicons name="create-outline" size={20} color="#2E7D32" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => handleDelete(item.id, item.name)}>
                        <Ionicons name="trash-outline" size={20} color="#D32F2F" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Manage Admins</Text>
                <Text style={styles.headerSubtitle}>Total Admins: {admins.length}</Text>
            </View>

            {/* Search Bar (Reusing Input Style) */}
            <View style={styles.searchBar}>
                <Ionicons name="search-outline" size={20} color="#999" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search admins..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* List */}
            <FlatList
                data={admins.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()))}
                keyExtractor={(item) => item.id}
                renderItem={renderAdminItem}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No admins found.</Text>
                }
            />

            <TouchableOpacity style={styles.fab} onPress={() => router.push("/addAdmin")}>
                <Ionicons name="person-add" size={24} color="#FFF" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F4F6F9",
    },
    headerContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "800",
        color: "#1A1A1A",
    },
    headerSubtitle: { fontSize: 14, color: "#666", marginTop: 4 },
    // --- Search Style ---
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
    // --- Card Style (Reused & Adapted) ---
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        marginHorizontal: 20,
        marginBottom: 12,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatarPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 12,
        backgroundColor: "#E8F5E9",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    avatarText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#2E7D32",
    },
    infoContainer: {
        flex: 1,
    },
    nameText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#333",
    },
    emailText: {
        fontSize: 13,
        color: "#777",
        marginTop: 2,
    },
    // --- Badges ---
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    badgeActive: {
        backgroundColor: "#E8F5E9",
    },
    badgeInactive: {
        backgroundColor: "#FFEBEE",
    },
    badgeText: {
        fontSize: 12,
        fontWeight: "600",
    },
    textActive: {
        color: "#2E7D32",
    },
    textInactive: {
        color: "#D32F2F",
    },
    // --- Actions ---
    divider: {
        height: 1,
        backgroundColor: "#F0F0F0",
        marginVertical: 12,
    },
    actionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    roleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    roleText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#555',
        marginLeft: 6
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    iconButton: {
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
    // --- Footer Button ---
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        color: '#999',
        fontSize: 16
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