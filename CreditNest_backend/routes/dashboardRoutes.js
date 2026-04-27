const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");
const { calculateScore } = require("../controllers/dashboardController");



// Protect all routes
router.use(authMiddleware);
router.get("/loan-score", dashboardController.calculateScore);
router.get("/reports", dashboardController.getReports);

// Example: Business Profile
router.post("/business-profile", dashboardController.saveBusinessProfile);
router.get("/business-profile", dashboardController.getBusinessProfile);

// Add other dashboard routes similarly...
router.post("/management", dashboardController.saveManagement);
router.get("/management", dashboardController.getManagement);

router.post("/financial-health", dashboardController.saveFinancialHealth);
router.get("/financial-health", dashboardController.getFinancialHealth);

router.post("/cashflow", dashboardController.saveCashflow);
router.get("/cashflow", dashboardController.getCashflow);

router.post("/credit-history", dashboardController.saveCreditHistory);
router.get("/credit-history", dashboardController.getCreditHistory);

router.post("/banking", dashboardController.saveBankingBehaviour);
router.get("/banking", dashboardController.getBankingBehaviour);

router.post("/collateral", dashboardController.saveCollateral);
router.get("/collateral", dashboardController.getCollateral);

module.exports = router;