import React from 'react';
import {Route, Routes} from 'react-router-dom';
import IndexPage from '../component/IndexPage';
import BasicTable from '../component/table'
export const Routing =()=>{
    return(
        <Routes>
            <Route path="/addRequest" element={<IndexPage/>} />
            <Route path="/" element={<BasicTable/>} />
        </Routes>
    )
}
export default Routing;