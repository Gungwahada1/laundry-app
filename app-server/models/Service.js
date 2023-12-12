import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Service = db.define(
    "services",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        underscored: true,
        freezeTableName: true,
    }
);

export default Service;

(async () => {
    await db.sync();
})();
