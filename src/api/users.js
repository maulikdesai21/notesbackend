import resource from "resource-router-middleware";
import User from "../models/Users";

export default () =>
  resource({
    /** Property name to store preloaded entity on `request`. */
    id: "user",

    /** For requests with an `id`, you can auto-load the entity.
     *  Errors terminate the request, success sets `req[id] = data`.
     */
    load(req, id, callback) {
      (async ()=>{
        let user = await User.findById(id ),
        err = user ? null : "Not found";
        callback(err, user);
      })()  
    },

    /** GET / - List all entities */
    index({ params }, res) {
      (async () => {
        try {
          let result = await User.find({});
          res.status(200).json(result);
        } catch (err) {
          console.log(err);
          res.status(500).send();
        }
      })();
    },

    /** POST / - Create a new entity */
    create({ body }, res) {
      const { name, email, password } = body;
      if (!name || !email || !password) {
        res.status(400).json({
          message: "Required Parameters Missing"
        });
      }
      let newUser = new User({
        name,
        email,
        password
      });
      (async () => {
        try {
          let result = await newUser.save();
          res.status(200).json(result);
        } catch (err) {
          console.log(err);
          res.status(500).send();
        }
      })();
    },

    /** GET /:id - Return a given entity */
    read({ user }, res) {
      res.status(200).send(user);
    },

  }
  
)