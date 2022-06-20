export function toggleSideMenu(width){
    const dashboardMenu = document.querySelector('#side-menu')
    dashboardMenu.style.transform = `translateX(${width}%)`
}

export function toggleAdminSideMenu(show){
    const adminMenu = document.querySelector('#admin-sidebar-mobile')
    adminMenu.style.left = `${show}%`
}
export function toggleSupportSideMenu(show){
    const adminMenu = document.querySelector('#support-sidebar')
    adminMenu.style.right = `${show}%`
}