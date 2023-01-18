import winston from 'winston'

const logger = winston.createLogger({
    level: "debug",
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.printf(({ level, message, timestamp, ...args }) => {
                    return `${timestamp} ${level}: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
                }),
            )
        })
    ]
});

export default logger;
