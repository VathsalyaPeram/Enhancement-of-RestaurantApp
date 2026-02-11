import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'

const Header = props => {
  const {restaurantName, cartCount} = props

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onClickCart = () => {
    const {history} = props
    history.push('/cart')
  }

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        return (
          <div className="cart-icon-container">
            <button type="button" className="cart-icon-button">
              <img
                src="https://assets.ccbp.in/frontend/react-js/fa-solid-cart-plus-for-restaurant-menu-img.png"
                alt="cart"
                className="cart-icon"
                onClick={onClickCart}
              />
            </button>
            <p className="cart-count">
              {cartList.reduce((total, item) => total + item.quantity, 0)}
            </p>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
  return (
    <div className="header">
      <div>
        <h1 className="restaurant-name">{restaurantName}</h1>
      </div>
      <div className="cart-container">
        <p>My Orders</p>
        <div className="cart-icon-container">
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
          <li className="nav-menu-item-mobile">
            <Link to="/cart" className="nav-link">
              {renderCartItemsCount()}
            </Link>
          </li>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
