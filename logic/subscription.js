import randomstring from 'randomstring';

module.exports = (app) => {
  return {
    confirm: (req, res, next) => {

      let handleError = (err) => { res.status(500); return next(err); };

      let success = () => { res.render('confirmed'); };

      let found = (data) => {
        data.updateAttributes({
          confirmed: true
        }).then(success).catch(handleError);
      }

      app.get('models').Subscription.findOne({where: {token: req.query.token}})
      .then(found).catch(handleError);
    },
    subscribe: (req, res, next) => {

      let handleError = (err) => { res.status(500); return next(err); };

      let found = (data, created) => {
        let subscription = data[0].dataValues;
        let link = `http://localhost:3000/subscribe?token=${subscription.token}`

        var mailOptions = {
          from: 'Faure Hu Blog <subscription@faure.hu>',
          to: subscription.email,
          subject: "Please confirm your subscription to Faure's posts",
          text: `Hi!\n\nYou just put down your email to subscribe to my blog. Go to the following link:\n\n${link}\n\nBest wishes,\n\nFaure`,
          html: `<p>Hi!</p><p>You just put down your email to subscribe to my blog. You can click <a href="${link}">here</a> to confirm your subscription. Alternatively, go to the following link:</p><p><a href="${link}">${link}</a></p><p>Best wishes,</p><p>Faure</p>`
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
