const MAIL_AUTH = {
    auth: {
        user: "hr@onxcy.com",
        pass: "GoalWebsite@2020.",
    },
};
const dbString = "mongodb://127.0.0.1:27017/";

module.exports = {
    dbString,
    MAIL_AUTH,
    ...require("./constants"),
};
