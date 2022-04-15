module.exports = (sequelize, Sequelize) =>{
    const HouseFellowshipVisitor = sequelize.define("house_fellowship_visitor", {
        visitor_id:{
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        name: {
            type: Sequelize.STRING(125),
            allowNull: true,
        },
        phone: {
            type: Sequelize.STRING(125),
            allowNull: true,
        },
        address: {
            type: Sequelize.STRING(250),
            allowNull: true,
        },
        reportDate: {
            type: Sequelize.STRING(125),
            allowNull: true,
        }, 
    });
    return HouseFellowshipVisitor;
}