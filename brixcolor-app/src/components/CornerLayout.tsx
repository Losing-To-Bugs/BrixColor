import {View, StyleSheet, LayoutAnimation} from 'react-native';

const CornerLayout = ({ top, left, width, height }) => {
    LayoutAnimation.configureNext(
        LayoutAnimation.create(400, 'easeInEaseOut', 'scaleXY'),
    );

    return (
        <View style={[styles.cornerContainer, { top, left, width, height }]}>
            {/* Top Left Corner */}
            <View style={[styles.corner, styles.topLeft, styles.rounded]} />
            {/* Top Right Corner */}
            <View style={[styles.corner, styles.topRight, styles.rounded]} />
            {/* Bottom Left Corner */}
            <View style={[styles.corner, styles.bottomLeft, styles.rounded]} />
            {/* Bottom Right Corner */}
            <View style={[styles.corner, styles.bottomRight, styles.rounded]} />
        </View>
    );
};

const cornerWidth = 2
const styles = StyleSheet.create({
    cornerContainer: {
        position: 'absolute',
        borderWidth: 0, // Hide default border
    },
    corner: {
        width: 20,
        height: 20,
        borderColor: '#00FF00',
        position: 'absolute',
    },
    rounded: {
        borderRadius: 3, // Adjust this for more or less rounding
    },
    topLeft: {
        borderLeftWidth: cornerWidth,
        borderTopWidth: cornerWidth,
        top: 0,
        left: 0,
    },
    topRight: {
        borderRightWidth: cornerWidth,
        borderTopWidth: cornerWidth,
        top: 0,
        right: 0,
    },
    bottomLeft: {
        borderLeftWidth: cornerWidth,
        borderBottomWidth: cornerWidth,
        bottom: 0,
        left: 0,
    },
    bottomRight: {
        borderRightWidth: cornerWidth,
        borderBottomWidth: cornerWidth,
        bottom: 0,
        right: 0,
    },
});


export default CornerLayout;