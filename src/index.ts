import { v2 as cloudinary } from "cloudinary";
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config";

process.on("uncaughtException", error => {
    console.error(error);
    process.exit(1);
});

let server: Server;

async function bootstrap() {
    try {
        const { cloud_name, api_key, api_secret } = config.cloud;
        cloudinary.config({ cloud_name, api_key, api_secret });

        await mongoose.connect(config.database_url as string);
        console.log(`Database is connected successfully`);

        server = app.listen(config.port, () => {
            console.log(`Application listening on port ${config.port}`);
        });
    } catch (err) {
        console.error("Failed to connect database", err);
    }

    process.on("unhandledRejection", error => {
        if (server) {
            server.close(() => {
                console.error(error);
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
}

bootstrap();

process.on("SIGTERM", () => {
    console.log("SIGTERM is received");
    if (server) {
        server.close();
    }
});
