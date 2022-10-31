// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwbwpb0k4lxJ3WrgQAF6gLjE-H_KGl90c",
  authDomain: "fire99db.firebaseapp.com",
  projectId: "fire99db",
  storageBucket: "fire99db.appspot.com",
  messagingSenderId: "245615482573",
  appId: "1:245615482573:web:56bf4d46eb524fb42bbb84",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
// INITIALISING ARRAYS TO BE FILLED WITH DATA
const xlabels1 = [];
window.valu1 = [];
const xlabels2 = [];
window.valu2 = [];
const xlabels3 = [];
window.valu3 = [];
const xlabels4 = [];
window.valu4 = [];

//IMPORTING RAW DATA
const docRef = doc(db, "solarData", "rawData");
const docSnap = await getDoc(docRef);
const dk = docSnap.data();
const dataTypes = ["KWHData", "KWData", "WindData", "RainData"];
//PUSHING DATA VALUES INTO ARRAYS
for (let i = 0; i < dk["KWHData"].length; i++) {
  xlabels1.push(i + 1);
  valu1.push(parseFloat(dk["KWHData"][i]));
}
for (let i = 0; i < dk["KWData"].length; i++) {
  xlabels2.push(i + 1);
  valu2.push(parseFloat(dk["KWData"][i]));
}
for (let i = 0; i < dk["WindData"].length; i++) {
  xlabels3.push(i + 1);
  valu3.push(parseFloat(dk["WindData"][i]));
}
for (let i = 0; i < dk["RainData"].length; i++) {
  xlabels4.push(i + 1);
  valu4.push(parseFloat(dk["RainData"][i]));
}
//CHARTING THE FOUR CHARTS
chartIt("chart1", "Kwh Generated (Kwh)", xlabels1, valu1, "line");
chartIt("chart2", "Kw Generated (Kw)", xlabels2, valu2, "line");
chartIt("chart3", "Avg Wind (ms)", xlabels3, valu3, "bar");
chartIt("chart4", "Rain (y/n)", xlabels4, valu4, "bar");

//FUNCTION THAT TAKES DETAILS ABOUT A CHART AND CHARTS IT USING CHARTJS
async function chartIt(canvasName, label, x, y, chartType) {
  const ctx = document.getElementById(canvasName).getContext("2d");
  const myChart = new Chart(ctx, {
    type: chartType,
    data: {
      labels: x,
      datasets: [
        {
          label: label,
          data: y,
          backgroundColor: ["rgb(255, 99, 132)"],
          borderColor: ["rgb(255, 99, 132)"],
          borderWidth: 1,
        },
      ],
    },
  });
}
