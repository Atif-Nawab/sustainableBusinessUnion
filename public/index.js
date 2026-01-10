console.log("working")

// let date=document.querySelectorAll(".date");
// let topic=document.querySelectorAll(".topic")

let dateArr=[];
let topicArr=[];

// function dateConvertor(isoDate){
//     const d = new Date(isoDate);

// const formatted =
//   d.toLocaleDateString("en-US", {
//     month:"short",
//     weekday: "short",
    
//     timeZone: "UTC"
//   }) +
//   ", " +
//   d.getUTCDate();

// return (formatted);
// }

function dateConvertor(isoDate){
  
 const [y, m, d] = isoDate.split("-").map(Number);

  // Create Date using numeric constructor (LOCAL, no UTC shift)
  const date = new Date(y, m - 1, d);

  const days = ["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return `${days[date.getDay()]}, ${String(d).padStart(2, "0")} ${months[m - 1]}`;
}
let eventsPanel=document.querySelector(".events-list");
eventsPanel.innerHTML="";
async function showEvents(){

  await axios.get("/getEvents")
  .then(res=>{

    res.data.forEach(element => {
        createEventDivs();
        let date=(element.dates).slice(0,10);
        
        dateArr.push(dateConvertor(date));
        topicArr.push(element.title);
        // console.log(dateArr)
    });
    
})
  .catch(err=>{
    console.log(err);
  })

//   console.log(dateArr)


let date=document.querySelectorAll(".date");
let topic=document.querySelectorAll(".topic")
let i=0;
date.forEach(element=>{
    
    element.innerText=`${dateArr[i]}`;
    i++;
})
i=0;
topic.forEach(element=>{

    element.innerText=`${topicArr[i]}`
    i++
})
console.log(dateArr,topicArr)
}
showEvents();
 

let eventList=document.querySelector(".events-list");
eventList.style.overflow="hidden";

let eventListBtn=document.querySelector(".btn-light");
let click=true;
eventListBtn.addEventListener("click",()=>{
  if(click){
    console.log("this is from see all")
  eventList.style.overflow="scroll";
  eventListBtn.innerText="SEE LESS";
  click=false;

  }
  else{
    eventList.style.overflow="hidden";
    eventListBtn.innerText="SEE ALL EVENTS";
  click=true;
  }
  
})

function createEventDivs(){
  
  let outerDiv=document.createElement("div");
outerDiv.classList.add("event-row");
let innerDiv=document.createElement("div");
innerDiv.classList.add("event-info");
let dateDiv=document.createElement("div");
dateDiv.classList.add('date');
let topicDiv=document.createElement('div');
topicDiv.classList.add("topic");
let ticketBtn=document.createElement("button");
ticketBtn.innerText="Buy Tickets"
ticketBtn.classList.add("btn-light");
outerDiv.appendChild(innerDiv);
innerDiv.appendChild(topicDiv);
innerDiv.appendChild(dateDiv);
innerDiv.insertAdjacentElement("afterend",ticketBtn);

eventsPanel.appendChild(outerDiv);
}



function themeupdate(){
  axios.get("/getColors")
  .then(result=>{
    console.log(result.data)

    const root = document.documentElement;
    root.style.setProperty("--primary", result.data.primaryColor);
    root.style.setProperty("--secondary", result.data.secondaryColor);
    root.style.setProperty("--primary-dark", result.data.primaryDark);
  })
  .catch(err=>{
    console.log(err)
  })
}
themeupdate();


function titleChanger(){
  axios.get("/getTitle")
  .then(result=>{
    document.querySelector(".hero-title-main").innerText=`${result.data.heroTitle}`;
    document.querySelector(".hero-subtitle").innerText=`${result.data.heroSubTitle}`;
  })
  .catch(err=>{
    console.log(err);
  })

}
titleChanger();