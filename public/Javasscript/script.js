const btn = document.querySelector("button")
const reCaptcha = document.querySelector(".reCaptcha")
const matching = document.querySelector(".reCaptcha .matching")
const form = document.querySelector("form");


const randomNumber = () => {
    const random = Math.floor(Math.random() * 100000);
    // console.log(random)
    return random;
}
const p = document.createElement("p");
p.innerText = randomNumber();
reCaptcha.appendChild(p)

const val = document.querySelector(".reCaptcha p");

btn.addEventListener("click" , () => {
    console.log(matching.value)
    console.log(val.innerText)

    if(matching.value === val.innerText){
        console.log("good")
        btn.type = "submit"
    }
    else{
        const notify = document.createElement("p");
        notify.innerText = "Incorrect ReCaptcha !!! Try Again."
        form.appendChild(notify)
        notify.style.color = "red"
        btn.type = "reset"
        console.log("bad")
    }
})



randomNumber()
