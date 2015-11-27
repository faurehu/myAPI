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
    unsubscribe: (req, res, next) => {
      let handleError = (err) => { res.status(500); return next(err); };

      let success =  () => { res.render('cancelled'); };

      let found = (data) => {
        data.updateAttributes({
          confirmed: false
        }).then(success).catch(handleError);
      }

      app.get('models').Subscription.findOne({where: {token: req.query.token}})
      .then(found).catch(handleError);
    },
    subscribe: (req, res, next) => {

      let re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

      let handleError = (err) => { res.status(500); return next(err); };

      let found = (data, created) => {
        let subscription = data[0].dataValues;
        let link = `http://www.faure.hu/subscribe?token=${subscription.token}`;

        var mailOptions = {
          from: 'Faure Hu Blog <subscription@faure.hu>',
          to: subscription.email,
          subject: "Please confirm your subscription to Faure's posts",
          text: `Hi!\n\nYou just put down your email to subscribe to my blog. Go to the following link:\n\n${link}\n\nBest wishes,\n\nFaure`,
          html: `<p>Hi!</p><p>You just put down your email to subscribe to my blog. You can click <a href="${link}">here</a> to confirm your subscription. Alternatively, copy the following link and paste it in your url bar:</p><p><a href="${link}">${link}</a></p><p>Best wishes,</p><p>Faure</p>`
        };

        if(!subscription.confirmed) {
          app.get('mailer').sendMail(mailOptions, function(error, info) {
            if(error) {
              handleError(error);
            } else {
              console.log(`Message sent: ${info.response}`);
              res.json({
                message: 'Please check your inbox and confirm your email.'
              })
            }
          });
        } else {
          res.json({
            message: 'This email is already subscribed!'
          });
        }
      }

      let findOrCreateOptions = {
        where: {email: req.query.email},
        defaults: {token: randomstring.generate()}
      }

      if(re.test(req.query.email)) {
        app.get('models').Subscription.findOrCreate(findOrCreateOptions)
        .then(found).catch(handleError);
      } else {
        res.json('nice try');
      }
    }
  }
}
