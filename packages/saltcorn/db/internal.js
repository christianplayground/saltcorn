//https://stackoverflow.com/questions/15300704/regex-with-my-jquery-function-for-sql-variable-name-validation
const sqlsanitize = nm => nm.replace(/\W/g, "");

const whereClause = (kv, i) =>
  typeof kv[1].in !== "undefined"
    ? `${sqlsanitize(kv[0])} = ANY ($${i + 1})`
    : `${sqlsanitize(kv[0])}=$${i + 1}`;

const getVal = kv => (typeof kv[1].in !== "undefined" ? kv[1].in : kv[1]);

const mkWhere = whereObj => {
  const wheres = whereObj ? Object.entries(whereObj) : [];
  const where =
    whereObj && wheres.length > 0
      ? "where " + wheres.map(whereClause).join(" and ")
      : "";
  const values = wheres.map(getVal);
  return { where, values };
};

const fkeyPrefix = "Key to ";

module.exports = {
  sqlsanitize,
  mkWhere,
  fkeyPrefix
};