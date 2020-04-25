var express = require("express"),
    router = express.Router();

// request to get all the users
router.get("/", function (req, res) {

    res.redirect('http://localhost:3000/v');
})

// request to get all the users by userName
module.exports = router;