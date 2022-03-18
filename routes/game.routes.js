const router = require('express').Router();
const gameController = require('../controllers/game.controller');

router.get('/', gameController.readGame);
router.post('/', gameController.createGame);
router.put('/:id', gameController.updateGame);
router.delete('/:id', gameController.deleteGame);
router.patch('/buy-game/:id', gameController.buyGame);
router.patch('/unbuy-game/:id', gameController.unbuyGame);

// reviews
router.patch('/review-game/:id', gameController.reviewGame);
router.patch('/edit-review-game/:id', gameController.editReviewGame);
router.patch('/delete-review-game/:id', gameController.deleteReviewGame);

module.exports = router;