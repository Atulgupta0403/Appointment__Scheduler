const btn = document.querySelector("button")
const reCaptcha = document.querySelector(".reCaptcha")
const matching = document.querySelector(".reCaptcha .matching")
const form = document.querySelector("form");
const Specialization = document.querySelector(".Specialization")
const accountType = document.querySelector(".accountType")


const randomNumber = () => {
    const random = Math.floor(Math.random() * 100000);
    return random;
}

const p = document.createElement("p");
p.innerText = randomNumber();
reCaptcha.appendChild(p)

const val = document.querySelector(".reCaptcha p");

btn.addEventListener("click", () => {
    // console.log(matching.value)
    // console.log(val.innerText)

    if (matching.value === val.innerText) {
        btn.type = "submit"
    }
    else {
        const notify = document.createElement("p");
        notify.innerText = "Incorrect ReCaptcha !!! Try Again."
        form.appendChild(notify)
        notify.style.color = "red"
        btn.type = "reset"
    }
});

accountType.addEventListener("input", () => {
    if (accountType.value === "doctor") {
        console.log(accountType.value)
        console.log("true")
        Specialization.classList.remove("display")
    }
    else {
        console.log("patient")
        console.log(accountType.value)
        Specialization.classList.add("display")
    }
})


randomNumber()
