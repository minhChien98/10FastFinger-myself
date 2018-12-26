app.get('/user', (req, res) => {
    User.find().then((user) => {
        
      res.send({user});
    }, (e) => {
      res.status(400).send(e);
    });
  });