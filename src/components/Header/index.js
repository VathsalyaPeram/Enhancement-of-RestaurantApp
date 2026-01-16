const Header = ({restaurantName, cartCount}) => (
  <div className="header">
    <h1>{restaurantName}</h1>
    <div className="cart-container">
      <p>My Orders</p>
      <div className="cart-icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/fa-solid-cart-plus-for-restaurant-menu-img.png"
          alt="cart"
          className="cart-icon"
        />
        <span className="cart-count">{cartCount}</span>
      </div>
    </div>
  </div>
)

export default Header
