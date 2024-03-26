const db = require('../../database/models')

const isAvailable = async (fechaYHora) => {
    try {
        const fecha = db.Booking.findOne({
            where : {
                date_and_time : {
                    [Op.like]: fechaYHora
                }
            }
        })
    } catch (error) {
        
    }
}


module.exports = {
    isAvaible
}