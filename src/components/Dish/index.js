const Dish = ({dishDetails, onAddItem, onRemoveItem, quantity}) => {
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

  const handleDecrement = () => {
    onRemoveItem(dishDetails)
  }

  const handleIncrement = () => {
    onAddItem(dishDetails)
  }

  return (
    <li className="dish-item">
      <div className="dish-info">
        <h3 className="dish-name">{dishName}</h3>
        <p className="dish-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>
        {dishAvailability ? (
          <div className="quantity-controls">
            {/* FIX: Added type="button" to prevent linting error */}
            <button
              type="button"
              className="control-button"
              onClick={handleDecrement}
            >
              -
            </button>
            <span>{quantity}</span>
            {/* FIX: Added type="button" to prevent linting error */}
            <button
              type="button"
              className="control-button"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        ) : (
          <p className="not-available">Not available</p>
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

export default Dish
