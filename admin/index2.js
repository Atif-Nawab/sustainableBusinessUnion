// const form = document.getElementById("eventForm");
// const table = document.getElementById("eventTable");

// const { default: axios } = require("axios");

// // let events = JSON.parse(localStorage.getItem("events")) || [];

// // function saveEvents() {
// //   localStorage.setItem("events", JSON.stringify(events));
// // }

// fetch("http")
// function renderEvents() {
//   table.innerHTML = "";

//   events.forEach((event, index) => {
//     const row = document.createElement("tr");

//     row.innerHTML = `
//       <td>${event.date} ${event.time}</td>
//       <td>${event.title}</td>
//       <td>${event.artists}</td>
//       <td>${event.location}</td>
//       <td><span class="delete" onclick="deleteEvent(${index})">Delete</span></td>
//     `;

//     table.appendChild(row);
//   });
// }

// function deleteEvent(index) {
//   events.splice(index, 1);
//   saveEvents();
//   renderEvents();
// }

// form.addEventListener("submit", e => {
//   e.preventDefault();

//   const event = {
//     title: title.value,
//     artists: artists.value,
//     date: date.value,
//     time: time.value,
//     location: location.value
//   };

//   events.push(event);
//   saveEvents();
//   renderEvents();
//   form.reset();
// });

// renderEvents();



// function updatePublicTheme() {
//   const primary = document.getElementById("primary").value;
//   const secondary = document.getElementById("secondary").value;

//   fetch("/update-public-theme", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ primary, secondary })
//   })
//   .then(() => alert("Public theme updated"))
//   .catch(err => console.error(err));
// }



// import axios from 'axios';
console.log("loging")

document.getElementById("eventForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    title: document.getElementById("title").value,
    artists: document.getElementById("artists").value,
    date: document.getElementById("date").value.replace("T","  "),   // YYYY-MM-DD
    time: document.getElementById("time").value,   // HH:MM
    location: document.getElementById("location").value
  };
console.log(data.date);
  axios.post("/addEvent", data)
    .then(res => {
      alert("Event added!");
      this.reset();
      showEvents();
    })
    .catch(err => {
      console.error(err);
      alert("Failed to add event");
    });
});

function showEvents(){


  axios.get("/getEvents")
  .then(res=>{
    console.log(res.data[0]);

    const tableBody = document.getElementById("eventData");
    const tr=document.querySelectorAll("#eventData tr")
    tr.forEach(element=>{
      element.remove();
      
    })
      
      res.data.forEach(event => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${event.dates.slice(0,10)}</td>
          <td>${event.title}</td>
          <td>${event.artists}</td>
          <td>${event.location}</td>
          <td>${event.time}</td>
        `;
        tableBody.appendChild(row);
  })
})
  .catch(err=>{
    console.log(err);
  })
}
showEvents();
