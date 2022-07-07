const { Router } = require('express');
const ContactController = require('./app/controllers/ContactController');

const router = Router();

router.use((request, response, next) => {
  request.appId = 'MeuApp';
  next();
});

router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);
router.delete('/contacts/:id', ContactController.delete);

module.exports = router;