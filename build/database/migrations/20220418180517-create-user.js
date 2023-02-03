'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role: {
        allowNull: false,
        type: Sequelize.ENUM('admin', 'user')
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      socialMedia: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      picture: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: 'https://mhpdoctor.com/wp-content/sabai/File/files/l_24e839fcb31a2d2ae79861b46482a8a8.png'
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
//# sourceMappingURL=20220418180517-create-user.js.map