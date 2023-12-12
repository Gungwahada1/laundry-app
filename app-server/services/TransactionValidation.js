import joi from "joi";

class TransactionValidation {
    static createTransaction(data) {
        const createSchema = joi.object({
            id_employee: joi.number().required(),
            id_customer: joi.number().required(),
            id_service: joi.number().required(),
            weight: joi.number().required(),
            state: joi.string().required(),
            receipt_date: joi.date().required(),
            pickup_date: joi.date().required(),
            testimonial: joi.string(),
        });
        return createSchema.validate(data);
    }

    static updateTransaction(data) {
        const updateSchema = joi.object({
            id_employee: joi.number(),
            id_customer: joi.number(),
            id_service: joi.number(),
            weight: joi.number(),
            state: joi.string(),
            receipt_date: joi.date(),
            pickup_date: joi.date(),
            testimonial: joi.string(),
        });
        return updateSchema.validate(data);
    }
}

export default TransactionValidation;
