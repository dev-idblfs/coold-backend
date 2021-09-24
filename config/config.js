const MAIL_AUTH = {
    auth: {
        user: "hr@onxcy.com",
        pass: "GoalWebsite@2020.",
    },
};
// const dbString = "mongodb://127.0.0.1:27017/";
const dbString = `mongodb+srv://onxcy_node_2020:XywdDx4BJQS7TVa@cluster0.hc6sh.mongodb.net/`;

module.exports = {
    dbString,
    MAIL_AUTH,
    ...require("./constants"),
};
