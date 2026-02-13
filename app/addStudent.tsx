import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AddStudent() {
    const router = useRouter();

    // --- Core Student Data ---
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [gender, setGender] = useState<"Male" | "Female">("Male");

    // --- New Detailed Data (Guardians & Contact) ---
    const [guardianName, setGuardianName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [previousSchool, setPreviousSchool] = useState(""); // Optional: for transfer students

    const handleAddStudent = () => {
        // Validation: Ensure all critical fields are filled
        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !birthday ||
            !guardianName.trim() ||
            !contactNumber.trim() ||
            !address.trim()
        ) {
            Alert.alert("Validation Error", "Please complete all required fields.");
            return;
        }

        // Here you would send this complete object to your backend
        const newStudentData = {
            firstName,
            lastName,
            birthday,
            gender,
            guardianName,
            contactNumber,
            address,
            previousSchool,
        };

        console.log("Submitting Student Data:", newStudentData);

        Alert.alert(
            "Student Admitted",
            `Successfully enrolled ${firstName} ${lastName}!`
        );

        // Reset form
        setFirstName("");
        setLastName("");
        setBirthday(null);
        setGender("Male");
        setGuardianName("");
        setContactNumber("");
        setAddress("");
        setPreviousSchool("");

        router.back();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#111" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add New Student</Text>
                <TouchableOpacity style={styles.editButton}>
                    <Ionicons name="pencil-outline" size={22} color="#2E7D32" />
                </TouchableOpacity>
            </View>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                
                    

                {/* --- Section 1: Student Details --- */}
                <Text style={styles.sectionHeader}>Student Details</Text>

                {/* First Name */}
                <View style={styles.card}>
                    <Text style={styles.label}>First Name <Text style={styles.required}>*</Text></Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Shehan"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                </View>

                {/* Last Name */}
                <View style={styles.card}>
                    <Text style={styles.label}>Last Name <Text style={styles.required}>*</Text></Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Samarakoon"
                        value={lastName}
                        onChangeText={setLastName}
                    />
                </View>

                {/* Birthday */}
                <View style={styles.card}>
                    <Text style={styles.label}>Date of Birth <Text style={styles.required}>*</Text></Text>
                    <TouchableOpacity
                        style={styles.dateInput}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text style={{ color: birthday ? "#111" : "#999" }}>
                            {birthday
                                ? birthday.toDateString()
                                : "Select Date of Birth"}
                        </Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={birthday || new Date()}
                            mode="date"
                            display="default"
                            maximumDate={new Date()}
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if (selectedDate) setBirthday(selectedDate);
                            }}
                        />
                    )}
                </View>

                {/* Gender */}
                <View style={styles.card}>
                    <Text style={styles.label}>Gender <Text style={styles.required}>*</Text></Text>
                    <View style={styles.statusContainer}>
                        {["Male", "Female"].map((g) => (
                            <TouchableOpacity
                                key={g}
                                style={[
                                    styles.statusButton,
                                    gender === g && styles.statusButtonActive,
                                ]}
                                onPress={() => setGender(g as any)}
                            >
                                <Text
                                    style={[
                                        styles.statusText,
                                        gender === g && styles.statusTextActive,
                                    ]}
                                >
                                    {g}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* --- Section 2: Guardian & Contact Info --- */}
                <Text style={styles.sectionHeader}>Guardian & Contact</Text>

                {/* Guardian Name */}
                <View style={styles.card}>
                    <Text style={styles.label}>Guardian Name <Text style={styles.required}>*</Text></Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Damith Samarakoon"
                        value={guardianName}
                        onChangeText={setGuardianName}
                    />
                </View>

                {/* Phone Number */}
                <View style={styles.card}>
                    <Text style={styles.label}>Contact Number <Text style={styles.required}>*</Text></Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. +94 77 123 4567"
                        value={contactNumber}
                        onChangeText={setContactNumber}
                        keyboardType="phone-pad"
                    />
                </View>

                {/* Address */}
                <View style={styles.card}>
                    <Text style={styles.label}>Home Address <Text style={styles.required}>*</Text></Text>
                    <TextInput
                        style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                        placeholder="Enter full residential address"
                        value={address}
                        onChangeText={setAddress}
                        multiline={true}
                        numberOfLines={3}
                    />
                </View>

                {/* Previous School (Optional) */}
                <View style={styles.card}>
                    <Text style={styles.label}>School (If applicable)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Bandaranayake College, Gampaha"
                        value={previousSchool}
                        onChangeText={setPreviousSchool}
                    />
                </View>

                {/* Submit Button */}
                <TouchableOpacity style={styles.addButton} onPress={handleAddStudent}>
                    <Text style={styles.addButtonText}>Complete Admission</Text>
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
    editButton: { padding: 4 },
    
    sectionHeader: {
        fontSize: 18,
        fontWeight: "600",
        color: "#555",
        paddingHorizontal: 20,
        marginTop: 15,
        marginBottom: 10,
    },
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
    dateInput: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 12,
        padding: 14,
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