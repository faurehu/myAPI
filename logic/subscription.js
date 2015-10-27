module.exports = (app) => {
  return {
    confirm: (req, res) => {
      console.log(req.query);
    },
    subscribe: (req, res) => {
      console.log(req.query);
    }
  }
}
