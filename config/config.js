const MAIL_AUTH = {
    auth: {
        user: "hr@coold.com",
        pass: "GoalWebsite@2020.",
    },
};

const OY_ENV = process.env.NODE_ENV || "development";

module.exports = {
    MAIL_AUTH,
    ...require("./constants"),
    ...require("./" + OY_ENV + "/constants"),
};
