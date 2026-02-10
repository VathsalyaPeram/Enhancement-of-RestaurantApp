// import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
// import {AiFillCloseCircle} from 'react-icons/ai'

// import CartContext from '../../context/CartContext'

// const CartItem = props => (
//   <CartContext.Consumer>
//     {value => {
//       const {
//         removeCartItem,
//         incrementCartItemQuantity,
//         decrementCartItemQuantity,
//       } = value
//       const {cartItemDetails} = props
//       const {
//         dishName,
//         dishPrice,
//         dishImage,
//         dishCurrency,
//         dishCalories,
//         dishDescription,
//         dishAvailability,
//         addonCat,
//       } = cartItemDetails

//       const onClickDecrement = () => {
//         decrementCartItemQuantity(id)
//       }
//       const onClickIncrement = () => {
//         incrementCartItemQuantity()
//       }
//       const onRemoveCartItem = () => {
//         removeCartItem()
//       }

//       // TODO: Update the functionality to increment and decrement quantity of the cart item

//       return (
//         <li className="cart-item">
//           <img className="cart-product-image" src={dishImage} alt={dishName} />
//           <div className="cart-item-details-container">
//             <div className="cart-product-title-brand-container">
//               <p>{dishName}</p>
//               <p className="cart-product-title">{dishDescription}</p>
//             </div>
//             <div className="cart-quantity-container">
//               <button
//                 type="button"
//                 className="quantity-controller-button"
//                 data-testid="minus"
//                 onClick={decrementCartItemQuantity}
//               >
//                 -
//               </button>
//               <p className="cart-quantity">{dishAvailability}</p>
//               <button
//                 type="button"
//                 className="quantity-controller-button"
//                 data-testid="plus"
//                 onClick={incrementCartItemQuantity}
//               >
//                 +
//               </button>
//             </div>
//             <div className="total-price-remove-container">
//               <p className="cart-total-price">Rs {dishPrice}/-</p>
//               <button
//                 className="remove-button"
//                 type="button"
//                 onClick={onRemoveCartItem}
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//           <button
//             className="delete-button"
//             type="button"
//             onClick={onRemoveCartItem}
//             data-testid="remove"
//           >
//             <AiFillCloseCircle color="#616E7C" size={20} />
//           </button>
//         </li>
//       )
//     }}
//   </CartContext.Consumer>
// )

// export default CartItem

// import {AiFillCloseCircle} from 'react-icons/ai'
// import CartContext from '../../context/CartContext'

// const CartItem = props => {
//   const {cartItemDetails} = props
//   const {id, dishName, dishImage, quantity, dishPrice} = cartItemDetails

//   return (
//     <CartContext.Consumer>
//       {value => {
//         const {
//           incrementCartItemQuantity,
//           decrementCartItemQuantity,
//           removeAllcartItems,
//         } = value
//         return (
//           <li className="cart-item">
//             <img
//               className="cart-product-image"
//               src={dishImage}
//               alt={dishName}
//             />
//             <div className="cart-item-details-container">
//               <div className="cart-product-title-brand-container">
//                 <p>{dishName}</p>
//               </div>
//               <div className="cart-quantity-container">
//                 <button
//                   type="button"
//                   className="quantity-controller-button"
//                   data-testid="minus"
//                   onClick={() => decrementCartItemQuantity(id)}
//                 >
//                   -
//                 </button>
//                 <p className="cart-quantity">{quantity}</p>
//                 <button
//                   type="button"
//                   className="quantity-controller-button"
//                   data-testid="plus"
//                   onClick={() => incrementCartItemQuantity(id)}
//                 >
//                   +
//                 </button>
//               </div>
//               <div className="total-price-remove-container">
//                 <p className="cart-total-price">Rs {dishPrice}/-</p>
//                 <button
//                   className="remove-button"
//                   type="button"
//                   onClick={removeAllcartItems}
//                 >
//                   Remove All
//                 </button>
//               </div>
//             </div>
//             <button
//               className="delete-button"
//               type="button"
//               onClick={removeAllcartItems}
//               data-testid="remove"
//             >
//               <AiFillCloseCircle color="#616E7C" size={20} />
//             </button>
//           </li>
//         )
//       }}
//     </CartContext.Consumer>
//   )
// }

// export default CartItem

import CartContext from '../../context/CartContext'

const CartItem = props => {
  const {cartItemDetails} = props
  const {dishId, dishName, dishImage, cartCount} = cartItemDetails

  return (
    <CartContext.Consumer>
      {value => {
        const {incrementCartItemQuantity, decrementCartItemQuantity} = value

        return (
          <li>
            <img src={dishImage} alt={dishName} />
            <p>{dishName}</p>

            <button
              type="button"
              onClick={() => decrementCartItemQuantity(dishId)}
            >
              -
            </button>

            <p>{cartCount}</p>

            <button
              type="button"
              onClick={() => incrementCartItemQuantity(dishId)}
            >
              +
            </button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
