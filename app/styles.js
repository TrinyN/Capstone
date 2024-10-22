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
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 8,
        activeOpacity: 0.7, 
        justifyContent: 'center', 
        height: 45
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
        paddingHorizontal: 15,
        paddingVertical: 10,
        height: 45,
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
});
export default styles;