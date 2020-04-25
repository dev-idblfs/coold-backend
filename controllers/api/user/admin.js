var express = require("express"),
    router = express.Router();

// request to get all the users
router.get("/", function(req, res) {
    res.send("thiss si free URL");
})

// request to get all the users by userName
module.exports = router;