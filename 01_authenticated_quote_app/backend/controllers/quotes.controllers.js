import { AsyncHandler } from "../utils/AsyncHandler.js";

const getQuote = AsyncHandler(async (req, res, next) => {
  res.send("Quote controller working");
});

export { getQuote };
