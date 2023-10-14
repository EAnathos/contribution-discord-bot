module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "users",
    {
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      contributionPoint: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      allContributionPoint: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      lang: {
        type: DataTypes.CHAR(2),
        defaultValue: 'fr',
        allowNull: false,
      }
    },
    {
      timestamps: false,
    }
  );
};
