// ========================================
// LOGIN API
// ========================================
app.post(
	"/api/login",
	(req, res) => {
    	const {
        	username,
        	password
    	} = req.body;
    	const USERS_FILE =
        	path.join(
            	__dirname,
            	"data",
            	"users.json"
        	);
    	const users =
        	JSON.parse(
            	fs.readFileSync(
                	USERS_FILE,
                	"utf8"
            	)
        	);
    	const user =
        	users.find(
            	user =>
                	user.username === username &&
                	user.password === password
        	);
    	if (!user) {
        	return res.status(401).json({
            	message:
            	"Invalid username or password."
        	});
    	}
    	res.json({
        	message:
        	"Login successful.",
        	username:
        	user.username
    	});
	}
);
