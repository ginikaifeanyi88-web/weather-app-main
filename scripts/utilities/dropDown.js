export class Dropdown {
    // check if item is still be hovered over
    isStillHovering(menu, dropBtn) {
       if (menu.matches(':hover') || dropBtn.matches(':focus')) {
         menu.style.display ="block";
    console.log("hi") 
    } else{
    menu.style.display ="";
    }
}
// check if item is still in focus state
isStillFocusing(searchBar, recentSearches) {
       if (searchBar.matches(':focus')) {
        
    console.log("yo") 
    } 
}
}


