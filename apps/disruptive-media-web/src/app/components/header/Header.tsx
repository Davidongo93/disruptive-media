import { useState } from 'react';

interface HeaderProps {
  onFilterChange: (filters: any) => void;
}

const Header: React.FC<HeaderProps> = ({ onFilterChange }) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('desc');

  const handleSearch = () => {
    onFilterChange({
      title: search,
      sort,
      order,
    });
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title"
        className="border p-2 rounded-lg w-full mr-4"
      />
      <select value={sort} onChange={(e) => setSort(e.target.value)} className="border p-2 rounded-lg">
        <option value="createdAt">Date</option>
        <option value="title">Title</option>
      </select>
      <select value={order} onChange={(e) => setOrder(e.target.value)} className="border p-2 rounded-lg">
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded-lg ml-4">
        Apply
      </button>
    </div>
  );
};

export default Header;
