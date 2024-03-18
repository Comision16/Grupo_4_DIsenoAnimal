const { body } = require('express-validator');

module.exports = [
  body('nombre').isLength({ min: 4 }).withMessage("El nombre debe tener al menos 4 caracteres").bail()
  .isAlpha('es-ES',{ignore: ' '}).withMessage('Solo caracteres alfabéticos'),
  body('precio').isFloat({ gt: 0 }).withMessage('El precio debe ser mayor a 0.'),
  body('categoria').not().isEmpty().withMessage('Por favor, selecciona una categoría.'),
  body('stock').isInt({ gt: 0 }).withMessage('El stock debe ser un número mayor a 0.'),
  body('sabores').not().isEmpty().withMessage('Por favor, selecciona un sabor.'),
  body('descuento').optional().isInt({ max: 99 }).withMessage('El descuento debe ser un número entre 0 y 99.'),
  body('measure').not().isEmpty().withMessage('Por favor, selecciona una unidad de medida.'),
  body('value').isFloat({ gt: 0 }).withMessage('El valor debe ser mayor a 0.'),
  body('brand').isLength({ min: 2 }).withMessage('La marca debe tener al menos 2 caracteres.'),
  body('descripcion').isLength({ min: 30 }).withMessage('La descripción debe tener al menos 30 caracteres.')
]
