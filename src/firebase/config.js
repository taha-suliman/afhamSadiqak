// 🔥 Firebase Configuration
// ==============================
// خطوات ربط Firebase:
// 1. روح على https://console.firebase.google.com
// 2. أنشئ مشروع جديد
// 3. أضف تطبيق ويب (Web App)
// 4. انسخ الـ firebaseConfig اللي هيظهر ليك
// 5. فعّل Realtime Database من القسم Build > Realtime Database
// 6. اختر "Start in test mode" في البداية
// 7. استبدل الكود أدناه بـ config بتاعك

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// ⚠️ استبدل هذا بـ config الخاص بك من Firebase Console
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCbxlbOen9dUiiZd7dOEXd-k6A2mi8cgQ8",
    authDomain: "aerif-sadiqak.firebaseapp.com",
    projectId: "aerif-sadiqak",
    storageBucket: "aerif-sadiqak.firebasestorage.app",
    databaseURL: "https://aerif-sadiqak-default-rtdb.europe-west1.firebasedatabase.app",
    messagingSenderId: "892522414211",
    appId: "1:892522414211:web:dc8416bfcf9a0571cc9bb6",
    measurementId: "G-6PVQHHLQP2"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);


// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries


const analytics = getAnalytics(app);