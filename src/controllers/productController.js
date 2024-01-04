const {leerJSON} = require("../data")
const productos = leerJSON('productos');
const fs = require('fs');

function pushProducts (parametro){
	fs.writeFileSync("./src/data/productos.json", JSON.stringify(parametro, null, 3), "utf-8");}

module.exports = {
    detail : (req, res) => {
        const parametrizada = req.params.id
        const idproducto = productos.find(que => que.id == parametrizada )
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
    
    


    edit : (req, res) => {
        const {id} = req.params;
        const product = productos.find(product => product.id == id);
        
        return res.render('products/product-edit', {
            ...product
        }) 
    },

    update: (req,res) => {
        const {categoria, nombre, descuento, descripcion, precio, sabores, stock} = req.body;
        
  const productUpdate = productos.map(product =>  {
        if (product.id == req.params.id) {
             
       product.nombre = nombre.trim(),
          product.image1 = req.files.image1 ? req.files.image1[0].filename :  product.image1,
          product.image2 = req.files.image2 ? req.files.image2[0].filename :  product.image2,
          product.precio = +precio,
           product.descuento = +descuento,
            product.descripcion = descripcion.trim(),
           product.categoria = categoria,
           product.sabores = sabores,
           product.stock = +stock
       }
        
        return product
     })

     fs.writeFileSync("./src/data/productos.json", JSON.stringify(productUpdate, null, 3), "utf-8");
     return res.redirect('/admin/dashboard')
    
   
    },



    create : (req,res) => {
        return res.render('products/product-create')
        
    },
    store : (req, res) => {
        const creador = require('../data/creador');
	const image1 = req.file.image1;
	const image2 = req.file.image2;

	const {nombre, categoria, precio, stock, sabores, descuento, descripcion} = req.body;
	const nuevoCreador = new creador(nombre, image1, image2, categoria, precio, stock, sabores, descuento, descripcion);
	productos.push(nuevoCreador);
	pushProducts(productos);
    return res.redirect('/admin/dashboard')
    },
    todos : (req,res) => {
        res.render('products/todos', {productos})
    },
    search: (req, res) => {        
		const {keywords} = req.query;
        
		return res.render('products/product-search', {
			productos : productos.filter(producto => producto.nombre.toLowerCase().includes(keywords.toLowerCase()) ||  producto.descripcion.toLowerCase().includes(keywords.toLowerCase())), 
			keywords            
		})
	}    
}
