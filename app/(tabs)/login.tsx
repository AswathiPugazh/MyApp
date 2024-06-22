import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button as PaperButton, Dialog, Portal, Provider } from "react-native-paper";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import Axios from 'axios';
import { useRouter } from 'expo-router';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [visible, setVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      setDialogMessage("Please fill email and password");
      setVisible(true);
    } else {
      try {
        const { data } = await Axios.post("https://celebratingar2024.com/mobile/Backend/Login.php", {
          email: email,
          password: password,
        },
        {
          headers: {
              'Content-Type': 'application/json'
          }
      }
      
      );
        if (data.status === "success") {
          setDialogMessage("User login successful");
          console.log('Login successful');
          setVisible(true);
          setTimeout(() => {
            setVisible(false);
            router.push('/dashboard');
          }, 2000);
        } else {
          setDialogMessage("User not found");
          setVisible(true);
          console.log('Login failed', data.message);
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
  };

  const hideDialog = () => setVisible(false);

  return (
    <Provider>
      <ImageBackground style={styles.bgimg} source={require('../../assets/images/bgimg.jpg')}>
        <View style={styles.container}>
          <View style={styles.topHalf} />
          <View style={styles.bottomHalf}>
            <View style={styles.registerContainer}>
              <Text style={styles.header}>Login</Text>
              <TextInput
                label="Email"
                mode="outlined"
                value={email} 
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.textInput}
              />
              <TextInput
                label="Password"
                mode="outlined"
                value={password} 
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                style={styles.textInput}
              />
              <Text style={styles.forgotPassword}>Forgot password?</Text>
              <PaperButton
                mode="contained"
                onPress={handleLogin}
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                Login
              </PaperButton>
              <Text style={styles.paraText}>
                Create an account?{" "}
                <Text
                  style={styles.registerLink}
                  onPress={() => navigation.navigate("register" as never)}
                >
                  Register here
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title style={styles.dialogTitle}>Alert</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogMessage}>{dialogMessage}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={hideDialog} labelStyle={styles.dialogButton}>OK</PaperButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  bgimg: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  topHalf: {
    flex: 1,
  },
  bottomHalf: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  registerContainer: {
    width: "85%",
    padding: 20,
    backgroundColor: "rgba(10, 10, 10, 0.8)",
    borderRadius: 10,
  },
  textInput: {
    marginBottom: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#DFE0DC",
    marginBottom: 15,
    textAlign: "center",
  },
  forgotPassword: {
    color: "#DFE0DC",
    textDecorationLine: "underline",
    marginBottom: 20,
    textAlign: "right",
  },
  button: {
    backgroundColor: "#B26700",
    marginTop: 10,
    borderRadius: 5,
  },
  buttonLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  paraText: {
    marginTop: 20,
    color: "#DFE0DC",
    textAlign: "center",
  },
  registerLink: {
    color: "#B26700",
    textDecorationLine: "underline",
    fontWeight: "600",
    fontSize: 16,
  },
  dialog: {
    alignSelf: 'center',
    width: '80%',
  },
  dialogTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#03312E',
  },
  dialogMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#03312E',
  },
  dialogButton: {
    color: '#B26700',
  },
});
