import loadPlane from '../contents/dom/plane.js';
import loadFlightJS from '../contents/dom/flight.js';
import loadAccountView from '../contents/dom/accountView.js';
import loadRoleView from '../contents/dom/roleView.js';

const barButtons = {
    planeBarBtn: {
        html: 'contents/plane.html',
        jsFunction: loadPlane
    },
    flightBarBtn: {
        html: 'contents/flight.html',
        jsFunction: loadFlightJS

    },
    accountBarBtn:{
        html: 'contents/accountView.html',
        jsFunction: loadAccountView,
    },
    roleBarBtn:{
        html: 'contents/roleView.html',
        jsFunction: loadRoleView,
    }
}


async function setContent(key) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = await getHTMLFromFile(barButtons[key].html);
    //load js
    barButtons[key].jsFunction();
}


async function getHTMLFromFile(filePath) {
    const data = await fetch(filePath);
    return await data.text();

}
window.addEventListener('load', () => {
    setContent('planeBarBtn');
})
window.setContent = setContent;


