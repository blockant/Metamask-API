"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const Logger_1 = __importDefault(require("./providers/Logger"));
const Morgan_1 = __importDefault(require("./middlewares/Morgan"));
// Importing Routes
const index_1 = __importDefault(require("./routes/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Database.init()
// Start All Cron Jobs
// CronJobs.initCrons()
// Configure Express to use EJS
app.use(express_1.default.json({ limit: '3mb' }));
app.use(express_1.default.urlencoded({ limit: '3mb', extended: true }));
app.use(Morgan_1.default);
app.use((0, cors_1.default)());
app.get("/health", (req, res) => {
    return res.status(200).json({ message: "Service Running" });
});
app.use('/api/v1', index_1.default);
app.listen(process.env.PORT, () => {
    Logger_1.default.info(`server started at http://localhost:${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map