import { View } from 'react-native';
import { router } from 'expo-router';
import CustomScreen from '../components/structural/CustomScreen';
import CustomButton2 from '../components/functional/CustomButton2';
import QuestionAnswer from '../components/functional/QuestionAnswer';
import { useState } from 'react';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

// TODO: change so placeholders match users info
// Function to handle the design of the Reports screen of CaloNavo

const html = `
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        </head>
        <body>
            <h1>HERALDS's Report</h1>
            <h2>
                Welcome to your report for the past three months.<br>
                Below you will find your data from [3/MTH/AGO] to today, [TO/DA/Y].
            </h2>

        </body>
    </html>
` // html end

const Report = () => {
    const [selectedPrinter, setSelectedPrinter] = useState("");

    // let [name, setName] = useState('');
    const [userName, setUserName] = useState("");
    // Ensure these work later
    const [calGoal, setCalGoal] = useState(2400)
    const [carb, setCarb] = useState(225)
    const [protein, setProtein] = useState(75)
    const [fat, setFat] = useState(67)

    // Searches database for user's username
    const getProfileInfo = async () => {
        try {
            const userID = auth().currentUser.uid;
            const userDoc = await firestore().collection('Users').doc(userID).get();
            const userData = userDoc.data()
            if (userData.username === "") {
                setUserName(userData.email);  // If username is empty, display the email
            } else {
                setUserName(userData.username);  // Otherwise, set it to the username
            }

            // Later get these to work
            // setCalGoal(Number(userData.calGoal))

            // const [carbRatio, proteinRatio, fatRatio] = userData.macroGoal.split(':').map(Number);

            // calculates the grams needed based on ratio and cal goal
            // setCarb(Math.round(calGoal * (carbRatio / 100) / 4))
            // setProtein(Math.round(calGoal * (proteinRatio / 100) / 9))
            // setFat(Math.round(calGoal * (fatRatio / 100) / 4))


        } catch (e) {
            getProfileInfo() // if profile info can't be fetched, try again
        }
    }

    const print = async () => {
        await Print.printAsync({
            html,
            printerUrl: selectPrinter?.url,
        });
    };

    const printToFile = async () => {
        const { uri } = await Print.printToFileAsync({ html });
        console.log('File has been saved to:', uri)
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf'})

        // const html = `
        //     <html>
        //         <body>
        //             <h1>${userName}'s Report</h1>
        //             <h2>
        //                 Welcome to your report for the past three months.<br>
        //                 Below you will find your data from [3/MTH/AGO] to today, [TO/DA/Y].
        //             </h2>

        //         </body>
        //     </html>

        // ` // html end

        // try {
        //     const { uri } = await printToFileAsync({ html });
        //     console.log('PDF generated at:', uri);
        //     alert(`PDF saved to ${uri}`)
        // } catch (error) {
        //     console.error('Failed to generate PDF:', error);
        // }

        // const file = await printToFileAsync({
        //     html: html,
        //     base64: false
        // });

        // await shareAsync(file.uri);

    };

    const selectPrinter = async () => {
        const printer = await Print.selectPrinterAsync();
        setSelectedPrinter(printer);
    }

    return (
        <CustomScreen
            title="Report"
            info = "Help us double check everything to set up your PDF report!"
            screenContent={
                // View that holds all of the questions and fields
                <View style={{ flex: 5 }}>
                    {/* Questions */}
                    {/* Diet plan question and field */}
                    <QuestionAnswer
                        type={'text'}
                        question={'What is your diet plan?'}
                        placeholder={'Keto'}>
                    </QuestionAnswer>

                    {/* Calorie goal question and field */}
                    <QuestionAnswer
                        type={'text'}
                        question={'What is your daily calorie goal?'}
                        placeholder={'2,500'}>
                    </QuestionAnswer>

                    {/* Water goal question and field */}
                    <QuestionAnswer
                        type={'text'}
                        question={'What is your daily water goal?'}
                        placeholder={'9 cups'}>
                    </QuestionAnswer>

                    {/* Weight question and field */}
                    <QuestionAnswer
                        type={'text'}
                        question={'What is your weight goal?'}
                        placeholder={'Cut / Lose'}>
                    </QuestionAnswer>

                    {/* Space between Questions and Submit */}
                    <View style={{ margin: 20 }}></View>

                    {/* Submit Button */}
                    <CustomButton2
                        type={'normal'}
                        text={'Create PDF'}
                        // onPress={() => router.push('/home')}
                        //onPress={generatePDF}
                        onPress={printToFile}
                        // {Platform.OS === 'ios' && (
                        //     <>
                        //     <View style={styles.spacer} />
                        //     <Button title="Select printer" onPress={selectPrinter} />
                        //     <View style={styles.spacer} />
                        //     {selectedPrinter ? (
                        //         <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text>
                        //     ) : undefined}
                        //     </>
                        // )}
                    >
                    </CustomButton2>
                </View>
            }
        />
    )
}
export default Report;