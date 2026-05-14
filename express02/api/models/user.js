import argon2 from "argon2";

const getUserModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { notEmpty: true },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { notEmpty: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true, len: [8, 255] },
    },
  });

  User.addHook("beforeCreate", async (user) => {
    user.password = await user.generatePasswordHash();
  });

  User.addHook("beforeUpdate", async (user) => {
    if (user.changed("password")) {
      user.password = await user.generatePasswordHash();
    }
  });

  User.prototype.generatePasswordHash = async function () {
    return await argon2.hash(this.password);
  };

  User.prototype.validatePassword = async function (rawPassword) {
    return await argon2.verify(this.password, rawPassword);
  };

  User.findByLogin = async (login) => {
    let user = await User.findOne({ where: { username: login } });
    if (!user) {
      user = await User.findOne({ where: { email: login } });
    }
    return user;
  };

  User.associate = (models) => {
    User.hasMany(models.Message, { onDelete: "CASCADE" });
    User.hasMany(models.RefreshToken, { onDelete: "CASCADE" });
  };

  return User;
};

export default getUserModel;
