import moment from "moment";

// Models
import Customers from "../models/Customer.js";
import Employees from "../models/Employee.js";
import Services from "../models/Service.js";
import Transactions from "../models/Transaction.js";

// Validation
import TransactionValidation from "../services/TransactionValidation.js";

const getAllTransactions = async (req, res) => {
    try {
        // const transactions = await Transactions.findAll();
        const transactions = await Transactions.findAll({
            attributes: [
                "no_transaction",
                "id_employee",
                "id_customer",
                "id_service",
                "weight",
                "total_price",
                "state",
                "testimonial",
                "receipt_date",
                "pickup_date",
            ],
        });
        res.status(200).json({
            success: true,
            status: 200,
            message: "Berhasil get data",
            transactions,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transactions.findByPk(req.params.id, {
            // Get value from foreign id Models
            include: [
                {
                    model: Employees,
                    as: "employee",
                    attributes: ["id", "name", "no_telp", "role", "email"],
                },
                {
                    model: Customers,
                    as: "customer",
                    attributes: ["id", "name", "no_telp", "email"],
                },
                {
                    model: Services,
                    as: "service",
                    attributes: ["id", "name", "price", "unit"],
                },
            ],
        });

        if (transaction == null) {
            return res
                .status(404)
                .json({ message: "Tidak ada ID yang ditentukan!" });
        } else {
            res.status(200).json({
                no_transaction: transaction.no_transaction,
                employee: transaction.employee
                    ? transaction.employee.toJSON()
                    : null,
                customer: transaction.customer
                    ? transaction.customer.toJSON()
                    : null,
                service: transaction.service
                    ? transaction.service.toJSON()
                    : null,
                weight: transaction.weight,
                total_price: transaction.total_price,
                state: transaction.state,
                testimonial: transaction.testimonial,
                receipt_date: transaction.receipt_date,
                pickup_date: transaction.pickup_date,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const createTransaction = async (req, res) => {
    try {
        const { error } = TransactionValidation.createTransaction(req.body);

        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const {
            id_employee,
            id_customer,
            id_service,
            weight,
            state,
            receipt_date,
            pickup_date,
            testimonial,
        } = req.body;

        // Get price from service
        const service = await Services.findByPk(id_service);
        const totalPrice = service.price * weight;

        // Counting all transaction
        const countTransactions = await Transactions.count();
        let nextTransactionNumber = 1;

        // If transaction is null, start with code 00001
        if (countTransactions === 0) {
            nextTransactionNumber = 1;
        } else {
            // Get transaction number from db filter by DESCENDING
            const lastTransaction = await Transactions.findOne({
                order: [["no_transaction", "DESC"]],
                attributes: ["no_transaction"],
            });

            const lastNumber = parseInt(
                lastTransaction.no_transaction.substr(-5)
            );
            nextTransactionNumber = lastNumber + 1;
        }

        // Create new transaction number
        const currentDate = moment().format("YYMMDDHHmmss");
        const no_transaction = `TRXDRY${currentDate}${String(
            nextTransactionNumber
        ).padStart(5, "0")}`;

        const transaction = await Transactions.create({
            no_transaction,
            id_employee,
            id_customer,
            id_service,
            weight,
            total_price: totalPrice,
            state,
            receipt_date,
            pickup_date,
            testimonial,
        });

        res.status(201).json({
            success: true,
            message: "Berhasil tambah data",
            new_transaction: transaction,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateTransaction = async (req, res) => {
    try {
        const { error } = TransactionValidation.updateTransaction(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const allowedUpdates = [
            "id_employee",
            "id_customer",
            "id_service",
            "weight",
            "state",
            "receipt_date",
            "pickup_date",
            "testimonial",
        ];

        const updates = Object.keys(req.body);
        const isValidOperation = updates.every((update) =>
            allowedUpdates.includes(update)
        );

        if (!isValidOperation) {
            return res.status(400).json({ message: "Pembaharuan gagal!" });
        }

        const transactionId = req.params.id;
        const transaction = await Transactions.findByPk(transactionId);

        if (!transaction) {
            return res
                .status(404)
                .json({ message: "ID Transaksi tidak ditemukan!" });
        }

        const service = await Services.findByPk(transaction.id_service);

        if (!service) {
            return res
                .status(404)
                .json({ message: "ID Layanan tidak ditemukan!" });
        }

        // Check if id_service or weight is being updated
        const serviceIdUpdated = updates.includes("id_service");
        const weightUpdated = updates.includes("weight");

        let totalPrice = transaction.total_price;

        if (serviceIdUpdated || weightUpdated) {
            const newServiceId = req.body.id_service || transaction.id_service;
            const newWeight = req.body.weight || transaction.weight;

            const newService = await Services.findByPk(newServiceId);

            if (!newService) {
                return res
                    .status(404)
                    .json({ message: "ID Layanan Baru tidak ditemukan!" });
            }

            totalPrice = newService.price * newWeight;
        }

        // Update transaction attributes
        updates.forEach((update) => {
            transaction[update] = req.body[update];
        });

        transaction.total_price = totalPrice;

        await transaction.save();

        res.status(200).json({
            success: true,
            message: "Transaksi berhasil diperbaharui!",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;

        const transaction = await Transactions.findByPk(transactionId);

        if (!transaction) {
            return res
                .status(404)
                .json({ message: "ID Transaksi tidak ditemukan!" });
        }

        await Transactions.destroy({
            where: {
                id: transactionId,
            },
        });

        res.status(200).json({
            success: true,
            message: "Transaksi berhasil dihapus!",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getReceipt = async (req, res) => {};

export default {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getReceipt,
};
