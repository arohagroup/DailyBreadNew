// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANU7_s7cWyi9-jbuHCECJZ8t41p4_XXzI",
  authDomain: "dailybread-30424.firebaseapp.com",
  databaseURL: "https://dailybread-30424-default-rtdb.firebaseio.com",
  projectId: "dailybread-30424",
  storageBucket: "dailybread-30424.appspot.com",
  messagingSenderId: "504484265726",
  appId: "1:504484265726:web:f37678251276cb5c1befaf",
  measurementId: "G-59L66WFCK3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {
  getDatabase,
  ref,
  get,
  set,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

const db = getDatabase();

function InserData() {
  const checkView = document.querySelector("#join");

  let formData = {};
  formData.type = document.querySelector("#join").value;
  let UserData = {};

  let newDate = new Date();

  let rawDate = new Date(newDate);
  let month = rawDate.getMonth() + 1;
  let date2 = rawDate.getDate();
  month = month < 10 ? `0${month}` : month;
  date2 = date2 < 10 ? `0${date2}` : date2;
  let date = `Member since ${date2}-${month}-${rawDate.getFullYear()}`;

  //alert(date);

  if (checkView.value == "volunteer") {
    formData.fname = document.querySelector("#fname").value;
    formData.lname = document.querySelector("#lname").value;
    formData.phone = document.querySelector("#phone").value;
    formData.email = document.querySelector("#email").value;
    formData.password = document.querySelector("#secret").value;
    formData.date = date;
  } else {
    UserData.name = document.querySelector("#name").value;
    UserData.address = document.querySelector("#address").value;
    UserData.phoneNumber = document.querySelector("#phoneNumber").value;
    UserData.foodType = document.querySelector("#foodType").value;
    timing;
    UserData.timing = document.querySelector("#timing").value;
    UserData.fname = document.querySelector("#fname").value;
    UserData.lname = document.querySelector("#lname").value;
    UserData.email = document.querySelector("#email").value;
    UserData.position = document.querySelector("#position").value;
    UserData.password = document.querySelector("#password").value;
    UserData.confirmPassword = document.querySelector("#confirmPassword").value;
    UserData.type = "Restaurant";
    UserData.date = date;

    if (UserData.password != UserData.confirmPassword) {
      alert("Password not Matched");
      return false;
    }
    delete UserData.confirmPassword;
  }

  let id;

  if (checkView.value == "volunteer") {
    id = formData.email.split(".").join();
  } else {
    id = UserData.email.split(".").join();
  }
  set(ref(db, formData.type + "/" + id + "," + formData.type), {
    ...formData,
  })
    .then(() => {
      alert("Account Created Successfully");
      closeForm2();
      openForm();
    })
    .catch((err) => alert("error" + err));

  if (checkView.value != "volunteer") {
    set(ref(db, "restaurant" + "/" + id + "," + "restaurant"), {
      ...UserData,
    })
      .then(() => {})
      .catch((err) => alert("error" + err));
  }
}

window.InserData = InserData;

function SelectData() {
  const email = document.querySelector("#email2").value;
  const password = document.querySelector("#secret2").value;
  const type = document.querySelector("#join2").value;
  const id = email.split(".").join();
  const dbref = ref(db);
  get(child(dbref, type + "/" + id + "," + type)).then((snapshot) => {
    if (snapshot.exists()) {
      if (password == snapshot.val().password) {
        window.location.href = "listing.html";
        const userData = snapshot.val();
        sessionStorage.setItem("userData", JSON.stringify(userData));
      } else {
        alert("Entered Password Incorrect");
      }
    } else {
      alert("Kindly Signup First");
    }
  });
}





// async function UpdateStatus() {
//   const sessionData = JSON.parse(sessionStorage.getItem("food-requests"));
// }

window.SelectData = SelectData;







async function UpdateData() {
  const sessionData = JSON.parse(sessionStorage.getItem("userData"));

  let userData = {};
  userData.fname = document.querySelector("#fname").value;
  userData.lname = document.querySelector("#lname").value;
  userData.secret = document.querySelector("#secret").value;
  userData.secret2 = document.querySelector("#secret2").value;
  userData.email = sessionData.email;
  userData.type = sessionData.type;
  userData.date = sessionData.date;
  image_data_url
    ? (userData.image = image_data_url)
    : (userData.image = sessionData.image);

  if (userData.secret !== userData.secret2) {
    alert("Passwords are not matched");
    return false;
  }

  const id = userData.email.split(".").join();

  userData.password = userData.secret;

  delete userData.secret2;
  delete userData.secret;

  const toSession = await JSON.stringify(userData);

  sessionStorage.setItem("userData", toSession);
  update(ref(db, userData.type + "/" + id + "," + userData.type), {
    ...userData,
  })
    .then(() => {
      alert("User Updated Successfully");
      window.location.reload();
    })
    .catch((err) => alert("error" + err));
}

window.UpdateData = UpdateData;

function GetAllListing() {
  const dbref = ref(db);
  get(child(dbref, "food")).then((snapshot) => {
    if (snapshot.exists()) {
      const listData = snapshot.val();
      for (const property in listData) {
        const min = 1;
        const max = 5;
        const intNumber = Math.floor(Math.random() * (max - min)) + min;
        const innerHTML = `<div class="card ${
          listData[property].type == 1
            ? "one"
            : listData[property].type == 2
            ? "two"
            : "three"
        }">
                              <a href="map.html?id=${
                                listData[property].uniqueId
                              }"><img src="./assets/images/food${intNumber}.jpg">
                              <h4>${listData[property].foodName}</h4></a>
                              <div class="address">
                                  <img src="./assets/images/map-marker-alt-solid.svg">
                                  <span>${listData[property].address}</span>
                              </div>
                              <div class="packag">
                                  <img src="./assets/images/cutlery.png">
                                  <span>${listData[property].amount} Food Packages</span>
                              </div>
                          </div>`;

        document
          .querySelector("#part2")
          .insertAdjacentHTML("beforeend", innerHTML);
      }
      var size = Object.keys(listData).length;
      document.querySelector(
        "#listing-count"
      ).innerHTML = `${size} listings found`;
    } else {
      let placholder = `<center><a href="/AddFood.html"><i class="fa fa-plus fa-5x" aria-hidden="true"></i></a></center>`;
      document
        .querySelector("#part2")
        .insertAdjacentHTML("beforeend", placholder);
    }
  });
}

function GetReqListing() {
  const dbref = ref(db);
  get(child(dbref, "food-requests")).then((snapshot) => {
    if (snapshot.exists()) {
      const listData = snapshot.val();
      for (const property in listData) {
        const min = 1;
        const max = 5;
        const intNumber = Math.floor(Math.random() * (max - min)) + min;
        const innerHTML = `<div class="card">
                                  <img src="./assets/images/food${intNumber}.jpg">
                                  <h4>${listData[property].foodName}</h4>
                                  <div class="address">
                                      <span>${listData[property].address} BC ${
          listData[property].packages
        } Packages</span>
                                  </div>
                                  <p class=${
                                    listData[property].status == 0
                                      ? "status-pending"
                                      : "status-sucess"
                                  }>${
          listData[property].status == 0
            ? "Awaiting Response"
            : "Accepted at 10:20PM"
        }</p>
                              </div>`;

        document
          .querySelector("#part2")
          .insertAdjacentHTML("beforeend", innerHTML);
      }
    } else {
    }
  });
}

function DynmicForm() {
  const signupView = document.querySelector("#formFields");
  let checkView = document.querySelector("#join");
  if (checkView.value == "volunteer") {
    signupView.innerHTML = `<div id="col">
                                  <input type="text" id="fname" placeholder="First Name" name="fname" required>
                              </div>
                              <div id="col">
                                  <input type="text" id="lname" placeholder="Last Name" name="lname" required>
                              </div>
                              <input type="text" id="email" placeholder="Email" name="email" required>

                              <input type="number" id="phone" placeholder="Phone" name="phone" required>
                              <input type="password" id="secret" placeholder="Password" name="psw" required>
                              `;
  } else {
    signupView.innerHTML = `<input type="text" id="name" placeholder="Restaurant Name" name="name" required>
                             
                              <input type="number" id="phoneNumber" placeholder="Phone" name="phoneNumber" required>
                              <input type="text" id="address" placeholder="Address" name="address" required>
                              <label for="timing" class="text-left">Closing Time</label>
                              <input type="time" id="timing" name="timing" required>
                              <div class="dropdown">
                              <select name="sign-as" id="foodType" class="drop">
                                  <option value='one' disabled selected>Food Type</option>
                                  <option value="one">Veg</option>
                                  <option value="two">Non Veg</option>
                                  <option value="three">Vegan</option>
                              </select>
                              </div>
                              <h3 id="sign_up_heading">Your Information</h3>
                              <input type="text" id="fname" placeholder="First Name" name="fname" required>
                              <input type="text" id="lname" placeholder="Last Name" name="lname" required>
                              <input type="text" id="email" placeholder="Email" name="email" required>
                              <input type="text" id="position" placeholder="Position" name="position" required>
                              <input type="password" id="password" placeholder="Password" name="password" required>
                              <input type="password" id="confirmPassword" placeholder="Confirm Password" name="confirmPassword" required>`;
  }
}

function logout() {
  sessionStorage.removeItem("userData");
  window.location.href = "index.html";
}

function InserReq() {
  let userData = JSON.parse(sessionStorage.getItem("userData"));
  console.log(sessionStorage.getItem("foodItem"));
  let reqData = {};
  reqData.packages = document.querySelector("#reqPackages").value;
  reqData.address = document.querySelector("#address").value;
  reqData.foodName = JSON.parse(sessionStorage.getItem("foodItem")).foodName;
  reqData.status = 0;
  reqData.email = userData.email;
  let type = userData.type;

  if (
    !reqData.packages ||
    !reqData.address ||
    reqData.packages == "" ||
    reqData.address == ""
  ) {
    return false;
  }

  const uniqueId = Math.floor(Math.random() * 90000) + 10000;

  const id = reqData.email.split(".").join();
  set(ref(db, "food-requests" + "/" + id + "," + uniqueId + "," + type), {
    ...reqData,
  })
    .then(() => {
      openForm("check");
    })
    .catch((err) => alert("error" + err));
}

window.InserReq = InserReq;

function AddFood() {
  let userData = JSON.parse(sessionStorage.getItem("userData"));
  let reqData = {};
  reqData.phone = document.querySelector("#phone").value;
  reqData.address = document.querySelector("#address").value;
  reqData.amount = document.querySelector("#amount").value;
  reqData.type = document.querySelector("#food-type").value;
  reqData.foodName = document.querySelector("#foodName").value;
  reqData.status = 0;
  reqData.email = userData.email;
  let type = userData.type;

  const uniqueId = Math.floor(Math.random() * 90000) + 10000;
  reqData.uniqueId = uniqueId;

  // const id = reqData.email.split(".").join();
  set(ref(db, "food" + "/" + uniqueId), {
    ...reqData,
  })
    .then(() => {
      alert("Food Added Successfully");
      window.location.href = "/listing.html";
    })
    .catch((err) => alert("error" + err));
}

(() => {
  const inedxPage = document.querySelector('#inedxPage');
  if (inedxPage) {
    document.getElementById("join").addEventListener("click", DynmicForm);
    // document.getElementById("insert").addEventListener('click', InserData);
    // document.getElementById("login").addEventListener('click', SelectData);
    if (sessionStorage.getItem("userData")) {
      window.location.href = "/listing.html";
    }
  }
})();

(async () => {
  const listingPage = document.querySelector('#listingPage');

  if (listingPage) {
    const rawData = sessionStorage.getItem("userData");
    if (rawData) {
      const userData = await JSON.parse(rawData);
      if(userData.type!="volunteer")
      {
      document.querySelector(
        "#view-name"
      ).textContent = `${userData.name}`;
      }
      else{
        document.querySelector(
          "#view-name"
        ).textContent = `${userData.fname} ${userData.lname}`;
      }
      document.querySelector("#view-type").textContent = userData.type;
      userData.image
        ? document
            .querySelector("#userImage")
            .setAttribute("src", userData.image)
        : null;
      document.querySelector("#logout").addEventListener("click", logout);
      if (userData.type == "volunteer") {
        document.querySelector("#create_donate_btn").style.display = "block";
        document.querySelector("#create_listing_btn").style.display = "none";
      } else {
        document.querySelector("#create_donate_btn").style.display = "none";
        document.querySelector("#create_listing_btn").style.display = "block";
      }
    } else {
      window.location.href = "index.html";
    }
    GetAllListing();
  }
})();

(async () => {
  const profilePage = document.querySelector("#userProfilePage")
  if (profilePage) {
    const rawData = sessionStorage.getItem("userData");
    if (rawData) {
      const userData = await JSON.parse(rawData);
      document.getElementById("fname").value = userData.fname;
      document.getElementById("lname").value = userData.lname;

      if(userData.type=="volunteer")
      {
      let name = document.getElementsByClassName("view-name");
      name[0].textContent = `${userData.fname} ${userData.lname}`;
      name[1].textContent = `${userData.fname} ${userData.lname}`;
      }
      else{
        let name = document.getElementsByClassName("view-name");
      name[0].textContent = `${userData.name}`;
      name[1].textContent = `${userData.name}`;
      }
      let type = document.getElementsByClassName("view-type");
      type[0].textContent = userData.type;
      type[1].textContent = userData.type;

      document.querySelector("#logout").addEventListener("click", logout);
      // document.querySelector('#update').addEventListener('click', ()=>{UpdateData(image_data_url)});
      userData.image
        ? document.querySelector("#camera").setAttribute("src", userData.image)
        : null;
      userData.image
        ? document
            .querySelector("#userImage")
            .setAttribute("src", userData.image)
        : null;
      let date = document.querySelector("#date");
      date.textContent = userData.date;
      if (userData.type == "volunteer") {
        document.querySelector("#create_donate_btn").style.display = "block";
        document.querySelector("#create_listing_btn").style.display = "none";
      } else {
        document.querySelector("#create_donate_btn").style.display = "none";
        document.querySelector("#create_listing_btn").style.display = "block";
      }
    } else {
      window.location.href = "index.html";
    }
  }
})();

(async () => {
  const mapPage = document.querySelector('#mapPage');
  if (mapPage) {
    const rawData = sessionStorage.getItem("userData");
    if (rawData) {
      const userData = await JSON.parse(rawData);

      if(userData.type!="volunteer")
      {
      document.querySelector(
        "#view-name"
      ).textContent = `${userData.name}`;
      
      }
      else{
        document.querySelector(
          "#view-name"
        ).textContent = `${userData.fname} ${userData.lname}`;
      }
     

      // document.querySelector(
      //   "#mt-2"
      // ).textContent = `${userData.name}`;
      document.querySelector("#view-type").textContent = userData.type;
      userData.image
        ? document
            .querySelector("#userImage")
            .setAttribute("src", userData.image)
        : null;
      document.querySelector("#logout").addEventListener("click", logout);
      if (userData.type == "volunteer") {
        document.querySelector("#create_donate_btn").style.display = "block";
        document.querySelector("#create_listing_btn").style.display = "none";
        document.querySelector("#request-accept").style.display = "none";
       
      } else {
        document.querySelector("#create_donate_btn").style.display = "none";
        document.querySelector("#create_listing_btn").style.display = "block";
        document.querySelector("#pick-up-card").style.display = "none";
        document.querySelector("#request-accept").style.display = "block";
      }
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const product = urlParams.get("id");
      const dbref = ref(db);
      get(child(dbref, "food" + "/" + product)).then((snapshot) => {
        if (snapshot.exists()) {
          let item = snapshot.val();
          document.querySelector("#rest_name").textContent = item.foodName;
          document.querySelector(
            "#pack_count"
          ).textContent = `${item.amount} Food Packages`;
          let sass = JSON.stringify(item);
          sessionStorage.setItem("foodItem", sass);
        } else {
          alert("Item not found");
          window.location.href = "/listing.html";
        }
      });
      document
        .querySelector("#send-request")
        .addEventListener("click", InserReq);
    } else {
      window.location.href = "index.html";
    }
  }
})();

(async () => {
  const historyPage = document.querySelector('#historyPage');
  if (historyPage) {
    const rawData = sessionStorage.getItem("userData");
    if (rawData) {
      const userData = await JSON.parse(rawData);
      if(userData.type!="volunteer")
      {
      document.querySelector(
        "#view-name"
      ).textContent = `${userData.name}`;
      }
      else{
        document.querySelector(
          "#view-name"
        ).textContent = `${userData.fname} ${userData.lname}`;
      }
      document.querySelector("#view-type").textContent = userData.type;
      userData.image
        ? document
            .querySelector("#userImage")
            .setAttribute("src", userData.image)
        : null;
      document.querySelector("#logout").addEventListener("click", logout);
      GetReqListing();
      if (userData.type == "volunteer") {
        document.querySelector("#create_donate_btn").style.display = "block";
        document.querySelector("#create_listing_btn").style.display = "none";
      } else {
        document.querySelector("#create_donate_btn").style.display = "none";
        document.querySelector("#create_listing_btn").style.display = "block";
      }
    } else {
      window.location.href = "index.html";
    }
  }
})();

(async () => {
  const addFoodProfile = document.querySelector('#addFoodPage');
  if (addFoodProfile) {
    const rawData = sessionStorage.getItem("userData");
    if (rawData) {
      const userData = await JSON.parse(rawData);
      if(userData.type!="volunteer")
      {
      document.querySelector(
        "#view-name"
      ).textContent = `${userData.name}`;
      }
      else{
        document.querySelector(
          "#view-name"
        ).textContent = `${userData.fname} ${userData.lname}`;
      }
      document.querySelector("#view-type").textContent = userData.type;
      userData.image
        ? document
            .querySelector("#userImage")
            .setAttribute("src", userData.image)
        : null;
      document.querySelector("#food-btn").addEventListener("click", AddFood);
      document.querySelector("#logout").addEventListener("click", logout);
      if (userData.type == "volunteer") {
        document.querySelector("#create_donate_btn").style.display = "block";
        document.querySelector("#create_listing_btn").style.display = "none";
      } else {
        document.querySelector("#create_donate_btn").style.display = "none";
        document.querySelector("#create_listing_btn").style.display = "block";
      }
    } else {
      window.location.href = "index.html";
    }
  }
})();
