"use client";
import React, { useState } from "react";
import Pagination from "../components/Pagination";
import Hero from "../components/Hero";

const Pagina = () => {
  const [currentPage, setCurrentPage] = useState(5);
  const onPageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  return (
    <>
      <Hero />
      <Pagination
        currentPage={currentPage}
        totalPages={100}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default Pagina;
