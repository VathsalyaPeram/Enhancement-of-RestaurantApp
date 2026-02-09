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
        cartCount = cartList.length

        return (
          <div className='cart-icon-container'>
            <button type='button' className='cart-icon-button'>
              <img
                src='https://assets.ccbp.in/frontend/react-js/fa-solid-cart-plus-for-restaurant-menu-img.png'
                alt='cart'
                className='cart-icon'
              />
            </button>
            {cartCount > 0 && <span className='cart-count'>{cartCount}</span>}
          </div>
        )
      }}
    </CartContext.Consumer>
  )
  return (
    <div className='header'>
      <h1>{restaurantName}</h1>
      <div className='cart-container'>
        <p>My Orders</p>
        <div className='cart-icon-container'>
          <img
            src='https://assets.ccbp.in/frontend/react-js/fa-solid-cart-plus-for-restaurant-menu-img.png'
            alt='cart'
            className='cart-icon'
          />
          <span className='cart-count'>{cartCount}</span>
          <button
            type='button'
            className='logout-desktop-btn'
            onClick={onClickLogout}
          >
            Logout
          </button>
          <li className='nav-menu-item-mobile'>
            <Link to='/cart' className='nav-link'>
              <button type='button'>
                <img
                  src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png'
                  alt='nav cart'
                  className='nav-bar-img'
                  onClick={onClickCart}
                />
              </button>
              {renderCartItemsCount()}
            </Link>
          </li>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
