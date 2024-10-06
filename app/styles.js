import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexGrow: 1,
        backgroundColor: '#0E1116'
    },
    // To use only as a replacement for screens that do not need a ScrollView
    viewContainerMain: {
        height: '100%',
        backgroundColor: '#0E1116',
        paddingHorizontal: 0,
        flex: 1
    },
    viewContainer: {
        height: '100%',
        backgroundColor: '#0E1116',
        paddingHorizontal: 35,
        flex: 1
    },

    // HOME PAGE STYLES


    // Example: Quick Add Frame, Home
    viewHomeFrameNormal: {
        height: '100%',
        width: '100%',
        backgroundColor: '#1F2938',
        paddingVertical: 20,
        flex: 1,
        borderRadius: 8
    },
    // Example: Water Goal Frame, Home
    viewHomeFrameTall: {
        height: '100%',
        width: '100%',
        backgroundColor: '#1F2938',
        paddingVertical: 10,
        paddingHorizontal: 15,
        flex: 1,
        borderRadius: 8,
        alignContent: 'center', 
        paddingBottom: 85 
    },
    // Example: Columns of home screen
    containerColumn: {
        height: '100%',
        width: '100%',
        backgroundColor: '#0E1116',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
// HOME STYLES END





    welcomeText: {
        color: '#CB9CF2',
        fontSize: 50,
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
    frameTextWhite: {
        color: '#F2F4F3',
        fontSize: 20,
        paddingVertical: 10,
        fontFamily: 'Inter_600SemiBold',
        textAlign: 'center',
    },
    titleText: {
        color: '#CB9CF2',
        fontSize: 28,
        fontFamily: 'Inter_600SemiBold',
    },
    titleTextWhite: {
        color: '#F2F4F3',
        fontSize: 28,
        fontFamily: 'Inter_600SemiBold',
    },
    smallText: {
        color: '#F2F4F3',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
        paddingVertical: 5
    },
    button: {
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
    dropdownFieldStyle: {
        backgroundColor: 'rgba(97, 98, 131, 0.2)',
        borderRadius: 8,
        fontSize: 16
    },
    smallText: {
        color: '#F2F4F3',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
        paddingVertical: 5
    },
    optionsText: {
        color: '#F2F4F3',
        fontSize: 15,
        fontFamily: 'Inter_300Light',
        textAlign: 'left',
        paddingVertical: 3
    },

    optionsMenu: {
        backgroundColor: '#1F2938',
        borderRadius: 5,
        // width: 200, 
        // width: '60%',
        // height: 130,
        // height: '20%',
        position: 'absolute',
        top: 100,
        right: 50,
    },

    // Header styles
    header: {
        flexDirection: 'row',
        backgroundColor: '#1F2938',
        justifyContent: 'space-between',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        alignItems: 'flex-end',
        borderBottomWidth: 2,
        borderBottomColor: '#828282',
    },
    headerText: {
        fontWeight: 'bold',
        color: '#CB9CF2',
    },
    // Section header (Breakfast, Lunch, Dinner)
    sectionHeader: {
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#828282',
        backgroundColor: 'rgba(27,33,43,0.5)'
    },
    // List item styles (Eggs, Bacon, Toast, etc.)
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#828282',
        paddingLeft: 30, 
        alignItems: 'center'
    },
});

export default styles;