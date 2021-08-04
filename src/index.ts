import "dotenv/config";
import "express-async-errors";

import "./web/server";

import BigNumber from "bignumber.js";

BigNumber.config({ DECIMAL_PLACES: 36 });
