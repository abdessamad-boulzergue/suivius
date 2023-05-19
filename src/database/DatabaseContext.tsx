import React, { useContext } from 'react';
import Database from '.';

const database = new Database();


const DatabaseContext = React.createContext<Database>(database);
export {database};
export default DatabaseContext;
