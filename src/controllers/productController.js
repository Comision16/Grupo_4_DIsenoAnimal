const {leerJSON} = require("../data")
const productos = leerJSON('productos');
const fs = require('fs');

function pushProducts (parametro){
	fs.writeFileSync("./src/data/productos.json", JSON.stringify(parametro, null, 3), "utf-8");}

module.exports = {
    detail : (req, res) => {
        const parametrizada = +req.params.id
        const idproducto = productos.find(que => que.id === parametrizada )
            /*return res.send(productos)*/
            return res.render('products/product-detail', {
            productos,idproducto 
            })
    },
    gatos : (req, res) => {
        return res.render('products/gatos',{
            productos, 
        })
    },
    perros : (req, res) => {
        return res.render('products/perros',{
            productos , 
        })
    },
    pequenios : (req, res) => {
        return res.render('products/pequenios',{
            productos , 
        })
    },
    Edit : (req, res) => {
            return res.render('products/product-edit')

    },
    create : (req,res) => {
        return res.render('products/product-create')
        
    },
    store : (req, res) => {
        const creador = require('../data/creador');
		const images = req.file;
		const {name, category, price, stock, flavor, discount, description} = req.body;
		const nuevoCreador = new creador(name, images, category, price, stock, flavor, discount, description);
		productos.push(nuevoCreador);
		pushProducts(productos);
		return res.redirect("/")
    },
    todos : (req,res) => {
        res.render('products/todos', {productos})
    },
    search: (req, res) => {        
		const {keywords} = req.query;
        
		return res.render('products/product-search', {
			productos : productos.filter(producto => producto.nombre.toLowerCase().includes(keywords.toLowerCase())), 
			keywords            
		})
	}    
}