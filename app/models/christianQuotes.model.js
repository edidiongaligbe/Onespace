module.exports  = (sequelize, Sequelize) => {
    const ChristainQuotes = sequelize.define("christian_quotes", {
        quote_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        quote: {
            type: Sequelize.STRING(500)
        }, 
        author: {
            type: Sequelize.STRING(50)
        }
    });
    return ChristainQuotes;
}
