import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//-----------------------------------------------------------------------------------
interface pageProps {
  itemPage: number;
  totalPage: number;
  paginate:(number:number)=>void;
}



const Pagination= ({itemPage, totalPage, paginate}: pageProps) => {
  
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPage / itemPage) ; i++) {
    pageNumbers.push(i);
  }
  return (
    
    <nav>
      <ul className="pagination">
      {pageNumbers.map(number => (
        <li>
          <a
          onClick={() => paginate(number)}
          className="btn btn-primary btnUpdate"
        >{number}</a>
        </li>
        ))}
      </ul>
    </nav>


  );
}



export default Pagination;
