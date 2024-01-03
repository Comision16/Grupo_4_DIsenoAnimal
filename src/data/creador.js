const crypto = require ('crypto');

function creador( nombre, imagen, categoria, precio, stock, sabores, descuento, descripcion){
    this.id = crypto.randomUUID();
    this.nombre = nombre ? nombre.trim() : '';
    this.imagen = imagen ? imagen.filename : null;
    this.categoria = categoria ? categoria.trim() : '';
    this.precio = precio ? +precio.trim() : 0;
    this.stock = stock ? +stock.trim() : 0;
    this.sabores = sabores ? sabores.trim() : '';
    this.descuento = descuento ? +descuento.trim() : 0;
    this.descripcion = descripcion ? descripcion.trim() : '';
}
module.exports = creador;
