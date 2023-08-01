const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/signup', async (req, res) => {
  console.log(123)
  try {
  console.log(req.body)
    const userData = await User.create(req.body);
console.log(userData)
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.redirect('/dashboard');
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  console.log(123)
  try {
    const userData = await User.findOne({ where: { name: req.body.username } });
    console.log(456)
    if (!userData) {
      console.log(789)
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Store the user data in the session
    req.session.user = {
      id: userData.id,
      name: userData.name
    };

    req.session.logged_in = true;
    req.session.save();

    res.redirect('/dashboard'); // Redirect to the dashboard route
  } catch (err) {
    res.status(400).json(err);
  }
});



router.post('/logout', (req, res) => {
  console.log(123)
  if (req.session.logged_in) {
    console.log(456)
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;