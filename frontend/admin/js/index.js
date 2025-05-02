import loadPlane from '../contents/js/plane.js';
import loadFlightJS from '../contents/js/flight.js';

const contentsPath = {
    planeBarBtn: {
        html: 'contents/plane.html',
        jsFunction: loadPlane
    },
    flightBarBtn: {
        html: 'contents/flight.html',
        jsFunction: loadFlightJS

    }
}


async function setContent(key) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = await getHTMLFromFile(contentsPath[key].html);
    //load js
    contentsPath[key].jsFunction();
}


async function getHTMLFromFile(filePath) {
    const data = await fetch(filePath);
    return await data.text();

}
window.addEventListener('load', () => {
    setContent('flight');
})
window.setContent = setContent;


