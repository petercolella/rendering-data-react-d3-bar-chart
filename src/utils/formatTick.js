import { format } from "d3";

const tickFormatFunction = (n) => {
  const tickValue = format(".2s")(n);
  return n >= 1e9 ? tickValue.replace("G", "B") : tickValue;
};

export default tickFormatFunction;
