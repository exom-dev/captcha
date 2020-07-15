module.exports = () => {};

/*
captcha
.revoke('id')
.regenerate(id)
.generate({
  expire: 1000 * 60 * 3,
  id: '',
  type: 'text',
})
.verify({
  answer: 'exm-captcha-answer',
  id: 'exm-captcha-id',
})

*/

const app = require('express')();

app.get('/', (req, res) => {
  
});

app.listen(80);
