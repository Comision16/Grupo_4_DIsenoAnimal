const crypto = require ('crypto');

function creador(name, images, category, price, stock, flavor, discount, description){
    this.id = crypto.randomUUID(),
    this.nombre = name.trim(),
    this.imagen = images ? images.filename : null,
    this.categoria = category.trim() ,
    this.precio = +price.trim(),
    this.stock = +stock.trim() ,
    this.sabores = flavor.trim() ,
    this.descuento = +discount.trim() ,
    this.descripcion = description.trim() 
}
module.exports = creador;