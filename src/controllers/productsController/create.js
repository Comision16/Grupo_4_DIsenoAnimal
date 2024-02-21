
const fs = require('fs');

function pushProducts (parametro){
fs.writeFileSync("./src/data/productos.json", JSON.stringify(parametro, null, 3), "utf-8");}

    module.exports = (req, res) =>  {
            return res.render('products/product-create')
        }