// import FormField from "../../components/FormField";
import { ScrollView, TouchableOpacity, Text, Image, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../font-styles';

const SignIn = () => {


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>

                <View style={{ flex: 1 }}>
                    <Text style={styles.titleText}>
                        Glad to see you again!
                    </Text>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.defaultText}>
                        Email:
                    </Text>
                    <Text style={styles.defaultText}>
                        Password:
                    </Text>
                </View>
                <View style={{ flex: 1 }}>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Google</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* 
                    <FormField 
                        title = "Email"
                        // value={form.email}
                        // handleChangeText={(e) => setForm({...form, email:e})}
                    
                    /> */}

        </SafeAreaView>



    )



}
export default SignIn;