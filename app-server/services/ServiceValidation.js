import joi from "joi";

class ServiceValidation {
    static createService(data) {
        const createSchema = joi.object({
            name: joi.string().required(),
            price: joi.number().required(),
            unit: joi.string().required(),
        });
        return createSchema.validate(data);
    }

    static updateService(data) {
        const updateSchema = joi.object({
            name: joi.string(),
            price: joi.number(),
            unit: joi.string(),
        });
        return updateSchema.validate(data);
    }
}

export default ServiceValidation;
