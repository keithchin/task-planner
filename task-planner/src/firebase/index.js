import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyCrV7dHYtAj5Bkbne8jq_TFfX20G9f9MOA",
    authDomain: "simply-app-1ad7e.firebaseapp.com",
    projectId: "simply-app-1ad7e",
    storageBucket: "simply-app-1ad7e.appspot.com",
    messagingSenderId: "269523575446",
    appId: "1:269523575446:web:efa14c081ba2f22d7e98b7",
    measurementId: "G-XEG9X5LWGP"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'todos')