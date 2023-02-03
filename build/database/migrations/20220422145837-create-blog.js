'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Blogs', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.UUID
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      body: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      categories: {
        allowNull: false,
        type: Sequelize.ENUM('BackEnd', 'FrontEnd', 'MobileDev', 'DevOps', 'Others')
      },
      tags: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      // largeImage: {
      //   allowNull: true,
      //   type: Sequelize.STRING,
      //   defaultValue: 'https://mhpdoctor.com/wp-content/sabai/File/files/l_24e839fcb31a2d2ae79861b46482a8a8.png'
      // },
      // thumNailImage: {
      //   allowNull: true,
      //   type: Sequelize.STRING,
      //   defaultValue: 'https://mhpdoctor.com/wp-content/sabai/File/files/l_24e839fcb31a2d2ae79861b46482a8a8.png'
      // },
      isPublished: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Blogs');
  }

};
//# sourceMappingURL=20220422145837-create-blog.js.map