module.exports  = (sequelize, Sequelize) => {
    const Country = sequelize.define("Country", {
        Country_id:{
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUID4
        },
        CountryName: {
            type: Sequelize.String(50)
        }
    });
    return Country;
}