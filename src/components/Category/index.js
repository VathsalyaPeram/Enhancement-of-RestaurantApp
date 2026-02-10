const Category = ({categories = [], activeCategory, setActiveCategory}) => (
  <div className="category-tabs">
    {categories.map(category => (
      <button
        type="button"
        key={category.menu_category_id}
        className={`tab-item ${
          category.menu_category === activeCategory ? 'active' : ''
        }`}
        onClick={() => setActiveCategory(category.menu_category)}
      >
        {category.menu_category}
      </button>
    ))}
  </div>
)

export default Category
