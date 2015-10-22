var mongoose = require('mongoose');


mongoose.connect('mongodb://' + require('cfenv').bind + '/test' )

module.exports = router;
