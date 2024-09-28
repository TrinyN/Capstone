import { TouchableOpacity, TextInput, Text, View, FlatList, Dimensions, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';
import Feather from "react-native-vector-icons/Feather";
import { useState, useRef } from 'react';
import { Overlay } from '@rneui/base';
import DropDownPicker from 'react-native-dropdown-picker';
import { router } from 'expo-router';
import PieChart from 'react-native-pie-chart'
import CustomDatePicker from '../components/CustomDatePicker';



// problems:
// looks weird on android (feather icon positions doesnt line up with drop down icon)
// make email not be editable and no edit icon next to it
// change data types ex: birth date should be a date and allow user to pick from calendar maybe, height should allow user to input value for ft and also inches

// REFACTORING FLAGGING - Needs a Component
// 1. Screen component
// 2. Screen header component
// 3. Render list component(s) - list item
// 6. Spacing component
// 5. Pie chart container? - Not too necessary though
// 6. Small button component? ~ CustomButton implementation?

const Profile = () => {
    const { width } = Dimensions.get('window');
    const widthAndHeight = (width * 0.30)

    // test data for macro ratio goal
    const [series, setSeries] = useState([15, 35, 40]);

    // colors for pie chart
    const sliceColor = ['#80FF72', '#7EE8FA', '#FFF07C']

    // saves visibility of log out pop up
    const [visibleLogOut, setVisibleLogOut] = useState(false);

    // change visibility of log out pop up
    const toggleLogOut = () => {
        setVisibleLogOut(!visibleLogOut);
    };

    const [saveVisibility, setSaveVisibility] = useState(false);

    // const toggleSaveVisibility = () => {
    //     setSaveVisibility(!saveVisibility)
    // }

    // const opacity = saveVisibility ? 1: 0
    const opacity = 1

    // test data, will need to start off empty and be saved for each user
    const [userInfo, setUserInfo] = useState([
        { title: 'Email', value: 'trinynguyen@gmail.com', type: '', options: [] },
        { title: 'Name', value: 'Triny', type: 'text', options: [] },
        { title: 'Gender', value: 'Female', type: 'dropdown', options: ['Female', 'Male'] },
        { title: 'Date of Birth', value: '08/23/2003', type: 'date', options: [] },
        { title: 'Height', value: '5 feet 0 in', type: 'text', options: [] },
        { title: 'Weight', value: '1,000 lbs', type: 'text', options: [] },
        { title: 'Caloric Goal', value: '2,400', type: 'text', options: [] },
        { title: 'Water Goal', value: '9 cups per day', type: 'text', options: [] },
        { title: 'Weight Goal', value: 'Gain', type: 'dropdown', options: ['Gain', 'Lose', 'Maintain'] },
        { title: 'Diet Plan', value: 'Keto (Custom)', type: 'dropdown', options: ['Keto', 'Vegetarian'] },
        { title: 'Macro Ratio Goal', value: '15:35:40', type: 'text', options: [] },

    ]);


    const Item = ({ title, value, index, type, options }) => {
        const textInputRef = useRef();

        // saves editability state
        const [editable, setEditable] = useState(false);

        // change whether text input is editable
        const enableEditable = () => {
            setEditable(true);
            setTimeout(() => textInputRef.current.focus(), 100)// Focus the TextInput if it is becoming editable
        };

        const disableEditable = () => {
            setEditable(false);
        }

        // if index is even, have transparent background, else dark gray
        const backgroundColor = index % 2 === 0 ? 'transparent' : '#0E1116';

        // open state of dropdown picker
        const [open, setOpen] = useState(false);

        // selected value of dropdown picker
        const [selectedValue, setSelectedValue] = useState({});
        const [text, setText] = useState('');

        const renderText = () => {
            return (
                <TextInput
                    ref={textInputRef}
                    multiline={false}
                    placeholder={value}
                    placeholderTextColor={'#F2F4F3'}
                    placeholderStyle={[styles.smallText, { textAlign: 'left', flex: 1, paddingLeft: 10 }]}
                    // editable={editable}
                    style={[styles.smallText, { color: '#ABABAB', textAlign: 'left', flex: 1, paddingLeft: 10 }]}
                    selectionColor={'#CB9CF2'}
                    // onSubmitEditing={disableEditable}
                    // onEndEditing={disableEditable}

                    // onChangeText={toggleSaveVisibility}
                    // onSelectionChange={toggleSaveVisibility}
                    value={text}
                    onChangeText={(textInput) => {
                        setText(textInput); // Update the text state
                        // setOpacity(1); // Show save button if there's text
                        // setSaveVisibility(textInput.length > 0)
                    }}
                >
                </TextInput>
            )
        }

        const renderAppropriateField = () => {
            switch (type) {

                case 'dropdown':
                    return (
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <DropDownPicker
                                showArrowIcon={true}
                                open={open}
                                value={selectedValue}
                                setOpen={setOpen}
                                setValue={setSelectedValue}
                                items={options.map(option => ({ label: option, value: option }))}

                                // fyi: items are the different items you can select in the dropdown
                                // value is the item that has been selected by the user

                                // styling
                                dropDownDirection='TOP'
                                style={{ alignSelf: 'center', textAlign: 'center', backgroundColor: 'transparent', borderWidth: 0, paddingHorizontal: 10 }}
                                theme='DARK'
                                placeholder={value}
                                placeholderStyle={[styles.smallText, { textAlign: 'left' }]}
                                dropDownContainerStyle={{ theme: 'DARK', borderWidth: 0, position: 'absolute' }}
                                textStyle={[styles.smallText, { color: '#ABABAB', textAlign: 'left' }]}
                            />
                        </View>
                    )

                case 'text':
                    return (
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, paddingVertical: 10 }}>
                            <View style={{ flex: 1 }}>
                                {renderText()}
                            </View>

                            <View style={{ alignItems: 'flex-end', justifyContent: 'center', paddingRight: 12, paddingLeft: 10 }}>
                                <TouchableOpacity onPress={enableEditable} style={{ widthAndHeight: '100%' }}>
                                    <Feather name={"edit-2"} size={15} color="#CB9CF2" />
                                </TouchableOpacity>
                            </View>

                        </View>

                    )

                case 'date':
                    return (
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1}}>
                            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                                <CustomDatePicker placeholder={value}/>
                            </View>
                            <View style={{ alignItems: 'flex-end', justifyContent: 'center', paddingRight: 12, paddingLeft: 10 }}>
                                <TouchableOpacity style={{ pointerEvents: 'none', widthAndHeight: '100%' }}>
                                    <Feather name={"edit-2"} size={15} color="#CB9CF2" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                default:
                    return (
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, paddingVertical: 10, paddingRight: 10 }}>
                            <View style={{ flex: 1 }}>
                                {renderText()}
                            </View>
                        </View>
                    )
            }

        };

        return (
            <View style={[{ justifyContent: 'center', backgroundColor, flexDirection: 'row', alignItems: 'center', flex: 1, height: 50 }]}>
                <View style={{ width: '40%' }}>
                    <Text style={[styles.smallText, { fontFamily: 'Inter_600SemiBold', color: '#CB9CF2', textAlign: 'left', paddingHorizontal: 10 }]}>{title}</Text>
                </View>
                {renderAppropriateField()}
            </View>

        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                {/* The "body" of the screen view */}
                <View style={[styles.viewContainer, { flex: 1 }]}>

                    {/* Screen header */}
                    <View style={{ marginTop: 70, flexDirection: 'row', paddingBottom: 83, alignItems: 'center' }}>

                        <Text style={[styles.titleText, { flex: 1 }]}>
                            Your Profile
                        </Text>

                        {/* Log out button */}
                        <TouchableOpacity onPress={toggleLogOut} style={{ width: 30 }}>
                            <Feather name="log-out" size={30} color="#CB9CF2" />
                        </TouchableOpacity>

                    </View>


                    {/* Flat list to show profile information */}
                    <View style={{ borderRadius: 10, backgroundColor: 'rgba(27,33,43,0.5)' }}>
                        <FlatList
                            data={userInfo}
                            renderItem={({ item, index }) => <Item title={item.title} value={item.value} index={index} type={item.type} options={item.options} item={item} />}
                            keyExtractor={item => item.title}
                            scrollEnabled={false}
                        />

                    </View>

                    {/* Macro Pi Chart Container*/}
                    <View style={{ paddingTop: 30, paddingBottom: 10 }}>
                        <View style={{ flexDirection: 'row', borderRadius: 10, backgroundColor: 'rgba(27,33,43,0.5)', justifyContent: 'space-between' }}>
                            <View style={{ justifyContent: 'center', padding: 20, justifyContent: 'space-evenly' }}>

                                {/* Legend for Pie Chart*/}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: 15, height: 15, borderRadius: 7.5, marginRight: 8, backgroundColor: '#80FF72' }} />
                                    <Text style={[styles.defaultWhiteText]}>
                                        Carb {Number(Math.round((series[0] / (series[0] + series[1] + series[2]) * 100) + 'e' + 1) + 'e-' + 1)}{"%"}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: 15, height: 15, borderRadius: 7.5, marginRight: 8, backgroundColor: '#7EE8FA' }} />
                                    <Text style={styles.defaultWhiteText}>
                                        Protein {Number(Math.round((series[1] / (series[0] + series[1] + series[2]) * 100) + 'e' + 1) + 'e-' + 1)}{"%"}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: 15, height: 15, borderRadius: 7.5, marginRight: 8, backgroundColor: '#FFF07C' }} />
                                    <Text style={styles.defaultWhiteText}>
                                        Fat {Number(Math.round((series[2] / (series[0] + series[1] + series[2]) * 100) + 'e' + 1) + 'e-' + 1)}{"%"}
                                    </Text>
                                </View>
                            </View>

                            {/* Macro Pi Chart*/}
                            <View style={{ paddingVertical: 20, paddingRight: 20 }}>
                                <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor}
                                    style={{ strokeWidth: '4', stroke: '#141920' }}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{}}>
                        <View style={{ flexDirection: 'row-reverse', paddingBottom: 30, justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                // disabled={!saveVisibility}
                                style={[styles.button, { opacity, backgroundColor: '#CB9CF2', paddingVertical: 0 }]}>
                                <Text style={[styles.defaultText, { color: '#0E1116', fontSize: 14, paddingVertical: 5 }]} >
                                    Save
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Popup for log out */}
                    <Overlay isVisible={visibleLogOut} onBackdropPress={toggleLogOut} overlayStyle={{ backgroundColor: '#0E1116', borderWidth: 2, borderColor: '#CB9CF2', width: '90%' }}>

                        <View style={[{ paddingHorizontal: 8, justifyContent: 'center' }]}>
                            <Text style={[styles.defaultText, { color: '#F2F4F3', textAlign: 'center' }]}>
                                Are you sure you want to log out?
                            </Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30 }}>
                                <TouchableOpacity onPress={toggleLogOut} style={[styles.button, { backgroundColor: '#0E1116', borderWidth: 1, borderColor: '#F2F4F3', width: '40%' }]}>

                                    <Text style={[styles.buttonText, { color: '#F2F4F3' }]}>Cancel</Text>

                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { router.push('') }} style={[styles.button, { backgroundColor: '#CB9CF2', width: '40%' }]}>
                                    <Text style={[styles.buttonText, { color: '0E1116' }]}>Log Out</Text>

                                </TouchableOpacity>

                            </View>

                        </View>

                    </Overlay>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
export default Profile;