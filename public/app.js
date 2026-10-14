import { checkIfAlreadyBuddiesAPICaller } from "./user-api-callers.js";
import { signupAPICaller } from "./auth-api-callers.js";
import { cancelSignupAPICaller } from "./auth-api-callers.js";
import { logoutAPICaller } from "./auth-api-callers.js";
import { loginAPICaller } from "./auth-api-callers.js";
import { reportIncidentAPICaller } from "./user-api-callers.js";
import { getReportsAPICaller } from "./user-api-callers.js";
import { markAsSafeAPICaller } from "./user-api-callers.js";
import { getStatusAPICaller } from "./user-api-callers.js";
import { markAsNeedHelpAPICaller } from "./user-api-callers.js";
import { markAsRescuedAPICaller } from "./user-api-callers.js";
import { getProfileAPICaller } from "./user-api-callers.js";
import { finishAccountSetupAPICaller } from "./user-api-callers.js";
import { searchUserAPICaller } from "./user-api-callers.js";
import { setUserAsBuddyAPICaller } from "./user-api-callers.js";
import { unBuddyAPICaller } from "./user-api-callers.js";
import { visitUserProfileAPICaller } from "./user-api-callers.js";
import { seeAllBuddiesAPICaller } from "./user-api-callers.js";
import { checkOnBuddiesAPICaller } from "./user-api-callers.js";
import { getNotificationsAPICaller } from "./user-api-callers.js";
import { requestMedicAPICaller } from "./user-api-callers.js";
import { getAllMedicRequestsAPICaller } from "./user-api-callers.js";
import { getALLMEdicRequestClinicSideOperatorAPICaller } from "./clinic-side-api-callers.js";
import { resolveRequestAPICaller } from "./clinic-side-api-callers.js";
import { clinicDashboardAPICaller } from "./clinic-side-api-callers.js";
import { setReportAsFalseAlarmAPICaller } from "./admin-api-callers.js";
import { seeAllUsersAPICaller } from "./admin-api-callers.js";
import { banUserAPICaller } from "./admin-api-callers.js";
import { unbanUserAPICaller } from "./admin-api-callers.js";
import { seeAllUSersStatusAPICaller } from "./admin-api-callers.js";
import { adminDashboardAPICaller } from "./admin-api-callers.js";
const socket = io("https://safeplmun.onrender.com", {
    withCredentials: true
});
const statusCheckBTNMObile = document.querySelector("#status-nav-btn");
const statusCheckBTN = document.querySelector("#admin-status-check-btn");
const falseAlarmErrorBox = document.querySelector("#false-alarm-error-box");
const closeFalseAlarmErrorBox = document.querySelector(".okay-false-alarm");
const adminDashboardBTN = document.querySelector("#admin-dashboard-btn");
const seeAllUsersBTN = document.querySelector("#users-view-admin");
const adminDashboardMObileBTN = document.querySelector("#admin-dashboard-nav-btn");
const seeAllUsersMObileBTN = document.querySelector("#see-all-users-nav-btn");
const notificationsDiv = document.querySelector(".notifications-div");
const notificationsErrorBox = document.querySelector("#notifications-error-box");
const closeNotificationsErrorBox = document.querySelector(".okay-notifications");
const checkOnBuddiesBTN = document.querySelector("#check-on-buddies");
const checkOnBuddiesErrorBox = document.querySelector("#see-all-buddies-status-error-box");
const closeCheckOnBuddiesErrorBox = document.querySelector(".okay-see-all-buddies-status");
const seeAllBuddiesErrorBox = document.querySelector("#see-all-buddies-error-box");
const closeSeeAllBuddiesErorBox = document.querySelector(".okay-see-all-buddies");
const visitUserProfileErrorBox = document.querySelector("#visit-user-profile-error-box");
const closeVisitUserProfileErrorBox = document.querySelector(".okay-visit-user-profile");
let currentSearch = " ";
const unBuddyErrorBox = document.querySelector("#unbuddy-error-box");
const closeUnBuddyErrorBox = document.querySelector(".okay-unbuddy");
const userMenuMobile = document.querySelector("#menu-mobile-user");
const overlay5 = document.querySelector(".overlay5");
const overlay2 = document.querySelector(".overlay2");
const overlay3 = document.querySelector(".overlay3");
const earthquakeAlertSound = new Audio("./sounds/earthquakeAlert.mp3");
const fireAlertSound = new Audio('./sounds/fireAlert.mp3');
const medicalSound = new Audio('./sounds/medical.mp3');
const resolveSound = new Audio('./sounds/resolve.mp3');
const newsFeedDiv = document.querySelector(".news-feed");
const newsFeedErrorBox = document.querySelector("#newsfeed-error-box");
const closeNewsFeedErrorBox =  document.querySelector(".okay-newsfeed");
const safeErrorBox = document.querySelector("#mark-as-safe-error-box");
const closeSafeErrorBox = document.querySelector(".okay-mark-as-safe");
const checkErrorBox = document.querySelector("#newsfeed-error-box2");
const closeCheckErrorBox = document.querySelector(".okay-newsfeed2");
const helpErrorBox = document.querySelector("#help-error-box");
const closeHelpErrorBox = document.querySelector(".okay-help");
const rescuedErrorBox = document.querySelector("#rescued-error-box");
const closeRescuedErrorBox = document.querySelector(".okay-rescued");
const guidelines = document.querySelector(".safeplmun-guidelines");
const finishInputBox = document.querySelector("#account-finish-input-box");
const alertMobileBTN = document.querySelector("#alert-mobile");
const finishedNaBa = localStorage.getItem("finish");
const searchErrorBox = document.querySelector("#search-error-box");
const closeSearchErrorBox = document.querySelector(".okay-search");
const setAsBuddyErrorBox = document.querySelector("#set-as-buddy-error-box");
const closeSetBuddyErrorBox = document.querySelector(".okay-set-as-buddy");
const checkIfBuddyErrorBox = document.querySelector("#check-if-a-buddy-error-box");
const closeCheckIfBuddyErrorBox = document.querySelector(".okay-check-if-a-buddy");
const checkOnBuddiesMOBILEBTN = document.querySelector('#buddies-nav-btn');

const schoolShooterAlertSound = new Audio('./sounds/schoolShooter.mp3');
function registerSocket() {
    const userId = localStorage.getItem("user");

    console.log("USER ID:", userId);

    if (!userId) {
        console.log("No userId in localStorage");
        return;
    }

    socket.emit("register", userId);
}
socket.on("connect", () => {
    console.log("SOCKET CONNECTED:", socket.id);
    registerSocket();
});
socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
});

socket.on("connect_error", (error) => {
    console.log("Socket connection error:", error.message);
});

socket.on("false-alarm", (data)=>{
     resolveSound.play();
    const yourStatus = localStorage.getItem("status");
    if(yourStatus !== 'logged-in')return;
    const role = localStorage.getItem("role");
    if(role === "admin")return;
    const popup = document.createElement("div");
    popup.classList.add("pop-up");
    document.body.appendChild(popup);
    const h1 = document.createElement('h1');
    h1.textContent = `False Alarm Alert`;
    popup.appendChild(h1);
    const p = document.createElement("p");
    p.textContent = data.report;
    popup.appendChild(p);
    const small = document.createElement("p");
    small.classList.add("small");
    small.textContent = `Requested at ${new Date(data.time).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    })}`;
   
    popup.appendChild(small);
    popup.classList.add("show");
    setTimeout(()=>{
         popup.classList.remove("show");
         document.body.removeChild(popup);
    }, 9000);
    popup.addEventListener("click", ()=>{
        getReports();
        popup.classList.remove("show");
        resolveSound.pause();
    });
    
})

socket.on("request-medic", (data)=>{
    const yourStatus = localStorage.getItem("status");
    if(yourStatus !== 'logged-in')return;
    medicalSound.play();
    console.log(data);
    const popup = document.createElement("div");
    popup.classList.add("pop-up");
    document.body.appendChild(popup);
    const h1 = document.createElement('h1');
    h1.textContent = `New Medical Assistance Request Received`;
    popup.appendChild(h1);
    const p = document.createElement("p");
    p.textContent = `SafePLMUN user ${data.name.split(" ")[0]} is requesting medical assistance at ${data.location}. Details: ${data.details}. Please attend to the request immediately.`;
    popup.appendChild(p);
    const small = document.createElement("p");
    small.classList.add("small");
    small.textContent = `Requested at ${new Date(data.time).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    })}`;
    
    popup.appendChild(small);
    popup.classList.add("show");
    setTimeout(()=>{
         popup.classList.remove("show");
         document.body.removeChild(popup);
    }, 9000);
    popup.addEventListener("click", ()=>{
        getMEdciRequestClinicSideFunction();
        popup.classList.remove("show");
        
         medicalSound.pause();
    });
});

socket.on('medic-request-resolved', (data)=>{
    const yourStatus = localStorage.getItem("status");
    if(yourStatus !== 'logged-in')return;
   
    resolveSound.play();
    console.log(data);
    const popup = document.createElement("div");
    popup.classList.add("pop-up");
    document.body.appendChild(popup);
    const h1 = document.createElement('h1');
    h1.textContent = `Medic Request Resolved`;
    popup.appendChild(h1);
    const p = document.createElement("p");
    p.textContent = 'Your medical request has been resolved. Thank you for keeping PLMUN safe!';
    popup.appendChild(p);
    const small = document.createElement("p");
    small.classList.add("small");
    small.textContent = `Requested at ${new Date(data.time).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    })}`;
    
    popup.appendChild(small);
    popup.classList.add("show");
    setTimeout(()=>{
         popup.classList.remove("show");
         document.body.removeChild(popup);
    }, 9000);
     popup.addEventListener("click", ()=>{
        userSideVieMEdicRequestsBTN();
        popup.classList.remove("show");
        resolveSound.pause();
    });
});


socket.on("alert", (data)=>{
    const yourStatus = localStorage.getItem("status");
    if(yourStatus !== 'logged-in')return;
    if(data.type === "Earthquake"){
     const div = document.createElement("div");
     div.classList.add("alert-box");
     div.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        
        viewBox="0 0 24 24"
      >
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M11.327 1.612a1 1 0 0 1 1.246-.08l.1.08L23 11h-3v9a1 1 0 0 1-.883.993L19 21h-6.5l2.5-4-3.5-3 4-3L13 9l.5-3-3 3 2.5 2-5 3 3.75 3.5L8.5 21H5a1 1 0 0 1-.993-.883L4 20v-9H1l10.327-9.388z"
          />
        </g>
      </svg>
      <h1>EARTHQUAKE ALERT</h1>

      <h2>Stay calm. Drop, Cover, and Hold.</h2>

      <ul>
        <li>Stay away from windows and falling objects. If outdoors, move to an open area away from buildings and power lines.
        </li>
        <li>After shaking stops, watch for aftershocks. Evacuate through designated routes when instructed.</li>
        
      </ul>
`;
    document.body.appendChild(div);
    div.classList.add("show");
    overlay2.classList.add("active");
    const p = document.createElement("p");
    p.textContent = `Reported at ${new Date(data.time).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    })}`;
    div.appendChild(p);
    const btn = document.createElement("button");
    btn.textContent = "Proceed";
    btn.classList.add("proceed");
    div.appendChild(btn);
    btn.addEventListener("click", ()=>{
        div.classList.remove("show");
        overlay2.classList.remove("active");
        earthquakeAlertSound.pause();
        getReports();
    });
    overlay2.addEventListener("click", ()=>{
        div.classList.remove("show");
        overlay2.classList.remove("active");
        earthquakeAlertSound.pause();
        getReports();
    });
    earthquakeAlertSound.play();
}
if(data.type === "School Fire"){
     const div = document.createElement("div");
     div.classList.add("alert-box");
     div.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" ><path d="M240-400q0 52 21 98.5t60 81.5q-1-5-1-9v-9q0-32 12-60t35-51l113-111 113 111q23 23 35 51t12 60v9q0 4-1 9 39-35 60-81.5t21-98.5q0-50-18.5-94.5T648-574q-20 13-42 19.5t-45 6.5q-62 0-107.5-41T401-690q-39 33-69 68.5t-50.5 72Q261-513 250.5-475T240-400Zm240 52-57 56q-11 11-17 25t-6 29q0 32 23.5 55t56.5 23q33 0 56.5-23t23.5-55q0-16-6-29.5T537-292l-57-56Zm0-492v132q0 34 23.5 57t57.5 23q18 0 33.5-7.5T622-658l18-22q74 42 117 117t43 163q0 134-93 227T480-80q-134 0-227-93t-93-227q0-129 86.5-245T480-840Z"/></svg>
      <h1>FIRE ALERT</h1>

      <h2>There is an ongoing fire incident at ${data.location}. Stay calm. Evacuate quickly and safely.</h2>

      <ul>
       <li>Follow the designated evacuation routes and exit the building immediately. Stay low if there is smoke and cover your nose and mouth if possible.</li>
       <li>Do not use elevators. Use the nearest safe stairway or exit. Once outside, proceed to the designated assembly area and follow staff instructions.</li>
     </ul>
     `;
    document.body.appendChild(div);
    div.classList.add("show");
    overlay2.classList.add("active");
    const p = document.createElement("p");
    p.textContent = `Reported at ${new Date(data.time).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    })}`;
    div.appendChild(p);
    const btn = document.createElement("button");
    btn.textContent = "Proceed";
    btn.classList.add("proceed");
    div.appendChild(btn);
    btn.addEventListener("click", ()=>{
        div.classList.remove("show");
        overlay2.classList.remove("active");
        fireAlertSound.pause();
        getReports();
    });
    overlay2.addEventListener("click", ()=>{
        div.classList.remove("show");
        overlay2.classList.remove("active");
        fireAlertSound.pause();
        getReports();

    });
    fireAlertSound.play();
}
if(data.type === "Armed Violence"){
   const div = document.createElement("div");
     div.classList.add("alert-box");
     div.innerHTML = `
     <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" ><path d="M200-160v-80h64l79-263q8-26 29.5-41.5T420-560h120q26 0 47.5 15.5T617-503l79 263h64v80H200Zm148-80h264l-72-240H420l-72 240Zm92-400v-200h80v200h-80Zm238 99-57-57 142-141 56 56-141 142Zm42 181v-80h200v80H720ZM282-541 141-683l56-56 142 141-57 57ZM40-360v-80h200v80H40Zm440 120Z"/></svg>

    <h1>ACTIVE SHOOTER ALERT</h1>

    <h2>
    There is an active shooter at ${data.location}.
    Stay calm and follow these safety instructions.
    </h2>

    <ul>
   <li>If safe, escape immediately and move away from the threat. If you cannot escape, lock or barricade the door and stay hidden.</li>
   <li>If you encounter responders, keep your hands visible and follow their instructions. Once safe, contact authorities and do not return until cleared.
    </ul>
    `;
    document.body.appendChild(div);
    div.classList.add("show");
    overlay2.classList.add("active");
    const p = document.createElement("p");
    p.textContent = `Reported at ${new Date(data.time).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    })}`;
    div.appendChild(p);
    const btn = document.createElement("button");
    btn.textContent = "Proceed";
    btn.classList.add("proceed");
    div.appendChild(btn);
    btn.addEventListener("click", ()=>{
        div.classList.remove("show");
        overlay2.classList.remove("active");
        schoolShooterAlertSound.pause();
        getReports();
    });
    overlay2.addEventListener("click", ()=>{
        div.classList.remove("show");
        overlay2.classList.remove("active");
        schoolShooterAlertSound.pause();
        getReports();
    });
    schoolShooterAlertSound.play();
}
});

async function getBuddies(){
    try{
       const buddies = await seeAllBuddiesAPICaller();
       if(buddies.forceLogout){
         forceLogout();
       }
       if(!buddies.success){
          seeAllBuddiesErrorBox.classList.add("shown");
          overlay.classList.add("active");
          return;
       }
       console.log(buddies);
       renderBuddiesSidebar(buddies.data);
    }catch(err){
       seeAllBuddiesErrorBox.classList.add("shown");
       overlay.classList.add("active");
    }
}
closeSeeAllBuddiesErorBox.addEventListener("click", ()=>{
     seeAllBuddiesErrorBox.classList.remove("shown");
     overlay.classList.remove("active");
});

const buddiesContainer = document.querySelector('.buddies-container');
async function renderBuddiesSidebar(arr){
    buddiesContainer.innerHTML = "";
    for(const a of arr){
        const buddiesInner = document.createElement("div");
        buddiesInner.classList.add("buddies-inner");
        buddiesContainer.appendChild(buddiesInner);
        const img = document.createElement("img");
        img.src = a.profile_pic;
        buddiesInner.appendChild(img);
        const h3 = document.createElement("h3");
        h3.textContent = a.name;
        buddiesInner.appendChild(h3);
        buddiesInner.addEventListener("click", async ()=>{
            try{
              const visit = await visitUserProfileAPICaller(a.userid);
              if(visit.forceLogout){
                forceLogout();
              }
              if(!visit.success){
                  visitUserProfileErrorBox.classList.add("shown");
                  overlay.classList.add("active");
                  return;
              }
              console.log(visit);
              renderVisitProfile(visit.data.data, visit.data.reports);
            }catch(err){
              visitUserProfileErrorBox.classList.add("shown");
              overlay.classList.add("active");
            }
        });
    }
}
async function renderProfile(arr, reports){
    newsFeedDiv.innerHTML = "";
    const h3 = document.createElement("h3");
    h3.textContent =  `Your Profile`;
    newsFeedDiv.appendChild(h3);
    const profileBox = document.createElement('div');
    profileBox.classList.add('profile-box');
    newsFeedDiv.appendChild(profileBox);
    const top = document.createElement('div');
    top.classList.add("top");
    profileBox.appendChild(top);
    const img = document.createElement("img");
    img.src = arr.profile_pic;
    top.appendChild(img);
    const bundle = document.createElement('div');
    bundle.classList.add("bundle");
    top.appendChild(bundle);
    const h2 = document.createElement("h2");
    h2.textContent = arr.name;
    bundle.appendChild(h2);
    const p = document.createElement("p");
    if(arr.occupation !== "Student"){
       p.textContent = `${arr.occupation} At Pamantasang Lungsod Ng Muntinlupa`;
    }else{
        
    p.textContent = arr.program;
    }
   
    bundle.appendChild(p);
    const topP = document.createElement("p");
    topP.textContent = `${arr.occupation}`;
    top.appendChild(topP);
    const bottom = document.createElement("div");
    bottom.classList.add("bottom");
    profileBox.appendChild(bottom);
    const line = document.createElement('hr');
    bottom.appendChild(line)
    const bundle2 = document.createElement("div");
    bundle2.classList.add("bundle");
    bottom.appendChild(bundle2);
    const bottomH3 =  document.createElement("h3");
    bottomH3.textContent = 'Bio';
    bundle2.appendChild(bottomH3);
    const bottomP = document.createElement("p");
    bottomP.textContent = arr.bio;
    bundle2.appendChild(bottomP);
     const p2 = document.createElement("p");
    p2.textContent = `Joined SafePLMUN Since ${new Date(arr.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
    })}`;
    bottom.appendChild(p2);

    const h3Second = document.createElement("h3");
    h3Second.textContent =  `Your Contributions`;
    newsFeedDiv.appendChild(h3Second);
    const username = localStorage.getItem("name");
    for(const a of reports){
     const report = document.createElement("div");
     report.classList.add("report-box");
     newsFeedDiv.appendChild(report);
     const profileSection = document.createElement("div");
     profileSection.classList.add("profile-section");
     report.appendChild(profileSection);
     const bundele = document.createElement('div');
     bundele.classList.add("bundle");
     profileSection.appendChild(bundele);
     const pic = document.createElement("img");
     pic.src = a.profile_pic;
     bundele.appendChild(pic);
     const name = document.createElement("p");
     name.textContent = a.name;
     bundele.appendChild(name);
     const time = document.createElement("p");
     const date = new Date(a.created_at);
     time.textContent = date.toLocaleString("en-PH", {
       month: "short",
       day: "numeric",
       year: "numeric",
       hour: "numeric",
       minute: "2-digit",
    });
    profileSection.appendChild(time);
    const bigSection = document.createElement('div');
    bigSection.classList.add("big-section");
    report.appendChild(bigSection);
    const alert = document.createElement("h2");
    alert.textContent = `${a.type} Alert at the ${a.location}. Stay Safe My Fellow PLMUNians!`;
    bigSection.appendChild(alert);
    const square =  document.createElement('div');
    square.classList.add("square");
    bigSection.appendChild(square);
    if(a.isfalsealarm){
        const isFalseAlarmMessage = document.createElement("h3");
        isFalseAlarmMessage.textContent = `This report has been marked as false alarm by our SafePLMUN admin, please ignore this and stay safe.`
        square.appendChild(isFalseAlarmMessage);
    }else{

    
    try{
       const check = await getStatusAPICaller(a.report_id);
       if(check.forceLogout){
        forceLogout();
       }
       if(!check.success){
         checkErrorBox.classList.add("shown");
        overlay.classList.add("active");
       }
       if(check.allow){
        
        const p = document.createElement("p");
        p.textContent = `What's you current status ${username.split(" ")[0]}?`;
        square.appendChild(p);
        const btnContainer = document.createElement('div');
        btnContainer.classList.add("buttons");
        square.appendChild(btnContainer);
        const safeBTN = document.createElement("button");
        safeBTN.textContent = `I'm Safe`;
        safeBTN.classList.add("imsafe");
        btnContainer.appendChild(safeBTN);
        const helpBTN = document.createElement("button");
        helpBTN.textContent = `Need Help`;
        helpBTN.classList.add("needhelp");
        btnContainer.appendChild(helpBTN);

        safeBTN.addEventListener("click", async ()=>{
            try{
                const safe = await markAsSafeAPICaller(a.report_id);
                if(safe.forceLogout){
                    forceLogout();
                }
                if(!safe.success){
                    safeErrorBox.classList.add("shown");
                    overlay.classList.add("active");
                    return;
                }
                square.innerHTML = "";
                bigSection.classList.add("safe");
                square.classList.add("safe");
                const safeMessage = document.createElement("h3");
                safeMessage.textContent = `You are safe ${username.split(" ")[0]}. Your buddies can now see your updated status.`;
                square.appendChild(safeMessage);
                getReports();
            }catch(err){
                safeErrorBox.classList.add("shown");
                overlay.classList.add("active");
            }
        });
        helpBTN.addEventListener("click", async ()=>{
           overlay3.classList.add("active");
           const helpInputBox = document.createElement('div');
           helpInputBox.classList.add("input-box");
           helpInputBox.classList.add("show");
           const h3 = document.createElement('h2');
           h3.textContent = `Help Responders Get To You Quicker`;
           helpInputBox.appendChild(h3);
           document.body.appendChild(helpInputBox);
           const label = document.createElement('label');
           label.textContent = `Your Current Location:`;
           helpInputBox.appendChild(label);
           const span = document.createElement("span");
           span.classList.add("error");
           helpInputBox.appendChild(span);
           const locationInput = document.createElement('input');
           locationInput.placeholder = `Enter your current location`;
           helpInputBox.appendChild(locationInput);
           const ul = document.createElement("ul");
           helpInputBox.appendChild(ul);

           const label2 = document.createElement('label');
           label2.textContent = `Extra instructions:`;
           helpInputBox.appendChild(label2);
           const span2 = document.createElement("span");
           span2.classList.add("error");
           helpInputBox.appendChild(span2);
           const extraInput = document.createElement('input');
           extraInput.placeholder = `Enter extra instructions`;
           helpInputBox.appendChild(extraInput);

           const confirm = document.createElement('button');
           confirm.id = "help-confirm-final";
           confirm.textContent = "Confirm";
           helpInputBox.appendChild(confirm);

           const cancel = document.createElement('button');
           cancel.id = "cancel-report-help";
           cancel.textContent = `Cancel`;
           helpInputBox.appendChild(cancel);

           overlay3.addEventListener("click", ()=>{
            overlay3.classList.remove("active");
            document.body.removeChild(helpInputBox);
            span.textContent = "";
            span2.textContent = "";
            span.classList.remove("errore");
            span2.classList.remove("errore");
            locationInput.value = "";
            extraInput.value = "";
           });
           cancel.addEventListener("click", ()=>{
            overlay3.classList.remove("active");
            document.body.removeChild(helpInputBox);
            span.textContent = "";
            span2.textContent = "";
            span.classList.remove("errore");
            span2.classList.remove("errore");
            locationInput.value = "";
            extraInput.value = "";
           });

           locationInput.addEventListener("click", ()=>{
            ul.innerHTML = "";
            ul.classList.add('show');
            locations.forEach((a)=>{
                const li = document.createElement("li");
                li.textContent = a;
                ul.appendChild(li);
                li.addEventListener("click", ()=>{
                    locationInput.value = li.textContent;
                    ul.innerHTML = "";
                    ul.classList.remove('show');
                });
            });
        
           });

            locationInput.addEventListener("input", ()=>{
               span.textContent = "";
            span2.textContent = "";
            span.classList.remove("errored");
            span2.classList.remove("errored");
            });

            extraInput.addEventListener("input", ()=>{
               span.textContent = "";
            span2.textContent = "";
            span.classList.remove("errored");
            span2.classList.remove("errored");
            });
           let confirmingLocation = false;
           confirm.addEventListener("click", async ()=>{
            let hasError = false;
            if(confirmingLocation)return;
             if(locationInput.value.trim() === ""){
                span.textContent = 'Please enter your proper current location!';
                span.classList.add("errored");
                hasError = true;
             }
             if(extraInput.value.trim() === ""){
                span2.textContent = 'Please enter extra instructions to help responders get to you quicker!';
                span2.classList.add("errored");
                hasError = true;
             }
             if(extraInput.value.length > 20){
                span2.textContent = 'Please enter a shorter extra instruction!';
                span2.classList.add("errored");
                extraInput.value = "";
                hasError = true;
             }
             if(hasError)return;
             const location = locationInput.value.trim();
             const extra = extraInput.value.trim();
             confirmingLocation = true;
             confirm.disabled = true;
             try{
                const help = await markAsNeedHelpAPICaller(a.report_id, location, extra);
                if(help.forceLogout){
                    forceLogout();
                }
                if(!help.success){
                    helpErrorBox.classList.add("shown");
                    overlay.classList.add("active");
                    return;
                }
                square.classList.add("help");
                bigSection.classList.add("help");
                const safeMessage = document.createElement("h3");
                safeMessage.textContent = `Stay alert ${username.split(" ")[0]}. The admin and your buddies can now see your status. Please stay safe and wait for emergency responders.`;
                square.appendChild(safeMessage);
                const imSafeNowBTN = document.createElement("button");
                imSafeNowBTN.textContent = `I'm Safe`;
                square.appendChild(imSafeNowBTN);
                overlay3.classList.remove("active");
                document.body.removeChild(helpInputBox);
                span.textContent = "";
                span2.textContent = "";
                span.classList.remove("errored");
                span2.classList.remove("errored");
                locationInput.value = "";
                extraInput.value = "";
                getReports();
             }catch(err){
                helpErrorBox.classList.add("shown");
                overlay.classList.add("active");
             }finally{
                confirmingLocation = false;
                confirm.disabled = false;
             }
           
           });
        });
       } 
       if(!check.allow && check.safe){
          bigSection.classList.add("safe");
          square.classList.add("safe");
          const safeMessage = document.createElement("h3");
          safeMessage.textContent = `You are safe ${username.split(" ")[0]}. Your buddies can now see your updated status.`;
          square.appendChild(safeMessage);
       }
       if(!check.allow && !check.safe){
          square.classList.add("help");
          bigSection.classList.add("help");
          const safeMessage = document.createElement("h3");
          safeMessage.textContent = `Stay alert ${username.split(" ")[0]}. The admin and your buddies can now see your status. Please stay safe and wait for emergency responders.`;
          square.appendChild(safeMessage);
          const imSafeNowBTN = document.createElement("button");
          imSafeNowBTN.textContent = `I'm Safe`;
          square.appendChild(imSafeNowBTN);
          imSafeNowBTN.addEventListener("click", async ()=>{
             try{
                const rescued = await markAsRescuedAPICaller(a.report_id);
                if(rescued.forceLogout){
                    forceLogout();
                }
                if(!rescued.success){
                    rescuedErrorBox.classList.add("shown");
                    overlay.classList.add('active');
                    return;
                }
                bigSection.classList.add("safe");
                square.classList.add("safe");
                const safeMessage = document.createElement("h3");
                safeMessage.textContent = `You are safe ${username.split(" ")[0]}. Your buddies can now see your updated status.`;
                square.appendChild(safeMessage);
                getReports();
             }catch(err){
                rescuedErrorBox.classList.add("shown");
                overlay.classList.add('active');
             }
          });
       }
    }catch(err){
       checkErrorBox.classList.add("shown");
       overlay.classList.add("active");
    }






    const overview = document.createElement("div");
    overview.classList.add("overview");
    bigSection.appendChild(overview);
    const safeSection = document.createElement("div");
    safeSection.classList.add("safe");
    overview.appendChild(safeSection);
    const safeGlow = document.createElement("div");
    safeGlow.classList.add("safeGlow");
    safeSection.appendChild(safeGlow);
    const safes = document.createElement("p");
    safes.textContent = `${a.safe} Marked Safe`;
    safeSection.appendChild(safes);
    const helpSection = document.createElement("div");
    helpSection.classList.add('help');
    overview.appendChild(helpSection);
    const helpGlow =  document.createElement("div");
    helpGlow.classList.add('helpGlow');
    helpSection.appendChild(helpGlow);
    const helps = document.createElement("p");
    helps.textContent = `${a.help} Need Help`;
    helpSection.appendChild(helps);
}

}
}









async function renderVisitProfile(arr, reports){
    newsFeedDiv.innerHTML = "";
    const h3 = document.createElement("h3");
    h3.textContent =  `Profile`;
    newsFeedDiv.appendChild(h3);
    const profileBox = document.createElement('div');
    profileBox.classList.add('profile-box');
    newsFeedDiv.appendChild(profileBox);
    const top = document.createElement('div');
    top.classList.add("top");
    profileBox.appendChild(top);
    const img = document.createElement("img");
    img.src = arr.profile_pic;
    top.appendChild(img);
    const bundle = document.createElement('div');
    bundle.classList.add("bundle");
    top.appendChild(bundle);
    const h2 = document.createElement("h2");
    h2.textContent = arr.name;
    bundle.appendChild(h2);
    const p = document.createElement("p");
    if(arr.occupation !== "Student"){
       p.textContent = `${arr.occupation} At Pamantasang Lungsod Ng Muntinlupa`;
    }else{
        
    p.textContent = arr.program;
    }
   
    bundle.appendChild(p);
    const topP = document.createElement("p");
    topP.textContent = `${arr.occupation}`;
    top.appendChild(topP);
    const bottom = document.createElement("div");
    bottom.classList.add("bottom");
    profileBox.appendChild(bottom);
    
     try{
        const check = await checkIfAlreadyBuddiesAPICaller(arr.userid);
        if(check.forceLogout){
            forceLogout();
        }
        if(!check.success){
            checkIfBuddyErrorBox.classList.add("shown");
            overlay.classList.add("active");
            return;
        }
        if(check.allow){
            const btn = document.createElement("button");
            btn.textContent = `Add Buddy`;
            bottom.appendChild(btn);
            let buddyingNa = false;
            btn.addEventListener("click", async ()=>{
              if(buddyingNa)return;
             
              buddyingNa = true;
              createProfileSkeleton();
              try{
                const buddying = await setUserAsBuddyAPICaller(arr.userid, nameUser);
                if(buddying.forceLogout){
                  forceLogout();
                }
                if(!buddying.success){
                  setAsBuddyErrorBox.classList.add("shown");
                  overlay.classList.add("active");
                  btn.textContent = `Add Buddy`;;
                  return;
                }

                renderVisitProfile(arr, reports);
                
              }catch(err){
                 setAsBuddyErrorBox.classList.add("shown");
                 overlay.classList.add("active");
                 btn.textContent = `Add Buddy`;
              }finally{
                 btn.textContent = `Add Buddy`;
                buddyingNa = false;
             }
            });
        }else{
            const unBuddyBTN = document.createElement("button");
            unBuddyBTN.textContent = `Unbuddy`;
            bottom.appendChild(unBuddyBTN);
            let unbuddying = false;
            unBuddyBTN.addEventListener("click", async ()=>{
               if(unbuddying)return;
               unbuddying = true;
               try{
                  const unbuddyNa = await unBuddyAPICaller(arr.userid);
                  if(unbuddyNa.forceLogout){
                    forceLogout();
                  }
                  if(!unbuddyNa.success){
                     unBuddyErrorBox.classList.add("shown");
                     overlay.classList.add("active");
                     return;
                  }
                  
                renderVisitProfile(arr, reports);
                  
               }catch(err){
                  unBuddyErrorBox.classList.add("shown");
                  overlay.classList.add("active");
               }
            });
        }
        }catch(err){
            checkIfBuddyErrorBox.classList.add("shown");
            overlay.classList.add("active");
            return;
        }
        
    const line = document.createElement('hr');
    bottom.appendChild(line)
    
    const bundle2 = document.createElement("div");
    bundle2.classList.add("bundle");
    bottom.appendChild(bundle2);
    const bottomH3 =  document.createElement("h3");
    bottomH3.textContent = 'Bio';
    bundle2.appendChild(bottomH3);
    const bottomP = document.createElement("p");
    bottomP.textContent = arr.bio;
    bundle2.appendChild(bottomP);
    








    const nameUser = localStorage.getItem("name");
     const p2 = document.createElement("p");
    p2.textContent = `Joined SafePLMUN Since ${new Date(arr.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
    })}`;
    bottom.appendChild(p2);

   














    const h3Second = document.createElement("h3");
    h3Second.textContent =  `Contributions`;
    newsFeedDiv.appendChild(h3Second);
    const username = localStorage.getItem("name");
    for(const a of reports){
     const report = document.createElement("div");
     report.classList.add("report-box");
     newsFeedDiv.appendChild(report);
     const profileSection = document.createElement("div");
     profileSection.classList.add("profile-section");
     report.appendChild(profileSection);
     const bundele = document.createElement('div');
     bundele.classList.add("bundle");
     profileSection.appendChild(bundele);
     const pic = document.createElement("img");
     pic.src = a.profile_pic;
     bundele.appendChild(pic);
     const name = document.createElement("p");
     name.textContent = a.name;
     bundele.appendChild(name);
     const time = document.createElement("p");
     const date = new Date(a.created_at);
     time.textContent = date.toLocaleString("en-PH", {
       month: "short",
       day: "numeric",
       year: "numeric",
       hour: "numeric",
       minute: "2-digit",
    });
    profileSection.appendChild(time);
    const bigSection = document.createElement('div');
    bigSection.classList.add("big-section");
    report.appendChild(bigSection);
    const alert = document.createElement("h2");
    alert.textContent = `${a.type} Alert at the ${a.location}. Stay Safe My Fellow PLMUNians!`;
    bigSection.appendChild(alert);
    const square =  document.createElement('div');
    square.classList.add("square");
    bigSection.appendChild(square);
    if(a.isfalsealarm){
        const isFalseAlarmMessage = document.createElement("h3");
        isFalseAlarmMessage.textContent = `This report has been marked as false alarm by our SafePLMUN admin, please ignore this and stay safe.`
        square.appendChild(isFalseAlarmMessage);
    }else{
    try{
       const check = await getStatusAPICaller(a.report_id);
       if(check.forceLogout){
        forceLogout();
       }
       if(!check.success){
         checkErrorBox.classList.add("shown");
        overlay.classList.add("active");
       }
       if(check.allow){
        
        const p = document.createElement("p");
        p.textContent = `What's you current status ${username.split(" ")[0]}?`;
        square.appendChild(p);
        const btnContainer = document.createElement('div');
        btnContainer.classList.add("buttons");
        square.appendChild(btnContainer);
        const safeBTN = document.createElement("button");
        safeBTN.textContent = `I'm Safe`;
        safeBTN.classList.add("imsafe");
        btnContainer.appendChild(safeBTN);
        const helpBTN = document.createElement("button");
        helpBTN.textContent = `Need Help`;
        helpBTN.classList.add("needhelp");
        btnContainer.appendChild(helpBTN);

        safeBTN.addEventListener("click", async ()=>{
            try{
                const safe = await markAsSafeAPICaller(a.report_id);
                if(safe.forceLogout){
                    forceLogout();
                }
                if(!safe.success){
                    safeErrorBox.classList.add("shown");
                    overlay.classList.add("active");
                    return;
                }
                square.innerHTML = "";
                bigSection.classList.add("safe");
                square.classList.add("safe");
                const safeMessage = document.createElement("h3");
                safeMessage.textContent = `You are safe ${username.split(" ")[0]}. Your buddies can now see your updated status.`;
                square.appendChild(safeMessage);
                getReports();
            }catch(err){
                safeErrorBox.classList.add("shown");
                overlay.classList.add("active");
            }
        });
        helpBTN.addEventListener("click", async ()=>{
           overlay3.classList.add("active");
           const helpInputBox = document.createElement('div');
           helpInputBox.classList.add("input-box");
           helpInputBox.classList.add("show");
           const h3 = document.createElement('h2');
           h3.textContent = `Help Responders Get To You Quicker`;
           helpInputBox.appendChild(h3);
           document.body.appendChild(helpInputBox);
           const label = document.createElement('label');
           label.textContent = `Your Current Location:`;
           helpInputBox.appendChild(label);
           const span = document.createElement("span");
           span.classList.add("error");
           helpInputBox.appendChild(span);
           const locationInput = document.createElement('input');
           locationInput.placeholder = `Enter your current location`;
           helpInputBox.appendChild(locationInput);
           const ul = document.createElement("ul");
           helpInputBox.appendChild(ul);

           const label2 = document.createElement('label');
           label2.textContent = `Extra instructions:`;
           helpInputBox.appendChild(label2);
           const span2 = document.createElement("span");
           span2.classList.add("error");
           helpInputBox.appendChild(span2);
           const extraInput = document.createElement('input');
           extraInput.placeholder = `Enter extra instructions`;
           helpInputBox.appendChild(extraInput);

           const confirm = document.createElement('button');
           confirm.id = "help-confirm-final";
           confirm.textContent = "Confirm";
           helpInputBox.appendChild(confirm);

           const cancel = document.createElement('button');
           cancel.id = "cancel-report-help";
           cancel.textContent = `Cancel`;
           helpInputBox.appendChild(cancel);

           overlay3.addEventListener("click", ()=>{
            overlay3.classList.remove("active");
            document.body.removeChild(helpInputBox);
            span.textContent = "";
            span2.textContent = "";
            span.classList.remove("errore");
            span2.classList.remove("errore");
            locationInput.value = "";
            extraInput.value = "";
           });
           cancel.addEventListener("click", ()=>{
            overlay3.classList.remove("active");
            document.body.removeChild(helpInputBox);
            span.textContent = "";
            span2.textContent = "";
            span.classList.remove("errore");
            span2.classList.remove("errore");
            locationInput.value = "";
            extraInput.value = "";
           });

           locationInput.addEventListener("click", ()=>{
            ul.innerHTML = "";
            ul.classList.add('show');
            locations.forEach((a)=>{
                const li = document.createElement("li");
                li.textContent = a;
                ul.appendChild(li);
                li.addEventListener("click", ()=>{
                    locationInput.value = li.textContent;
                    ul.innerHTML = "";
                    ul.classList.remove('show');
                });
            });
        
           });

            locationInput.addEventListener("input", ()=>{
               span.textContent = "";
            span2.textContent = "";
            span.classList.remove("errored");
            span2.classList.remove("errored");
            });

            extraInput.addEventListener("input", ()=>{
               span.textContent = "";
            span2.textContent = "";
            span.classList.remove("errored");
            span2.classList.remove("errored");
            });
           let confirmingLocation = false;
           confirm.addEventListener("click", async ()=>{
            let hasError = false;
            if(confirmingLocation)return;
             if(locationInput.value.trim() === ""){
                span.textContent = 'Please enter your proper current location!';
                span.classList.add("errored");
                hasError = true;
             }
             if(extraInput.value.trim() === ""){
                span2.textContent = 'Please enter extra instructions to help responders get to you quicker!';
                span2.classList.add("errored");
                hasError = true;
             }
              if(extraInput.value.length > 20){
                span2.textContent = 'Please enter a shorter extra instruction!';
                span2.classList.add("errored");
                extraInput.value = "";
                hasError = true;
             }
             if(hasError)return;
             const location = locationInput.value.trim();
             const extra = extraInput.value.trim();
             confirmingLocation = true;
             confirm.disabled = true;
             try{
                const help = await markAsNeedHelpAPICaller(a.report_id, location, extra);
                if(help.forceLogout){
                    forceLogout();
                }
                if(!help.success){
                    helpErrorBox.classList.add("shown");
                    overlay.classList.add("active");
                    return;
                }
                square.classList.add("help");
                bigSection.classList.add("help");
                const safeMessage = document.createElement("h3");
                safeMessage.textContent = `Stay alert ${username.split(" ")[0]}. The admin and your buddies can now see your status. Please stay safe and wait for emergency responders.`;
                square.appendChild(safeMessage);
                const imSafeNowBTN = document.createElement("button");
                imSafeNowBTN.textContent = `I'm Safe`;
                square.appendChild(imSafeNowBTN);
                overlay3.classList.remove("active");
                document.body.removeChild(helpInputBox);
                span.textContent = "";
                span2.textContent = "";
                span.classList.remove("errored");
                span2.classList.remove("errored");
                locationInput.value = "";
                extraInput.value = "";
                getReports();
             }catch(err){
                helpErrorBox.classList.add("shown");
                overlay.classList.add("active");
             }finally{
                confirmingLocation = false;
                confirm.disabled = false;
             }
           
           });
        });
       } 
       if(!check.allow && check.safe){
          bigSection.classList.add("safe");
          square.classList.add("safe");
          const safeMessage = document.createElement("h3");
          safeMessage.textContent = `You are safe ${username.split(" ")[0]}. Your buddies can now see your updated status.`;
          square.appendChild(safeMessage);
       }
       if(!check.allow && !check.safe){
          square.classList.add("help");
          bigSection.classList.add("help");
          const safeMessage = document.createElement("h3");
          safeMessage.textContent = `Stay alert ${username.split(" ")[0]}. The admin and your buddies can now see your status. Please stay safe and wait for emergency responders.`;
          square.appendChild(safeMessage);
          const imSafeNowBTN = document.createElement("button");
          imSafeNowBTN.textContent = `I'm Safe`;
          square.appendChild(imSafeNowBTN);
          imSafeNowBTN.addEventListener("click", async ()=>{
             try{
                const rescued = await markAsRescuedAPICaller(a.report_id);
                if(rescued.forceLogout){
                    forceLogout();
                }
                if(!rescued.success){
                    rescuedErrorBox.classList.add("shown");
                    overlay.classList.add('active');
                    return;
                }
                bigSection.classList.add("safe");
                square.classList.add("safe");
                const safeMessage = document.createElement("h3");
                safeMessage.textContent = `You are safe ${username.split(" ")[0]}. Your buddies can now see your updated status.`;
                square.appendChild(safeMessage);
                getReports();
             }catch(err){
                rescuedErrorBox.classList.add("shown");
                overlay.classList.add('active');
             }
          });
       }
    }catch(err){
       checkErrorBox.classList.add("shown");
       overlay.classList.add("active");
    }






    const overview = document.createElement("div");
    overview.classList.add("overview");
    bigSection.appendChild(overview);
    const safeSection = document.createElement("div");
    safeSection.classList.add("safe");
    overview.appendChild(safeSection);
    const safeGlow = document.createElement("div");
    safeGlow.classList.add("safeGlow");
    safeSection.appendChild(safeGlow);
    const safes = document.createElement("p");
    safes.textContent = `${a.safe} Marked Safe`;
    safeSection.appendChild(safes);
    const helpSection = document.createElement("div");
    helpSection.classList.add('help');
    overview.appendChild(helpSection);
    const helpGlow =  document.createElement("div");
    helpGlow.classList.add('helpGlow');
    helpSection.appendChild(helpGlow);
    const helps = document.createElement("p");
    helps.textContent = `${a.help} Need Help`;
    helpSection.appendChild(helps);
}
    }

}



async function renderNewsFeed(arr){
    const username = localStorage.getItem("name");
     newsFeedDiv.innerHTML = "";
     const guide = document.createElement("h3");
     guide.textContent = `Your Newsfeed`;
     newsFeedDiv.appendChild(guide);
     for(const a of arr){
     const report = document.createElement("div");
     report.classList.add("report-box");
     newsFeedDiv.appendChild(report);
     const profileSection = document.createElement("div");
     profileSection.classList.add("profile-section");
     report.appendChild(profileSection);
     const bundele = document.createElement('div');
     bundele.classList.add("bundle");
     profileSection.appendChild(bundele);
     const pic = document.createElement("img");
     pic.src = a.profile_pic;
     bundele.appendChild(pic);
     const name = document.createElement("p");
     name.textContent = a.name;
     bundele.appendChild(name);
     const userRole = localStorage.getItem("role");
     const time = document.createElement("p");
     const date = new Date(a.created_at);
     time.textContent = date.toLocaleString("en-PH", {
       month: "short",
       day: "numeric",
       year: "numeric",
       hour: "numeric",
       minute: "2-digit",
    });
    profileSection.appendChild(time);
      if(userRole === "admin" && !a.isfalsealarm){
        const setReportAsFalseAlarmBTN = document.createElement("button");
        setReportAsFalseAlarmBTN.textContent = 'Misfire';
        profileSection.appendChild(setReportAsFalseAlarmBTN);
        setReportAsFalseAlarmBTN.addEventListener("click", async ()=>{
            try{
                const falseAlarm = await setReportAsFalseAlarmAPICaller(a.report_id);
                if(falseAlarm.forceLogout){
                    forceLogout();
                }
                if(!falseAlarm.success){
                    falseAlarmErrorBox.classList.add("shown");
                    overlay.classList.add("active");
                    return;
                }
                getReports();
            }catch(err){
                falseAlarmErrorBox.classList.add("shown");
                overlay.classList.add("active");
            }
        });
     }
    const bigSection = document.createElement('div');
    bigSection.classList.add("big-section");
    report.appendChild(bigSection);
    const alert = document.createElement("h2");
    alert.textContent = `${a.type} Alert at the ${a.location}. Stay Safe My Fellow PLMUNians!`;
    bigSection.appendChild(alert);
    const square =  document.createElement('div');
    square.classList.add("square");
    bigSection.appendChild(square);
    if(a.isfalsealarm){
        const isFalseAlarmMessage = document.createElement("h3");
        isFalseAlarmMessage.textContent = `This report has been marked as false alarm by our SafePLMUN admin, please ignore this and stay safe.`
        square.appendChild(isFalseAlarmMessage);
    }else{
    try{
       const check = await getStatusAPICaller(a.report_id);
       if(check.forceLogout){
        forceLogout();
       }
       if(!check.success){
         checkErrorBox.classList.add("shown");
        overlay.classList.add("active");
       }
       if(check.allow){
        
        const p = document.createElement("p");
        p.textContent = `What's you current status ${username.split(" ")[0]}?`;
        square.appendChild(p);
        const btnContainer = document.createElement('div');
        btnContainer.classList.add("buttons");
        square.appendChild(btnContainer);
        const safeBTN = document.createElement("button");
        safeBTN.textContent = `I'm Safe`;
        safeBTN.classList.add("imsafe");
        btnContainer.appendChild(safeBTN);
        const helpBTN = document.createElement("button");
        helpBTN.textContent = `Need Help`;
        helpBTN.classList.add("needhelp");
        btnContainer.appendChild(helpBTN);

        safeBTN.addEventListener("click", async ()=>{
            try{
                const safe = await markAsSafeAPICaller(a.report_id);
                if(safe.forceLogout){
                    forceLogout();
                }
                if(!safe.success){
                    safeErrorBox.classList.add("shown");
                    overlay.classList.add("active");
                    return;
                }
                square.innerHTML = "";
                bigSection.classList.add("safe");
                square.classList.add("safe");
                const safeMessage = document.createElement("h3");
                safeMessage.textContent = `You are safe ${username.split(" ")[0]}. Your buddies can now see your updated status.`;
                square.appendChild(safeMessage);
                getReports();
            }catch(err){
                safeErrorBox.classList.add("shown");
                overlay.classList.add("active");
            }
        });
        helpBTN.addEventListener("click", async ()=>{
           overlay3.classList.add("active");
           const helpInputBox = document.createElement('div');
           helpInputBox.classList.add("input-box");
           helpInputBox.classList.add("show");
           const h3 = document.createElement('h2');
           h3.textContent = `Help Responders Get To You Quicker`;
           helpInputBox.appendChild(h3);
           document.body.appendChild(helpInputBox);
           const label = document.createElement('label');
           label.textContent = `Your Current Location:`;
           helpInputBox.appendChild(label);
           const span = document.createElement("span");
           span.classList.add("error");
           helpInputBox.appendChild(span);
           const locationInput = document.createElement('input');
           locationInput.placeholder = `Enter your current location`;
           helpInputBox.appendChild(locationInput);
           const ul = document.createElement("ul");
           helpInputBox.appendChild(ul);

           const label2 = document.createElement('label');
           label2.textContent = `Extra instructions:`;
           helpInputBox.appendChild(label2);
           const span2 = document.createElement("span");
           span2.classList.add("error");
           helpInputBox.appendChild(span2);
           const extraInput = document.createElement('input');
           extraInput.placeholder = `Enter extra instructions`;
           helpInputBox.appendChild(extraInput);

           const confirm = document.createElement('button');
           confirm.id = "help-confirm-final";
           confirm.textContent = "Confirm";
           helpInputBox.appendChild(confirm);

           const cancel = document.createElement('button');
           cancel.id = "cancel-report-help";
           cancel.textContent = `Cancel`;
           helpInputBox.appendChild(cancel);

           overlay3.addEventListener("click", ()=>{
            overlay3.classList.remove("active");
            document.body.removeChild(helpInputBox);
            span.textContent = "";
            span2.textContent = "";
            span.classList.remove("errore");
            span2.classList.remove("errore");
            locationInput.value = "";
            extraInput.value = "";
           });
           cancel.addEventListener("click", ()=>{
            overlay3.classList.remove("active");
            document.body.removeChild(helpInputBox);
            span.textContent = "";
            span2.textContent = "";
            span.classList.remove("errore");
            span2.classList.remove("errore");
            locationInput.value = "";
            extraInput.value = "";
           });

           locationInput.addEventListener("click", ()=>{
            ul.innerHTML = "";
            ul.classList.add('show');
            locations.forEach((a)=>{
                const li = document.createElement("li");
                li.textContent = a;
                ul.appendChild(li);
                li.addEventListener("click", ()=>{
                    locationInput.value = li.textContent;
                    ul.innerHTML = "";
                    ul.classList.remove('show');
                });
            });
        
           });

            locationInput.addEventListener("input", ()=>{
               span.textContent = "";
            span2.textContent = "";
            span.classList.remove("errored");
            span2.classList.remove("errored");
            });

            extraInput.addEventListener("input", ()=>{
               span.textContent = "";
            span2.textContent = "";
            span.classList.remove("errored");
            span2.classList.remove("errored");
            });
           let confirmingLocation = false;
           confirm.addEventListener("click", async ()=>{
            let hasError = false;
            if(confirmingLocation)return;
             if(locationInput.value.trim() === ""){
                span.textContent = 'Please enter your proper current location!';
                span.classList.add("errored");
                hasError = true;
             }
             if(extraInput.value.trim() === ""){
                span2.textContent = 'Please enter extra instructions to help responders get to you quicker!';
                span2.classList.add("errored");
                hasError = true;
             }
              if(extraInput.value.length > 20){
                span2.textContent = 'Please enter a shorter extra instruction!';
                span2.classList.add("errored");
                extraInput.value = "";
                hasError = true;
             }
             if(hasError)return;
             const location = locationInput.value.trim();
             const extra = extraInput.value.trim();
             confirmingLocation = true;
             confirm.disabled = true;
             try{
                const help = await markAsNeedHelpAPICaller(a.report_id, location, extra);
                if(help.forceLogout){
                    forceLogout();
                }
                if(!help.success){
                    helpErrorBox.classList.add("shown");
                    overlay.classList.add("active");
                    return;
                }
                square.classList.add("help");
                bigSection.classList.add("help");
                const safeMessage = document.createElement("h3");
                safeMessage.textContent = `Stay alert ${username.split(" ")[0]}. The admin and your buddies can now see your status. Please stay safe and wait for emergency responders.`;
                square.appendChild(safeMessage);
                const imSafeNowBTN = document.createElement("button");
                imSafeNowBTN.textContent = `I'm Safe`;
                square.appendChild(imSafeNowBTN);
                overlay3.classList.remove("active");
                document.body.removeChild(helpInputBox);
                span.textContent = "";
                span2.textContent = "";
                span.classList.remove("errored");
                span2.classList.remove("errored");
                locationInput.value = "";
                extraInput.value = "";
                getReports();
             }catch(err){
                helpErrorBox.classList.add("shown");
                overlay.classList.add("active");
             }finally{
                confirmingLocation = false;
                confirm.disabled = false;
             }
           
           });
        });
       } 
       if(!check.allow && check.safe){
          bigSection.classList.add("safe");
          square.classList.add("safe");
          const safeMessage = document.createElement("h3");
          safeMessage.textContent = `You are safe ${username.split(" ")[0]}. Your buddies can now see your updated status.`;
          square.appendChild(safeMessage);
       }
       if(!check.allow && !check.safe){
          square.classList.add("help");
          bigSection.classList.add("help");
          const safeMessage = document.createElement("h3");
          safeMessage.textContent = `Stay alert ${username.split(" ")[0]}. The admin and your buddies can now see your status. Please stay safe and wait for emergency responders.`;
          square.appendChild(safeMessage);
          const imSafeNowBTN = document.createElement("button");
          imSafeNowBTN.textContent = `I'm Safe`;
          square.appendChild(imSafeNowBTN);
          imSafeNowBTN.addEventListener("click", async ()=>{
             try{
                const rescued = await markAsRescuedAPICaller(a.report_id);
                if(rescued.forceLogout){
                    forceLogout();
                }
                if(!rescued.success){
                    rescuedErrorBox.classList.add("shown");
                    overlay.classList.add('active');
                    return;
                }
                bigSection.classList.add("safe");
                square.classList.add("safe");
                const safeMessage = document.createElement("h3");
                safeMessage.textContent = `You are safe ${username.split(" ")[0]}. Your buddies can now see your updated status.`;
                square.appendChild(safeMessage);
                getReports();
             }catch(err){
                rescuedErrorBox.classList.add("shown");
                overlay.classList.add('active');
             }
          });
       }
    }catch(err){
       checkErrorBox.classList.add("shown");
       overlay.classList.add("active");
    }






    const overview = document.createElement("div");
    overview.classList.add("overview");
    bigSection.appendChild(overview);
    const safeSection = document.createElement("div");
    safeSection.classList.add("safe");
    overview.appendChild(safeSection);
    const safeGlow = document.createElement("div");
    safeGlow.classList.add("safeGlow");
    safeSection.appendChild(safeGlow);
    const safes = document.createElement("p");
    safes.textContent = `${a.safe} Marked Safe`;
    safeSection.appendChild(safes);
    const helpSection = document.createElement("div");
    helpSection.classList.add('help');
    overview.appendChild(helpSection);
    const helpGlow =  document.createElement("div");
    helpGlow.classList.add('helpGlow');
    helpSection.appendChild(helpGlow);
    const helps = document.createElement("p");
    helps.textContent = `${a.help} Need Help`;
    helpSection.appendChild(helps);
}
}
}





const nav = document.querySelector(".nav");
const menuBTN = document.querySelector("#menu");
const closeMenuBTN = document.querySelector("#close-nav");
const overlay = document.querySelector(".overlay");
const hero = document.querySelector(".hero-section");
const images = ["one", "two", "three"];
const imgDiv = document.querySelector(".img-div");
const textDiv = document.querySelector(".text-div");
const swipperr = document.querySelector("#uno");
const aboutSection = document.querySelector("#about-section");
const aboutBTN = document.querySelector("#aboutBTN");
const prioBTN = document.querySelector("#priosBTN");
const prioSection = document.querySelector(".priorities");
const loginBOX = document.querySelector("#login-box");
const viewLoginBox = document.querySelector("#login");
const cancelLoginBTN = document.querySelector("#cancel-login");
const emailError = document.querySelector("#email-error");
const emailInput = document.querySelector("#email-input");
const passInput = document.querySelector("#password-input");
const passError = document.querySelector("#pass-error");
const confirmLogIn = document.querySelector("#login-confirm");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const signupBox = document.querySelector("#signup-box");
const showSignupBox = document.querySelector("#signup");
const cancelSignup = document.querySelector("#cancel-signup");
const signUpHere = document.querySelector(".special");
const userstatus = localStorage.getItem("status");
const confirmSignupBOX = document.querySelector("#confirm-signup-box");
const main = document.querySelector(".main");
const inputs = document.querySelectorAll(".inputs");
const confirmSignUPFINAL = document.querySelector("#signup-confirm-final");
const cancelSignupFinal = document.querySelector("#cancel-signup-final");
const confirmSignupPsswordInput = document.querySelector("#signup-password");
const confirmSignupPasswordError = document.querySelector("#pass-error-signup");
const signupErrorBOX = document.querySelector("#signup-error-box");
const closeSignupErrorBox = document.querySelector(".okay-signup");
const profileIMG = document.querySelector("#pic-profile");
const nameH2 = document.querySelector("#name-h2");
const userHeader = document.querySelector("#user-header");
const userUI = document.querySelector(".user-ui");
const footer = document.querySelector(".footer");

const loginErrorBox = document.querySelector("#login-error-box");
const closeLoginErrorBox = document.querySelector(".okay-login");
window.addEventListener("DOMContentLoaded", () => {
    const userstatus = localStorage.getItem("status");
    const yourRole = localStorage.getItem("role");
    if (userstatus !== "logged-in") return;

    const profilePic = localStorage.getItem("profile_pic");
    const name = localStorage.getItem("name");

    main.classList.add("hide");
    userHeader.classList.add("show");
    userUI.classList.add("show");
    footer.classList.add("hide");
    if(yourRole === 'clinic-side-operator'){
             requestMedicBTN.classList.add("hide");
             viewMedicRequests.classList.add("hide");
             requestMedicMobile.classList.add("hide");
              clinicDashboard.classList.add("show");
               medicRequestsMobile.classList.add("hide");
               clinicDashboardMobile.classList.add("show");
               clinicSideViewMedicRequests.classList.add("show");
               clinicSideViewMedicRequestsMobile.classList.add("show");
    }

    if(yourRole === "admin"){
        adminDashboardBTN.classList.add("show");
        seeAllUsersBTN.classList.add("show");
        adminDashboardMObileBTN.classList.add("show");
        seeAllUsersMObileBTN.classList.add("show");
        statusCheckBTN.classList.add("show");
        statusCheckBTNMObile.classList.add("show");
          
    }

    if (profilePic) {
        profileIMG.setAttribute("src", profilePic);
        
    }

    if (name) {
        nameH2.textContent = name;
    }
    getReports();
    getBuddies();
});

if(userstatus === "account-pending"){
   confirmSignupBOX.classList.add("show");
   overlay.classList.add("active");
}
if(finishedNaBa === "pending"){
    finishInputBox.classList.add("show");
    overlay5.classList.add('active');
}
let currentImage = 0;
const features = document.querySelectorAll(".features");

function forceLogout(){
    main.classList.remove("hide");
    userHeader.classList.remove("show");
    userUI.classList.remove("show");
    footer.classList.remove("hide");
    localStorage.setItem("status", "logged-out");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("name");
    localStorage.removeItem("profile_pic"); 
}

function changeHeroImage() {
    hero.classList.add("fade");

    setTimeout(() => {
        hero.classList.remove("one", "two", "three");
        hero.classList.add(images[currentImage]);

        currentImage = (currentImage + 1) % images.length;

        hero.classList.remove("fade");
    }, 600);
}

changeHeroImage();


setInterval(changeHeroImage, 4000);

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
menuBTN.addEventListener("click", ()=>{
    nav.classList.add("show");
    overlay.classList.add("active");
});
userMenuMobile.addEventListener("click", ()=>{
    navUser.classList.add("show");
    overlay.classList.add("active");
});
closeMenuBTN.addEventListener("click", ()=>{
    nav.classList.remove("show");
    overlay.classList.remove("active");
});
overlay.addEventListener("click", ()=>{
    nav.classList.remove("show");
    overlay.classList.remove("active");
    loginBOX.classList.remove("show");
    signupBox.classList.remove("show");
    termsBOx.classList.remove("show");
    privacyBpx.classList.remove("show");
    signupErrorBOX.classList.remove("shown");
    emailError.textContent = "";
    emailError.classList.remove("errored");
    passError.textContent = "";
    passError.classList.remove("errored");
    emailInput.value = "";
    passInput.value = "";
    cancelAccountErrorBOx.classList.remove("shown");
    navUser.classList.remove("show");
     logoutErrorBox.classList.remove("shown");
     loginErrorBox.classList.remove("shown");
     reportBox.classList.remove("show");
     typeError.textContent = "";
    typeError.classList.remove("errored");
    locationError.textContent = "";
    locationError.classList.remove("errored");
    searchErrorBox.classList.remove("shown");
    typeInput.value = "";
    locationInput.value = "";
    guidelines.classList.remove("show");
    locations_list.classList.remove('show');
    locations_list.innerHTML ="";
    emergency_list.classList.remove('show');
    emergency_list.innerHTML ="";
    reportErrorBox.classList.remove("shown");
    newsFeedErrorBox.classList.remove("shown");
    safeErrorBox.classList.remove("shown");
    checkErrorBox.classList.remove("shown");
    helpErrorBox.classList.remove("shown");
    rescuedErrorBox.classList.remove("shown");
    resources.classList.remove("show");
    overlay.classList.remove("active");
    profileErrorBox.classList.remove("shown");
    setAsBuddyErrorBox.classList.remove("shown");
    checkIfBuddyErrorBox.classList.remove("shown");
    unBuddyErrorBox.classList.remove("shown");
    visitUserProfileErrorBox.classList.remove("shown");
    seeAllBuddiesErrorBox.classList.remove("shown");
    checkOnBuddiesErrorBox.classList.remove("shown");
     notificationsErrorBox.classList.remove("shown");
     notificationsDiv.innerHTML = "";
    notificationsDiv.classList.remove("show");
     reportMedicBox.classList.remove("show");
      medicLocationList.innerHTML = "";
    medicLocationList.classList.remove('show');
    medicLocationError.classList.remove("errored");
    medicLocationError.textContent = "";
    medicDetailsError.classList.remove("errored");
    medicDetailsError.textContent = "";
    medicLocationInput.value = "";
    medicDetailsInput.value = "";
    medicErrorBox.classList.remove("shown");
     userViewMEdicRequestsErrorBox.classList.remove("shown");
     resolveErrorBox.classList.remove("shown");
      clinicDashboardErrroBox.classList.remove("shown");
      falseAlarmErrorBox.classList.remove("shown");
      seeUsersErrorBox.classList.remove("shown");
      banErrorBox.classList.remove("shown");
      unbanUserErrorBox.classList.remove('shown');
       statusErrorBox.classList.remove("shown");
       adminDashboardErrorBox.classList.remove("shown");
});

closeFalseAlarmErrorBox.addEventListener("click", ()=>{
    falseAlarmErrorBox.classList.remove("shown");
    overlay.classList.remove("active");
})
const boxes = document.querySelectorAll(".boxes");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.4
});
const observer2 = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        entries[0].target.classList.add("show");
    }
} , {
    threshold: 0.4
});
const observer3 = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        entries[0].target.classList.add("show");
    }
} , {
    threshold: 0.4
});
const observer4 = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        entries[0].target.classList.add("show");
    }
} , {
    threshold: 0.4
});
const observer5 = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        entries[0].target.classList.add("show");
    }
} , {
    threshold: 0.4
});

boxes.forEach((box) => observer.observe(box));
observer2.observe(imgDiv);
observer3.observe(textDiv);

const swiper = new Swiper("#uno", {

    loop: true,

    autoplay: {
        delay: 3000
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },

    pagination: {
        el: ".swiper-pagination"
    }

});
observer4.observe(swipperr);
const swiper2 = new Swiper(".swiper2", {
    slidesPerView: 1,
    spaceBetween: 20,

    navigation: {
        nextEl: ".swiper2 .swiper-button-next",
        prevEl: ".swiper2 .swiper-button-prev"
    },

    breakpoints: {
        768: {
            slidesPerView: 2
        },

        1024: {
            slidesPerView: 3
        }
    }
});
const swiper22 = document.querySelector(".swiper2");
observer5.observe(swiper22);


prioBTN.addEventListener("click", ()=>{
   nav.classList.remove("show");
   overlay.classList.remove("active");
   prioSection.scrollIntoView({
        behavior: "smooth"
    });
});

aboutBTN.addEventListener("click", ()=>{
  nav.classList.remove("show");
  overlay.classList.remove("active");
  aboutSection.scrollIntoView({
        behavior: "smooth"
    });
});

viewLoginBox.addEventListener("click", ()=>{
   nav.classList.remove("show");
   overlay.classList.remove("active");
   loginBOX.classList.add("show");
   overlay.classList.add("active");
});
cancelLoginBTN.addEventListener("click", ()=>{
   overlay.classList.remove("active");
   loginBOX.classList.remove("show");
   emailError.textContent = "";
   emailError.classList.remove("errored");
   passError.textContent = "";
   passError.classList.remove("errored");
   emailInput.value = "";
   passInput.value = "";
});

let isLoggingIn = false;
confirmLogIn.addEventListener("click", async () => {
    if(isLoggingIn)return;
    let hasError = false;
    if (emailInput.value.trim() === "") {
        emailError.textContent = "Please enter a proper email!";
        emailError.classList.add("errored");
        hasError = true;
    }

    if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = "Please enter a proper email!";
        emailError.classList.add("errored");
        emailInput.value = "";
        hasError = true;
    }

    if(passInput.value.trim() === ""){
        passError.textContent = "Please enter a proper password!";
        passError.classList.add("errored");
        hasError = true;
    }
    if(hasError)return;
    const email = emailInput.value.trim();
    const password = passInput.value.trim();
    let hasError2 = false;
    isLoggingIn = true;
    confirmLogIn.disabled = true;
    try{
          const login = await loginAPICaller(email, password);
          if(!login.success && !login.validationError && !login.wrongPassword && !login.userDoesNotExists){
              loginErrorBox.classList.add("shown");
              overlay.classList.add("active");
              loginBOX.classList.remove("show");
              emailError.textContent = "";
              emailError.classList.remove("errored");
              passError.textContent = "";
              passError.classList.remove("errored");
              emailInput.value = "";
              passInput.value = "";
              hasError2 = true;
          }
          if(login.validationError){
              emailError.textContent = "You must enter a proper email!";
              emailError.classList.add("errored");
              passError.textContent = "Password must have a capital letter and a number!";
              passError.classList.add("errored");
              emailInput.value = "";
              passInput.value = "";
              hasError2 = true;
          }
          if(login.userDoesNotExists){
              emailError.textContent = "This user does not exists!";
              emailError.classList.add("errored");
              emailInput.value = "";
              passInput.value = "";
              hasError2 = true;
          }
          if(login.wrongPassword){
              passError.textContent = "Wrong password try again!";
              passError.classList.add("errored");
              passInput.value = "";
              hasError2 = true;
          }
          if(hasError2)return;
          if(login.success){
           overlay.classList.remove("active");
           loginBOX.classList.remove("show");
           emailError.textContent = "";
           emailError.classList.remove("errored");
           passError.textContent = "";
           passError.classList.remove("errored");
           emailInput.value = "";
           passInput.value = "";
          }
          
          localStorage.setItem("status", "logged-in");
          localStorage.setItem("role", login.role);
          localStorage.setItem("user", login.userId);
          localStorage.setItem("name", login.name);
          localStorage.setItem("profile_pic", login.profile_pic);
          main.classList.add("hide");
          userHeader.classList.add("show");
          userUI.classList.add("show");
          profileIMG.src = login.profile_pic;
          if(login.role === 'clinic-side-operator'){
             requestMedicBTN.classList.add("hide");
             viewMedicRequests.classList.add("hide");
             requestMedicMobile.classList.add("hide");
             clinicDashboard.classList.add("show");
             medicRequestsMobile.classList.add("hide");
             clinicDashboardMobile.classList.add("show");
             clinicSideViewMedicRequests.classList.add("show");
             clinicSideViewMedicRequestsMobile.classList.add("show");

          }
          if(login.role === "admin"){
            adminDashboardBTN.classList.add("show");
            seeAllUsersBTN.classList.add("show");
            adminDashboardMObileBTN.classList.add("show");
            seeAllUsersMObileBTN.classList.add("show");
            statusCheckBTN.classList.add("show");
            statusCheckBTNMObile.classList.add("show");
          }
          
          nameH2.textContent = login.name;
          footer.classList.add("hide");
          getReports();
          getBuddies();
    }catch(err){
          loginErrorBox.classList.add("shown");
          overlay.classList.add("active");
          loginBOX.classList.remove("show");
          emailError.textContent = "";
          emailError.classList.remove("errored");
          passError.textContent = "";
          passError.classList.remove("errored");
          emailInput.value = "";
          passInput.value = "";
          
    }finally{
        isLoggingIn = false;
        confirmLogIn.disabled = false;
    }
 
   
});
closeLoginErrorBox.addEventListener("click", ()=>{
    loginErrorBox.classList.remove("shown");
    overlay.classList.remove("active");
});

showSignupBox.addEventListener("click", ()=>{
    nav.classList.remove("show");
    signupBox.classList.add("show");
    overlay.classList.add("active");
});
cancelSignup.addEventListener("click", ()=>{
    signupBox.classList.remove("show");
    overlay.classList.remove("active");
});
signUpHere.addEventListener("click", ()=>{
   overlay.classList.remove("active");
   loginBOX.classList.remove("show");
   emailError.textContent = "";
   emailError.classList.remove("errored");
   passError.textContent = "";
   passError.classList.remove("errored");
   emailInput.value = "";
   passInput.value = "";
   signupBox.classList.add("show");
   overlay.classList.add("active");
});
const termsBOx = document.querySelector(".terms");
const terms = document.querySelector("#terms");
terms.addEventListener("click", ()=>{
     termsBOx.classList.add("show");
     overlay.classList.add("active");

});
const privacy = document.querySelector("#privacy");
const privacyBpx = document.querySelector(".privacy");
privacy.addEventListener("click", ()=>{
     privacyBpx.classList.add("show");
     overlay.classList.add("active");

});
const featuresobserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.4
});

features.forEach((box) => featuresobserver.observe(box));
const joinNowHeader = document.querySelector("#join-now-btn");
joinNowHeader.addEventListener("click", ()=>{
   loginBOX.classList.add("show");
   overlay.classList.add("active");
});
const joins = document.querySelectorAll(".join");
joins.forEach((j)=>{
    j.addEventListener("click", ()=>{
      loginBOX.classList.add("show");
      overlay.classList.add("active");
    });
});
const signupBTN = document.querySelector("#signup-confirm");
signupBTN.addEventListener("click", ()=>{
    window.open(
        "https://safeplmun.onrender.com/auth/signup/google",
        "googleSignup",
        "width=500,height=600"
    );

    signupBox.classList.remove("show");
    overlay.classList.remove("active");

});
const emailUsedErrorBox = document.querySelector("#email-already-registered--error-box");
const closeEmailErrorBox = document.querySelector(".okay-email-already-registered");
const overlay4 = document.querySelector(".overlay4");
closeEmailErrorBox.addEventListener("click", ()=>{
     emailUsedErrorBox.classList.remove("shown");
        overlay4.classList.remove("active");
        loginBOX.classList.add("show");
        overlay.classList.add("active")
        
});
overlay4.addEventListener("click", ()=>{
   emailUsedErrorBox.classList.remove("shown");
        overlay4.classList.remove("active");
        
        
});
window.addEventListener("message", (event) => {

    if (event.origin !== "https://safeplmun.onrender.com") {
        return;
    }

    if (event.data === "google-signup-success") {
 
        console.log("Google signup successful!");
        confirmSignupBOX.classList.add("show");
        overlay.classList.add("active");
        localStorage.setItem("status", "account-pending");

    }
    if (event.data === "google-account-already-been-used") {
         console.log("DUPLICATE GOOGLE ACCOUNT");
        emailUsedErrorBox.classList.add("shown");
        overlay4.classList.add("active");
        
    }

});

let isSignuping = false;
confirmSignUPFINAL.addEventListener("click", async ()=>{
     let hasError = false;
     if(isSignuping)return;
      if(confirmSignupPsswordInput.value.trim() === ""){
          confirmSignupPasswordError.textContent = "Please enter a proper account password";
          confirmSignupPasswordError.classList.add("errored");
          return;
      }
      confirmSignupBOX.classList.remove("show");
      overlay.classList.remove("active");
      
      const password = confirmSignupPsswordInput.value.trim();
      isSignuping = true;
      confirmSignUPFINAL.disabled = true;
      try{
         const signup = await signupAPICaller(password);
         if(!signup.success && !signup.signup && !signup.validationError){
            signupErrorBOX.classList.add("shown");
            overlay.classList.add("active");
            hasError = true;
         }
        if(signup.validationError){
              confirmSignupPasswordError.textContent = "Password must have a capital letter and a number and minimum of 8 letters!";
              confirmSignupPasswordError.classList.add("errored");
              confirmSignupPsswordInput.value = "";
              confirmSignupBOX.classList.add("show");
              overlay.classList.add("active");
              hasError = true;
          }
        if(hasError)return;
         localStorage.setItem("status", "logged-in");
         localStorage.setItem("role", signup.role);
         localStorage.setItem("user", signup.userId);
         localStorage.setItem("name", signup.name);
         localStorage.setItem("profile_pic", signup.profile_pic);
         main.classList.add("hide");
         confirmSignupPsswordInput.value = "";
         confirmSignupPasswordError.textContent = "";
         confirmSignupPasswordError.classList.remove("errored");
         userHeader.classList.add("show");
         userUI.classList.add("show");
         profileIMG.src = signup.profile_pic;
         nameH2.textContent = signup.name;
         footer.classList.add("hide");
         getReports();
         finishInputBox.classList.add("show");
         overlay5.classList.add("active");
         localStorage.setItem("finish", "pending");
         getBuddies();
      }catch(err){
         signupErrorBOX.classList.add("shown");
         overlay.classList.add("active");
      }finally{
        isSignuping = false;
        confirmSignUPFINAL.disabled = false;
      }
});

closeSignupErrorBox.addEventListener("click", ()=>{
    signupErrorBOX.classList.remove("shown");
    overlay.classList.remove("active");
});
const cancelAccountErrorBOx = document.querySelector("#cancel-signup-error-box");
const closeCancelAccountErrorBox = document.querySelector(".okay-signup-cancel");

cancelSignupFinal.addEventListener("click", async ()=>{
    confirmSignupBOX.classList.remove("show");
    overlay.classList.remove("active");
    confirmSignupPsswordInput.value = "";
    confirmSignupPasswordError.textContent = "";
    confirmSignupPasswordError.classList.remove("errored");
    try{
        const cancelling = await cancelSignupAPICaller();
        if(!cancelling.success){
            cancelAccountErrorBOx.classList.add("shown");
            overlay.classList.add("active");
            return;
        }
        localStorage.setItem("status", "logged-out");
    }catch(err){
        cancelAccountErrorBOx.classList.add("shown");
        overlay.classList.add("active");
        return;
    }
});

closeCancelAccountErrorBox.addEventListener("click", ()=>{
     cancelAccountErrorBOx.classList.remove("shown");
     overlay.classList.remove("active");
});

inputs.forEach((i)=>{
        i.addEventListener("input", ()=>{
            emailError.textContent = "";
            emailError.classList.remove("errored");
            passError.textContent = "";
            passError.classList.remove("errored");
            confirmSignupPasswordError.textContent = "";
            confirmSignupPasswordError.classList.remove("errored");
            typeError.textContent = "";
            typeError.classList.remove("errored");
            locationError.textContent = "";
            locationError.classList.remove("errored");
             occupationError.textContent = ``;
        occupationError.classList.remove("errored");
        programError.textContent = "";
        programError.classList.remove("errored");
        bioError.textContent = '';
        bioError.classList.remove("errored");
             medicLocationError.classList.remove("errored");
    medicLocationError.textContent = "";
    medicDetailsError.classList.remove("errored");
    medicDetailsError.textContent = "";
    
        });
});
const menuUser = document.querySelector("#menu-user");
const navUser = document.querySelector("#user-nav");
const closeUserNav = document.querySelector("#close-nav-user");
menuUser.addEventListener("click", ()=>{
    navUser.classList.add("show");
    overlay.classList.add("active");
});
closeUserNav.addEventListener("click", ()=>{
    navUser.classList.remove("show");
    overlay.classList.remove("active");
});
const logoutBTN = document.querySelector("#logout-nav-btn");
const logoutErrorBox = document.querySelector("#logout-error-box");
const closeLogoutErrorBox = document.querySelector(".okay-logout");
let logouting = false;
logoutBTN.addEventListener("click", async ()=>{
    navUser.classList.remove("show");
    overlay.classList.remove("active");
    if(logouting)return;
    logouting = true;
    logoutBTN.disabled = true;
    try{
       const logout = await logoutAPICaller();
       if(logout.forceLogout){
        forceLogout();
        return;
       }
       if(!logout.success){
        logoutErrorBox.classList.add("shown");
        overlay.classList.add("active");
        return;
       }
       main.classList.remove("hide");
       userHeader.classList.remove("show");
       userUI.classList.remove("show");
       footer.classList.remove("hide");
       localStorage.setItem("status", "logged-out");
       localStorage.removeItem("role");
       localStorage.removeItem("user");
       localStorage.removeItem("name");
       localStorage.removeItem("profile_pic"); 
       
    }catch(err){
       logoutErrorBox.classList.add("shown");
       overlay.classList.add("active");
       return;
    }finally{
        logouting = false;
        logoutBTN.disabled = false;
    }
});
closeLogoutErrorBox.addEventListener("click", ()=>{
     logoutErrorBox.classList.remove("shown");
     overlay.classList.remove("active");
});
const swiper3 = new Swiper(".amusement-div", {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 40,

    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 35,
        },
    },

    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },

    speed: 5000,
    allowTouchMove: false,
});
const amusment = document.querySelectorAll(".amusement-div")
const featuresobserver2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.4
});

amusment.forEach((box) => featuresobserver2.observe(box));
const reportBox = document.querySelector("#report-incident-box");
const alertBTN = document.querySelector("#alert");
alertBTN.addEventListener("click", ()=>{
    reportBox.classList.add("show");
    overlay.classList.add("active");
});
alertMobileBTN.addEventListener("click", ()=>{
    reportBox.classList.add("show");
    overlay.classList.add("active");
});
const cancelReport = document.querySelector("#cancel-report-final");
const confirmReport = document.querySelector("#report-confirm-final");
const typeError = document.querySelector("#type-error");
const typeInput = document.querySelector("#type");
const locationError = document.querySelector("#location-error");
const locationInput = document.querySelector("#location");

const reportErrorBox = document.querySelector("#report-error-box");
const closeReportErrorBox = document.querySelector(".okay-report");
cancelReport.addEventListener("click", ()=>{
    typeError.textContent = "";
    typeError.classList.remove("errored");
    locationError.textContent = "";
    locationError.classList.remove("errored");
  
    typeInput.value = "";
    locationInput.value = "";
    
    reportBox.classList.remove("show");
    overlay.classList.remove("active");
    locations_list.classList.remove('show');
    locations_list.innerHTML ="";
    emergency_list.classList.remove('show');
    emergency_list.innerHTML ="";
});
let isReporting = false;
confirmReport.addEventListener("click", async ()=>{
    let hasError = false;
    if (isReporting) return;
    if(typeInput.value.trim() === ""){
         typeError.textContent = "Choose a proper emergency type!";
         typeError.classList.add("errored");
         hasError = true;
    }
    if(locationInput.value.trim() === ""){
         locationError.textContent = "Choose a proper location for the emergency!";
         locationError.classList.add("errored");
         hasError = true;
    }

    if(hasError)return;
    let hasError2 = false;
    isReporting = true;
    confirmReport.disabled = true;
    const type = typeInput.value.trim();
    const location = locationInput.value.trim();
    
    try{
       const reporting = await reportIncidentAPICaller(type, location);
       if(reporting.forceLogout){
        forceLogout();
        hasError2 = true;
       }
       if(!reporting.success && reporting.banned){
          reportBox.classList.remove("show");
          typeError.textContent = "";
          typeError.classList.remove("errored");
          locationError.textContent = "";
          locationError.classList.remove("errored");
          typeInput.value = "";
          locationInput.value = "";
          banMessageErrorBox.classList.add("shown");
          overlay.classList.add('active');
       }
       if(!reporting.success){
          reportErrorBox.classList.add("shown");
          overlay.classList.add("active");
          reportBox.classList.remove("show");
          typeError.textContent = "";
          typeError.classList.remove("errored");
          locationError.textContent = "";
          locationError.classList.remove("errored");
         
          typeInput.value = "";
          locationInput.value = "";
         
          hasError2 = true;
       }
       if(hasError2)return;
          overlay.classList.remove("active");
          reportBox.classList.remove("show");
          typeError.textContent = "";
          typeError.classList.remove("errored");
          locationError.textContent = "";
          locationError.classList.remove("errored");
       
          typeInput.value = "";
          locationInput.value = "";
          
    }catch(err){
       reportErrorBox.classList.add("shown");
       overlay.classList.add("active");
    }finally{
        isReporting = false;
        confirmReport.disabled = false
    }
});
const emergency_list = document.querySelector("#emergency-types");
const emergencies = ["Earthquake", "School Fire", "Armed Violence"];
typeInput.addEventListener("click", ()=>{
    emergency_list.classList.add("show");
    emergency_list.innerHTML ="";
    emergencies.forEach((e)=>{
        const li = document.createElement("li");
        li.textContent = e;
        emergency_list.appendChild(li);
        li.addEventListener("click", ()=>{
        typeInput.value = li.textContent;
        if(typeInput.value.trim()=== "Earthquake"){
            locationInput.value = "Whole Campus";
        }
        emergency_list.classList.remove('show');
        emergency_list.innerHTML ="";
    });
    });
});
const locations_list = document.querySelector("#locations-list");
const locations = [
    "Student Center",
    "Covered Court",
    "Main Building",
    "Admin Building",
    "RLRC Building",
    "Centennial Park",
    "Serenity Garden",
    "North Park"
];
locationInput.addEventListener("click", ()=>{
    if(typeInput.value.trim() === "Earthquake"){
        locationInput.value = "Whole Campus";
        return;
    }
    locations_list.classList.add("show");
    locations_list.innerHTML ="";
    locations.forEach((e)=>{
        const li = document.createElement("li");
        li.textContent = e;
        locations_list.appendChild(li);
        li.addEventListener("click", ()=>{
        locationInput.value = li.textContent;
        locations_list.classList.remove('show');
        locations_list.innerHTML ="";
    });
    });
});
closeReportErrorBox.addEventListener("click", ()=>{
    reportErrorBox.classList.remove("shown");
    overlay.classList.remove("active");
});
async function getReports(){
       showReportSkeletons();
        try{
        const reports = await getReportsAPICaller();
        console.log(reports);
        if(reports.forceLogout){
            forceLogout();
        }
        if(!reports.success){
            newsFeedErrorBox.classList.add("shown");
            overlay.classList.add("active");
            return;
        }
       renderNewsFeed(reports.data);
    }catch(err){
        console.log(err);
        newsFeedErrorBox.classList.add("shown");
        overlay.classList.add("active");
    }
       
        
    
     

    
   
}
const newsFeedBTN = document.querySelector("#newsfeed");
newsFeedBTN.addEventListener("click", async ()=>{
   getReports();
});
closeNewsFeedErrorBox.addEventListener("click", ()=>{
    newsFeedErrorBox.classList.remove("shown");
        overlay.classList.remove("active");
})
const mobileNewsfeedBTN = document.querySelector("#news-nav-btn");
mobileNewsfeedBTN.addEventListener("click", ()=>{
    navUser.classList.remove("show");
    overlay.classList.remove("active");
    getReports();
});
closeSafeErrorBox.addEventListener("click", ()=>{
    safeErrorBox.classList.remove("shown");
    overlay.classList.remove("active");
});
closeCheckErrorBox.addEventListener("click", ()=>{
    checkErrorBox.classList.remove("shown");
    overlay.classList.remove("active");
});
closeHelpErrorBox.addEventListener("click", ()=>{
    helpErrorBox.classList.remove("shown");
    overlay.classList.remove("active");
});
closeRescuedErrorBox.addEventListener("click", ()=>{
    rescuedErrorBox.classList.remove("shown");
    overlay.classList.remove("active");
});



const resourcesbtn = document.querySelector("#resources-btn");
const resources = document.querySelector(".safeplmun-resources");
const mobileResourcesBtn = document.querySelector("#resources-nav-btn");
resourcesbtn.addEventListener("click", ()=>{
    resources.classList.add("show");
    overlay.classList.add("active");
});
mobileResourcesBtn.addEventListener("click", ()=>{
      navUser.classList.remove("show");
    resources.classList.add("show");
    overlay.classList.add("active");
});
function showReportSkeletons(count = 3) {
    const newsFeed = document.querySelector(".news-feed");

    const skeletonContainer = document.createElement("div");
    skeletonContainer.classList.add("report-skeleton-container");
    skeletonContainer.id = "report-skeleton";
    newsFeedDiv.innerHTML = "<h3>Your Newsfeed</h3>";
    for (let i = 0; i < count; i++) {
        skeletonContainer.innerHTML += `
            <div class="report-skeleton">
                <div class="skeleton skeleton-profile"></div>

                <div class="skeleton-report-content">
                    <div class="skeleton skeleton-name"></div>
                    <div class="skeleton skeleton-time"></div>
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-location"></div>

                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text short"></div>
                </div>
            </div>
        `;
    }

    newsFeed.appendChild(skeletonContainer);
}
const profileErrorBox = document.querySelector("#profile-error-box");
const closeProfileErrorBox = document.querySelector(".okay-profile");
const viewProfileBTN = document.querySelector(".profile-div");
const viewProfileMObileBTN = document.querySelector("#profile-nav-btn");
viewProfileMObileBTN.addEventListener("click", async ()=>{
    navUser.classList.remove("show");
    overlay.classList.remove("active");
     createProfileSkeleton();
     
    try{
       const profile = await getProfileAPICaller();
       if(profile.forceLogout){
        forceLogout();
       }
       if(!profile.success){
         profileErrorBox.classList.add("shown");
         overlay.classList.add("active");
         return;
       }
       
       renderProfile(profile.data.data, profile.data.reports);
    }catch(err){
        console.log(err);
       profileErrorBox.classList.add("shown");
       overlay.classList.add("active");
    }
});
viewProfileBTN.addEventListener("click", async ()=>{
    createProfileSkeleton();
    
           try{
       const profile = await getProfileAPICaller();
       if(profile.forceLogout){
        forceLogout();
       }
       if(!profile.success){
         profileErrorBox.classList.add("shown");
         overlay.classList.add("active");
         return;
       }
       console.log(profile.data);
       renderProfile(profile.data.data, profile.data.reports);
    }catch(err){
        console.log(err);
       profileErrorBox.classList.add("shown");
       overlay.classList.add("active");
    }
  

});
closeProfileErrorBox.addEventListener("click", ()=>{
    profileErrorBox.classList.remove("shown");
    overlay.classList.remove("active");
});

const occupationError = document.querySelector("#occupation-error");
const occupationInput = document.querySelector("#occupation-input");
const programError = document.querySelector("#program-error");
const programInput = document.querySelector('#program-input');
const bioError = document.querySelector("#bio-error");
const bioInput = document.querySelector("#bio-input");
const finishAccountSetUp = document.querySelector("#finish-account");
const occupationList = document.querySelector("#occupation-list");
const occupations = ["Student", "Professor", "PLMUN Dean", "Non-Teaching Staff"];
const programs = [
  "College of Arts and Sciences",
  "College of Business Administration",
  "College of Criminal Justice",
  "College of Information Technology and Computer Studies",
  "College of Teacher Education",
  "Graduate School"
];
const programsList = document.querySelector("#programs-list");

occupationInput.addEventListener("click", ()=>{
    occupationList.innerHTML = "";
    occupationList.classList.add("show");
    occupations.forEach((o)=>{
        const li =document.createElement("li");
        li.textContent = o;
        occupationList.appendChild(li);
        li.addEventListener("click", ()=>{
            occupationInput.value = li.textContent;
            occupationList.innerHTML = "";
            occupationList.classList.remove("show");
            if(occupationInput.value.trim() !== "Student"){
                programInput.value = 'None';
            }
        });
    });
});

programInput.addEventListener("click", ()=>{
    programsList.innerHTML = "";
    programsList.classList.add("show");
    programs.forEach((o)=>{
        const li =document.createElement("li");
        li.textContent = o;
        programsList.appendChild(li);
        li.addEventListener("click", ()=>{
            programInput.value = li.textContent;
            programsList.innerHTML = "";
            programsList.classList.remove("show");
           
        });
    });
});
const finishErrorBox = document.querySelector("#finish-error-box");
const closeFinishErrorBox = document.querySelector(".okay-finish");
let finishingAccountSetup = false;
finishAccountSetUp.addEventListener("click", async ()=>{
     let hasError = false;
     if(finishingAccountSetup)return;
     if(occupationInput.value.trim() === ""){
        occupationError.textContent = `Please choose a proper occupation!`;
        occupationError.classList.add("errored");
        hasError = true;
     }
     if(programInput.value.trim() === ""){
        programError.textContent = "Please enter a proper program!";
        programError.classList.add("errored");
        hasError = true;
     }
     if(bioInput.value.trim() === ""){
        bioError.textContent = 'Please enter a proper bio to describe yourself!';
        bioError.classList.add("errored");
        hasError = true;
     }
     if(hasError)return;
     finishingAccountSetup = true;
     finishAccountSetUp.disabled = true;
     const occupation = occupationInput.value.trim();
     const program = programInput.value.trim();
     const bio = bioInput.value.trim();
     try{
        const finishna = await finishAccountSetupAPICaller(occupation, program, bio);
        if(finishna.forceLogout){
            forceLogout();
        }
        if(!finishna.success){
            finishErrorBox.classList.add('shown');
            overlay5.classList.add("active");
            finishInputBox.classList.remove("show");
            return;
        }
        finishInputBox.classList.remove("show");
        overlay5.classList.remove("active");
        localStorage.setItem("finish", "done");
        guidelines.classList.add("show");
        overlay.classList.add("active");
        occupationError.textContent = ``;
        occupationError.classList.remove("errored");
        programError.textContent = "";
        programError.classList.remove("errored");
        bioError.textContent = '';
        bioError.classList.remove("errored");
        occupationInput.value = "";
        programInput.value = "";
        bioInput.value = "";
     }catch(err){
        finishErrorBox.classList.add('shown');
        overlay5.classList.add("active");
        finishInputBox.classList.remove("show");
      
        
     }finally{
        finishingAccountSetup = false;
        finishAccountSetUp.disabled = false;
     }
});
closeFinishErrorBox.addEventListener("click", ()=>{
    finishErrorBox.classList.remove('shown');
    overlay5.classList.remove("active");
    finishInputBox.classList.add("show");
    overlay5.classList.add("active");
});
overlay5.addEventListener("click", ()=>{
    finishErrorBox.classList.remove('shown');
    overlay5.classList.remove("active");
    finishInputBox.classList.add("show");
    overlay5.classList.add("active");
});
async function renderSearchResults(arr){
    const nameUser = localStorage.getItem("name");
    newsFeedDiv.innerHTML = "";
    const h3 = document.createElement("h3");
    if(arr.length === 0){
       h3.textContent = `No SafePLMUN users found matching your search`;
    }else{
       h3.textContent =  `Search Results`;
    }
    newsFeedDiv.appendChild(h3);
    for(const a of arr){
        const result = document.createElement("div");
        result.classList.add("result");
        newsFeedDiv.appendChild(result);
        const img = document.createElement("img");
        img.src = a.profile_pic;
        result.appendChild(img);
        const bundle = document.createElement("div");
        bundle.classList.add("bundle");
        result.appendChild(bundle);
        const name = document.createElement("h2");
        name.textContent = a.name;
        bundle.appendChild(name);
        const program = document.createElement("p");
        if(a.occupation !== 'Student'){
            program.textContent = `${a.occupation} At PLMUN`;
        }else{
            program.textContent = a.program;
        }
        bundle.appendChild(program);
        try{
        const check = await checkIfAlreadyBuddiesAPICaller(a.userid);
        if(check.forceLogout){
            forceLogout();
        }
        if(!check.success){
            checkIfBuddyErrorBox.classList.add("shown");
            overlay.classList.add("active");
            return;
        }
        if(check.allow){
            const btn = document.createElement("button");
            btn.textContent = `Add Buddy`;
            result.appendChild(btn);
            let buddyingNa = false;
            btn.addEventListener("click", async ()=>{
              if(buddyingNa)return;
             
              buddyingNa = true;
              try{
                const buddying = await setUserAsBuddyAPICaller(a.userid, nameUser);
                if(buddying.forceLogout){
                  forceLogout();
                }
                if(!buddying.success){
                  setAsBuddyErrorBox.classList.add("shown");
                  overlay.classList.add("active");
                  btn.textContent = `Add Buddy`;;
                  return;
                }
                const searchAgain = await searchUserAPICaller(currentSearch);
                if(searchAgain.forceLogout){
                    forceLogout();
                }
                if(!searchAgain.success){
                    searchErrorBox.classList.add("shown");
                    overlay.classList.add("active");
                }
                renderSearchResults(searchAgain.data);
              }catch(err){
                 setAsBuddyErrorBox.classList.add("shown");
                 overlay.classList.add("active");
                 btn.textContent = `Add Buddy`;
              }finally{
                 btn.textContent = `Add Buddy`;
                buddyingNa = false;
             }
            });
        }else{
            const unBuddyBTN = document.createElement("button");
            unBuddyBTN.textContent = `Unbuddy`;
            result.appendChild(unBuddyBTN);
            let unbuddying = false;
            unBuddyBTN.addEventListener("click", async ()=>{
               if(unbuddying)return;
               unbuddying = true;
               try{
                  const unbuddyNa = await unBuddyAPICaller(a.userid);
                  if(unbuddyNa.forceLogout){
                    forceLogout();
                  }
                  if(!unbuddyNa.success){
                     unBuddyErrorBox.classList.add("shown");
                     overlay.classList.add("active");
                     return;
                  }
                  const searchAgain = await searchUserAPICaller(currentSearch);
                if(searchAgain.forceLogout){
                    forceLogout();
                }
                if(!searchAgain.success){
                    searchErrorBox.classList.add("shown");
                    overlay.classList.add("active");
                }
                renderSearchResults(searchAgain.data);
               }catch(err){
                  unBuddyErrorBox.classList.add("shown");
                  overlay.classList.add("active");
               }
            });
        }
        }catch(err){
            checkIfBuddyErrorBox.classList.add("shown");
            overlay.classList.add("active");
            return;
        }
        
        bundle.addEventListener("click", async ()=>{
            try{
              const visit = await visitUserProfileAPICaller(a.userid);
              if(visit.forceLogout){
                forceLogout();
              }
              if(!visit.success){
                  visitUserProfileErrorBox.classList.add("shown");
                  overlay.classList.add("active");
                  return;
              }
              console.log(visit);
              renderVisitProfile(visit.data.data, visit.data.reports);
            }catch(err){
              visitUserProfileErrorBox.classList.add("shown");
              overlay.classList.add("active");
            }
        });
       
    }

}
closeVisitUserProfileErrorBox.addEventListener("click", ()=>{
    visitUserProfileErrorBox.classList.remove("shown");
    overlay.classList.remove("active");
})
closeCheckIfBuddyErrorBox.addEventListener("click", ()=>{
    checkIfBuddyErrorBox.classList.remove("shown");
    overlay.classList.remove("active");
});
closeUnBuddyErrorBox.addEventListener("click", ()=>{
    unBuddyErrorBox.classList.remove("shown");
    overlay.classList.remove("active");
})
let searching = false;
const searchInput = document.querySelector("#search");
searchInput.addEventListener("keydown", async (event)=>{
     if(searching)return;
     if (event.key !== 'Enter') return;
     let hasError = false;
     if (event.key === 'Enter') {
        searching = true;
        const name = searchInput.value.trim();
        
        if (name.length < 2){
            searching = false;
            return;
        }
        currentSearch = name;
        createSearchResultSkeleton();
        try{
          const users = await searchUserAPICaller(name);
          if(users.forceLogout){
            forceLogout();
          }
          if(!users.success){
             searchErrorBox.classList.add("shown");
             overlay.classList.add("active");
             hasError = true;
          }
          if(hasError)return;
          console.log(users);
          renderSearchResults(users.data);
        }catch(err){
          searchErrorBox.classList.add("shown");
          overlay.classList.add("active");
        }finally{
            searching = false;
            searchInput.value = "";
            mobileSearch.classList.remove("hide");
            goBack.classList.remove("show");
            searchInput.classList.remove("show");
            mobileMenuBTN.classList.remove("hide");
        }
    }
});
const mobileSearch = document.querySelector("#search-mobile");
const goBack = document.querySelector("#go-back");
const mobileMenuBTN = document.querySelector("#menu-mobile-user");
mobileSearch.addEventListener("click", ()=>{
    mobileSearch.classList.add("hide");
    goBack.classList.add("show");
    searchInput.classList.add("show");
    mobileMenuBTN.classList.add("hide");
});
const isMobile = window.matchMedia("(max-width: 768px)");

function handleScreenChange(event) {
    if (event.matches) {
        // mobile
    } else {
        // desktop
        mobileSearch.classList.remove("hide");
        goBack.classList.remove("show");
        searchInput.classList.remove("show");
        mobileMenuBTN.classList.remove("hide");
    }
}

isMobile.addEventListener("change", handleScreenChange);
goBack.addEventListener("click", ()=>{
        mobileSearch.classList.remove("hide");
        goBack.classList.remove("show");
        searchInput.classList.remove("show");
        mobileMenuBTN.classList.remove("hide");
});
closeSearchErrorBox.addEventListener("click", ()=>{
       searchErrorBox.classList.remove("shown");
     overlay.classList.remove("active");
}
);
closeSetBuddyErrorBox.addEventListener("click", ()=>{
    setAsBuddyErrorBox.classList.remove("shown");
    overlay.classList.remove("active");
});
function createProfileSkeleton() {
    newsFeedDiv.innerHTML = "";

    const profileBox = document.createElement("div");
    profileBox.classList.add("profile-box", "loading");

    // TOP
    const top = document.createElement("div");
    top.classList.add("top");
    profileBox.appendChild(top);

    const img = document.createElement("div");
    img.classList.add("skeleton");
    top.appendChild(img);

    const topBundle = document.createElement("div");
    topBundle.classList.add("bundle");
    top.appendChild(topBundle);

    const name = document.createElement("h2");
    name.classList.add("skeleton");
    topBundle.appendChild(name);

    const program = document.createElement("p");
    program.classList.add("skeleton");
    topBundle.appendChild(program);

    const occupation = document.createElement("p");
    occupation.classList.add("skeleton");
    top.appendChild(occupation);

    // BOTTOM
    const bottom = document.createElement("div");
    bottom.classList.add("bottom");
    profileBox.appendChild(bottom);

    const hr = document.createElement("hr");
    bottom.appendChild(hr);

    const bundle = document.createElement("div");
    bundle.classList.add("bundle");
    bottom.appendChild(bundle);

    const title = document.createElement("h3");
    title.classList.add("skeleton");
    bundle.appendChild(title);

    const text = document.createElement("p");
    text.classList.add("skeleton");
    bundle.appendChild(text);

    const bottomText = document.createElement("p");
    bottomText.classList.add("skeleton");
    bottom.appendChild(bottomText);

    newsFeedDiv.appendChild(profileBox);
}
function createSearchResultSkeleton(count = 3) {

    newsFeedDiv.innerHTML = "";

    for(let i = 0; i < count; i++){

        const result = document.createElement("div");
        result.classList.add("result", "loading");

        // Profile picture
        const img = document.createElement("div");
        img.classList.add("skeleton");
        result.appendChild(img);

        // Text
        const bundle = document.createElement("div");
        bundle.classList.add("bundle");
        result.appendChild(bundle);

        const name = document.createElement("h2");
        name.classList.add("skeleton");
        bundle.appendChild(name);

        const program = document.createElement("p");
        program.classList.add("skeleton");
        bundle.appendChild(program);

        // Button
        const button = document.createElement("button");
        button.classList.add("skeleton");
        result.appendChild(button);

        newsFeedDiv.appendChild(result);
    }
}
function renderCheckOnBuddiesUI(arr){
    newsFeedDiv.innerHTML = "";
    const h3 = document.createElement("h3");
    h3.textContent = 'Check On Your Buddies';
    newsFeedDiv.appendChild(h3);
    for(const a of arr){
        const check_div = document.createElement('div');
        check_div.classList.add("check-div");
        newsFeedDiv.appendChild(check_div);
        const top = document.createElement("div");
        top.classList.add("top");
        check_div.appendChild(top);
        const report = document.createElement("h3");
        report.textContent = `${a.type} at the ${a.location}!`;
        top.appendChild(report);
        const time = document.createElement("p");
        time.textContent = `${new Date(a.created_at).toLocaleString("en-PH", {
       month: "short",
       day: "numeric",
       year: "numeric",
       hour: "numeric",
       minute: "2-digit",
       })}`
       top.appendChild(time);
       const bottom = document.createElement("div");
       bottom.classList.add("bottom");
       check_div.appendChild(bottom);
        const headerEntry = document.createElement("div");
          headerEntry.classList.add("entry");
          headerEntry.classList.add("header");
          const one = document.createElement("p");
          one.textContent = 'Name';
          headerEntry.appendChild(one);
          const two = document.createElement("p");
          two.textContent = 'Status';
          headerEntry.appendChild(two);
          const three = document.createElement("p");
          three.textContent = 'Location';
          headerEntry.appendChild(three);
          const four = document.createElement("p");
          four.textContent = `Guide`;
          headerEntry.appendChild(four);
          const five = document.createElement("p");
          five.textContent = `Updated`;
          headerEntry.appendChild(five);
          bottom.appendChild(headerEntry)
       for(const b of a.buddies){
          const entry = document.createElement("div");
          entry.classList.add("entry");
          bottom.appendChild(entry);
          const bundle = document.createElement('div');
          bundle.classList.add("bundle");
          entry.appendChild(bundle);
          const img = document.createElement("img");
          img.src = b.profile_pic;
          bundle.appendChild(img);
          const buddy = document.createElement("h4");
          buddy.textContent = b.name.split(" ")[0];
          bundle.appendChild(buddy);
          const status =  document.createElement("p");
          if(b.status){
             status.textContent = b.status;
          }else{
            status.textContent = `Unknown`;
          }
          entry.appendChild(status);
          const location = document.createElement("p");
          if(b.location){
            location.textContent = b.location;
          }else{
            location.textContent = 'Unknown';
          }
          entry.appendChild(location);
          const extra = document.createElement("p");
          if(b.details){
            extra.textContent = b.details;
          }else{
            extra.textContent = 'None';
          }
          entry.appendChild(extra);
          const updated =  document.createElement("p");
          if(b.statusCreatedAt){
            updated.textContent = `${new Date(b.statusCreatedAt).toLocaleString("en-PH", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit"
        })}`  
       }else{
          updated.textContent = 'Pending';
       }
       entry.appendChild(updated);
    }
}
}
checkOnBuddiesBTN.addEventListener("click", async ()=>{
    renderCheckSkeleton();
    
      try{
      const check = await checkOnBuddiesAPICaller();
      if(check.forceLogout){
        forceLogout();
      }
      if(!check.success){
        checkOnBuddiesErrorBox.classList.add("shown");
        overlay.classList.add("active");
        return;
      }
      console.log(check);
      renderCheckOnBuddiesUI(check.data);
   }catch(err){
      checkOnBuddiesErrorBox.classList.add("shown");
      overlay.classList.add("active");
   }
    
   
});
checkOnBuddiesMOBILEBTN.addEventListener("click", async ()=>{
    navUser.classList.remove("show");
    overlay.classList.remove("active"); 
    renderCheckSkeleton();
 
      try{
      const check = await checkOnBuddiesAPICaller();
      if(check.forceLogout){
        forceLogout();
      }
      if(!check.success){
        checkOnBuddiesErrorBox.classList.add("shown");
        overlay.classList.add("active");
        return;
      }
      console.log(check);
      renderCheckOnBuddiesUI(check.data);
   }catch(err){
      checkOnBuddiesErrorBox.classList.add("shown");
      overlay.classList.add("active");
   }
    
});


closeCheckOnBuddiesErrorBox.addEventListener("click", ()=>{
    checkOnBuddiesErrorBox.classList.remove("shown");
    overlay.classList.remove("active");
});

function renderNotifications(arr){
    notificationsDiv.innerHTML = "";
    notificationsDiv.classList.add("show");
    overlay.classList.add("active")
    for(const a of arr){
        const notif = document.createElement("div");
        notif.classList.add("notif");
        notificationsDiv.appendChild(notif);
        const h3 = document.createElement("h3");
        h3.textContent = `${a.about}`;
        notif.appendChild(h3);
        const p = document.createElement("p");
        p.textContent = a.message;
        notif.appendChild(p);
        const time = document.createElement("p");
        time.classList.add("small");
        time.textContent = `${new Date(a.created_at).toLocaleString("en-PH", {
       month: "short",
       day: "numeric",
       year: "numeric",
       hour: "numeric",
       minute: "2-digit",
       })}`;
       notif.appendChild(time);
    }
}

const viewNotificationsBTN = document.querySelector("#notifications-nav-btn");
viewNotificationsBTN.addEventListener("click", async ()=>{
    navUser.classList.remove("show");
    overlay.classList.remove("active"); 
    try{
       const notifications = await getNotificationsAPICaller();
       if(notifications.forceLogout){
        forceLogout();
       }
       if(!notifications.success){
          notificationsErrorBox.classList.add("shown");
          overlay.classList.add('active');
          return;
       }
       console.log(notifications);
       renderNotifications(notifications.data)
    }catch(err){
       notificationsErrorBox.classList.add("shown");
       overlay.classList.add('active');
    }
});
closeNotificationsErrorBox.addEventListener("click", ()=>{
    notificationsErrorBox.classList.remove("shown");
    overlay.classList.remove('active');
})
 function renderCheckSkeleton() {

    newsFeedDiv.innerHTML = "";

    const checkDiv = document.createElement("div");
    checkDiv.classList.add("check-div", "skeleton-loading");

    checkDiv.innerHTML = `
        <div class="top">

            <div class="skeleton skeleton-title"></div>

            <div class="skeleton skeleton-description"></div>

        </div>

        <div class="bottom"></div>
    `;

    const bottom = checkDiv.querySelector(".bottom");

    for (let i = 0; i < 4; i++) {

        const entry = document.createElement("div");
        entry.classList.add("entry");

        entry.innerHTML = `
            <div class="bundle">

                <div class="skeleton skeleton-avatar"></div>

                <div class="skeleton skeleton-name"></div>

            </div>

            <div class="skeleton skeleton-data"></div>

            <div class="skeleton skeleton-data"></div>

            <div class="skeleton skeleton-data"></div>

            <div class="skeleton skeleton-data"></div>
        `;

        bottom.appendChild(entry);
    }

    newsFeedDiv.appendChild(checkDiv);
}
const requestMedicBTN = document.querySelector("#request-medic-btn");
const reportMedicBox = document.querySelector("#report-medic-box");
requestMedicBTN.addEventListener("click", ()=>{
    reportMedicBox.classList.add("show");
    overlay.classList.add("active");
});
const medicLocationList = document.querySelector("#locations-list-medic");
const medicLocationError = document.querySelector("#location-error-medic");
const medicLocationInput = document.querySelector("#location-medic");
const medicDetailsError = document.querySelector("#details-error-medic");
const medicDetailsInput = document.querySelector("#details-medic");
const confirmMedicRequest = document.querySelector("#report-confirm-final-medic");
const cancelMedicRequest = document.querySelector("#cancel-report-final-medic");
const medicErrorBox = document.querySelector("#medic-error-box");
const closeMedicErrorBox = document.querySelector(".okay-medic");
cancelMedicRequest.addEventListener("click", ()=>{
    reportMedicBox.classList.remove("show");
    overlay.classList.remove("active");
    medicLocationList.innerHTML = "";
    medicLocationList.classList.remove('show');
    medicLocationError.classList.remove("errored");
    medicLocationError.textContent = "";
    medicDetailsError.classList.remove("errored");
    medicDetailsError.textContent = "";
    medicLocationInput.value = "";
    medicDetailsInput.value = "";
});
let confirmingMedicRequest = false;
confirmMedicRequest.addEventListener("click", async ()=>{
    if(confirmingMedicRequest)return;
    let hasError = false;
    if(medicLocationInput.value === ""){
        medicLocationError.textContent = `Please choose a proper location!`;
        medicLocationError.classList.add("errored");
        hasError = true;
    }
    if(medicDetailsInput.value === ""){
        medicDetailsError.textContent = `Please enter extra details for faster response!`;
        medicDetailsError.classList.add("errored");
        hasError = true;
    }
    if(medicDetailsInput.length > 20){
        medicDetailsError.textContent = `Please enter a shorter extra details!`;
        medicDetailsError.classList.add("errored");
        medicDetailsInput.value = "";
        hasError = true;
    }
    if(hasError)return;
    confirmingMedicRequest = true;
    confirmMedicRequest.disabled = true;
    const location = medicLocationInput.value.trim();
    const details = medicDetailsInput.value.trim();
    try{
        const name = localStorage.getItem("name");
        const requesting = await requestMedicAPICaller(location, details, name);
        if(requesting.forceLogout){
            forceLogout();
        }
        if(!requesting.success && requesting.banned){
            reportMedicBox.classList.remove("show");
            overlay.classList.remove("active");
            medicLocationList.innerHTML = "";
            medicLocationList.classList.remove('show');
            medicLocationError.classList.remove("errored");
            medicLocationError.textContent = "";
            medicDetailsError.classList.remove("errored");
            medicDetailsError.textContent = "";
            medicLocationInput.value = "";
            medicDetailsInput.value = ""; 
            banMessageErrorBox.classList.add("shown");
            overlay.classList.add("active");
            return;
        }
        if(!requesting.success){
            medicErrorBox.classList.add("shown");
            overlay.classList.add("active");
            reportMedicBox.classList.remove("show");
            overlay.classList.remove("active");
            medicLocationList.innerHTML = "";
            medicLocationList.classList.remove('show');
            medicLocationError.classList.remove("errored");
            medicLocationError.textContent = "";
            medicDetailsError.classList.remove("errored");
            medicDetailsError.textContent = "";
            medicLocationInput.value = "";
            medicDetailsInput.value = "";
            return;
        }
        reportMedicBox.classList.remove("show");
        overlay.classList.remove("active");
        medicLocationList.innerHTML = "";
        medicLocationList.classList.remove('show');
        medicLocationError.classList.remove("errored");
        medicLocationError.textContent = "";
        medicDetailsError.classList.remove("errored");
        medicDetailsError.textContent = "";
        medicLocationInput.value = "";
        medicDetailsInput.value = "";
    }catch(err){
        medicErrorBox.classList.add("shown");
        overlay.classList.add("active");
        reportMedicBox.classList.remove("show");
        overlay.classList.remove("active");
        medicLocationList.innerHTML = "";
        medicLocationList.classList.remove('show');
        medicLocationError.classList.remove("errored");
        medicLocationError.textContent = "";
        medicDetailsError.classList.remove("errored");
        medicDetailsError.textContent = "";
        medicLocationInput.value = "";
        medicDetailsInput.value = "";
    }finally{
          confirmingMedicRequest = false;
          confirmMedicRequest.disabled = false;
    }
});
closeMedicErrorBox.addEventListener("click", ()=>{
    medicErrorBox.classList.remove("shown");
    overlay.classList.remove("active");
});
medicLocationInput.addEventListener("click", ()=>{
    medicLocationList.innerHTML = "";
    medicLocationList.classList.add("show");
    locations.forEach((o)=>{
        const li =document.createElement("li");
        li.textContent = o;
        medicLocationList.appendChild(li);
        li.addEventListener("click", ()=>{
            medicLocationInput.value = li.textContent;
            medicLocationList.innerHTML = "";
            medicLocationList.classList.remove("show");
           
        });
    });
});
const requestMedicMobile = document.querySelector("#request-nav-btn");
requestMedicMobile.addEventListener("click", ()=>{
    reportMedicBox.classList.add("show");
    overlay.classList.add("active");
    navUser.classList.remove("show");
});
const viewMedicRequests = document.querySelector("#my-medic-requests");
const clinicDashboard = document.querySelector("#clinic-dashboard");
const medicRequestsMobile = document.querySelector("#medic-requests-nav-btn");
const clinicDashboardMobile = document.querySelector("#clinic-dashboard-nav-btn");

const clinicSideViewMedicRequests = document.querySelector("#clinic-side-view-medic-requests");
const clinicSideViewMedicRequestsMobile = document.querySelector("#view-medic-requests-nav-btn");


clinicSideViewMedicRequests.addEventListener("click", ()=>{
    getMEdciRequestClinicSideFunction()
});

clinicSideViewMedicRequestsMobile.addEventListener("click", ()=>{
    getMEdciRequestClinicSideFunction();
    overlay.classList.remove("active");
    navUser.classList.remove("show");
});

const userViewMEdicRequestsErrorBox = document.querySelector("#medic-user-view-error-box");
const closeUserViewMEdicRequestsErrorBox = document.querySelector(".okay-medic-user-view");

async function renderUSERmedicalRequests(arr){
    newsFeedDiv.innerHTML = "";
    const h3 = document.createElement("h3");
    h3.textContent = `Your Medical Requests`;
    newsFeedDiv.appendChild(h3);
    for(const a of arr){
        const request = document.createElement("div");
        request.classList.add("request");
        newsFeedDiv.appendChild(request);
        const profileSection = document.createElement("div");
        profileSection.classList.add("profile-section");
        request.appendChild(profileSection);
        const bundle = document.createElement("div");
        bundle.classList.add("bundle");
        profileSection.appendChild(bundle);
        const img = document.createElement("img");
        img.src = a.profile_pic;
        bundle.appendChild(img);
        const name = document.createElement("p");
        name.textContent = a.name;
        bundle.appendChild(name);
        const time = document.createElement("p");
        time.textContent = `${new Date(a.created_at).toLocaleString("en-PH", {
           month: "short",
           day: "numeric",
           year: "numeric",
           hour: "numeric",
           minute: "2-digit",
        })}`;
        profileSection.appendChild(time);
        const bottom =  document.createElement("div");
        bottom.classList.add("bottom");
        request.appendChild(bottom);
        const h32 = document.createElement('h3')
        h32.textContent = `Requesting medical assistance at ${a.location}. Extra details: ${a.details.toLowerCase()}. Please be urgent.`;
        bottom.appendChild(h32);
        const small = document.createElement("p");
        if(a.state === 'Pending'){
            small.textContent = `Your medical request is currently ${a.state.toLowerCase()}.`;
        }else{
             small.textContent = `Your medical request has been ${a.state.toLowerCase()}.`;
             request.classList.add("resolved");
        }
       
        bottom.appendChild(small);
    }
}

async function userSideVieMEdicRequestsBTN(){
    try{
       const requests = await getAllMedicRequestsAPICaller();
       if(requests.forceLogout){
        forceLogout();
       }
       if(!requests.success){
          userViewMEdicRequestsErrorBox.classList.add("shown");
          overlay.classList.add("active");
          return;
       }
       console.log(requests);
       renderUSERmedicalRequests(requests.data);
    }catch(err){
       userViewMEdicRequestsErrorBox.classList.add("shown");
       overlay.classList.add("active");
    }
}
closeUserViewMEdicRequestsErrorBox.addEventListener("click", ()=>{
    userViewMEdicRequestsErrorBox.classList.remove("shown");
    overlay.classList.remove("active");
});

viewMedicRequests.addEventListener("click", ()=>{
    userSideVieMEdicRequestsBTN();
});
medicRequestsMobile.addEventListener("click", ()=>{
    overlay.classList.remove("active");
    navUser.classList.remove("show");
    userSideVieMEdicRequestsBTN();

});

const resolveErrorBox = document.querySelector("#medic-resolved-error-box");
const closeResolveErrorBox= document.querySelector(".okay-medic-resolved");


async function renderUSERmedicalRequestsCLINICSIDE(arr){
    newsFeedDiv.innerHTML = "";
    const h3 = document.createElement("h3");
    h3.textContent = `Medical Requests`;
    newsFeedDiv.appendChild(h3);
    for(const a of arr){
        const request = document.createElement("div");
        request.classList.add("request");
        newsFeedDiv.appendChild(request);
        const profileSection = document.createElement("div");
        profileSection.classList.add("profile-section");
        request.appendChild(profileSection);
        const bundle = document.createElement("div");
        bundle.classList.add("bundle");
        profileSection.appendChild(bundle);
        const img = document.createElement("img");
        img.src = a.profile_pic;
        bundle.appendChild(img);
        const name = document.createElement("p");
        name.textContent = a.name;
        bundle.appendChild(name);
        const time = document.createElement("p");
        time.textContent = `${new Date(a.created_at).toLocaleString("en-PH", {
           month: "short",
           day: "numeric",
           year: "numeric",
           hour: "numeric",
           minute: "2-digit",
        })}`;
        profileSection.appendChild(time);
        const bottom =  document.createElement("div");
        bottom.classList.add("bottom");
        request.appendChild(bottom);
        const h32 = document.createElement('h3')
        h32.textContent = `Requesting medical assistance at ${a.location}. Extra details: ${a.details.toLowerCase()}. Please be urgent and attentive.`;
        bottom.appendChild(h32);
        if(a.state === "Pending"){
            const button = document.createElement("button");
            button.textContent = 'Resolve';
            bottom.appendChild(button);
            const small = document.createElement("p");
            small.textContent = `This medical request is currently ${a.state.toLowerCase()}.`;
            bottom.appendChild(small);
            
            button.addEventListener("click", async ()=>{
               try{
                 const resolving = await resolveRequestAPICaller(a.requestid, a.requested_by);
                 if(resolving.forceLogout){
                    forceLogout();
                 }
                 if(!resolving.success){
                     resolveErrorBox.classList.add("shown");
                     overlay.classList.add("active");
                     return;
                 }
                 getMEdciRequestClinicSideFunction();
               }catch(err){
                 resolveErrorBox.classList.add("shown");
                 overlay.classList.add("active");
               }
            });
        }else{
            const small = document.createElement("p");
            small.textContent = `This medical request has been ${a.state.toLowerCase()}.`;
            bottom.appendChild(small);
            request.classList.add("resolved");
        }
   
    }
}

async function getMEdciRequestClinicSideFunction(){
    try{
       const requests = await getALLMEdicRequestClinicSideOperatorAPICaller();
       if(requests.forceLogout){
        forceLogout();
       }
       if(!requests.success){
          userViewMEdicRequestsErrorBox.classList.add("shown");
          overlay.classList.add("active");
          return;
       }
       console.log(requests);
       renderUSERmedicalRequestsCLINICSIDE(requests.data);
    }catch(err){
        userViewMEdicRequestsErrorBox.classList.add("shown");
        overlay.classList.add("active");
    }
}
closeResolveErrorBox.addEventListener("click", ()=>{
    resolveErrorBox.classList.remove("shown");
    overlay.classList.remove("active");
});
clinicDashboard.addEventListener("click", ()=>{
    getClinicDashboard()
});
clinicDashboardMobile.addEventListener("click", ()=>{
    overlay.classList.remove("active");
    navUser.classList.remove("show");
    getClinicDashboard()
    
})
const clinicDashboardErrroBox = document.querySelector("#medic-dashboard-error-box");
const closeClinicDashboardErrroBox = document.querySelector(".okay-medic-dashboard");

function renderClinicDashboard(obj){
      newsFeedDiv.innerHTML = "";
      const h3 = document.createElement("h3");
      h3.textContent = 'Clinic Dashboard';
      newsFeedDiv.appendChild(h3);
      const dashboardDiv = document.createElement("div");
      dashboardDiv.classList.add("dashboard-div");
      newsFeedDiv.appendChild(dashboardDiv);

      const requests = document.createElement("div");
      requests.classList.add("requests");
      dashboardDiv.appendChild(requests);
      const requestsH5 = document.createElement("h5");
      requestsH5.textContent = `Requests`;
      requests.appendChild(requestsH5);
      const requestP = document.createElement("p");
      requestP.textContent = obj.requests;
      requests.appendChild(requestP);

      const resolvesDIV = document.createElement('div');
      resolvesDIV.classList.add('resolves');
      dashboardDiv.appendChild(resolvesDIV);
      const resolvesH5 = document.createElement("h5");
      resolvesH5.textContent = 'Resolved';
      resolvesDIV.appendChild(resolvesH5);
      const resolvedP = document.createElement("p");
      resolvedP.textContent = obj.resolves;
      resolvesDIV.appendChild(resolvedP);

      const pendingTodayDiv = document.createElement('div');
      pendingTodayDiv.classList.add("pendingToday");
      dashboardDiv.appendChild(pendingTodayDiv);
      const PendingsTodayH5 = document.createElement("h5");
      PendingsTodayH5.textContent = 'Pending Today';
      pendingTodayDiv.appendChild(PendingsTodayH5);
      const pendingTodayP = document.createElement("p");
      pendingTodayP.textContent = obj.pendingsToday;
      pendingTodayDiv.appendChild(pendingTodayP);

      const resolveTodayDiv = document.createElement('div');
      resolveTodayDiv.classList.add("resolvedToday");
      dashboardDiv.appendChild(resolveTodayDiv);
      const resolveTodayH5 = document.createElement("h5");
      resolveTodayH5.textContent = 'Resolve Today';
      resolveTodayDiv.appendChild(resolveTodayH5);
      const resolveTodayP = document.createElement("p");
      resolveTodayP.textContent = obj.resolvedToday;
      resolveTodayDiv.appendChild(resolveTodayP);

      const chartDiv = document.createElement("div");
      chartDiv.classList.add("requestsLast7Days");
      dashboardDiv.appendChild(chartDiv);

      const canvas = document.createElement("canvas");
      canvas.id = "requests-line-chart";
      chartDiv.appendChild(canvas);

      const requestsPerDay = obj.requestsPerDay ?? [];

        const labels = requestsPerDay.map(item => {
        const date = new Date(`${item.day}T00:00:00`);

        return date.toLocaleDateString("en-PH", {
            month: "short",
            day: "numeric"
        });
    });

      const requestsData = requestsPerDay.map(item => item.requests);
      const lineChart = new Chart(canvas, {
        type: "line",

        data: {
            labels,

            datasets: [{
                label: "Medical Requests",
                data: requestsData,
                borderColor: "#008000",
                backgroundColor: "rgba(0, 128, 0, 0.12)",
                borderWidth: 3,
                fill: true,
                tension: 0.35,
                pointBackgroundColor: "#008000",
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    callbacks: {
                        label: context =>
                            `${context.parsed.y} requests`
                    }
                }
            },

            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },

                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0,
                        stepSize: 1
                    },
                    title: {
                        display: true,
                        text: "Requests Last 7 Days"
                    }
                }
            }
        }
    });

    const pieDiv = document.createElement('div');
    pieDiv.classList.add("requestsDistributionPie");
    dashboardDiv.appendChild(pieDiv);

    const pieCanvas = document.createElement("canvas");
    pieCanvas.id = "requests-distribution-chart";
    pieDiv.appendChild(pieCanvas);

    const pie = new Chart(pieCanvas, {
    type: "doughnut",
    data: {
        labels: ["Pending", "Resolved"],
        datasets: [{
            data: [
                Number(obj.pendings),
                Number(obj.resolves)
            ],
            backgroundColor: [
                "#D4A017",
                "#008000"
            ],
            borderColor: "#ffffff",
            borderWidth: 3,
            hoverOffset: 6
        }]
    },
    options: {
responsive: true,
maintainAspectRatio: false,
cutout: "60%",

plugins: {
    title: {
        display: true,
        text: "Request Distribution"
    },

    legend: {
        position: "bottom"
    },

    tooltip: {
        callbacks: {
            label: context =>
                `${context.label}: ${context.parsed} requests`
        }
    }
}

}
});

    const barChartDiv = document.createElement("div");
    barChartDiv.classList.add("requestsPerBuilding");
    dashboardDiv.appendChild(barChartDiv);

    const barCanvas = document.createElement("canvas");
    barCanvas.id = "requests-per-building-chart";
    barChartDiv.appendChild(barCanvas);

    const buildings = obj.requestsPerBuilding.map((a)=>{
        return a.location;
    });
    const values = obj.requestsPerBuilding.map((a) =>{
         return a.requests;
    } )

    const barChart = new Chart(barCanvas, {
    type: "bar",

    data: {
        labels: buildings, // Your building names
        datasets: [{
            label: "Medical Requests",
            data: values, // Your request counts
            backgroundColor: "#008000",
            borderColor: "#006400",
            borderWidth: 1,
            borderRadius: 5,
            barPercentage: 0.7,
            categoryPercentage: 0.8
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            },

            tooltip: {
                callbacks: {
                    label: context =>
                        `${context.parsed.y} requests`
                }
            }
        },

        scales: {
            x: {
                grid: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Building"
                }
            },

            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                    stepSize: 1
                },
                title: {
                    display: true,
                    text: "Medical Requests"
                }
            }
        }
    }
});


}

async function getClinicDashboard(){
    try{
      const dashboard = await clinicDashboardAPICaller();
      if(dashboard.forceLogout){
        forceLogout();
      }
      if(!dashboard.success){
         clinicDashboardErrroBox.classList.add("shown");
         overlay.classList.add("active");
         return;
      }
      console.log(dashboard);
      renderClinicDashboard(dashboard.data)
    }catch(err){
      console.error("Clinic dashboard error:", err);
      clinicDashboardErrroBox.classList.add("shown");
      overlay.classList.add("active");
    }
}
closeClinicDashboardErrroBox.addEventListener("click", ()=>{
     clinicDashboardErrroBox.classList.remove("shown");
     overlay.classList.remove("active");
});
const seeUsersErrorBox = document.querySelector("#see-users-error-box");
const closeSeeUsersErrorBox = document.querySelector(".okay-see-users");
async function seeUsersReusable(){
    try{
       const users = await seeAllUsersAPICaller();
       if(users.forceLogout){
        forceLogout();
       }
       if(!users.success){
          seeUsersErrorBox.classList.add("shown");
          overlay.classList.add("active");
          return;
       }
       console.log(users);
       renderSeeAllUsers(users.data);
    }catch(err){
      seeUsersErrorBox.classList.add("shown");
      overlay.classList.add("active");
    }
}
closeSeeUsersErrorBox.addEventListener('click', ()=>{
    seeUsersErrorBox.classList.remove("shown");
    overlay.classList.remove("active");
});
seeAllUsersBTN.addEventListener("click", ()=>{
    seeUsersReusable();
});
seeAllUsersMObileBTN.addEventListener("click", ()=>{
    overlay.classList.remove("active");
    navUser.classList.remove("show");
    seeUsersReusable(); 
});

function renderSeeAllUsers(arr){
    newsFeedDiv.innerHTML = "";
    const h3 = document.createElement("h3");
    h3.textContent = 'SafePLMUN Users';
    newsFeedDiv.appendChild(h3);
    const container = document.createElement("div");
    container.classList.add("users-container");
    newsFeedDiv.appendChild(container);
    const header = document.createElement("div");
    header.classList.add("entry");
    header.classList.add("highlight");
    const name = document.createElement("p");
    name.textContent = 'Name';
    header.appendChild(name);
    const role = document.createElement("p");
    role.textContent = 'Role';
    header.appendChild(role);
    const joined = document.createElement("p");
    joined.textContent = "Joined at";
    header.appendChild(joined);
    const state = document.createElement("p");
    state.textContent = "State";
    header.appendChild(state);
    container.appendChild(header)
    for(const a of arr){
        const entry = document.createElement("div");
        entry.classList.add("entry");
        container.appendChild(entry);
        const bundle = document.createElement("div");
        bundle.classList.add("bundle");
        entry.appendChild(bundle);
        const img = document.createElement("img");
        img.src = a.profile_pic;
        bundle.appendChild(img);
        const h4 = document.createElement("h4");
        h4.textContent = a.name.split(" ")[0];
        bundle.appendChild(h4);
        const roleP = document.createElement("p");
        roleP.textContent = a.role;
        entry.appendChild(roleP);
        const joinedP = document.createElement("p");
        joinedP.textContent = new Date(a.created_at).toLocaleString("en-PH", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit"
        });
        entry.appendChild(joinedP);
        if(a.isbanned){
            const lift = document.createElement("button");
            lift.textContent = "Unban";
            entry.appendChild(lift);
            lift.addEventListener("click", async ()=>{
              try{
                const unbanning = await unbanUserAPICaller(a.userid);
                if(unbanning.forceLogout){
                    forceLogout();
                }
                if(!unbanning.success){
                    unbanUserErrorBox.classList.add('shown');
                    overlay.classList.add("active");
                    return;
                }
                seeUsersReusable(); 
              }catch(err){
                unbanUserErrorBox.classList.add('shown');
                overlay.classList.add("active");
              }
            });
        }else{
            const ban = document.createElement("button");
            ban.textContent = 'Ban';
            entry.appendChild(ban);
            ban.addEventListener("click", async ()=>{
                try{
                  const banning = await banUserAPICaller(a.userid);
                  if(banning.forceLogout){
                    forceLogout();
                  }
                  if(!banning.success){
                     banErrorBox.classList.add("shown");
                     overlay.classList.add("active");
                     return;
                  }
                  seeUsersReusable(); 
                }catch(err){
                  banErrorBox.classList.add("shown");
                  overlay.classList.add("active");
                }
            });
        }
    }
    
}
const banErrorBox = document.querySelector("#ban-error-box");
const closeBanErrorBox = document.querySelector(".okay-ban");
closeBanErrorBox.addEventListener("click", ()=>{
    banErrorBox.classList.remove("shown");
    overlay.classList.remove("active");
});
const banMessageErrorBox = document.querySelector("#ban-user-error-box");
const closeBanMEsageErrorBox = document.querySelector(".okay-ban-user");
closeBanMEsageErrorBox.addEventListener("click", ()=>{
       banMessageErrorBox.classList.remove("shown");
        overlay.classList.remove('active');
});
const unbanUserErrorBox = document.querySelector("#unban-error-box");
const closeUnbanErrorBox = document.querySelector(".okay-unban");
closeUnbanErrorBox.addEventListener('click', ()=>{
    unbanUserErrorBox.classList.remove('shown');
    overlay.classList.remove("active");
});
async function seeAllUsersStatusReusable(){
    try{
       const all = await seeAllUSersStatusAPICaller();
       if(all.forceLogout){
        forceLogout();
       }
       if(!all.success){
         statusErrorBox.classList.add("shown")
         overlay.classList.add("active");
         return;
       }
       console.log(all);
       renderAllUsersStatusCheckUI(all.data);
    }catch(err){
       statusErrorBox.classList.add("shown")
       overlay.classList.add("active");
    }
}
const statusErrorBox = document.querySelector("#status-error-box");
const closeSattusErrorBox = document.querySelector(".okay-status");
closeSattusErrorBox.addEventListener("click", ()=> {
    statusErrorBox.classList.remove("shown")
    overlay.classList.remove("active");
});
statusCheckBTN.addEventListener("click", ()=>{
    seeAllUsersStatusReusable()
});
statusCheckBTNMObile.addEventListener("click", ()=>{
    overlay.classList.remove("active");
    navUser.classList.remove("show");
    seeAllUsersStatusReusable()
});
function renderAllUsersStatusCheckUI(arr){
    newsFeedDiv.innerHTML = "";
    const h3 = document.createElement("h3");
    h3.textContent = 'All Users Status';
    newsFeedDiv.appendChild(h3);
    for(const a of arr){
        const check_div = document.createElement('div');
        check_div.classList.add("check-div");
        newsFeedDiv.appendChild(check_div);
        const top = document.createElement("div");
        top.classList.add("top");
        check_div.appendChild(top);
        const report = document.createElement("h3");
        report.textContent = `${a.type} at the ${a.location}!`;
        top.appendChild(report);
        const time = document.createElement("p");
        time.textContent = `${new Date(a.created_at).toLocaleString("en-PH", {
       month: "short",
       day: "numeric",
       year: "numeric",
       hour: "numeric",
       minute: "2-digit",
       })}`
       top.appendChild(time);
       const bottom = document.createElement("div");
       bottom.classList.add("bottom");
       check_div.appendChild(bottom);
        const headerEntry = document.createElement("div");
          headerEntry.classList.add("entry");
          headerEntry.classList.add("header");
          const one = document.createElement("p");
          one.textContent = 'Name';
          headerEntry.appendChild(one);
          const two = document.createElement("p");
          two.textContent = 'Status';
          headerEntry.appendChild(two);
          const three = document.createElement("p");
          three.textContent = 'Location';
          headerEntry.appendChild(three);
          const four = document.createElement("p");
          four.textContent = `Guide`;
          headerEntry.appendChild(four);
          const five = document.createElement("p");
          five.textContent = `Updated`;
          headerEntry.appendChild(five);
          bottom.appendChild(headerEntry)
       for(const b of a.check){
          const entry = document.createElement("div");
          entry.classList.add("entry");
          bottom.appendChild(entry);
          const bundle = document.createElement('div');
          bundle.classList.add("bundle");
          entry.appendChild(bundle);
          const img = document.createElement("img");
          img.src = b.profile_pic;
          bundle.appendChild(img);
          const buddy = document.createElement("h4");
          buddy.textContent = b.name.split(" ")[0];
          bundle.appendChild(buddy);
          const status =  document.createElement("p");
          if(b.status){
             status.textContent = b.status;
          }else{
            status.textContent = `Unknown`;
          }
          entry.appendChild(status);
          const location = document.createElement("p");
          if(b.location){
            location.textContent = b.location;
          }else{
            location.textContent = 'Unknown';
          }
          entry.appendChild(location);
          const extra = document.createElement("p");
          if(b.details){
            extra.textContent = b.details;
          }else{
            extra.textContent = 'None';
          }
          entry.appendChild(extra);
          const updated =  document.createElement("p");
          if(b.statusCreatedAt){
            updated.textContent = `${new Date(b.statusCreatedAt).toLocaleString("en-PH", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit"
        })}`  
       }else{
          updated.textContent = 'Pending';
       }
       entry.appendChild(updated);
    }
}
}
const adminDashboardErrorBox = document.querySelector("#admin-dashboard-error-box");
const closeAdminDashboardErrorBox = document.querySelector(".okay-admin-dashboard");

async function adminDashboardReusable(){
    try{
      const dashboard = await adminDashboardAPICaller();
      if(dashboard.forceLogout){
        forceLogout();
      }
      if(!dashboard.success){
        adminDashboardErrorBox.classList.add("shown");
        overlay.classList.add("active");
        return;
      }
      console.log(dashboard);
      renderAdminDashboardUI(dashboard.data);
    }catch(err){
      console.log(err);
      adminDashboardErrorBox.classList.add("shown");
      overlay.classList.add("active");
    }
}
closeAdminDashboardErrorBox.addEventListener("click", ()=>{
    adminDashboardErrorBox.classList.remove("shown");
    overlay.classList.remove("active");
});
adminDashboardBTN.addEventListener("click", ()=>{
    adminDashboardReusable()
});
adminDashboardMObileBTN.addEventListener("click", ()=>{
    overlay.classList.remove("active");
    navUser.classList.remove("show");
    adminDashboardReusable()
});
function renderAdminDashboardUI(obj){
    newsFeedDiv.innerHTML = "";
      const h3 = document.createElement("h3");
      h3.textContent = 'Admin Dashboard';
      newsFeedDiv.appendChild(h3);
      const dashboardDiv = document.createElement("div");
      dashboardDiv.classList.add("dashboard-div");
      newsFeedDiv.appendChild(dashboardDiv);

      const requests = document.createElement("div");
      requests.classList.add("requests");
      dashboardDiv.appendChild(requests);
      const requestsH5 = document.createElement("h5");
      requestsH5.textContent = `Reports`;
      requests.appendChild(requestsH5);
      const requestP = document.createElement("p");
      requestP.textContent = obj.reports;
      requests.appendChild(requestP);

      const resolvesDIV = document.createElement('div');
      resolvesDIV.classList.add('resolves');
      dashboardDiv.appendChild(resolvesDIV);
      const resolvesH5 = document.createElement("h5");
      resolvesH5.textContent = 'Misfires';
      resolvesDIV.appendChild(resolvesH5);
      const resolvedP = document.createElement("p");
      resolvedP.textContent = obj.falseAlarms;
      resolvesDIV.appendChild(resolvedP);

      const pendingTodayDiv = document.createElement('div');
      pendingTodayDiv.classList.add("pendingToday");
      dashboardDiv.appendChild(pendingTodayDiv);
      const PendingsTodayH5 = document.createElement("h5");
      PendingsTodayH5.textContent = 'Report Today';
      pendingTodayDiv.appendChild(PendingsTodayH5);
      const pendingTodayP = document.createElement("p");
      pendingTodayP.textContent = obj.reportsToday;
      pendingTodayDiv.appendChild(pendingTodayP);

      const resolveTodayDiv = document.createElement('div');
      resolveTodayDiv.classList.add("resolvedToday");
      dashboardDiv.appendChild(resolveTodayDiv);
      const resolveTodayH5 = document.createElement("h5");
      resolveTodayH5.textContent = 'Misfire Today';
      resolveTodayDiv.appendChild(resolveTodayH5);
      const resolveTodayP = document.createElement("p");
      resolveTodayP.textContent = obj.falseReportsToday;
      resolveTodayDiv.appendChild(resolveTodayP);

      const chartDiv = document.createElement("div");
      chartDiv.classList.add("requestsLast7Days");
      dashboardDiv.appendChild(chartDiv);

      const canvas = document.createElement("canvas");
      canvas.id = "requests-line-chart";
      chartDiv.appendChild(canvas);

      const requestsPerDay = obj.reportsPerday ?? [];

        const labels = requestsPerDay.map(item => {
        const date = new Date(`${item.day}T00:00:00`);

        return date.toLocaleDateString("en-PH", {
            month: "short",
            day: "numeric"
        });
    });

      const requestsData = requestsPerDay.map(item => item.reports);
      const lineChart = new Chart(canvas, {
        type: "line",

        data: {
            labels,

            datasets: [{
                label: "Emergency Reports",
                data: requestsData,
                borderColor: "#008000",
                backgroundColor: "rgba(0, 128, 0, 0.12)",
                borderWidth: 3,
                fill: true,
                tension: 0.35,
                pointBackgroundColor: "#008000",
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    callbacks: {
                        label: context =>
                            `${context.parsed.y} requests`
                    }
                }
            },

            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },

                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0,
                        stepSize: 1
                    },
                    title: {
                        display: true,
                        text: "Reports Last 7 Days"
                    }
                }
            }
        }
    });

    const pieDiv = document.createElement('div');
    pieDiv.classList.add("requestsDistributionPie");
    dashboardDiv.appendChild(pieDiv);

    const pieCanvas = document.createElement("canvas");
    pieCanvas.id = "requests-distribution-chart";
    pieDiv.appendChild(pieCanvas);

    console.log("Pie chart values:", [
    Number(obj.fires),
    Number(obj.schoolViolences),
    Number(obj.earthquakes)
]);

    const pie = new Chart(pieCanvas, {
    type: "doughnut",
    data: {
        labels: ["Fire", "Violence", "Earthquake"],
        datasets: [{
            data: [
                Number(obj.fires),
                Number(obj.schoolViolences),
                Number(obj.earthquakes)
            ],
            backgroundColor: [
                "#D4A017",
                "#E6392E",
                "#008000"

            ],
            borderColor: "#ffffff",
            borderWidth: 3,
            hoverOffset: 6
        }]
    },
    options: {
responsive: true,
maintainAspectRatio: false,
cutout: "60%",

plugins: {
    title: {
        display: true,
        text: "Reports Distribution"
    },

    legend: {
        position: "bottom"
    },

    tooltip: {
        callbacks: {
            label: context =>
                `${context.label}: ${context.parsed} reports`
        }
    }
}

}
});

    const barChartDiv = document.createElement("div");
    barChartDiv.classList.add("requestsPerBuilding");
    dashboardDiv.appendChild(barChartDiv);

    const barCanvas = document.createElement("canvas");
    barCanvas.id = "requests-per-building-chart";
    barChartDiv.appendChild(barCanvas);

    const buildings = obj.reportsPerBuilding.map((a)=>{
        return a.location;
    });
    const values = obj.reportsPerBuilding.map((a) =>{
         return a.reports;
    } )

    const barChart = new Chart(barCanvas, {
    type: "bar",

    data: {
        labels: buildings, // Your building names
        datasets: [{
            label: "Emergency Reports",
            data: values, // Your request counts
            backgroundColor: "#008000",
            borderColor: "#006400",
            borderWidth: 1,
            borderRadius: 5,
            barPercentage: 0.7,
            categoryPercentage: 0.8
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            },

            tooltip: {
                callbacks: {
                    label: context =>
                        `${context.parsed.y} reports`
                }
            }
        },

        scales: {
            x: {
                grid: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Building"
                }
            },

            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                    stepSize: 1
                },
                title: {
                    display: true,
                    text: "Emergency"
                }
            }
        }
    }
});


}


