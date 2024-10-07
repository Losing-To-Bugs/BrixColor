import { View, FlatList, Text, Image, StyleSheet } from "react-native";
import { IMAGES } from "../constants/images";
import { legoColors } from "../constants/colors";

// TODO [] change the background color, maybe change all of the bricks to actually black
// TODO [] integrate with actual stored data
// TODO [] add option to remove from history
// TODO [] add option to clear history

const dataArr = [
    {
        color: "0x9B9A5A",
        confidence: 32,
        brick: "1x2_thin",
        timestamp: "2024-10-03T12:00:00Z"
    },
    {
        color: "0x879867",
        confidence: 99,
        brick: "1x4",
        timestamp: "2024-10-03T12:05:00Z"
    },
    {
        color: "0x039CBD",
        confidence: 89,
        brick: "2x6",
        timestamp: "2024-10-03T12:10:00Z"
    },
    {
        color: "0xCFE2F7",
        confidence: 68,
        brick: "1x3_thin",
        timestamp: "2024-10-03T12:15:00Z"
    },
    {
        color: "0xAA4D8E",
        confidence: 56,
        brick: "1x4_thin",
        timestamp: "2024-10-03T12:20:00Z"
    },
    {
        color: "0x9391E4",
        confidence: 92,
        brick: "2x8_thin",
        timestamp: "2024-10-03T12:25:00Z"
    },
    {
        color: "0x4B0082",
        confidence: 92,
        brick: "1x3_thin",
        timestamp: "2024-10-03T12:30:00Z"
    },
    {
        color: "0xFF879C",
        confidence: 89,
        brick: "1x8",
        timestamp: "2024-10-03T12:35:00Z"
    },
    {
        color: "0x845E84",
        confidence: 90,
        brick: "2x8",
        timestamp: "2024-10-03T12:40:00Z"
    },
    {
        color: "0x4C61DB",
        confidence: 56,
        brick: "1x8",
        timestamp: "2024-10-03T12:45:00Z"
    },
    {
        color: "0x0A1327",
        confidence: 90,
        brick: "1x3",
        timestamp: "2024-10-03T12:50:00Z"
    },
    {
        color: "0xB3D7D1",
        confidence: 45,
        brick: "1x6",
        timestamp: "2024-10-03T12:55:00Z"
    },
    {
        color: "0xA0BCAC",
        confidence: 12,
        brick: "1x2",
        timestamp: "2024-10-03T13:00:00Z"
    },
    {
        color: "0xBDC6AD",
        confidence: 40,
        brick: "1x8",
        timestamp: "2024-10-03T13:05:00Z"
    },
    {
        color: "0xFFF03A",
        confidence: 92,
        brick: "2x8_thin",
        timestamp: "2024-10-03T13:10:00Z"
    },
    {
        color: "0xcdc298",
        confidence: 92,
        brick: "2x6_thin",
        timestamp: "2024-10-03T13:15:00Z"
    },
    {
        color: "0xF3C988",
        confidence: 92,
        brick: "1x8_thin",
        timestamp: "2024-10-03T13:20:00Z"
    },
    {
        color: "0xF9BA61",
        confidence: 90,
        brick: "2x2_thin",
        timestamp: "2024-10-03T13:25:00Z"
    },
    {
        color: "0xF6D7B3",
        confidence: 92,
        brick: "1x1",
        timestamp: "2024-10-03T13:30:00Z"
    },
    {
        color: "0xAE7A59",
        confidence: 78,
        brick: "2x3",
        timestamp: "2024-10-03T13:35:00Z"
    },
    {
        color: "0xCA4C0B",
        confidence: 92,
        brick: "2x8_thin",
        timestamp: "2024-10-03T13:40:00Z"
    },
    {
        color: "0x5E3F33",
        confidence: 50,
        brick: "2x3_thin",
        timestamp: "2024-10-03T13:45:00Z"
    },
    {
        color: "0xC91A09",
        confidence: 92,
        brick: "2x4_thin",
        timestamp: "2024-10-03T13:50:00Z"
    },
    {
        color: "0xc01111",
        confidence: 92,
        brick: "1x6",
        timestamp: "2024-10-03T13:55:00Z"
    }
];



const HistoryList = () => {

    // Utility function to handle formatting brick names
    const handleIdentity = (identity) => {
        let name = identity.split("_");
        let type = name.length > 1 ? "Plate" : "Brick";
        return `${name[0]} ${type}`;
    };

    // Utility function to format timestamps
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    };


    return (
        <View style={{...styles.container, paddingTop: 15}}>

            {/* History List */}
            <FlatList
                accessibilityRole="list"
                accessibilityLabel="Scanned Brick History"
                showsVerticalScrollIndicator={true}
                data={dataArr}
                keyExtractor={(item, index) => index.toString()} // unique key for each item
                renderItem={({ index, item }) =>

                    // History Item
                    <View style={styles.itemContainer}>

                        {/* Confidence Text */}
                        <View style={styles.confidenceContainer} accessibilityLabel="Match Confidence">
                            <Text style={styles.confidenceText}>Confidence {item.confidence}%</Text>
                        </View>

                        {/* Lego Image */}
                        <View style={styles.imageContainer} accessibilityLabel="Lego Image">
                            <Image
                                source={IMAGES[item.brick]}
                                style={styles.image}
                                resizeMode="contain"
                            />
                        </View>

                        {/* Description */}
                        <View style={styles.textContainer} accessibilityLabel="LEGO Description">
                            <Text style={styles.itemText}>
                                {legoColors[item.color]}{"\n"}{handleIdentity(item.brick)}
                            </Text>
                        </View>

                        {/* Time Stamp */}
                        <View style={styles.timestampContainer} accessibilityLabel="Date When Scanned">
                            <Text style={styles.timestampText}>{formatTimestamp(item.timestamp)}</Text>
                        </View>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "center",
    },
    itemContainer: {
        backgroundColor: "white",
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
        width: 300,
        alignItems: "center",
    },
    confidenceContainer: {
        marginBottom: 10,
    },
    confidenceText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    imageContainer: {
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 100,  // Fixed width
        height: 100, // Fixed height
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
    },
    textContainer: {
        marginTop: 10,
    },
    itemText: {
        textAlign: "center",
        fontSize: 14,
        color: "#333",
    },
    timestampContainer: {
        marginTop: 5,
    },
    timestampText: {
        fontSize: 12,
        color: "#555",
    },
});

export default HistoryList;
