// src/components/SearchFilter.jsx
import { useExpenses } from "../context/ExpenseContext";
import categories from "../data/categories";

function SearchFilter() {
  const { keyword, setKeyword, category, setCategory } = useExpenses();

  return (
    <section className="search-filter" aria-label="Filter transactions">
      <h2 className="section-title">Search &amp; Filter</h2>
      <div className="filter-row">
        <div className="form-row">
          <label htmlFor="search-keyword">Keyword</label>
          <input
            id="search-keyword"
            type="text"
            placeholder="Search description or category..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="search-category">Category</label>
          <select id="search-category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {(keyword || category !== "All") && (
          <button
            type="button"
            className="btn btn-small"
            onClick={() => {
              setKeyword("");
              setCategory("All");
            }}
          >
            Clear Filters
          </button>
        )}
      </div>
    </section>
  );
}

export default SearchFilter;