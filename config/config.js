require("dotenv").config(); //instatiate environment variables

CONFIG = {}; //Make this global to use all over the application

CONFIG.app = process.env.APP || "development";
CONFIG.port = process.env.PORT || "3000";

CONFIG.db_dialect = process.env.DB_DIALECT || "mongo";
CONFIG.db_url = process.env.DB_URL;

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || "jwt_please_change";
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || "10000";
