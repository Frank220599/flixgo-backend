'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
    up: async (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('Users', [{
            email: 'example@gmail.com',
            firstName: 'Mr.',
            lastName: 'Frank',
            roleId: 1,
            password: await bcrypt.hash("111111", 12),
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
