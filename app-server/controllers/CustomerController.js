// Model
import Customers from "../models/Customer.js";

// Validation
import CustomerValidation from "../services/CustomerValidation.js";

const getAllCustomers = async (req, res) => {
    try {
        // const customers = await Customers.findAll();
        const customers = await Customers.findAll({
            attributes: ["name", "no_telp", "email"],
        });
        res.status(200).json({
            success: true,
            status: 200,
            message: "Berhasil get data",
            customers,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const customer = await Customers.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!customer)
            return res
                .status(404)
                .json({ message: "Tidak ada ID yang ditentukan!" });

        res.status(200).json({
            name: customer.name,
            no_telp: customer.no_telp,
            email: customer.email,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const createCustomer = async (req, res) => {
    try {
        const { error } = CustomerValidation.createCustomer(req.body);

        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const { name, no_telp, email } = req.body;

        await Customers.create({
            name,
            no_telp,
            email,
        });

        res.status(201).json({
            success: true,
            message: "Berhasil tambah data",
            new_customer: { name, no_telp, email },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateCustomer = async (req, res) => {
    const customer = await Customers.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!customer)
        return res
            .status(404)
            .json({ message: "Tidak ada ID yang ditentukan!" });

    try {
        const { error } = CustomerValidation.updateCustomer(req.body);

        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const updateCustomer = await Customers.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (updateCustomer === 0)
            return res
                .status(404)
                .json({ message: "Tidak ada ID yang ditentukan!" });

        res.status(201).json({
            success: true,
            message: "Berhasil perbaharui data",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const deleteCustomer = async (req, res) => {
    const customer = await Customers.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!customer)
        return res
            .status(404)
            .json({ message: "Tidak ada ID yang ditentukan!" });

    try {
        const deleteCustomer = await Customers.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (deleteCustomer === 0)
            return res
                .status(404)
                .json({ message: "Tidak ada ID yang ditentukan!" });

        res.status(200).json({
            success: true,
            message: "Berhasil delete data",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export default {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};
