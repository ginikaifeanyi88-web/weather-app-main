export class Dropdown {
    isStillHovering(menu, dropBtn) {
       if (menu.matches(':hover') || dropBtn.matches(':focus')) {
         menu.style.display ="block";
    console.log("hi") 
    } else{
    menu.style.display ="";
    }
}
isStillFocusing(searchBar, recentSearches) {
       if (searchBar.matches(':focus')) {
         recentSearches.style.display ="block";
    console.log("yo") 
    } 
}
}


