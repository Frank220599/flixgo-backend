'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const roles = ['Admin', 'Moderator', 'User'];
        await roles.map(async (name, index) =>
            await Role.create({name}));
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
    }
};
