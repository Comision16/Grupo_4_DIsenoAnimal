// Cuando se carga la página, coloca el cursor en el campo 'nombre'
window.onload = function() {
    var nombre = document.querySelector('#nombre');
    nombre.focus();
  };
  
  document.querySelector('form').addEventListener('submit', function(event) {
    // Evita el envío del formulario
    event.preventDefault();
  
    // Obtiene los valores del formulario
    var nombre = document.querySelector('#nombre');
    var precio = document.querySelector('#precio');
    var categoria = document.querySelector('#categoria');
    var stock = document.querySelector('#stock');
    var sabores = document.querySelector('#sabores');
    var descuento = document.querySelector('#descuento');
    var measure = document.querySelector('#measure');
    var value = document.querySelector('#value');
    var brand = document.querySelector('#brand');
    var descripcion = document.querySelector('#descripcion');
  
    // Función para validar un campo
    function validarCampo(campo, validacion, mensajeError) {
      var errorSpan = document.querySelector('#error-' + campo.id);
      if (validacion) {
        campo.style.borderColor = 'green';
        errorSpan.style.display = 'none';
      } else {
        campo.style.borderColor = 'red';
        errorSpan.textContent = mensajeError;
        errorSpan.style.display = 'block';
        event.preventDefault();
      }
    }
  
    // Realiza las validaciones
    validarCampo(nombre, nombre.value.length >= 4, 'El nombre debe tener al menos 4 caracteres.');
    validarCampo(precio, precio.value > 0, 'Por favor, introduce un precio válido mayor a 0.');
    validarCampo(categoria, categoria.value, 'Por favor, selecciona una categoría.');
    validarCampo(stock, stock.value > 0, 'Por favor, introduce una cantidad válida en stock.');
    validarCampo(sabores, sabores.value, 'Por favor, selecciona un sabor.');
    validarCampo(descuento, descuento.value >= 0 && descuento.value <= 100 || descuento.value == '', 'Por favor, introduce un descuento válido entre 0 y 100.');
    validarCampo(measure, measure.value, 'Por favor, selecciona una unidad de medida.');
    validarCampo(value, value.value > 0, 'Por favor, introduce un valor válido mayor a 0.');
    validarCampo(brand, brand.value.length >= 2, 'La marca debe tener al menos 2 caracteres.');
    validarCampo(descripcion, descripcion.value.length >= 30, 'La descripción debe tener al menos 30 caracteres.');
  
    // Si todas las validaciones son correctas, envía el formulario
    this.submit();
  });
  
  // Agrega validación en tiempo real a los campos de entrada
  var campos = ['nombre', 'precio', 'categoria', 'stock', 'sabores', 'measure', 'value', 'brand', 'descripcion'];
  campos.forEach(function(campo) {
    var input = document.querySelector('#' + campo);
    input.addEventListener('input', function() {
      var errorSpan = document.querySelector('#error-' + campo);
      if ((campo === 'nombre' && this.value.length >= 4) || (campo === 'brand' && this.value.length >= 2) || (campo === 'descripcion' && this.value.length >= 30)) {
        this.style.borderColor = 'green';
        errorSpan.style.display = 'none';
      } else if ((campo === 'precio' || campo === 'value') && this.value > 0) {
        this.style.borderColor = 'green';
        errorSpan.style.display = 'none';
      } else if (campo !== 'nombre' && campo !== 'brand' && campo !== 'descripcion' && campo !== 'precio' && campo !== 'value' && this.value) {
        this.style.borderColor = 'green';
        errorSpan.style.display = 'none';
      }
    });
    input.addEventListener('blur', function() {
      var errorSpan = document.querySelector('#error-' + campo);
      if (!this.value || (campo === 'nombre' && this.value.length < 4) || (campo === 'brand' && this.value.length < 2) || (campo === 'descripcion' && this.value.length < 30) || ((campo === 'precio' || campo === 'value') && this.value <= 0)) {
        this.style.borderColor = 'red';
        errorSpan.textContent = getErrorMessage(campo);
        errorSpan.style.display = 'block';
        errorSpan.style.color = 'red';
      }
    });
  });
  
  function getErrorMessage(campo) {
    switch (campo) {
      case 'nombre':
        return 'El nombre debe tener al menos 4 caracteres.';
      case 'precio':
        return 'Por favor, introduce un precio válido mayor a 0.';
      case 'categoria':
        return 'Por favor, selecciona una categoría.';
      case 'stock':
        return 'Por favor, introduce una cantidad válida en stock.';
      case 'sabores':
        return 'Por favor, selecciona un sabor.';
      case 'measure':
        return 'Por favor, selecciona una unidad de medida.';
      case 'value':
        return 'Por favor, introduce un valor válido mayor a 0.';
      case 'brand':
        return 'La marca debe tener al menos 2 caracteres.';
      case 'descripcion':
        return 'La descripción debe tener al menos 30 caracteres.';
      default:
        return 'Por favor, completa este campo correctamente.';
    }
  }
  