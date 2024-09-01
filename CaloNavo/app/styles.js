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
    welcomeText: {
        color: '#CB9CF2',
        fontSize: 60,
        textAlign: 'center',
        fontFamily: 'Inter_700Bold',
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
    titleText: {
        color: '#CB9CF2',
        fontSize: 28,
        fontFamily: 'Inter_600SemiBold',
    },
    button: {
        backgroundColor: '#F2F4F3',
        padding: 10,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 8,
        activeOpacity: 0.7
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
        fontSize:16, 
        paddingLeft:15, 
        paddingVertical: 10, 
        selectionColor: '#CB9CF2',
        placeholderTextColor:'rgba(242,244,243, 0.2)',
    }, 
    smallText: {
        color: '#F2F4F3',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
        paddingVertical: 5
},

});

export default styles;