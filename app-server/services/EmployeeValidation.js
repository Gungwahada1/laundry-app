import joi from "joi";

class EmployeeValidation {
    static createEmployee(data) {
        const createSchema = joi.object({
            name: joi.string().required(),
            no_telp: joi.string().required(),
            username: joi.string().required(),
            role: joi.string().required().valid("Admin", "Karyawan"),
            email: joi.string().email().required(),
            password: joi
                .string()
                .required()
                .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        });
        return createSchema.validate(data);
    }

    static updateEmployee(data) {
        const updateSchema = joi.object({
            name: joi.string(),
            no_telp: joi.string(),
            username: joi.string(),
            role: joi.string().valid("Admin", "Karyawan"),
            email: joi.string().email(),
            password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        });
        return updateSchema.validate(data);
    }
}

export default EmployeeValidation;
