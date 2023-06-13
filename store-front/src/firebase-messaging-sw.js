import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage, isSupported } from 'firebase/messaging';

const app = initializeApp( {
    projectId: 'monaqus-28ce0',
    appId: '1:845591570019:web:b8c8baeef84be2af01ba56',
    storageBucket: 'monaqus-28ce0.appspot.com',
    apiKey: 'AIzaSyAO3MgbLzLcu6kp8PP8AC9-pnU287fW7O8',
    authDomain: 'monaqus-28ce0.firebaseapp.com',
    messagingSenderId: '845591570019',
  });


isSupported().then(isSupported => {

  if (isSupported) {

    const messaging = getMessaging(app);

    onBackgroundMessage(messaging, ({ notification: { title, body, image } }) => {
        console.log("title : " +title + "\n body : " +body);
      self.registration.showNotification(title, { body, icon: image,type:'module' });
    });
  }

});