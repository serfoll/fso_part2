/** @format */

const normalizeNumber = (num) => num.replace(/\D/g, "");

const errorMsg = (error) => {
  console.log(error.message);
  let msg = error.message.split(":");

  msg.map((m, i) =>
    m.includes("`name`") && m.includes(".,")
      ? (msg = `${
          m.split(".,")[0].split("Path `name`")[
            m.split(".,")[0].split("Path `name`").length - 1
          ]
        }!`)
      : i === msg.length - 1
      ? (msg = m.split("Path (number)")[m.split("Path (number)").length - 1])
      : m
  );

  return msg;
};

export default { normalizeNumber, errorMsg };
