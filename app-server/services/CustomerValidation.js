import joi from "joi";

class CustomerValidation {
    static createCustomer(data) {
        const createSchema = joi.object({
            name: joi.string().required(),
            no_telp: joi.string().required(),
            email: joi.string().email().required(),
        });
        return createSchema.validate(data);
    }

    static updateCustomer(data) {
        const updateSchema = joi.object({
            name: joi.string(),
            no_telp: joi.string(),
            email: joi.string().email(),
        });
        return updateSchema.validate(data);
    }
}

export default CustomerValidation;
