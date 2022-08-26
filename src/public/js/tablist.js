
//  Tab clicks
const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener('keydown',changeTabFocus);

tabs.forEach((tab)=>{
    // console.log(tab);
    tab.addEventListener('click',changeTabPanel);
});

let tabFocus = 0;
function changeTabFocus(e)
{
    const keydownUp = 38;
    const keydownDown = 40;
	// console.log(e );
 
    // change the tabindex of the current tab to -1 
    if(e.keyCode === keydownUp || e.keyCode === keydownDown){
        tabs[tabFocus].setAttribute("tabindex",-1); // Set attribute
        console.log(tabs[tabFocus]);
    }
    // if down key is pushed, move to next tab down
    if (e.keyCode === keydownDown) {
        tabFocus++;
        if (tabFocus >= tabs.length){
            tabFocus = 0;
        }
    }
    // if up key is pused, move to next tab up
    if (e.keyCode === keydownUp) {
        tabFocus--;
        if (tabFocus < 0){
            tabFocus = tabs.length -1; // subtract 1, tabs are 0 based
        }
    }
    //  enable selected tab
    tabs[tabFocus].setAttribute("tabindex",0);
    tabs[tabFocus].focus();

}

function changeTabPanel(e)
{
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    tabContainer.querySelector('[aria-selected="true"]').setAttribute("aria-selected",false); // remove active line
    targetTab.setAttribute("aria-selected",true);

    // mainContainer.querySelectorAll('article').forEach((article)=> article.setAttribute("hidden",true));
    mainContainer.querySelectorAll('[role="tabpanel"]').forEach((panel)=> panel.setAttribute("hidden",true));
    mainContainer.querySelector([`#${targetPanel}`]).removeAttribute('hidden');


    console.log(mainContainer);
}
 