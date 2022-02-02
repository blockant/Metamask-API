"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const dotenv = __importStar(require("dotenv"));
class Locals {
    /**
     * Makes env configs available for your app
     * throughout the app's runtime
     */
    static config() {
        dotenv.config({ path: path.join(__dirname, '../../.env') });
        const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
        const port = process.env.PORT || 4040;
        const mongooseUrl = process.env.MONGOOSE_URL;
        const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT || '50mb';
        const maxParameterLimit = process.env.APP_MAX_PARAMETER_LIMIT || '50mb';
        const name = process.env.APP_NAME || 'NFT Marketplace';
        const year = (new Date()).getFullYear();
        const copyright = `Copyright ${year} ${name} | All Rights Reserved`;
        const description = process.env.APP_DESCRIPTION || 'Here goes the app description';
        const isCORSEnabled = process.env.CORS_ENABLED || true;
        const jwtExpiresIn = process.env.JWT_EXPIRES_IN || 3;
        const apiPrefix = process.env.API_PREFIX || 'api';
        const logDays = process.env.LOG_DAYS || 20;
        const jwtSecretKey = process.env.JWT_SECRET_TOKEN_KEY;
        const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
        const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
        const twilioTestNumber = process.env.MY_NUMBER;
        const awsRegion = process.env.AWS_REGION;
        const awsAccessKey = process.env.SES_ACCESS_KEY;
        const awsSecretKey = process.env.SES_SECRET_KEY;
        const swtTokenAddress = process.env.SWT_TOKEN_ADDRESS;
        const tokenContractAddress = process.env.TOKEN_CONTRACT_ADDRESS;
        const handlerAddress = process.env.HANDLER_ADDRESS;
        const buyContractAddress = process.env.BUY_CONTRACT_ADDRESS;
        const SSL_CERT_PATH = process.env.SSL_CERT_PATH;
        const SSL_KEY_PATH = process.env.SSL_KEY_PATH;
        return {
            apiPrefix,
            copyright,
            description,
            isCORSEnabled,
            jwtExpiresIn,
            logDays,
            maxUploadLimit,
            maxParameterLimit,
            mongooseUrl,
            name,
            port,
            url,
            jwtSecretKey,
            twilioAccountSid,
            twilioAuthToken,
            twilioNumber,
            twilioTestNumber,
            awsAccessKey,
            awsRegion,
            awsSecretKey,
            swtTokenAddress,
            tokenContractAddress,
            handlerAddress,
            buyContractAddress,
            SSL_CERT_PATH,
            SSL_KEY_PATH
        };
    }
}
exports.default = Locals;
//# sourceMappingURL=Locals.js.map