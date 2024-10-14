const Event = require("../models/event")
const User = require("../models/user");





 const event_list =  (req, res) => {
  Event.find().sort({createdAt: -1})
  .then((result) => {
    console.log(result);
    res.render('home', {title: 'Event List', events: result})
  })
  .catch((err) => {
    console.log(err)
    res.status(500).send("Error retrieving events")
  })
  
 }

 const create_event_get = (req, res) => {
  res.render("create-event")
 }


 const create_event_post = async (req, res) => {
  const { title, date, description, attendees } = req.body;

  // Validate title and date
  if (!title || !date) {
    return res.status(400).send('Title and date are required');
  }

  // Clean attendees array, removing any with null usernames
  const validAttendees = attendees?.filter(attendee => attendee.username);


  try {
    const event = new Event({
      title,
      date,
      description,
      attendees: validAttendees || [], // Use an empty array if attendees is undefined
    });
    
    await event.save();
    res.status(201).redirect("/");
  } catch (error) {
    res.status(500).send(error);
  }
};



 const event_details_get = (req, res) => {
  const id = req.params.id;

  Event.findById(id)
    .then(event => {
      if (!event) {
        return res.status(404).render('404', { message: 'Event not found' });
      }
      res.render("event-details", { event }); // Use 'event' instead of 'events'
    })
    .catch(err => {
      console.error(err);
      res.status(500).render("404");
    });
}


 const event_delete = (req, res) => {
  const id = req.params.id;
  Event.findByIdAndDelete(id)
  .then(result => {
    res.json({ redirect: '/'})
    alert("Event deleted successfully");
    console.log(result);
  })
  .catch(err => console.log(err));
 } 

 const rsvp_get = (req, res) => {
  const id = req.params.id
  
  Event.findById(id)
    .then(event => {
      if (!event) {
        return res.status(404).render('404', { message: 'Event not found' });
      }
      res.render("rsvp", { event }); // Use 'event' instead of 'events'
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error retrieving event details");
    });
 }

 const rsvp_post = (req, res) => {
  const id = req.params.id;
  const { username, email } = req.body;

  // Create the attendee object
  const attendee = { username, email };

  Event.findByIdAndUpdate(
    id,
    { $push: { attendees: attendee } },
    { new: true }
  )
  .then(event => {
    // Send a success message or redirect as needed
    res.redirect(`/${id}`);
  })
  .catch(err => {
    console.error(err);
    res.status(500).send("Error submitting RSVP");
  });
};


 const attendees_get = (req, res) => {
  const id = req.params.id;
  Event.findById(id)
   .then(event => {
     if (!event) {
       return res.status(404).render('404', { message: 'Event not found' });
     }
     res.render("attendees", { attendees: event.attendees }); // Use 'attendees' instead of 'event' in the template file and 'event' in the controller function parameters. If the event has no attendees, an empty array will be passed to the template. This allows the template to display a message indicating that there are no attendees yet.
    })
    .catch(err => {
       console.error(err);
       res.status(500).send("Error retrieving event attendees");
     });
   }

 module.exports = {
  event_list,
  create_event_get,
  create_event_post,
  event_details_get,
  event_delete,
  rsvp_get,
  rsvp_post,
  attendees_get
 }