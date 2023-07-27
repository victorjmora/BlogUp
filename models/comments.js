const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
    date_created: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    blog_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'blog',
            key: 'id',
            },
    }
  },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'project',
}
    );

module.exports = Blog;
