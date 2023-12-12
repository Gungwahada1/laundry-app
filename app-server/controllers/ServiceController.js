// Model
import Services from "../models/Service.js";

// Validation
import ServiceValidation from "../services/ServiceValidation.js";

const getAllServices = async (req, res) => {
    try {
        const services = await Services.findAll();
        res.status(200).json({
            success: true,
            status: 200,
            message: "Berhasil get data",
            services,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const createService = async (req, res) => {
    try {
        const { error } = ServiceValidation.createService(req.body);

        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const { name, price, unit } = req.body;

        await Services.create({
            name,
            price,
            unit,
        });

        res.status(201).json({
            success: true,
            message: "Berhasil tambah data",
            new_service: { name, price, unit },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateService = async (req, res) => {
    const service = await Services.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!service)
        return res
            .status(404)
            .json({ message: "Tidak ada ID yang ditentukan!" });

    try {
        const { error } = ServiceValidation.updateService(req.body);

        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const updateService = await Services.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (updateService === 0)
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

const deleteService = async (req, res) => {
    const service = await Services.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!service)
        return res
            .status(404)
            .json({ message: "Tidak ada ID yang ditentukan!" });

    try {
        const deleteService = await Services.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (deleteService === 0)
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

export default { getAllServices, createService, updateService, deleteService };
