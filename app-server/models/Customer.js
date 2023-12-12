import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Customer = db.define(
    "customers",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        no_telp: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            email: true,
        },
    },
    {
        underscored: true,
        freezeTableName: true,
    }
);

export default Customer;

// When model called, do synchronization
(async () => {
    await db.sync();
})();