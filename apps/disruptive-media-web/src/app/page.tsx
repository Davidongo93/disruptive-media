'use client'
import { useState } from "react";
import UseSession from "./components/hooks/UseSession";
import CategoriesCarousel from "./components/CategoriesCarousel";
import LoginForm from "./components/LoginForm";
import PostGrid from "./components/PostGrid";
import Header from "./components/header/Header";
import PostForm from "./components/postForm/PostForm";



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
        {/* <CategoriesCarousel/>
        <Header onFilterChange={handleFilterChange} /> */}
        <PostGrid/>

      <PostForm/>}
      <LoginForm/>
      </div>
    </div>
  );
};
