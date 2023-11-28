require('crypto').randomBytes(12, function(err, buffer) {
    var token = buffer.toString('hex');
    console.log(token, "=========")
});