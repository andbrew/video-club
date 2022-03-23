module.exports = (sequelize, type) => {
  const Member = sequelize.define('member', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    lastName: type.STRING,
    address: type.STRING,
    phone: type.STRING
  });
  return Member;
}
