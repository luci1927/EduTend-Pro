import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function StudentProfile() {
    const router = useRouter();

    const student = {
        name: "Sahan Perera",
        id: "202401",
        grade: "Grade 10-A",
        dob: "May 15, 2009",
        gender: "Male",
        bloodGroup: "O+",
        admissionDate: "Jan 10, 2026",
        guardianName: "Sunil Perera",
        contact: "077 567 8890",
        address: "123 Guruge Mv, Dompe, Western",
        status: "Active",
    };

    const handleCall = () => Linking.openURL(`tel:${student.contact}`);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#111" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Student Profile</Text>
                <TouchableOpacity style={styles.editButton}>
                    <Ionicons name="pencil-outline" size={22} color="#2E7D32" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>{student.name.split(' ').map(n => n[0]).join('')}</Text>
                    </View>
                    <Text style={styles.studentName}>{student.name}</Text>
                    <Text style={styles.studentID}>{student.id} | {student.grade}</Text>

                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{student.status}</Text>
                    </View>
                </View>

                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.actionItem} onPress={handleCall}>
                        <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
                            <Ionicons name="call" size={20} color="#2E7D32" />
                        </View>
                        <Text style={styles.actionText}>Call</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionItem}>
                        <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
                            <Ionicons name="chatbubble-ellipses" size={20} color="#1976D2" />
                        </View>
                        <Text style={styles.actionText}>Message</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionItem}>
                        <View style={[styles.actionIcon, { backgroundColor: '#FFF3E0' }]}>
                            <Ionicons name="stats-chart" size={20} color="#F57C00" />
                        </View>
                        <Text style={styles.actionText}>Reports</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personal Information</Text>
                    <View style={styles.infoCard}>
                        <InfoRow label="Date of Birth" value={student.dob} icon="calendar-outline" />
                        <InfoRow label="Gender" value={student.gender} icon="person-outline" />
                        <InfoRow label="Blood Group" value={student.bloodGroup} icon="water-outline" />
                        <InfoRow label="Admission Date" value={student.admissionDate} icon="business-outline" />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Guardian & Contact</Text>
                    <View style={styles.infoCard}>
                        <InfoRow label="Guardian" value={student.guardianName} icon="people-outline" />
                        <InfoRow label="Phone" value={student.contact} icon="call-outline" />
                        <InfoRow label="Address" value={student.address} icon="location-outline" isLast />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
const InfoRow = ({ label, value, icon, isLast }: any) => (
    <View style={[styles.infoRow, isLast && { borderBottomWidth: 0 }]}>
        <View style={styles.infoIconBox}>
            <Ionicons name={icon} size={18} color="#777" />
        </View>
        <View style={{ flex: 1 }}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#F4F6F9" },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFF',
    },
    headerTitle: { fontSize: 28, fontWeight: '700', color: '#111' },
    backButton: { padding: 4 },
    editButton: { padding: 4 },

    profileHeader: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingBottom: 25,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 2,
    },
    avatarContainer: {
        width: 90,
        height: 90,
        borderRadius: 20,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 4,
        borderColor: '#FFF',
    },
    avatarText: { fontSize: 32, fontWeight: '800', color: '#2E7D32' },
    studentName: { fontSize: 22, fontWeight: '800', color: '#1A1A1A' },
    studentID: { fontSize: 14, color: '#777', marginTop: 4 },
    badge: {
        marginTop: 12,
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgeText: { color: '#2E7D32', fontSize: 12, fontWeight: '700' },

    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 25,
    },
    actionItem: { alignItems: 'center' },
    actionIcon: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    actionText: { fontSize: 12, fontWeight: '600', color: '#555' },

    section: { paddingHorizontal: 20, marginBottom: 20 },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: '#555', marginBottom: 10 },
    infoCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        elevation: 1,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    infoIconBox: { marginRight: 15 },
    infoLabel: { fontSize: 12, color: '#999', marginBottom: 2 },
    infoValue: { fontSize: 15, fontWeight: '600', color: '#333' },
});