const $ = (id) => document.getElementById(id);
const required = [0, 2, 3, 5];
const exRegEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

const showError = (element, message) => {
    if(message){
        element.classList.add("is-invalid");
        element.style.display = "block";
        element.innerHTML = message;
    }else {
        element.classList.remove("is-invalid");
        element.style.display = "none";
        element.innerHTML = "";
    }
}

$("form-register").addEventListener("submit", function (e) {
    e.preventDefault();

    let error = false

    for (let i = 0; i < this.elements.length - 2; i++) {
        if (!this.elements[i].value && required.includes(i)) {
            this.elements[i].classList.add("is-invalid");
            $("alert" + [i]).innerHTML = "Debe completar el campo";
            error = true;
        } else {
            this.elements[i].classList.remove("is-invalid");
        }
    }

    if (!$("remember").checked) {
        error = true;
        $("error-remember").innerHTML = "Debe aceptar los terminos y codiciones";
    } 

    !error && this.submit()
});

$("name").addEventListener("focus", function () {
    showError($("alert0"))
});

$("email").addEventListener("focus", function () {
    showError($("alert3"))

});

$("password").addEventListener("focus", function () {
    showError($("alert2"))

});

$("password2").addEventListener("focus", function () {
    showError($("alert5"))

});

$("name").addEventListener("blur", function () {
    if (!this.value) {
         showError($("alert0"),"El nombre es obligatorio!!")
    } else if (this.value.length < 2) {
        showError($("alert0"),"Mínimo 2 caracteres")
    } else {
        showError($("alert0"))
    }
});

$("email").addEventListener("blur", function () {
    if (!this.value) {
        this.classList.add("is-invalid");
        showError($("alert3"),"El email es obligatorio")
    } else if (!exRegEmail.test(this.value)) {
        this.classList.add("is-invalid");
        showError($("alert3"),"Formato de email inválido")
    } else {
        this.classList.remove("is-invalid");
        showError($("alert3"))

    }
});

$("password").addEventListener("blur", function () {
    if (!this.value) {
        this.classList.add("is-invalid");
        $("alert2").innerHTML = "La contraseña es obligatoria";
    } else if (! /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i(this.value)) {
        this.classList.add("is-invalid");
        $("alert2").innerHTML = "Formato de email inválido";
    } else {
        this.classList.remove("is-invalid");
        $("alert2").innerHTML = "";
    }
});

$("password").addEventListener("keyup", function () {
    let errorMessage = [];

    if (this.value.length < 8) {
        errorMessage.push("La contraseña debe tener al menos 8 caracteres.");
    }
    if (!/(?=.*[a-z])/.test(this.value)) {
        errorMessage.push("La contraseña debe contener al menos una letra minúscula.");
    }
    if (!/(?=.*[A-Z])/.test(this.value)) {
        errorMessage.push("La contraseña debe contener al menos una letra mayúscula.");
    }
    if (!/(?=.*\d)/.test(this.value)) {
        errorMessage.push("La contraseña debe contener al menos un número.");
    }
    if (!/(?=.*[@$!%*?&])/.test(this.value)) {
        errorMessage.push("La contraseña debe contener al menos un carácter especial entre @$!%*?&.");
    }

    let errorHTML = errorMessage.map(message => `<li>${message}</li>`).join('');
    $("lista-error-mail").innerHTML = errorHTML;
});

$("password2").addEventListener("blur", function () {
    if (!this.value) {
        this.classList.add("is-invalid");
        $("alert5").innerHTML = "La contraseña es obligatoria";
    } else if (this.value !== $("password").value) {
        this.classList.add("is-invalid");
        $("alert5").innerHTML = "Las contraseñas no coinciden";
    } else {
        this.classList.remove("is-invalid");
        $("alert5").innerHTML = "";
    }
});

