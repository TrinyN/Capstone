import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexGrow: 1,
        backgroundColor: '#0E1116'
    },
    viewContainer: {
        height: '100%',
        backgroundColor: '#0E1116',
        paddingHorizontal: 35,
        flex: 1
    },
    defaultText: {
        color: '#CB9CF2',
        fontSize: 20,
        // paddingLeft:25,
        paddingVertical: 15,
        fontFamily: 'Inter_600SemiBold',
    },
    defaultWhiteText: {
        color: '#F2F4F3',
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
    },
    smallText: {
        color: '#F2F4F3',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
        paddingVertical: 5
    },
    button: { // Some overlap between profile, shlist, custBut but it seems okay?
        backgroundColor: '#F2F4F3',
        padding: 10,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 8,
        activeOpacity: 0.7, 
        minHeight: 30, 
    },
    buttonText: {
        color: '#0E1116',
        fontSize: 16,
        fontFamily: 'Inter_500Medium',
    },
    inputFieldStyle: {
        color: '#F2F4F3',
        backgroundColor: 'rgba(97, 98, 131, 0.2)',
        borderRadius: 8,
        fontSize: 16,
        paddingLeft: 15,
        paddingVertical: 10,
        height: 45
        // selectionColor: '#CB9CF2',
        // placeholderTextColor:'rgba(242,244,243, 0.5)',
    },
    optionsText: {
        color: '#F2F4F3',
        fontSize: 15,
        fontFamily: 'Inter_300Light',
        textAlign: 'left',
        paddingVertical: 3
    },
    // Header styles
    headerText: {
        color: '#CB9CF2',
        fontSize: 18, 
        paddingVertical: 10, 
        flex: 1,
        textAlign: 'left'
    },
});

export default styles;