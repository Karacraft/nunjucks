document.addEventListener("DOMContentLoaded",()=>{
  // Setup Theme
  setupTheme();
});

//  Hamburger
let nav = document.querySelector(".primary-navigation");
let navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", ()=>{
let visibility = nav.getAttribute("data-visible");
if (visibility == "false")
{
	nav.setAttribute("data-visible",true);
	navToggle.setAttribute("aria-expanded",true);
}else {
	nav.setAttribute("data-visible",false);
	navToggle.setAttribute("aria-expanded",false);
}
});
  
// Theme Related
let ltheme = localStorage.getItem("theme");
//  Select the theme toggle button
const btn = document.querySelector(".btn-toggle");
//  Select the stylesheet <link>
const theme = document.querySelector("#theme-link");
//  Select main logo to change
const logo = document.querySelector(".logo");
//  Select Menu Toggle Icon
const icon = document.querySelector("#btnToggleTheme");
// console.log(icon);

// function setupTheme()
// {
// 	let href = theme.getAttribute("href");
// 	if(ltheme == "dark")
// 	{
// 		theme.href = "public/css/theme-light.css";
// 		logo.src = "public/images/logos/avt-logo-blue.svg";
// 		icon.innerHTML = '<i id="btnToggleTheme" class="fa-solid fa-moon"></i>';
// 		ltheme = "light";
// 	}else if (ltheme == "light") {
// 		theme.href = "public/css/theme-dark.css";
// 		logo.src ="public/images/logos/avt-logo-white.svg";
// 		icon.innerHTML = '<i id="btnToggleTheme" class="fa-solid fa-sun text-white"></i></button>';
// 		ltheme = "dark";
// 	}
// 	localStorage.setItem("theme",ltheme)
// };

// Listen for a click on the button
btn.addEventListener("click", function() {
	let href = theme.getAttribute("href");
	// console.log(href);
	switch (href) {
		case "public/css/theme-light.css":
			theme.href = "public/css/theme-dark.css";
			logo.src ="public/images/logos/avt-logo-white.svg";
			icon.innerHTML = '<i  id="btnToggleTheme" class="fa-solid fa-sun text-white"></i>';
			ltheme = "dark";
			// localStorage.setItem("theme",ltheme)
			break;

		case "public/css/theme-dark.css":
			theme.href = "public/css/theme-light.css";
			logo.src = "public/images/logos/avt-logo-blue.svg";
			icon.innerHTML = '<i id="btnToggleTheme" class="fa-solid fa-moon "></i></button>';
			ltheme = "light";
			// localStorage.setItem("theme",ltheme)
			break;
	}
});


