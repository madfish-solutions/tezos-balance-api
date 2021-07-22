import pino from "pino";
import pinoHttp from "pino-http";
import { logger } from "../system/logger";

export const PORT = process.env.SERVER_PORT ?? "3000";
export const HOST = process.env.SERVER_HOST ?? "0.0.0.0";

const serializers: {
  [key: string]: pino.SerializerFn;
} = {
  req: (req) => ({
    method: req.method,
    url: req.url,
    body: req.body,
    remoteAddress: req.remoteAddress,
    remotePort: req.remotePort,
    id: req.id,
  }),
  err: (err) => {
    const { type, message } = pino.stdSerializers.err(err);
    return { type, message };
  },
  res: (res) => ({
    statusCode: res.statusCode,
  }),
};

export const PINO_LOGGER: pinoHttp.Options = {
  logger: (logger.child as any)({ name: "web" }, { serializers }),
  wrapSerializers: false,
};
