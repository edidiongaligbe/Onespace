
const db = require("./app/utils/database");

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
                name: "Admin",
                comment: "Administrative Role",
              },
              { transaction }
            );

            await db.member.create(
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
                passport: " ",
                login_code: "111111",
                temp_role_holder: role.role_id,
              },
              { transaction }
            );

            return role;
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

exports.bulkInsertCountries = () => {
/*Bulk insert countries of the world into the database*/
try {
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
    { country: "Côte d'Ivoire" }, 
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
    
  } catch (error) {
    console.log(error);
  }
};
