import resource from 'resource-router-middleware';
import notes from '../models/Notes';

export default ( ) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'note',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		let note = notes.find( note => note.id===id ),
			err = note ? null : 'Not found';
		callback(err, note);
	},

	/** GET / - List all entities */
	index({ params }, res) {
    console.log('This is index');
		res.json();
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
    console.log('This is create');
	//	body.id = facets.length.toString(36);
		//facets.push(body);
		res.json(body);
	},

	/** GET /:id - Return a given entity */
	read({ facet }, res) {
    console.log('This is read');

		res.json(facet);
	},

	/** PUT /:id - Update a given entity */
	update({ facet, body }, res) {
    console.log('This is update');
		for (let key in body) {
			if (key!=='id') {
				facet[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ facet }, res) {
    console.log('This is delete');
		//facets.splice(facets.indexOf(facet), 1);
		res.sendStatus(204);
	}
});
