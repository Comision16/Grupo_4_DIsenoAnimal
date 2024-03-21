const $ = (id) => document.getElementById(id);

console.log($("login-form").elements);

$("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let error = false

    for (let i = 0; i < this.elements.length - 2; i++) {
        if (!this.elements[i].value) {
            this.elements[i].classList.add("is-invalid");
            $("alertLogin" + [i]).innerHTML = "Debe completar el campo";
            error = true;
        } else {
            this.elements[i].classList.remove("is-invalid");
        }
    }
    !error ? this.submit() : alert("te faltan datos")
});

$("email").addEventListener("focus", function () {
    this.classList.remove("is-invalid");
    $("alertLogin0").innerHTML = "";
});

$("password").addEventListener("focus", function () {
    this.classList.remove("is-invalid");
    $("alertLogin1").innerHTML = "";
});

$("email").addEventListener("blur", function () {
    if (!this.value) {
        this.classList.add("is-invalid");
        $("alertLogin0").innerHTML = "El email es obligatorio";
    } else {
        this.classList.remove("is-invalid");
        $("alertLogin0").innerHTML = "";
    }
});

$("password").addEventListener("blur", function () {
    if (!this.value) {
        this.classList.add("is-invalid");
        $("alertLogin1").innerHTML = "La contraseña es obligatoria";    
    } else {
        this.classList.remove("is-invalid");
        $("alertLogin1").innerHTML = "";
    }
});

