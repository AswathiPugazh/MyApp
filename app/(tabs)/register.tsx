import React, { useState } from "react";
import { useRouter } from "expo-router";
import { TextInput, Button as PaperButton, Dialog, Portal, Provider } from "react-native-paper";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import Axios from 'axios';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [visible, setVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (name.trim() === "" || email.trim() === "" || password.trim() === "" || mobileNumber.trim() === "") {
      setDialogMessage("Please fill all fields");
      setVisible(true);
    } else {
      try {
        const { data } = await Axios.post("https://celebratingar2024.com/mobile/Backend/Register.php", {
          name: name,
          email: email,
          password: password,
          mobileNumber: mobileNumber,
        },
        {
          headers: {
              'Content-Type': 'application/json'
          }
        }
        );
        if (data.status === "success") {
          setDialogMessage("User registered successfully");
          setVisible(true);
          setTimeout(() => {
            setVisible(false);
            router.push("/login");
          }, 2000);
        } else {
          setDialogMessage(data.msg || "Registration failed");
          setVisible(true);
        }
      } catch (error) {
        console.log(error);
        setDialogMessage("Registration failed. Please try again later.");
        setVisible(true);
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
              <Text style={styles.header}>Register</Text>
              <TextInput
                label="Name"
                mode="outlined"
                onChangeText={(text) => setName(text)}
                style={styles.textInput}
              />
              <TextInput
                label="Email"
                mode="outlined"
                onChangeText={(text) => setEmail(text)}
                inputMode="email"
                autoCapitalize="none"
                style={styles.textInput}
              />
              <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                style={styles.textInput}
              />
              <TextInput
                label="Mobile Number"
                mode="outlined"
                onChangeText={(text) => setMobileNumber(text)}
                keyboardType="numeric"
                style={styles.textInput}
              />
              <PaperButton
                mode="contained"
                onPress={handleRegister}
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                Register
              </PaperButton>
              <Text style={styles.paraText}>
                Already have an account?{" "}
                <Text
                  style={styles.loginLink}
                  onPress={() => router.push("/login")}
                >
                  Login here
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
  loginLink: {
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
