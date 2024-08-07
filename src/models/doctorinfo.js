'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctorinfo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Doctorinfo.belongsTo(models.User, { foreignKey: 'doctorId' })

            Doctorinfo.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceTypeData' })
            Doctorinfo.belongsTo(models.Allcode, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceTypeData' })
            Doctorinfo.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentTypeData' })


        }
    };
    Doctorinfo.init({
        doctorId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Doctorinfo',
        freezeTableName: true
    });
    return Doctorinfo;
};