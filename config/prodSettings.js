module.exports = {
  mail: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PW
  },
  keys: {
    twitter: {
      consumerKey: process.env.TWITTER_KEY,
      consumerSecret: process.env.TWITTER_SECRET
    },
    google: {
      key: process.env.GOOGLE_KEY
    },
    instagram: {
      clientID: process.env.INSTAGRAM_ID,
      clientSecret: process.env.INSTAGRAM_SECRET,
      userID: process.env.INSTAGRAM_USERID,
      token: process.env.INSTAGRAM_TOKEN
    },
    github: {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      token: process.env.GITHUB_TOKEN
    },
    pocket: {
      consumerKey: process.env.POCKET_KEY,
      myOwnSecret: process.env.POCKET_SECRET,
      token: process.env.POCKET_TOKEN
    },
    soundcloud: {
      clientID: process.env.SOUNDCLOUD_ID,
      clientSecret: process.env.SOUNDCLOUD_SECRET
    }
  },
  development: {
    db: {
      host: 'localhost',
      port: '5432',
      name: 'test',
      user: 'test',
      password: 'test',
      dialect: 'postgres'
    },
    app: {
      name: 'Grid API',
      port: 3001
    }
  },
  test: {
    app: {
      name: 'Grid API TEST',
      port: 3001
    }
  },
  production: {
    db: {
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      name: process.env.PG_DB_NAME,
      user: process.env.PG_USER,
      password: process.env.PG_PW,
      dialect: 'postgres'
    },
    app: {
      name: 'Grid API PROD',
      port: 3001
    }
  }
};
