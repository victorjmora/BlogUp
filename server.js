const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection');
const { Handlebars } = require('./utils/helpers');
const methodOverride = require('method-override');
const Port = process.env.PORT || 3001;


const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({
  helpers: {
    formatDate: Handlebars.helpers.formatDate,
    isCurrentUserPost: Handlebars.helpers.isCurrentUserPost,
    ifCond: Handlebars.helpers.ifCond,
  },
});

app.use(methodOverride('_method'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
});