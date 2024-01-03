const crypto = require ('crypto');

function creador( nombre, imagen, categoria, precio, stock, sabores, descuento, descripcion){
    this.id = crypto.randomUUID(),
    this.nombre = nombre.trim(),
    this.imagen = imagen ? imagen.filename : null,
    this.categoria = categoria.trim() ,
    this.precio = +precio.trim(),
    this.stock = +stock.trim() ,
    this.sabores = sabores.trim() ,
    this.descuento =  +descuento.trim() ,
    this.descripcion = descripcion.trim() 
}
module.exports = creador;
