module.exports = (sequelize, Sequelize) => {
  const Member = sequelize.define("members", {
    member_id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    firstname: {
      type: Sequelize.STRING(125),
    },
    middlename: {
      type: Sequelize.STRING(125),
      allowNull: true,
    },
    lastname: {
      type: Sequelize.STRING(125),
      allowNull: true,
    },
    title: {
      type: Sequelize.STRING(125),
      allowNull: true,
    },
    gender: {
      type: Sequelize.STRING(125),
      allowNull: true,
    },
    maritalstatus: {
      type: Sequelize.STRING(125),
      allowNull: true,
    },
    dob: {
      type: Sequelize.STRING(125),
      allowNull: true,
    },
    phone: {
      type: Sequelize.STRING(125),
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING(125),
      allowNull: true,
    },

    address: {
      type: Sequelize.STRING(250),
      allowNull: true,
    },
    occupation: {
      type: Sequelize.STRING(125),
      allowNull: true,
    },
    membertype: {
      type: Sequelize.STRING(120),
      allowNull: true,
    },
    passport: {
      type: Sequelize.STRING(150),
      allowNull: true,
    },
    previousChurchNameAndAddress: {
      type: Sequelize.STRING(150),
      allowNull: true,
    },
    previousChurchMembershipStatus: {
      type: Sequelize.STRING(10),
      allowNull: true,
    },
    baptised: {
      type: Sequelize.STRING(10),
      allowNull: true,
    },
    baptismDate: {
      type: Sequelize.STRING(150),
      allowNull: true,
    },
    baptismChurch: {
      type: Sequelize.STRING(150),
      allowNull: true,
    },
    emergencyContactName: {
      type: Sequelize.STRING(150),
      allowNull: true,
    },
    emergencyContactPhone: {
      type: Sequelize.STRING(150),
      allowNull: true,
    },
    emergencyContactRelationship: {
      type: Sequelize.STRING(150),
      allowNull: true,
    },
    login_code: {
      type: Sequelize.STRING(10),
      allowNull: true,
    }
  });

  return Member;
};
