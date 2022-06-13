export function toggleSideMenu(width){
    const dashboardMenu = document.querySelector('#side-menu')
    dashboardMenu.style.transform = `translateX(${width}%)`
}