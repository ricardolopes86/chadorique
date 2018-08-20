const Fraldas = require('../models/fraldas');
const User = require('../models/users');

module.exports = app => {
  const getUserValues = async function (id){
    let promise = User.findOne({ _id: id}, "rn_mais fraldas_p fraldas_m").exec();
    return promise;
  }
  app.get("/", (req, res, next) => {
    var rn = 0;
    var fraldas_p = 0;
    var fraldas_m = 0;
    var item = {};
    User.find({}).exec((err, users) => {
      var n = users.length;
      
      for (var i = 0; i < n; i++) {
        var user = users[i];
        rn = parseInt(rn + user.rn_mais);
        fraldas_p = parseInt(fraldas_p + user.fraldas_p);
        fraldas_m = parseInt(fraldas_m + user.fraldas_m);
      }
      rn = Math.floor((rn / 8) * 100);
      fraldas_p = Math.floor((fraldas_p / 15) * 100)
      fraldas_m = Math.floor((fraldas_m / 38) * 100)
      if (res.locals.loggedIn){
        dados_usuario = getUserValues(req.user.appid);
        dados_usuario.then(user => {
          res.render("pages/index", {
            rn_percentil: rn,
            p_percentil: fraldas_p,
            m_percentil: fraldas_m,
            dados: user,
            user: req.user,
            userProfile: JSON.stringify(req.user, null, "  ")
          });
        });
      } else {
        res.render("pages/index", {
          rn_percentil: rn,
          p_percentil: fraldas_p,
          m_percentil: fraldas_m,
          user: req.user,
          userProfile: JSON.stringify(req.user, null, "  ")
        });
    }
})});

  app.get("/entrar", (req, res, next) => {
    res.render("pages/entrar", {
      user: req.user,
      userProfile: JSON.stringify(req.user, null, "  ")
    });
  });

  app.post('/salvar', (req, res, next) => {
    const dados = req.body;
    console.log(dados)
    User.findOneAndUpdate({_id: req.user.appid}, dados)
      .then(() => User.findOne({_id: req.user.appid}))
      .then(user => console.log(user))
      .catch(next);
    res.redirect('/');
  });

  app.get('/presentes', (req, res, next) => {
    res.render("pages/presentes", {
      user: req.user,
      userProfile: JSON.stringify(req.user, null, "  ")
    });
  });
};
