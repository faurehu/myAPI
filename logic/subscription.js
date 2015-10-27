import randomstring from 'randomstring';

module.exports = (app) => {
  return {
    confirm: (req, res) => {
      console.log(req.query);
    },
    subscribe: (req, res, next) => {

      let handleError = (err) => { res.status(500); return next(err); };

      let found = (data, created) => {
        let subscription = data[0].dataValues;

        var mailOptions = {
          from: 'Faure Hu Blog <subscription@faure.hu>',
          to: subscription.email,
          subject: "Please confirm your subscription to Faure's posts",
          text: 'Hello world ✔',
          html: '<b>Hello world ✔</b>'
        };

        if(!subscription.confirmed) {
          // Not confirmed, so send email.
          app.get('mailer').sendMail(mailOptions, function(error, info) {
            if(error) {
              handleError(error);
            } else {
              console.log(`Message sent: ${info.response}`);
            }
          });

        } else {
          // Confirmed, so notify this email is already subscribed.
          res.json({
            confirmed: true
          });
        }
      }

      let findOrCreateOptions = {
        where: {email: req.query.email},
        defaults: {token: randomstring.generate()}
      }

      app.get('models').Subscription.findOrCreate(findOrCreateOptions)
      .then(found).catch(handleError);
    }
  }
}
