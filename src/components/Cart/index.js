// import CartContext from '../../context/CartContext'

// const Cart = () => (
//   <CartContext.Consumer>
//     {value => {
//       const {
//         cartList,
//         removeAllCartItems,
//         incrementCartItemQuantity,
//         decrementCartItemQuantity,
//       } = value

//       return (
//         <div>
//           <button type="button" onClick={removeAllCartItems}>
//             Remove All
//           </button>

//           <ul>
//             {cartList.map(item => (
//               <li key={item.id}>
//                 <img src={item.imageUrl} alt={item.name} />
//                 <p>{item.name}</p>

//                 <button
//                   type="button"
//                   onClick={() => decrementCartItemQuantity(item.id)}
//                 >
//                   -
//                 </button>

//                 <p>{item.quantity}</p>

//                 <button
//                   type="button"
//                   onClick={() => incrementCartItemQuantity(item.id)}
//                 >
//                   +
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )
//     }}
//   </CartContext.Consumer>
// )

// export default Cart

import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'
import CartItem from '../CartItem'

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
        dishCalories,
      } = value

      if (cartList.length === 0) {
        return (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
              alt="empty cart"
            />
          </div>
        )
      }

      const onClickRemoveAllBtn = () => {
        removeAllCartItems()
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  className="remove-all-btn"
                  type="button"
                  onClick={removeAllCartItems}
                >
                  Remove All
                </button>
                <button>Checkout</button>
                <ul>
                  {cartList.map(item => (
                    <li key={item.dishId}>
                      <p className="dish-calories">{dishCalories} calories</p>
                      <img
                        src={item.dishImage}
                        alt={item.dishName}
                        className="dish-image"
                      />

                      <button
                        type="button"
                        onClick={() => decrementCartItemQuantity(item.dishId)}
                      >
                        -
                      </button>

                      <p>{item.quantity}</p>

                      <button
                        type="button"
                        onClick={() => incrementCartItemQuantity(item.dishId)}
                      >
                        +
                      </button>
                      <p className="dish-calories">{dishCalories} calories</p>
                      <img
                        src={dishImage}
                        alt={dishName}
                        className="dish-image"
                      />
                    </li>
                  ))}
                </ul>
                <CartSummary />
                {/* TODO: Add your code for Cart Summary here */}
              </div>
            }
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
