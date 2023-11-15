module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    complexity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'matches',
    timestamps: false, // If you don't want Sequelize to manage createdAt and updatedAt columns
  })
  return Match
}

