const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    facebookId: {
      type: String
    },
    profileImgPath: {
      type: String
    },
    profileImgName: {
      type: String
    },
    imageId: {
      type: String
    },
    mapLayer: {
      type: Array
    },
    url: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
