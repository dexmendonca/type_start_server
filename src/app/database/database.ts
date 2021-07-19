import Knex from 'knex';
import knexConfig from '../config/database';

const nodeENV = process.env.NODE_ENV || 'development';

// Set environment from `.env`
const knex = Knex(knexConfig[nodeENV]);

export default knex;
