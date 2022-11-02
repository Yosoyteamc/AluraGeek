const validateInput=(input)=>{
    input.addEventListener("blur",()=>{
        if(!input.validity.valid){
            input.classList.add("input--invalid");
        }
        if(input.validity.valid){
            input.classList.remove("input--invalid");
        }
    })
}

export const Validateservice ={
    validateInput,
}