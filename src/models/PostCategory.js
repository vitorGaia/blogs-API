const PostCategorySchema = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'post_id',
        references: {
          model: 'blog_posts',
          key: 'id'
        }
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'category_id',
        references: {
          model: 'categories',
          key: 'id'
        }
      }
    }, { tableName: 'posts_categories', timestamps: false, underscored: true }
  );

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(
      models.BlogPost,
      {
        foreignKey: 'postId',
        as: 'blog_posts', 
        through: PostCategory,
        otherKey: 'categoryId'
      });
    
    models.BlogPost.belongsToMany(
      models.Category,
      {
        foreignKey: 'categoryId',
        as: 'categories',
        through: PostCategory,
        otherKey: 'postId'
      });
  };

  return PostCategory;
};

module.exports = PostCategorySchema;