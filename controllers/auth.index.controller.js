const authController = {
  loginRender: (req, res) => {
    res.render('auth/login.view.ejs', { title: 'Login', layout: 'layouts/auth.view.ejs', })
  },
  registerRender: (req, res) => {
    res.render('auth/register.view.ejs', { title: 'Register', layout: 'layouts/auth.view.ejs' })
  },
  confirmRender: (req, res) => {
    res.render('auth/confirm.view.ejs', { title: 'Confirm', layout: 'layouts/auth.view.ejs' })
  },
  forgotPasswordRender: (req, res) => {
    res.render('auth/forgot-password.view.ejs', { title: 'Forgot Password', layout: 'layouts/auth.view.ejs' })
  },
  changePasswordRender: (req, res) => {
    res.render('auth/change-password.view.ejs', { title: 'Change Password', layout: 'layouts/auth.view.ejs' })
  }
}

module.exports = authController;
