let lang = 'en'
document.addEventListener('DOMContentLoaded',()=>{
	l = checkCookie(lang)

})
function toggle()
{
	// console.log('in toggle');
	if(document.documentElement.dir == 'ltr')
	{ 
		document.documentElement.dir = 'rtl'
		document.documentElement.lang = 'ur'
		lang = 'ur'
	}
	else {
		document.documentElement.dir = 'ltr'
		document.documentElement.lang = 'en'
		lang = 'en'
	}
	toggleLanguage(lang)
}
const dict = {
	"title" :{
		en:'Title',
		ur:'میری کہانی'
	},
	"h1title": {
		en: "This is a title",
		ur: "یہ ٹائیٹل ہے"
	},
	"togglebutton": {
		en: "Toggle",
		ur: "بدلئے"
	},
	"downloaddoc": {
		en: "Download - Documen",
		ur: "ڈاکیومنٹ ڈاونلوڈ"
	},
}
function toggleLanguage(lang)
{
	const toTranslate = document.querySelectorAll("[data-translate]")
	toTranslate.forEach( e => {
		e.innerHTML = dict[e.getAttribute('data-translate')][lang]
	})
}
function getCookieValue(name)
{
	let name = name + "="
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
		c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
		}
	}
	return "";
}
function setCookieValue(name,value)
{
	document.cookie=name + "=" + value;
}

function checkCookie(name) {
	let cookiename = getCookie(name);
	if (cookiename != "") {
		return cookiename
	} 
}