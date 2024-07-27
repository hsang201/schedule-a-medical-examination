'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('DoctorInfo', {
            //   doctorId: DataTypes.INTEGER,
            // priceId: DataTypes.STRING,
            // provinceId: DataTypes.STRING,
            // paymentId: DataTypes.STRING,
            // addressClinic: DataTypes.STRING,
            // nameClinic: DataTypes.STRING,
            // note: DataTypes.STRING,
            // count: DataTypes.STRING,
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            priceId: {
                type: Sequelize.STRING, allowNull: false,
            },
            provinceId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            paymentId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            addressClinic: {
                allowNull: false,
                type: Sequelize.STRING
            },
            nameClinic: {
                allowNull: false,
                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.STRING
            },
            count: {
                allowNull: false,
                type: Sequelize.INTEGER, defaultValue: 0
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
        await queryInterface.dropTable('DoctorInfo');
    }
};