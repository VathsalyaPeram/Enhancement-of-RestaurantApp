import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let totalPrice = 0
      const items = 0
      console.log(cartList)
      cartList.forEach(item => {
        totalPrice += item.dish_price * item.quantity
      })

      return (
        <div className="cart-summary-container">
          <div className="cart-summary-card">
            <h1 className="cart-items-total-price">
              Order Total: <span>RS {totalPrice}/-</span>
            </h1>
            <p className="cart-items-count">{cartList.length} Items in cart</p>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
