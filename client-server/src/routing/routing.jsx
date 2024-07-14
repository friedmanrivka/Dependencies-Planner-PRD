import React from 'react';
import {Route, Routes} from 'react-router-dom';
import IndexPage from '../component/IndexPage'
import BasicTable from '../component/table'
export const Routing =()=>{
    return(
        <Routes>
            <Route path="/" element={<IndexPage/>} />
            <Route path="/addRequest" element={<BasicTable/>} />
        </Routes>
    )
}
export default Routing;