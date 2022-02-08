module.exports  = (sequelize, Sequelize) => {
    const Country = sequelize.define("countries", {
        country_id:{
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        country: {
            type: Sequelize.STRING(50)
        }
    });
    return Country;
}
