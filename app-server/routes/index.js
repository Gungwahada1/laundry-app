import express from "express";

// Import controllers
import AuthController from "../controllers/AuthController.js";
import CustomerController from "../controllers/CustomerController.js";
import EmployeeController from "../controllers/EmployeeController.js";
import ServiceController from "../controllers/ServiceController.js";
import TransactionController from "../controllers/TransactionController.js";

const router = express.Router();

router.get("/", function (req, res) {
    res.json("Hello, welcome to Laundry App!");
});

// Authentication routes
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/refresh-token", AuthController.refreshToken);

// Customer routes
router.get("/customers", CustomerController.getAllCustomers);
router.get("/customers/:id", CustomerController.getCustomerById);
router.post("/customers", CustomerController.createCustomer);
router.patch("/customers/:id", CustomerController.updateCustomer);
router.delete("/customers/:id", CustomerController.deleteCustomer);

// Employee routes
router.get("/employees", EmployeeController.getAllEmployees);
router.get("/employees/:id", EmployeeController.getEmployeeById);
router.post("/employees", EmployeeController.createEmployee);
router.patch("/employees/:id", EmployeeController.updateEmployee);
router.delete("/employees/:id", EmployeeController.deleteEmployee);

// Service routes
router.get("/services", ServiceController.getAllServices);
router.post("/services", ServiceController.createService);
router.patch("/services/:id", ServiceController.updateService);
router.delete("/services/:id", ServiceController.deleteService);

// Transaction routes
router.get("/transactions", TransactionController.getAllTransactions);
router.get("/transactions/:id", TransactionController.getTransactionById);
router.post("/transactions", TransactionController.createTransaction);
router.patch("/transactions/:id", TransactionController.updateTransaction);
router.delete("/transactions/:id", TransactionController.deleteTransaction);
// Transaction Receipt routes
router.get("/transactions/receipt", TransactionController.getReceipt);

export default router;
