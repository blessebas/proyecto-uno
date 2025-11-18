const homeController = {
  homeRender: (req, res) => {
    return res.render('home.view.ejs', {
      assets: { css: ['home'], js: ['home'] },
    });
  },
};

module.exports = homeController;
