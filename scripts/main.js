const dropDownIcon = document.querySelector(".units-button");
const unitsMenu = document.querySelector(".units-menu");

function isStillHovering() {
       if (unitsMenu.matches(':hover')) {
         unitsMenu.style.display ="block";
    console.log("hi") 
    } else{
    unitsMenu.style.display ="";
    }
}



dropDownIcon.addEventListener("mouseover", ()=>{
    unitsMenu.style.display ="block";
})

dropDownIcon.addEventListener("mouseout", ()=>{
   setTimeout(isStillHovering,1000);
})

unitsMenu.addEventListener("mouseout", ()=>{
    setTimeout(isStillHovering,1000);
})

