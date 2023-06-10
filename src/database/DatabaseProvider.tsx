import React, { useEffect } from 'react';
import DatabaseContext  ,{database} from './DatabaseContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {action} from 'mobx';


const DatabaseProvider = ({ children }:any) => {

 
  return (
    <DatabaseContext.Provider value={database}>{children}</DatabaseContext.Provider>
  );
};

export default DatabaseProvider;
