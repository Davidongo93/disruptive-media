'use client'
import { useState } from "react";
import CategoriesCarousel from "./components/CategoriesCarousel";
import LoginForm from "./components/LoginForm";
import PostGrid from "./components/PostGrid";
import Header from "./components/header/Header";

export default function Index() {
  const [filters, setFilters] = useState({
    topic: '',
    title: '',
    page: 1,
    limit: 10,
    sort: 'createdAt',
    order: 'desc',
  });
  
  const handleFilterChange = (newFilters: any) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  };
  return (
    <div>
      <div className="wrapper">
        <CategoriesCarousel/>
        <Header onFilterChange={handleFilterChange} />
        <PostGrid filters={filters} />
        <LoginForm/>
        <LoginForm/>
      </div>
    </div>
  );
};
