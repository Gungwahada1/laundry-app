import { DATE, DataTypes, Deferrable } from "sequelize";
import db from "../config/Database.js";
import Employee from "./Employee.js";
import Customer from "./Customer.js";
import Service from "./Service.js";

const Transaction = db.define(
    "transactions",
    {
        no_transaction: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        id_employee: {
            type: DataTypes.INTEGER,
            references: {
                model: Employee,
                key: "id",
                deferrable: Deferrable.INITIALLY_IMMEDIATE,
            },
            allowNull: false,
        },
        id_customer: {
            type: DataTypes.INTEGER,
            references: {
                model: Customer,
                key: "id",
                deferrable: Deferrable.INITIALLY_IMMEDIATE,
            },
            allowNull: false,
        },
        id_service: {
            type: DataTypes.INTEGER,
            references: {
                model: Service,
                key: "id",
                deferrable: Deferrable.INITIALLY_IMMEDIATE,
            },
            allowNull: false,
        },
        weight: {
            type: DataTypes.FLOAT(2),
            allowNull: false,
        },
        total_price: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        state: {
            type: DataTypes.ENUM,
            values: ["pending", "diproses", "selesai"],
            allowNull: false,
        },
        receipt_date: {
            type: DATE,
            allowNull: false,
        },
        pickup_date: {
            type: DATE,
            allowNull: false,
        },
        testimonial: {
            type: DataTypes.TEXT,
        },
    },
    {
        underscored: true,
        freezeTableName: true,
    }
);

// Associations
Transaction.belongsTo(Employee, { foreignKey: "id_employee", as: "employee" });
Transaction.belongsTo(Customer, { foreignKey: "id_customer", as: "customer" });
Transaction.belongsTo(Service, { foreignKey: "id_service", as: "service" });

export default Transaction;

// (async () => {
//     await db.sync({force:true});
// })();
