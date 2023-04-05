const express = require('express');
const router = express.Router();
const {
    getAllNotes,
    createNotes,
    getSingleNote,
    updateNotes,
    deleteNotes,
} = require('../controllers/controller');


router.route('/').get(getAllNotes).post(createNotes);

router.route('/:title').get(getSingleNote).patch(updateNotes).delete(deleteNotes);

module.exports = router;