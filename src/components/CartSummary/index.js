import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, quantity, dishPrice} = value

      let totalPrice = 0
      let items = 0

      cartList.forEach(item => {
        totalPrice += item.dishPrice * item.quantity
        console.log(totalPrice)
        items += item.quantity
      })
      return (
        <div className="cart-summary-container">
          <div className="cart-summary-card">
            <h1 className="cart-items-total-price">
              Order Total: <span>RS {totalPrice}/-</span>
            </h1>
            <p className="cart-items-count">{items} Items in cart</p>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
