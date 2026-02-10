import {useState, useEffect} from 'react'
import Header from '../Header'
import Category from '../Category'
import DishItem from '../DishItem'

const Restaurant = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [restaurantData, setRestaurantData] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [activeCategory, setActiveCategory] = useState('')

  const fetchMenuData = async () => {
    setIsLoading(true)
    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(apiUrl)
    const data = await response.json()
    const formattedData = data[0]
    setRestaurantData(formattedData)
    if (formattedData.table_menu_list.length > 0) {
      setActiveCategory(formattedData.table_menu_list[0].menu_category)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchMenuData()
  }, [])

  const handleAddItem = dish => {
    const existingItem = cartItems.find(item => item.dishId === dish.dishId)
    if (existingItem) {
      setCartItems(
        cartItems.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      )
    } else {
      setCartItems([...cartItems, {...dish, quantity: 1}])
    }
  }

  const handleRemoveItem = dish => {
    const existingItem = cartItems.find(item => item.dishId === dish.dishId)
    if (existingItem) {
      if (existingItem.quantity === 1) {
        setCartItems(cartItems.filter(item => item.dishId !== dish.dishId))
      } else {
        setCartItems(
          cartItems.map(item =>
            item.dishId === dish.dishId
              ? {...item, quantity: item.quantity - 1}
              : item,
          ),
        )
      }
    }
  }

  const getDishQuantity = dishId => {
    const item = cartItems.find(cartItem => cartItem.dishId === dishId)
    return item ? item.quantity : 0
  }

  const renderDishes = () => {
    const activeCategoryData = restaurantData.table_menu_list.find(
      category => category.menu_category === activeCategory,
    )

    if (!activeCategoryData) {
      return null
    }

    return (
      <ul className="dish-list">
        {activeCategoryData.category_dishes.map(dish => (
          <DishItem
            key={dish.dishId}
            dishDetails={dish}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            quantity={getDishQuantity(dish.dishId)}
          />
        ))}
      </ul>
    )
  }

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader" />
      </div>
    )
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="restaurant-container">
      <Header
        restaurantName={restaurantData.restaurant_name}
        cartCount={cartCount}
      />
      <Category
        categories={restaurantData.table_menu_list}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      {renderDishes()}
    </div>
  )
}

export default Restaurant
