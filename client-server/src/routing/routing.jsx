// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import IndexPage from '../component/IndexPage';
// import EmailCheckPage from '../component/EmailCheckPage'
// import BasicTable from '../component/table'
// import NextPage from '../component/nextPage'
// export const Routing = () => {
//     return (
//         <Routes>
//             <Route path="/addRequest" element={<IndexPage />} />
//             <Route path='/check-email' element={<EmailCheckPage/>}/>
//             <Route path="/nextPage" element= {<NextPage/>}/>
//             <Route path="/" element={<BasicTable />} />

//         </Routes>
//     )
// }
// export default Routing;
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import IndexPage from '../component/IndexPage';
import EmailCheckPage from '../component/EmailCheckPage';
import BasicTable from '../component/table';


export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<EmailCheckPage />} />
      <Route path="/addRequest" element={<IndexPage />} />
      <Route path="/check-email" element={<EmailCheckPage />} />
      <Route path="/table" element={<BasicTable />} />
    </Routes>
  );
};

export default Routing;