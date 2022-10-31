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

//INITIALISING DATA ARRAYS. HERE I USED THE WINDOW PREFIX TO ALLOW THE VARIABLES TO BE REFERENCED OUTSIDE OF THE MODULE SCRIPT
window.carbonArray = [];
window.phoneArray = [];
window.lightArray = [];
window.ys = [];

//IMPORTING SUM HOLDER DATA
const constRef = doc(db, "solarData", "sumData");
const constSnap = await getDoc(constRef);
const constArray = constSnap.data();

//IMPORTING RAW DATA
const docRef = doc(db, "solarData", "rawData");
const docSnap = await getDoc(docRef);
const dk = docSnap.data();
const dataTypes = ["KWHData", "KWData", "WindData", "RainData"];
//PUSHING INDEX + 1 VALUES INTO ARRAY
for (let i = 0; i < dk["KWHData"].length; i++) {
  ys.push(i + 1);
}
//SUMMATION ALGORITHM
function arraySummation(dataType, arrayName, holderType, multiplier) {
  //PUSHING RAW DATA VALUES INTO ARRAY
  for (let i = 0; i < dk[dataType].length; i++) {
    arrayName.push(dk[dataType][i]);
  }
  //MULTIPLYING RAW DATA VALUES BY THE MULTIPLIER
  for (let i = 0; i < arrayName.length; i++) {
    arrayName[i] *= multiplier;
  }
  //SUMMATING ARRAY
  for (let i = arrayName.length - 1; i > -1; i--) {
    for (let j = 0; j < i; j++) {
      arrayName[i] += arrayName[j];
    }
    arrayName[i] += constArray[holderType];
  }
  console.log(arrayName);
}
//APPLYING SUMMATION ALGORITHM TO THREE DATA ARRAYS
arraySummation("KWHData", carbonArray, "carbonHolder", 0.4);
arraySummation("KWData", phoneArray, "phoneHolder", 2000);
arraySummation("KWData", lightArray, "lightbulbHolder", 10);
//CHARTING SUMMED ARRAYS
chartIt("chart1", "Carbon Saved (kg)", ys, carbonArray, "bar");
chartIt("chart2", "Phones Charged", ys, phoneArray, "bar");
chartIt("chart3", "Lightbulbs Powered", ys, lightArray, "bar");

//CHARTING FUNCTION, SAME AS IN RAWDATASCRIPT. TAKES CHART SPECIFICATIONS AND CHARTS IT
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
