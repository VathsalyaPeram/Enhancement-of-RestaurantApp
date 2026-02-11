import Header from '../Header'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {
        cartList,
        removeAllCartItems,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        dishImage,
        dishName,
        dish_price,
        dishCalories,
      } = value
      console.log(cartList.map(each => each.dish_price))

      const onClickRemoveAllBtn = () => {
        removeAllCartItems()
      }

      return (
        <>
          {
            <div className="cart-container">
              <Header />
              {cartList.length === 0 ? (
                <EmptyCartView />
              ) : (
                <div className="cart-content-container">
                  <h1 className="cart-heading">My Cart</h1>
                  <button
                    className="remove-all-btn"
                    type="button"
                    onClick={onClickRemoveAllBtn}
                  >
                    Remove All
                  </button>
                  <button>Checkout</button>
                  <ul>
                    {cartList.map(item => {
                      console.log(item.dish_image)

                      return (
                        <li key={item.dishId}>
                          <button
                            type="button"
                            onClick={() =>
                              decrementCartItemQuantity(item.dishId)
                            }
                          >
                            -
                          </button>

                          <p>{item.quantity}</p>

                          <button
                            type="button"
                            onClick={() =>
                              incrementCartItemQuantity(item.dishId)
                            }
                          >
                            +
                          </button>

                          <p className="dish-calories">
                            {item.dish_currency} {item.dish_price}
                          </p>
                          <p>{item.dish_name}</p>
                          <img
                            src={item.dish_image}
                            alt={item.dish_name}
                            className="dish-image"
                          />
                        </li>
                      )
                    })}
                  </ul>
                  <CartSummary />
                  {/* TODO: Add your code for Cart Summary here */}
                </div>
              )}
            </div>
          }
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
