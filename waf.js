module.exports = function (req,res, next) {

    const attackPatterns = {
        sqlInjection: /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|OR|AND)\b\s*.*['"]?\s*=|--|;)/gi,
        xss: /(<script>|<\/script>|on\w+=|javascript:|alert\()/gi
    };

    //Check all request parameters (GET, POST, etc.)
    for (let key in req.body) {
        if (attackPatterns.sqlInjection.test(req.body[key]) || attackPatterns.xss.test(req.body[key])){
            console.log("Attack detected in body: ", req.body[key]);
            return res.status(403).send("Potential Attack detected and blocked!");
        }
    }
        for (let key in req.query) {
            if (attackPatterns.sqlInjection.test(req.query[key]) || attackPatterns.xss.test(req.query[key])) {
                console.log("🚨 Attack detected in query:", req.query[key]);
                return res.status(403).send(" Potential attack detected and blocked!");
            }
        }
        
        next(); //Continue to  next middleware if no attack
}

