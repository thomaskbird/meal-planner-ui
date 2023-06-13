import {getApp, getApps, initializeApp} from '@firebase/app';
import {collection, getFirestore, orderBy} from '@firebase/firestore';
import moment from 'moment';
import config from '~/config/site';
import {query} from '@firebase/database';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};

const renderFirestoreTimestamp = (timestamp: any) =>
  moment(timestamp.toDate()).format(config.momentFormat);

const makeArrayFromSnapshot = (snap) => {
  const data: any[] = [];
  snap.forEach((item: any) => {
    data.push({
      ...item.data(),
      id: item.id
    });
  })

  return data;
}

let firestoreDb = null;
let mealTime = null;

try {
  if(!getApps().length) {
    mealTime = initializeApp(firebaseConfig);
  } else {
    mealTime = getApp();
  }

  firestoreDb = getFirestore(mealTime);
} catch(e) {
  console.log('e', e);
}

const Auth = getAuth();

const collectionRecipes = collection(firestoreDb, 'recipes');

const collectionUsers = collection(firestoreDb, 'users');

const queryAllRecipesOrdered = query(collectionRecipes, orderBy('created', 'desc'));

const queryAllUsersOrdered = query(collectionUsers, orderBy('created', 'desc'));

export {
  firestoreDb,
  mealTime,
  Auth,
  collectionRecipes,
  collectionUsers,
  queryAllRecipesOrdered,
  queryAllUsersOrdered,
  renderFirestoreTimestamp,
  makeArrayFromSnapshot
}