import {
    createLogger,
    format,
    transports
} from 'winston';

const {
    combine,
    timestamp,
    printf,
    colorize
} = format;

const customFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
});

export const logger = createLogger({
    level: 'info',
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'dist/logs/error.log', level: 'error' }),
        new transports.File({ filename: 'dist/logs/combined.log' })
    ],
    exceptionHandlers: [
        new transports.File({ filename: 'dist/logs/exceptions.log' })
    ],
    rejectionHandlers: [
        new transports.File({ filename: 'dist/logs/rejections.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.simple(),
    }));
}
