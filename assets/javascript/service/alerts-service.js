const alertsContent = document.getElementById("alerts-content");
const alertsSection = document.getElementById("alerts-section");
const error = 'alert--error'
const success = 'alert--success'
let alertId = 0;

export const createAlert = (type = 'NORMAL',message) =>{
    alertsSection.classList.remove('alerts--not')
    let typeClass = '';
    let alertInnerHMTL = ''
    if(type === 'ERROR'){typeClass = error}
    if(type === 'SUCCESS'){typeClass = success}
    alertInnerHMTL = `
    <div class="alert ${typeClass}" id='${alertId}'>
        <p class="alert__message">${message}</p>
        <img class="alert__icon" data-remove='${alertId}' src="./assets/images/icons/close-white.svg" alt="icon">
    </div>`;

    alertsContent.innerHTML += alertInnerHMTL;
    removeAlert(alertId);
    alertId++;
}

const removeAlert = (id) => {
    setTimeout(()=>{
        // alertsContent.children.item(0).classList.add('not');
        alertsContent.children.item(0).remove();
        alertsSection.classList.add('alerts--not')
        return
    },3000);
}

