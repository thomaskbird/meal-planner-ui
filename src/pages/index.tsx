import { NextPage } from 'next'
import React, { useState } from "react";
import { Button, Container, Box, Card, CardActions, CardContent, Typography, Tabs, Tab, TextField } from "@mui/material";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Auth, collectionUsers } from "~/helpers/firebase";
import TabPanel from '~/components/TabPanel';
import { useMealStore } from "~/store/useMealStore";
import { selectSetCurrentUser } from "~/store/selectors/users";
import { addDoc, Timestamp, query, where, getDocs } from "@firebase/firestore";
import { CurrentUser } from "~/types/users";
import { useRouter } from "next/router";

const defaultLogin = {
  email: '',
  password: ''
}

const IndexView: NextPage = () => {
  const router = useRouter();
  const setUser = useMealStore(selectSetCurrentUser);

  const [login, setLogin] = useState(defaultLogin);
  const [actionType, setActionType] = useState<number>(0);

  const currentActionLabel = () => {
    switch(actionType) {
      case 2:
        return 'Forgot password';
      case 1:
        return 'Signup';
      default:
        return 'Login';
    }
  };

  const currentCtaLabel = () => {
    switch(actionType) {
      case 2:
        return 'Submit';
      case 1:
        return 'Signup';
      default:
        return 'Login';
    }
  };

  const createUserAccount = async () => {
    const createdUser = await createUserWithEmailAndPassword(Auth, login.email, login.password);

    if(createdUser.user) {
      const userRef = await addDoc(collectionUsers, {
        id: createdUser.user.uid,
        email: createdUser.user.email,
        created: Timestamp.now()
      });

      if(userRef) {
        console.log('userRef', userRef.id);
        setActionType(0);
        setLogin(defaultLogin);
      }
    }
  }

  const signinUser = async () => {
    try {
      const userAuth = await signInWithEmailAndPassword(Auth, login.email, login.password);

      if(userAuth) {
        const userFromFirestoreRef = await query(collectionUsers, where('id', '==', userAuth.user.uid));
        const userSnap = await getDocs(userFromFirestoreRef);

        userSnap.forEach(doc => {
          setUser({
            ...doc.data() as CurrentUser
          })
        })

        router.push('dashboard');
      }

    } catch (e) {
      console.log('Error: ', e);
    }
  }

  const handleSubmit = () => {
    switch(actionType) {
      case 2:
        return 'Submit';
      case 1:
        createUserAccount();
      default:
        signinUser();
    }
  }

  const handleTextChange = (e) => {
    setLogin({
      ...login,
      [e.target.getAttribute('name')]: e.target.value
    })
  }

  return (
    <Container maxWidth="sm">
      <Box>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div">
              Login / Signup
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {currentActionLabel()}
            </Typography>

            <Tabs
              value={actionType}
              onChange={(event: React.SyntheticEvent, newValue: number) => setActionType(newValue)}
              aria-label="basic tabs example"
            >
              <Tab label="Login" id="login" />
              <Tab label="Signup" id="signup" />
              <Tab label="Forgot password" id="forgot" />
            </Tabs>

            <TabPanel value={actionType} index={0}>

              <TextField
                fullWidth
                label="Enter Email..."
                variant="outlined"
                name="email"
                value={login.email}
                onChange={(event: React.SyntheticEvent) => handleTextChange(event)}
              />

              <TextField
                fullWidth
                type="password"
                name="password"
                label="Enter Password..."
                variant="outlined"
                value={login.password}
                onChange={(event: React.SyntheticEvent) => handleTextChange(event)}
              />

            </TabPanel>
            <TabPanel value={actionType} index={1}>

              <TextField
                fullWidth
                label="Enter Email..."
                name="email"
                variant="outlined"
                value={login.email}
                onChange={(event: React.SyntheticEvent) => handleTextChange(event)}
              />

              <TextField
                fullWidth
                type="password"
                name="password"
                label="Enter Password..."
                variant="outlined"
                value={login.password}
                onChange={(event: React.SyntheticEvent) => handleTextChange(event)}
              />

            </TabPanel>
            <TabPanel value={actionType} index={2}>
              <TextField
                fullWidth
                label="Enter Email..."
                variant="outlined"
                name="email"
                value={login.email}
                onChange={(event: React.SyntheticEvent) => handleTextChange(event)}
              />
            </TabPanel>

          </CardContent>
          <CardActions>
            <Button variant="outlined" size="small" onClick={handleSubmit}>{currentCtaLabel()}</Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
}

export default IndexView
