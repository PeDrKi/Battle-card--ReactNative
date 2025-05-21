import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyAiitZVrymZmJQqzTmR9ThT6_bB_qrTL_0",
  authDomain: "battlecard-43b2f.firebaseapp.com",
  databaseURL: "https://battlecard-43b2f-default-rtdb.firebaseio.com",
  projectId: "battlecard-43b2f",
  storageBucket: "battlecard-43b2f.firebasestorage.app",
  messagingSenderId: "88897984649",
  appId: "1:88897984649:web:553814ed707ee3dda9ce58",
  measurementId: "G-600080VQCS"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Khởi tạo Authentication và Realtime Database
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };