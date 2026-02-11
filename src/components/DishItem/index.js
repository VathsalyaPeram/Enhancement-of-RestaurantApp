import {Component} from 'react'
import CartContext from '../../context/CartContext'

class DishItem extends Component {
  // static contextType = CartContext

  state = {
    quantity: 0,
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  onDecrementQuantity = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity > 0 ? prevState.quantity - 1 : 0,
    }))
  }

  onClickAddToCart = () => {
    const {dishDetails, addCartItem} = this.props
    const {quantity} = this.state
    // const {addCartItem} = this.context

    if (quantity > 0) {
      addCartItem({...dishDetails, quantity})
    }
  }

  //   const onClickAddToCart = () => {
  //     addCartItem({...dishDetails, quantity: 1})
  //   }
  // }

  render() {
    const {dishDetails} = this.props
    const {quantity} = this.state

    const {
      dish_name: dishName,
      dish_price: dishPrice,
      dish_image: dishImage,
      dish_currency: dishCurrency,
      dish_calories: dishCalories,
      dish_description: dishDescription,
      dish_Availability: dishAvailability,
      addonCat,
    } = dishDetails

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
                onClick={this.onDecrementQuantity}
              >
                -
              </button>

              <p>{quantity}</p>

              <button
                type="button"
                className="control-button"
                onClick={this.onIncrementQuantity}
              >
                +
              </button>
            </div>
          ) : (
            <p className="not-available">Not available</p>
          )}

          {dishAvailability > 0 && quantity > 0 && (
            <button
              type="button"
              className="button add-to-cart-btn"
              onClick={this.onClickAddToCart}
            >
              ADD TO CART
            </button>
          )}

          {addonCat.length > 0 && (
            <p className="customizations">Customizations available</p>
          )}
        </div>

        <p className="dish-calories">{dishCalories} calories</p>
        <img src={dishImage} alt={dishName} className="dish-image" />
      </li>
    )
  }
}

export default DishItem
