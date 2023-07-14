const CategorySchema = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    { tableName: 'categories', timestamps: false, underscored: true }
  );

  return Category;
};

module.exports = CategorySchema;