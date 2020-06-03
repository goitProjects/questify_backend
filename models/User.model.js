const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const CONFIG = require("../config/config");

const UserSchema = new Schema(
  {
    nickname: {
      type: String,
      required: [true, "Nickname is required."],
      unique: true,
      lowercase: true
    },
    shortNickname: {
      type: String
    },
    dashboard: {
      type: Schema.Types.ObjectId,
      ref: "Dashboard"
    },
    token: String
  },
  {
    timestamps: true
  }
);

UserSchema.methods.getJWT = async function() {
  const token = jwt.sign(
    {
      id: this._id
    },
    CONFIG.jwtSecretKey,
    {
      expiresIn: parseInt(CONFIG.jwtExpiration)
    }
  );
  const self = this;

  self.token = token;
  await self.save();
  return token;
};

UserSchema.methods.toWeb = function() {
  let json = this.toJSON();
  json.id = this._id; //this is for the front end
  return json;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
