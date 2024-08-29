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
        fontWeight: 'bold',
        fontSize: 60,
        textAlign: 'center',
    },
    defaultText: {
        color: '#CB9CF2',
        fontSize: 20,
        fontWeight: '500',
        paddingLeft:25
    },
    defaultWhiteText: {
        color: '#F2F4F3',
        fontSize: 16,
        fontWeight: '500',
    },
    titleText: {
        color: '#CB9CF2',
        fontSize: 28,
        fontWeight: '500',
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
        fontWeight: '20',
    },
});

export default styles;