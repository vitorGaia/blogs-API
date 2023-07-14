'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'posts_categories',
      {
        post_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'blog_posts',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          primaryKey: true,
        },
        category_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'categories',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          primaryKey: true,
        },
      },
      { tableName: 'posts_categories', timestamps: false, underscored: true }
    )
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('posts_categories')
  }
};
