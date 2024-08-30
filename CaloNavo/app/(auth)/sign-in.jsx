// import FormField from "../../components/FormField";
import { ScrollView, TextInput, TouchableOpacity, Text, Image, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from '../styles';

const SignIn = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>

                <View style={{ flex: 1, marginTop: 140 }}>
                    <Text style={styles.titleText}>
                        Glad to see you again!
                    </Text>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.defaultText}>
                        Email:
                    </Text>
                    <TextInput style={{ color: '#F2F4F3', backgroundColor: 'rgba(97, 98, 131, 0.2)', borderRadius: 8, fontSize:16, paddingLeft:15}}>


                    </TextInput>

                    <Text style={styles.defaultText}>
                        Password:
                    </Text>

                    <TextInput>

                    </TextInput>
                </View>
                <View style={{ flex: 1 }}>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>
                    <Text style={styles.defaultText}>
                        or continue with
                    </Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Google</Text>
                    </TouchableOpacity>
                    <Text style={styles.defaultWhiteText}>
                        By clicking continue, you agree to our Terms of Service and Privacy Policy
                    </Text>
                    <Text style={styles.defaultWhiteText}>
                        Don't have an account? Sign Up
                    </Text>
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