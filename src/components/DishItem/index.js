import CartContext from '../../context/CartContext'

const DishItem = props => {
  const {dishDetails} = props

  const {
    dish_id: dishId,
    dish_name: dishName,
    dish_price: dishPrice,
    dish_image: dishImage,
    dish_currency: dishCurrency,
    dish_calories: dishCalories,
    dish_description: dishDescription,
    dish_Availability: dishAvailability,
    addonCat,
    onRemoveItem,
    onAddItem,
    quantity,
  } = dishDetails

  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value

        const onClickAddToCart = () => {
          addCartItem({...dishDetails, quantity: 1})
        }

        const onDecrementQuantity = () => {
          if (quantity > 1) {
            this.setState(prevState => ({quantity: prevState.quantity - 1}))
          }
        }

        const onIncrementQuantity = () => {
          this.setState(prevState => ({quantity: prevState.quantity + 1}))
        }

        const handleDecrement = () => {
          onRemoveItem(dishDetails)
        }

        const handleIncrement = () => {
          onAddItem(dishDetails)
        }

        return (
          <li className="dish-item">
            <div className="dish-info">
              <p className="dish-name">{dishName}</p>
              <p className="dish-price">
                {dishCurrency} {dishPrice}
              </p>
              <p className="dish-description">{dishDescription}</p>
              {dishAvailability > 0 ? (
                <div className="quantity-controls">
                  <button
                    type="button"
                    className="control-button"
                    onClick={() => onDecrementQuantity}
                  >
                    -
                  </button>
                  <p>{quantity}</p>

                  <button
                    type="button"
                    className="control-button"
                    onClick={() => onIncrementQuantity}
                  >
                    +
                  </button>
                </div>
              ) : (
                <p className="not-available">Not available</p>
              )}
              {dishAvailability > 0 ? (
                <button
                  type="button"
                  className="button add-to-cart-btn"
                  onClick={() => onClickAddToCart(dishDetails)}
                >
                  ADD TO CART
                </button>
              ) : null}
              {addonCat.length > 0 && (
                <p className="customizations">Customizations available</p>
              )}
            </div>
            <p className="dish-calories">{dishCalories} calories</p>
            <img src={dishImage} alt={dishName} className="dish-image" />
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default DishItem
