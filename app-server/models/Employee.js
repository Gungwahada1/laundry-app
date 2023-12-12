import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Employee = db.define(
    "employees",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        no_telp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        role: {
            type: DataTypes.ENUM,
            values: ["Admin", "Karyawan"],
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 8,
            },
        },
        refresh_token: {
            type: DataTypes.STRING,
        },
    },
    {
        underscored: true,
        freezeTableName: true,
    }
);

export default Employee;

(async () => {
    await db.sync();
})();
