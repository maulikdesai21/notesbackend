import { version } from '../../package.json';
import { Router } from 'express';

import notes from './notes';
import users from './users';
export default () => {
	let api = Router();

  // mount the facets resource
  api.use('/notes', notes());
  // mount the facets resource
	api.use('/users', users());

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
