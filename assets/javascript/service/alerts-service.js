import { clientServices } from "./cliente-service.js";

const alertsContent = document.getElementById("alerts-content");
const alertsSection = document.getElementById("alerts-section");
const error = 'alert--error'
const success = 'alert--success'
let alertId = 0;

export const createAlert = (type = 'NORMAL',message) =>{
    alertsSection.classList.remove('alerts--not');
    let typeClass = '';
    if(type === 'ERROR'){typeClass = error}
    if(type === 'SUCCESS'){typeClass = success}
    let alertInnerHMTL = `
    <div class="alert ${typeClass}" id='${alertId}'>
        <p class="alert__message">${message}</p>
        <img class="alert__icon" data-remove='${alertId}' src="./assets/images/icons/close-white.svg" alt="icon">
    </div>`;

    alertsContent.innerHTML += alertInnerHMTL;
    removeAlert(alertId);
    alertId++;
}

export const createAlertToDelete = async (productName) => {
    alertsSection.classList.remove('alerts--not')
    let alertInnerHMTL = `
    <div class="alert alert--deleting" id='${alertId}'>
        <p class="alert__message">¿Desea eliminar: <span class="alert__message--bolder">${productName}</span>?</p>
        <p class="alert__options"><span data-accept> SI </span> <span data-decline> NO </span><p>
        <img class="alert__icon" data-remove='${alertId}' src="./assets/images/icons/close-white.svg" alt="icon">
    </div>`;
    alertsContent.innerHTML += alertInnerHMTL;

    const accept = document.querySelector("[data-accept]");
    const decline = document.querySelector("[data-decline]");

    accept.addEventListener('click', () => {
        clientServices.deleteProduct();
    });
    decline.addEventListener('click', () =>{
        createAlert("ERROR",`se ha cancelado eliminar: ${productName}`)    
    });

    removeAlert(alertId,8000);
    alertId++;
}

const removeAlert = (id, time = 3000) => {
    setTimeout(()=>{
        // alertsContent.children.item(0).classList.add('not');
        alertsContent.children.item(0).remove();
        if(alertsContent.childElementCount == 0) {
            alertsSection.classList.add('alerts--not')
            return
        }
    },time);
}

