import React from 'react';
import { Route, Routes } from 'react-router-dom';
import IndexPage from '../component/IndexPage';
import EmailCheckPage from '../component/EmailCheckPage';
import BasicTable from '../component/table';
import Admin from '../component/admin';


export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<EmailCheckPage />} />
      <Route path="/addRequest" element={<IndexPage />} />
      <Route path="/check-email" element={<EmailCheckPage />} />
      <Route path="/table" element={<BasicTable />} />
      <Route path="/admin" element={<Admin />} />
      
    </Routes>
  );
};

export default Routing;