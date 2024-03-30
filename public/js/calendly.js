var modal = document.getElementById("myModal");

var btn = document.getElementById("openModalLink");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function() {
    Calendly.initInlineWidget({
      url: 'https://calendly.com/alejandroelias25/reserva',
      parentElement: document.getElementById('calendlyWidget')
    });
  });
