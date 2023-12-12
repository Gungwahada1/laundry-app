import bcrypt from "bcrypt";

// Model
import Employees from "../models/Employee.js";

// Validation
import EmployeeValidation from "../services/EmployeeValidation.js";
import Employee from "../models/Employee.js";

const getAllEmployees = async (req, res) => {
    try {
        // const employees = await Employees.findAll();
        const employees = await Employees.findAll({
            attributes: ["id", "name", "no_telp", "username", "role", "email"],
        });
        res.status(200).json({
            success: true,
            status: 200,
            message: "Berhasil get data",
            employees,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employees.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!employee)
            return res
                .status(404)
                .json({ message: "Tidak ada ID yang ditentukan!" });

        res.status(200).json({
            name: employee.name,
            no_telp: employee.no_telp,
            username: employee.username,
            role: employee.role,
            email: employee.email,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const createEmployee = async (req, res) => {
    try {
        const { error } = EmployeeValidation.createEmployee(req.body);

        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const { name, no_telp, username, role, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await Employees.create({
            name,
            no_telp,
            username,
            role,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: "Berhasil tambah data",
            new_employee: { name, no_telp, username, role, email },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateEmployee = async (req, res) => {
    const employee = await Employees.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!employee)
        return res
            .status(404)
            .json({ message: "Tidak ada ID yang ditentukan!" });

    try {
        const { error } = EmployeeValidation.updateEmployee(req.body);

        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const updateEmployee = await Employees.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (updateEmployee === 0)
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

const deleteEmployee = async (req, res) => {
    const employee = await Employees.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!employee)
        return res
            .status(404)
            .json({ message: "Tidak ada ID yang ditentukan!" });

    try {
        const deleteEmployee = await Employees.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (deleteEmployee === 0)
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
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
