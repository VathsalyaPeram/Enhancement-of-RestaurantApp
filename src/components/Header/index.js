import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

const Header = props => {
  const {restaurantName, history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        return (
          <nav className="nav-header">
            <div className="nav-content">
              <h1 className="restaurant-name">{restaurantName}</h1>

              <div className="nav-menu">
                <p className="my-orders-text">My Orders</p>

                <Link to="/cart">
                  <button
                    type="button"
                    className="cart-icon-button"
                    data-testid="cart"
                  >
                    <AiOutlineShoppingCart />
                  </button>
                </Link>

                <p className="cart-count">{cartList.length}</p>

                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
