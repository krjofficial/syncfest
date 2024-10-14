const express = require('express');
const controllers = require("../controllers/controllers")

const router = express.Router();



router.get('/', controllers.event_list);
router.get('/create', controllers.create_event_get);
router.post('/', controllers.create_event_post);
router.get("/:id", controllers.event_details_get);
router.delete("/:id", controllers.event_delete);
router.get("/:id/rsvp", controllers.rsvp_get);
router.post("/:id", controllers.rsvp_post);
router.get("/:id/attendees", controllers.attendees_get);


module.exports = router;