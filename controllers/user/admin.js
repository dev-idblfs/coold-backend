var express = require("express"),
    router = express.Router();

// array to hold users
const users = [{firstName:"fnam1",lastName:"lnam1",userName:"username1"}];

// request to get all the users
router.get("/", function(req, res) {
    res.send(users);
})

// request to get all the users by userName
module.exports = router;