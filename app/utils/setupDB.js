
const db = require("./database");

exports.setupDevUser = () => {
  /* Set up user - developer with 'Admin' role. */
  try {
    db.member
      .findOne({ where: { firstname: "dev" } })
      .then((user) => {
        if (!user) {
          //START
          db.sequelize.transaction(async function (transaction) {
            const role = await db.role.create(
              {
                name: "Admin"
              },
              { transaction }
            );

            const member = await db.member.create(
              {
                firstname: "dev",
                middlename: " ",
                lastname: " ",
                title: " ",
                gender: " ",
                maritalstatus: " ",
                dob: " ",
                phone: " ",
                email: " ",
                address: " ",
                occupation: " ",
                membertype: " ",
                passport: " "
              },
              { transaction }
            );

            await db.assignedRoles.create({
              member_id: member.member_id,
              roles: "Admin",
              active: "true"
            },
            { transaction })

            return member;
          });
          console.log("success");
          //END
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Unable to setup DEV role.",
        });
      });
  } catch (error) {
    console.log(error);
  }

  
};

exports.bulkInsertCountries = async() => {
/*Bulk insert countries of the world into the database*/
try {
    
 
 const num = await db.country.count();
  if (!num) {
    var countries = [
      { country: "Afghanistan" }, 
      { country: "Albania" }, 
      { country: "Algeria" }, 
      { country: "Andorra" }, 
      { country: "Angola" }, 
      { country: "Antigua and Barbuda" }, 
      { country: "Argentina" }, 
      { country: "Armenia " }, 
      { country: "Australia " }, 
      { country: "Austria " }, 
      { country: "Azerbaijan" }, 
      { country: "Bahamas " }, 
      { country: "Bahrain" }, 
      { country: "Bangladesh" }, 
      { country: "Barbados" }, 
      { country: "Belarus" }, 
      { country: "Belgium" }, 
      { country: "Belize " }, 
      { country: "Benin" }, 
      { country: "Bhutan" }, 
      { country: "Bolivia" }, 
      { country: "Bosnia and Herzegovina " }, 
      { country: "Botswana" }, 
      { country: "Brazil " }, 
      { country: "Brunei " }, 
      { country: "Bulgaria" }, 
      { country: "Burkina Faso" }, 
      { country: "Burundi " }, 
      { country: "Cabo Verde" }, 
      { country: "Cambodia" }, 
      { country: "Cameroon " }, 
      { country: "Canada " }, 
      { country: "Central African Republic  " }, 
      { country: "Chad" }, 
      { country: "Chile" }, 
      { country: "China " }, 
      { country: "Colombia" }, 
      { country: "Comoros" }, 
      { country: "Congo" }, 
      { country: "Costa" }, 
      { country: "Croatia" }, 
      { country: "Cuba" }, 
      { country: "Cyprus" }, 
      { country: "Czech Republic (Czechia)" }, 
      { country: "C??te d'Ivoire" }, 
      { country: "Denmark" }, 
      { country: "Djibouti" }, 
      { country: "Dominica" }, 
      { country: "Dominican Republic" }, 
      { country: "DR Congo" }, 
      { country: "Ecuador" }, 
      { country: "Egypt" }, 
      { country: "El Salvador" }, 
      { country: "Equatorial Guinea" }, 
      { country: "Eritrea" }, 
      { country: "Estonia" }, 
      { country: "Eswatini" }, 
      { country: "Ethiopia" }, 
      { country: "Fiji" }, 
      { country: "Finland" }, 
      { country: "France" }, 
      { country: "Gabon" }, 
      { country: "Gambia" }, 
      { country: "Georgia" }, 
      { country: "Germany" }, 
      { country: "Ghana" }, 
      { country: "Greece" }, 
      { country: "Grenada" }, 
      { country: "Guatemala" }, 
      { country: "Guinea" }, 
      { country: "Guinea-Bissau" }, 
      { country: "Guyana" }, 
      { country: "Haiti" }, 
      { country: "Holy See" }, 
      { country: "Honduras" }, 
      { country: "Hungary" }, 
      { country: "Iceland" }, 
      { country: "India" }, 
      { country: "Indonesia" }, 
      { country: "Iran" }, 
      { country: "Iraq" }, 
      { country: "Ireland" }, 
      { country: "Israel" }, 
      { country: "Italy" }, 
      { country: "Jamaica" }, 
      { country: "Japan" }, 
      { country: "Jordan" }, 
      { country: "Kazakhstan" }, 
      { country: "Kenya" }, 
      { country: "Kiribati" }, 
      { country: "Kuwait" }, 
      { country: "Kyrgyzstan" }, 
      { country: "Laos" }, 
      { country: "Latvia" }, 
      { country: "Lebanon" }, 
      { country: "Lesotho" }, 
      { country: "Liberia" }, 
      { country: "Libya" }, 
      { country: "Liechtenstein" }, 
      { country: "Lithuania" }, 
      { country: "Luxembourg" }, 
      { country: "Madagascar" }, 
      { country: "Malawi" }, 
      { country: "Malaysia" }, 
      { country: "Maldives" }, 
      { country: "Mali" }, 
      { country: "Malta" }, 
      { country: "Marshall Islands" }, 
      { country: "Mauritania" }, 
      { country: "Mauritius" }, 
      { country: "Mexico" }, 
      { country: "Micronesia" }, 
      { country: "Moldova" }, 
      { country: "Monaco" }, 
      { country: "Mongolia" }, 
      { country: "Montenegro" }, 
      { country: "Morocco" }, 
      { country: "Mozambique" }, 
      { country: "Myanmar" }, 
      { country: "Namibia" }, 
      { country: "Nauru" }, 
      { country: "Nepal" }, 
      { country: "Netherlands" }, 
      { country: "New Zealand" }, 
      { country: "Nicaragua" }, 
      { country: "Niger" }, 
      { country: "Nigeria" }, 
      { country: "North Korea" }, 
      { country: "North Macedonia" }, 
      { country: "Norway" }, 
      { country: "Oman" }, 
      { country: "Pakistan" }, 
      { country: "Palau" }, 
      { country: "Panama" }, 
      { country: "Papua New Guinea" }, 
      { country: "Paraguay" }, 
      { country: "Peru" }, 
      { country: "Philippines" }, 
      { country: "Poland" }, 
      { country: "Portugal" }, 
      { country: "Qatar" }, 
      { country: "Romania" }, 
      { country: "Russia" }, 
      { country: "Rwanda" }, 
      { country: "Saint Kitts & Nevis" }, 
      { country: "Saint Lucia" }, 
      { country: "Samoa" }, 
      { country: "San Marino" }, 
      { country: "Sao Tome & Principe" }, 
      { country: "Saudi Arabia" }, 
      { country: "Senegal" }, 
      { country: "Serbia" }, 
      { country: "Seychelles" }, 
      { country: "Sierra Leone" }, 
      { country: "Singapore" }, 
      { country: "Slovakia" }, 
      { country: "Slovenia" }, 
      { country: "Solomon Islands" }, 
      { country: "Somalia" }, 
      { country: "South Africa" }, 
      { country: "South Korea" }, 
      { country: "South Sudan" }, 
      { country: "Spain" }, 
      { country: "Sri Lanka" }, 
      { country: "St Vincent & Grenadines" }, 
      { country: "State of Palestine" }, 
      { country: "Sudan" }, 
      { country: "Suriname" }, 
      { country: "Sweden" }, 
      { country: "Switzerland" }, 
      { country: "Syria" }, 
      { country: "Tajikistan" }, 
      { country: "Tanzania" }, 
      { country: "Thailand" }, 
      { country: "Timor-Leste" }, 
      { country: "Togo" }, 
      { country: "Tonga" }, 
      { country: "Trinidad and Tobago" }, 
      { country: "Tunisia" }, 
      { country: "Turkey" }, 
      { country: "Turkmenistan" }, 
      { country: "Tuvalu" }, 
      { country: "Uganda" }, 
      { country: "Ukraine" }, 
      { country: "United Arab Emirates" }, 
      { country: "United Kingdom" }, 
      { country: "United States" }, 
      { country: "Uruguay" }, 
      { country: "Uzbekistan" }, 
      { country: "Vanuatu" }, 
      { country: "Venezuela" }, 
      { country: "Vietnam" }, 
      { country: "Yemen" }, 
      { country: "Zambia" }, 
      { country: "Zimbabwe" },
      ];
  
      db.country.bulkCreate(countries)
        .then(() => {
          console.log('Bulk insert for countries successful!');
        });
  }
  } catch (error) {
    console.log(error);
  }
};

exports.bulkInsertChristianQuotes = async() => {
  /*Bulk insert christian quotes into the database*/
  try{
    const quotes = await db.christianQuotes.count();
  if (!quotes) {
    var quoteInfo = [
      {quote_id:1, quote:'The LORD is my strength and my song; he has become my salvation. Glad songs of salvation are in the tents of the righteous: ???The right hand of the LORD does valiantly, the right hand of the LORD exalts, the right hand of the LORD does valiantly!', author:'~Psalm 118:14-16'},
      {quote_id:2, quote:'This is my comfort in my affliction, that your promise gives me life',author:'~Psalm 119:50'},
      {quote_id:3, quote:'Therefore encourage one another and build one another up, just as you are doing.',author:'~1 Thessalonians 5:11'} ,
      {quote_id:4, quote:'The name of the LORD is a strong tower; the righteous man runs into it and is safe.' ,author:'~Proverbs 18:10: '} ,
      {quote_id:5, quote:'My home is in heaven. I???m just traveling through this world.',author:'~Billy Graham'} ,
      {quote_id:6, quote:'This life was not intended to be the place of our perfection, but the preparation for it.' ,author:'~Richard Baxter'},
      {quote_id:7, quote:'Faith is taking the first step even when you don???t see the whole staircase.' ,author:'~Martin Luther King Jr'} ,
      {quote_id:8, quote:'Prayer puts God???s work in his hands and keeps it there.' ,author:'~E.M. Bound'}
      ];
  
      db.christianQuotes.bulkCreate(quoteInfo)
        .then(() => {
          console.log('Bulk insert for quotes successful!');
        });
  }

  }catch(error){
    console.log(error);
  }
}

exports.insertMinistries = async() => {
  /*Bulk insert christian quotes into the database*/
  try{
    const quotes = await db.christianQuotes.count();
  if (!quotes) {
    var quoteInfo = [
      {quote_id:1, quote:'The LORD is my strength and my song; he has become my salvation. Glad songs of salvation are in the tents of the righteous: ???The right hand of the LORD does valiantly, the right hand of the LORD exalts, the right hand of the LORD does valiantly!', author:'~Psalm 118:14-16'},
      {quote_id:2, quote:'This is my comfort in my affliction, that your promise gives me life',author:'~Psalm 119:50'},
      {quote_id:3, quote:'Therefore encourage one another and build one another up, just as you are doing.',author:'~1 Thessalonians 5:11'} ,
      {quote_id:4, quote:'The name of the LORD is a strong tower; the righteous man runs into it and is safe.' ,author:'~Proverbs 18:10: '} ,
      {quote_id:5, quote:'My home is in heaven. I???m just traveling through this world.',author:'~Billy Graham'} ,
      {quote_id:6, quote:'This life was not intended to be the place of our perfection, but the preparation for it.' ,author:'~Richard Baxter'},
      {quote_id:7, quote:'Faith is taking the first step even when you don???t see the whole staircase.' ,author:'~Martin Luther King Jr'} ,
      {quote_id:8, quote:'Prayer puts God???s work in his hands and keeps it there.' ,author:'~E.M. Bound'}
      ];
  
      db.christianQuotes.bulkCreate(quoteInfo)
        .then(() => {
          console.log('Bulk insert for quotes successful!');
        });
  }

  }catch(error){
    console.log(error);
  }
}
