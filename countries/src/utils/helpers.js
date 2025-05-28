/** @format */
const celcToFahr = (temp) => {
  return (temp * 9.0) / 5.0 + 32.0;
};

const mpsToMph = (mps) => {
  return mps * 2.23694;
};

const simplifyCapitalName = (name) => {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export default { celcToFahr, mpsToMph, simplifyCapitalName };
