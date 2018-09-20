import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import Notes from './Notes';
export default () => {
	let api = Router();

	// mount the facets resource
  api.use('/facets', facets());
  
  // mount the facets resource
	api.use('/notes', Notes());

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
