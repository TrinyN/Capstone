import { Text, View, StyleSheet } from "react-native";
import styles from "../../styles";

const GlanceText = ({ type, prompt, text}) => {
    if (type === 'vert') {
        return (
            <View>
                {/* Average weight of week */}
                <Text style={[styles.smallText, { color: '#CB9CF2' }]}>
                    {prompt}
                </Text>
                {/* TODO: Implement retrieval and calculation of average weight */}
                {/* Calculated average weight */}
                <Text style={[styles.smallText]}>
                    {text}
                </Text>
            </View>
        )
    } else if (type === 'horiz') {
        return (
            <View style={glanceTextStyle.subCalcView}>
                {/* Average weight of week */}
                <Text style={[styles.smallText, glanceTextStyle.calcViewText]}>
                    {prompt}
                </Text>
                {/* TODO: Implement retrieval and calculation of average weight */}
                {/* Calculated average weight */}
                <Text style={[styles.smallText]}>
                    {text}
                </Text>
            </View>
        )
    }
}
export default GlanceText;

const glanceTextStyle = StyleSheet.create({
    subCalcView:{
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'center'
    },
    calcViewText:{
        color: '#CB9CF2', 
        marginRight: 5
    }
})