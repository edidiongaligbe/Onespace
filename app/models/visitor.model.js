

module.exports = (sequelize, Sequelize) =>{
    const Visitor = sequelize.define("visitor", {
        visitor_id:{
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        }, 
        phone: {
            type: Sequelize.STRING(125),
            allowNull: true,
        },
        address: {
            type: Sequelize.STRING(250),
            allowNull: true,
        },
    });
    return Visitor;
}