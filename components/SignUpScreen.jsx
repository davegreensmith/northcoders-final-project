import { StyleSheet, TextInput, Image, Text, View, Pressable, Switch } from 'react-native';
import { useEffect, useState } from 'react';
import { signUpNewUser, userLogout, updateUserInfo } from '../firebase/config';
import { convertLocationToLatLong } from '../utils/api';

export default function SignUpScreen({ navigation }) {
  const [canDrive, setCanDrive] = useState(false);
  const [fname, setFname] = useState(null);
  const [lname, setLname] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [bio, setBio] = useState(null);
  const [location, setLocation] = useState(null);
  const [email, setEmail] = useState(null);
  const [show, setShow] = useState(false);

  const [error, setError] = useState(false);

  function handleSignUpPress() {
    if (!fname || !lname || !username || !password || !location || !email) {
      setShow(true);
    } else if (error) {
      setShow(true);
    } else {
      // const latLong = convertLocationToLatLong(location);
      const userDetails = {
        fname,
        lname,
        username,
        bio,
        location,
        canDrive,
        email,
      };

      userLogout();
      signUpNewUser(email, password)
        .then(({ id }) => {
          return id;
        })
        .then((id) => {
          console.log(id, '<<< id');
          console.log(userDetails, '<<< user details');
          updateUserInfo(id, userDetails);
        })
        .then(() => {
          navigation.navigate('Splash');
        })
        .catch((err) => {
          console.log(err.code);
          if (err.code === 'auth/invalid-email') {
            setError('Invalid email format');
          }
          if (err.code === 'auth/weak-password') {
            setError('Weak password. Password must be at least 6 characters long');
          }
          if (err.code === 'auth/email-already-in-use') {
            setError('Email already exists. Please log in');
          }
        });
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/chip-in-logo-large.png')} />
      <Text style={styles.subtitle}>Tell us a little about yourself...</Text>
      <Text style={styles.requiredText}>* required fields</Text>
      <TextInput style={styles.textField} onChangeText={setFname} value={fname} placeholder="* First name" />
      <TextInput style={styles.textField} onChangeText={setLname} value={lname} placeholder="* Last name" />
      <TextInput style={styles.textField} onChangeText={setUsername} value={username} placeholder="* Username (What others will see)" />
      <TextInput style={styles.textField} onChangeText={setEmail} value={email} placeholder="* Email" />
      <TextInput style={styles.textField} onChangeText={setPassword} secureTextEntry={true} value={password} placeholder="* Password (Must be at least 6 characters)" />
      <TextInput multiline={true} style={styles.bio} onChangeText={setBio} value={bio} placeholder="A brief description of your skills and abilities..." />
      <TextInput style={styles.textField} onChangeText={setLocation} value={location} placeholder="* Your postcode" />
      <View style={styles.doYouDrive}>
        <Text style={{ fontSize: 15 }}>Do you drive?</Text>
        <Switch
          value={canDrive}
          onValueChange={() => {
            setCanDrive(!canDrive);
          }}
        />
      </View>
      {show ? (
        <View>
          <Text style={{ color: 'red' }}>Missing information, please check and try again</Text>
        </View>
      ) : (
        <></>
      )}
      {error ? (
        <View>
          <Text style={{ color: 'red' }}>{error}</Text>
        </View>
      ) : (
        <></>
      )}
      <Pressable style={styles.signUpButton} onPress={handleSignUpPress}>
        <Text style={{ textAlign: 'center', fontSize: 16 }}>Sign Up!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textField: {
    borderWidth: 0.7,
    borderRadius: 5,
    width: 300,
    height: 35,
    margin: 8,
    textAlign: 'left',
    padding: 5,
    fontSize: 15,
  },
  bio: {
    borderWidth: 0.7,
    borderRadius: 5,
    width: 300,
    height: 80,
    margin: 8,
    textAlign: 'left',
    textAlignVertical: 'top',
    flexWrap: 'wrap',
    padding: 5,
    fontSize: 15,
  },
  logo: {
    resizeMode: 'cover',
    height: 200,
    width: 200,
    margin: 5,
  },
  signUpButton: {
    backgroundColor: '#47c9af',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    width: 100,
    margin: 20,
    padding: 10,
  },
  subtitle: {
    fontSize: 16,
    right: 47,
    margin: 5,
  },
  doYouDrive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    right: 80,
  },
  requiredText: {
    margin: 5,
    marginBottom: 0,
    right: 110,
    fontSize: 12,
    color: 'red',
  },
});
