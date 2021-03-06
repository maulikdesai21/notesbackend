import resource from "resource-router-middleware";
import Note from "../models/Notes";
import { defaultCipherList } from "constants";

export default () =>
  resource({
    /** Property name to store preloaded entity on `request`. */
    id: "note",

    /** For requests with an `id`, you can auto-load the entity.
     *  Errors terminate the request, success sets `req[id] = data`.
     */
    load(req, id, callback) {
      (async () => {
        let note = await Note.findById(id),
          err = note ? null : "Not found";
        callback(err, note);
      })();
    },

    /** GET / - List all entities */
    index(req, res) {
      const { headers } = req;
      const { _id } = req.decoded;

      if (!_id) {
        res.status(400).json({
          message: "Required Parameters Missing"
        });
      }
      (async () => {
        try {
          if (_id.match(/^[0-9a-fA-F]{24}$/)) {
            // Yes, it's a valid ObjectId, proceed with `find` call.
            const result = await Note.find({ user: _id });
            res.status(200).send(result);
          } else {
            res.status(500).send();
          }
        } catch (err) {
          console.log(err);
          res.status(500).send();
        }
      })();
    },

    /** POST / - Create a new entity */
    create(req, res) {
      const { headers, body } = req;
      const { _id } = req.decoded;
      const { noteType, plainText, richText, tags } = body;
      if (!noteType || !_id) {
        res.status(400).json({
          message: "Required Parameters Missing"
        });
      }
      let newNote = new Note({
        user: _id,
        noteType,
        plainText,
        richText:JSON.stringify(richText),
        tags
      });
      (async () => {
        try {
          let result = await newNote.save();
          res.status(200).json(result);
        } catch (err) {
          switch (err.name) {
            case "ValidationError":
              res.status(400).json({
                message: "Bad Request"
              });
              break;
            default:
              res.status(500).send();
          }
        }
      })();
    },

    /** GET /:id - Return a given entity */
    read({ facet }, res) {
      res.json(facet);
    },

    /** PUT /:id - Update a given entity */
    update(req, res) {
      const { headers, body } = req;
      const { _id } = req.decoded;
      const { noteType, plainText, richText, tags,id } = body;
      if (!noteType || !_id) {
        res.status(400).json({
          message: "Required Parameters Missing"
        });
      }

      (async () => {
        try {
          let oldNote = await Note.findById(id);
          oldNote.user = _id;
          oldNote.noteType = noteType;
          oldNote.plainText =  plainText;
          oldNote.richText = JSON.stringify(richText);
          oldNote.tags = tags;
          let note = await oldNote.save();
          res.status(200).json(note);
        } catch (err) {
          switch (err.name) {
            case "ValidationError":
              res.status(400).json({
                message: "Bad Request"
              });
              break;
            default:
              res.status(500).send();
          }
        }
      })();
    },

    /** DELETE /:id - Delete a given entity */
    delete({ note }, res) {
      (async () => {
        try {
          const result = note.remove();
          res.status(200).send(result);
        } catch (err) {
          res.status(500).send();
        }
      })();
    }
  }).post("/notes/postNotes", (req, res) => {
    const { headers, body } = req;
    const { _id } = req.decoded;
    const notes = [];
    if (!_id) {
      res.status(400).json({
        message: "Required Parameters Missing"
      });
    }
    if (req.body.length > 0) {
      for (let note of req.body) {
        notes.push({
          tags: note.tags,
          plainText: note.plainText,
          noteType: note.noteType,
          richText: JSON.stringify(note.richText),
          lastUpdated: note.lastUpdated,
          user: _id
        });
      }
      (async () => {
        try {
          await Note.insertMany(notes);
        } catch (err) {
          console.log(err);
          res.send(500);
        }
      })();
    }
    (async () => {
      try {
        let userNotes = await Note.find({
          user: _id
        });
        res.status(200).json(userNotes);
      } catch (err) {
        console.log(err);
        res.send(500);
      }
    })();
  });
