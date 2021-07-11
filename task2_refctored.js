const authUrl = "https://url.to.auth.system.com/invitation";

exports.inviteUser = async (req, res) => {
	let invitationBody = req.body;
	let shopId = req.params.shopId;

	let retrievedShop;
	// Check that requested shop is present in out system
	await Shop.findById(shopId).exec(function (err, shop) {
		if (err || !shop) {
			// Send to the client 404 error, it indicates that the requested shop doesn't exist
			return res.status(404).send({ message: 'No shop found' });
		}
		retrievedShop = shop;
	});

	// Here we can assert that retrievedShop is populated properly
	// invitationBody.id => it is user id
	await User.findById(invitationBody.id, function (err, user) {
		if (err || !user) {
			return res.status(400).send({ message: 'Invalid user' })
		}

		if (retrievedShop.invitations.indexOf(user.id)){
			return res.status(400).send({ message: "User already invited to the shop"})
		}

		superagent
			.post(authUrl)
			.send(invitationBody)
			.end(function (err, invitationResponse) {
				if (err || !invitationResponse){ // without a description of possibles errors fro superagent, I can only return 500 as unexcepted error from server
					return res.status(500).send({message: "Sorry we are not able to accomplish your request"})
				}

				retrievedShop.users.push(user);
				await retrievedShop.save().exec();

				return res.status(204).send()
			})
	})
};