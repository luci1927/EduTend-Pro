import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StudentProfile() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [student, setStudent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStudentData();
    }, [id]);

    const loadStudentData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('@students_list');
            if (storedData) {
                const students = JSON.parse(storedData);
                const foundStudent = students.find((s: any) => s.id === id);
                setStudent(foundStudent);
            }
        } catch (error) {
            console.error("Error loading student profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCall = () => {
        if (student?.guardianContact) {
            Linking.openURL(`tel:${student.guardianContact}`);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#2E7D32" />
            </View>
        );
    }

    if (!student) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Student record not found.</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={{ color: 'blue', marginTop: 10 }}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        });
    };

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
                        <Text style={styles.avatarText}>
                            {student.name.split(' ').map((n: string) => n[0]).join('')}
                        </Text>
                    </View>
                    <Text style={styles.studentName}>{student.name}</Text>
                    <Text style={styles.studentID}>{student.studentNo} | {student.grade}</Text>

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
                        <InfoRow label="Date of Birth" value={formatDate(student.birthday)} icon="calendar-outline" />
                        <InfoRow label="Gender" value={student.gender} icon="person-outline" />
                        <InfoRow
                            label="Admission Date"
                            value={formatDate(student.admissionDate || new Date(parseInt(student.id)).toISOString())}
                            icon="business-outline"
                            isLast
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Guardian & Contact</Text>
                    <View style={styles.infoCard}>
                        <InfoRow label="Guardian" value={student.guardianName} icon="people-outline" />
                        <InfoRow label="Phone" value={student.guardianContact} icon="call-outline" />
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
            <Text style={styles.infoValue}>{value || "Not Provided"}</Text>
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