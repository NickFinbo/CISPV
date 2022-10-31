// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
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
//IMPORTING FIREBASE FUNCTIONS
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
//INITIALISING DB
const db = getFirestore();

document.getElementById("Numberbox").style.visibility = "hidden";
document.getElementById("Numbertext").style.visibility = "hidden";
document.getElementById("Typebox").style.visibility = "hidden";
document.getElementById("Typetext").style.visibility = "hidden";

// REFERENCING BUTTONS
let AdminBox = document.getElementById("Adminbox");
let KWHBox = document.getElementById("KWHbox");
let KWBox = document.getElementById("KWbox");
let WindBox = document.getElementById("Windbox");
let RainBox = document.getElementById("Rainbox");
let ActionBox = document.getElementById("Actionbox");
let NumberBox = document.getElementById("Numberbox");
let TypeBox = document.getElementById("Typebox");
let insBtn = document.getElementById("Insbtn");
//ADDING EVENT LISTENERS FOR BUTTON AND 'SELECT' FIELD SO THAT UI CAN CHANGE ACCORDINGLY
insBtn.addEventListener("click", addData);
ActionBox.addEventListener("change", indexVis);
TypeBox.addEventListener("change", fieldVis);
//SETTING FIELD VISIBILITY BASED ON THE OPTION THAT THE USER HAS SELECTED
function indexVis() {
  if (ActionBox.value === "Add") {
    document.getElementById("Numberbox").style.visibility = "hidden";
    document.getElementById("Numbertext").style.visibility = "hidden";
    document.getElementById("Typebox").style.visibility = "hidden";
    document.getElementById("Typetext").style.visibility = "hidden";
    document.getElementById("KWHbox").style.visibility = "visible";
    document.getElementById("KWHtext").style.visibility = "visible";
    document.getElementById("KWbox").style.visibility = "visible";
    document.getElementById("KWtext").style.visibility = "visible";
    document.getElementById("Windbox").style.visibility = "visible";
    document.getElementById("Windtext").style.visibility = "visible";
    document.getElementById("Rainbox").style.visibility = "visible";
    document.getElementById("Raintext").style.visibility = "visible";
  }
  if (ActionBox.value === "Edit") {
    document.getElementById("Numberbox").style.visibility = "visible";
    document.getElementById("Numbertext").style.visibility = "visible";
    document.getElementById("Typebox").style.visibility = "visible";
    document.getElementById("Typetext").style.visibility = "visible";
    document.getElementById("KWHbox").style.visibility = "visible";
    document.getElementById("KWHtext").style.visibility = "visible";
    document.getElementById("KWbox").style.visibility = "visible";
    document.getElementById("KWtext").style.visibility = "visible";
    document.getElementById("Windbox").style.visibility = "visible";
    document.getElementById("Windtext").style.visibility = "visible";
    document.getElementById("Rainbox").style.visibility = "visible";
    document.getElementById("Raintext").style.visibility = "visible";
  }
}
//SETTING FIELD VISIBILITY BASED ON THE OPTION THAT THE USER HAS SELECTED
function fieldVis() {
  if (TypeBox.value === "AllDatabox") {
    document.getElementById("KWHbox").style.visibility = "visible";
    document.getElementById("KWHtext").style.visibility = "visible";
    document.getElementById("KWbox").style.visibility = "visible";
    document.getElementById("KWtext").style.visibility = "visible";
    document.getElementById("Windbox").style.visibility = "visible";
    document.getElementById("Windtext").style.visibility = "visible";
    document.getElementById("Rainbox").style.visibility = "visible";
    document.getElementById("Raintext").style.visibility = "visible";
  }
  if (TypeBox.value === "KWHDatabox") {
    document.getElementById("KWHbox").style.visibility = "visible";
    document.getElementById("KWHtext").style.visibility = "visible";
    document.getElementById("KWbox").style.visibility = "hidden";
    document.getElementById("KWtext").style.visibility = "hidden";
    document.getElementById("Windbox").style.visibility = "hidden";
    document.getElementById("Windtext").style.visibility = "hidden";
    document.getElementById("Rainbox").style.visibility = "hidden";
    document.getElementById("Raintext").style.visibility = "hidden";
  }
  if (TypeBox.value === "KWDatabox") {
    document.getElementById("KWbox").style.visibility = "visible";
    document.getElementById("KWtext").style.visibility = "visible";
    document.getElementById("KWHbox").style.visibility = "hidden";
    document.getElementById("KWHtext").style.visibility = "hidden";
    document.getElementById("Windbox").style.visibility = "hidden";
    document.getElementById("Windtext").style.visibility = "hidden";
    document.getElementById("Rainbox").style.visibility = "hidden";
    document.getElementById("Raintext").style.visibility = "hidden";
  }
  if (TypeBox.value === "WindDatabox") {
    document.getElementById("Windbox").style.visibility = "visible";
    document.getElementById("Windtext").style.visibility = "visible";
    document.getElementById("KWHbox").style.visibility = "hidden";
    document.getElementById("KWHtext").style.visibility = "hidden";
    document.getElementById("KWbox").style.visibility = "hidden";
    document.getElementById("KWtext").style.visibility = "hidden";
    document.getElementById("Rainbox").style.visibility = "hidden";
    document.getElementById("Raintext").style.visibility = "hidden";
  }
  if (TypeBox.value === "RainDatabox") {
    document.getElementById("Rainbox").style.visibility = "visible";
    document.getElementById("Raintext").style.visibility = "visible";
    document.getElementById("KWHbox").style.visibility = "hidden";
    document.getElementById("KWHtext").style.visibility = "hidden";
    document.getElementById("KWbox").style.visibility = "hidden";
    document.getElementById("KWtext").style.visibility = "hidden";
    document.getElementById("Windbox").style.visibility = "hidden";
    document.getElementById("Windtext").style.visibility = "hidden";
  }
}
//FUNCTION TO ADD DATA TO THE DATABASE
async function addData() {
  //READ DATA FROM DATABASE

  const passdocRef = doc(db, "solarData", "adminPass");
  const passdocSnap = await getDoc(passdocRef);
  const Key = passdocSnap.data();

  const docRef = doc(db, "solarData", "rawData");
  const docSnap = await getDoc(docRef);
  const dk = docSnap.data();
  const dataTypes = ["KWHData", "KWData", "WindData", "RainData"];
  //PARSING DATA FROM STRING TO NUMBER
  const dataAdd = [
    parseFloat(KWHBox.value),
    parseFloat(KWBox.value),
    parseFloat(WindBox.value),
    parseFloat(RainBox.value),
  ];
  //IMPORTING SUM DATA
  const docRefsum = doc(db, "solarData", "sumData");
  const docSnapsum = await getDoc(docRefsum);
  const dksum = docSnapsum.data();
  //INITIALISING BOOLEAN VARIABLES TO CHECK FOR ERROR CONDITIONS
  let updated = false;
  let correctPass = true;
  let correctDataType = true;
  let correctPos = true;
  let correctRange = true;
  //CHECKING IF PASSWORD MATCHES THE ONE IN THE DATABASE
  if (AdminBox.value !== Key["pass"]) {
    alert("Password is Incorrect!");
    location.reload();
    window.abort();
    correctPass = false;
  }
  //MAKING SURE THAT INPUTTED VALUES ARE NUMBERS
  if (
    (isNaN(dataAdd[0]) === true ||
      isNaN(dataAdd[1]) === true ||
      isNaN(dataAdd[2]) === true ||
      isNaN(dataAdd[3]) === true) &&
    ActionBox.value === "Add"
  ) {
    alert("Please fill in the fields with numbers!");
    location.reload();
    window.abort();
    correctDataType = false;
  }
  //MAKING SURE THAT VALUES ARE LARGER THAN 0
  if (
    (dataAdd[0] < 0 || dataAdd[1] < 0 || dataAdd[2] < 0 || dataAdd[3] < 0) &&
    ActionBox.value === "Add"
  ) {
    alert("Data should be larger than 0!");
    location.reload();
    window.abort();
    correctPos = false;
  }
  //MAKING SURE THAT RAIN DATA IS NOT GREATER THAN 1
  if (dataAdd[3] > 1.1 && ActionBox.value === "Add") {
    alert("Rain data can not be larger than 1!");
    location.reload();
    window.abort();
    correctRange = false;
  }

  //ALRORITHM FOR ADDING DATA TO DATABASE
  if (
    ActionBox.value === "Add" &&
    AdminBox.value === Key["pass"] &&
    correctPass === true &&
    correctDataType === true &&
    correctPos === true &&
    correctRange === true
  ) {
    //SHIFTING ALL VALUES IN THE ARRAY DOWN BY 1 INDEX
    console.log("Adding");
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < dk["KWHData"].length - 1; i++) {
        dk[dataTypes[j]][i] = dk[dataTypes[j]][i + 1];
      }
      //PUTTING THE NEW DATA AT THE END OF THE LSIT
      dk[dataTypes[j]][dk[dataTypes[j]].length - 1] = dataAdd[j];
    }
    //ADDING DATABASE CHANGES TO SUM HOLDER VALUES
    console.log(dk["KWHData"]);
    dksum["carbonHolder"] += dataAdd[0] * 0.4;
    dksum["phoneHolder"] += dataAdd[1] * 2000;
    dksum["lightbulbHolder"] += dataAdd[1] * 10;

    updated = true;
  }

  //ALGORITHM FOR EDITING DATABASE VALUES
  if (
    ActionBox.value === "Edit" &&
    AdminBox.value === Key["pass"] &&
    correctPass === true &&
    correctDataType === true &&
    correctPos === true
  ) {
    //MAKING SURE THAT THE GIVEN INDEX IS WITHIN THE RANGE
    if (NumberBox.value < 1 || NumberBox.value > 30) {
      console.log("Number is out of range!");
      location.reload();
      window.abort();
    }
    console.log(TypeBox.value === "KWData");
    console.log(TypeBox.value);
    //IF ALL DATA VALUES ARE BEING EDITED
    if (TypeBox.value === "AllDatabox") {
      for (let j = 0; j < 4; j++) {
        //SWITCH OUT DATA VALUE FOR THE GIVEN INDEX
        dk[dataTypes[j]][NumberBox.value - 1] = dataAdd[j];
      }
      //ADDING VALUES TO SUM HOLDERS
      dksum["carbonHolder"] +=
        0.4 * (dataAdd[0] - dk["KWHData"][NumberBox.value - 1]);
      dksum["phoneHolder"] +=
        2000 * (dataAdd[1] - dk["KWData"][NumberBox.value - 1]);
      dksum["lightbulbHolder"] +=
        10 * (dataAdd[1] - dk["KWData"][NumberBox.value - 1]);
    }
    //SAME FUNCTION AS THE ONE ABOVE, ONLY KWH IS BEING CHANGED HERE
    if (TypeBox.value === "KWHDatabox") {
      document.getElementById("KWbox").style.visibility = "hidden";
      document.getElementById("KWtext").style.visibility = "hidden";
      document.getElementById("Windbox").style.visibility = "hidden";
      document.getElementById("Windtext").style.visibility = "hidden";
      document.getElementById("Rainbox").style.visibility = "hidden";
      document.getElementById("Raintext").style.visibility = "hidden";
      dk["KWHData"][NumberBox.value - 1] = dataAdd[0];
      dksum["carbonHolder"] +=
        0.4 * (dataAdd[0] - dk["KWHData"][NumberBox.value - 1]);
    }
    //SAME FUNCTION AS THE ONE ABOVE, ONLY KW IS BEING CHANGED HERE
    if (TypeBox.value === "KWDatabox") {
      document.getElementById("KWHbox").style.visibility = "hidden";
      document.getElementById("KWHtext").style.visibility = "hidden";
      document.getElementById("Windbox").style.visibility = "hidden";
      document.getElementById("Windtext").style.visibility = "hidden";
      document.getElementById("Rainbox").style.visibility = "hidden";
      document.getElementById("Raintext").style.visibility = "hidden";
      dk["KWData"][NumberBox.value - 1] = dataAdd[1];
      console.log(dk["KWData"]);
      dksum["phoneHolder"] +=
        2000 * (dataAdd[1] - dk["KWData"][NumberBox.value - 1]);
      dksum["lightbulbHolder"] +=
        10 * (dataAdd[1] - dk["KWData"][NumberBox.value - 1]);
    }
    //SAME FUNCTION AS THE ONE ABOVE, ONLY Wind IS BEING CHANGED HERE
    if (TypeBox.value === "WindDatabox") {
      document.getElementById("KWHbox").style.visibility = "hidden";
      document.getElementById("KWHtext").style.visibility = "hidden";
      document.getElementById("KWbox").style.visibility = "hidden";
      document.getElementById("KWtext").style.visibility = "hidden";
      document.getElementById("Rainbox").style.visibility = "hidden";
      document.getElementById("Raintext").style.visibility = "hidden";
      dk["WindData"][NumberBox.value - 1] = dataAdd[2];
    }
    //SAME FUNCTION AS THE ONE ABOVE, ONLY RAIN IS BEING CHANGED HERE
    if (TypeBox.value === "RainDatabox") {
      document.getElementById("KWHbox").style.visibility = "hidden";
      document.getElementById("KWHtext").style.visibility = "hidden";
      document.getElementById("KWbox").style.visibility = "hidden";
      document.getElementById("KWtext").style.visibility = "hidden";
      document.getElementById("Windbox").style.visibility = "hidden";
      document.getElementById("Windtext").style.visibility = "hidden";

      dk["RainData"][NumberBox.value - 1] = dataAdd[3];
    }
    updated = true;
    console.log(dk);
  }

  //UPDATE DATA
  setDoc(doc(db, "solarData", "rawData"), {
    KWHData: dk["KWHData"],
    KWData: dk["KWData"],
    RainData: dk["RainData"],
    WindData: dk["WindData"],
  });
  setDoc(doc(db, "solarData", "sumData"), {
    carbonHolder: dksum["carbonHolder"],
    phoneHolder: dksum["phoneHolder"],
    lightbulbHolder: dksum["lightbulbHolder"],
  });

  //IF DATABASE HAS BEEN UPDATED SUCCESSFULLY, SHOW "DATABASE MODIFIED" POPUP
  if (updated === true) {
    console.log("Database Modified");
    alert("Database Modified");
  }
}
