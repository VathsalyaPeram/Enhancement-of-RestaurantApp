import {useState, useEffect, useContext} from 'react'
import Loader from 'react-loader-spinner'
import {useHistory} from 'react-router-dom'

import Header from '../Header'
import Category from '../Category'
import DishItem from '../DishItem'
import CartContext from '../../context/CartContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = () => {
  const history = useHistory()
  const {cartList, addCartItem} = useContext(CartContext)

  const [restaurantInfo, setRestaurantInfo] = useState({})
  const [menuList, setMenuList] = useState([])
  const [activeCategory, setActiveCategory] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      setApiStatus(apiStatusConstants.loading)

      const response = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )

      if (!response.ok) {
        setApiStatus(apiStatusConstants.failure)
        return
      }

      const data = await response.json()
      const restaurant = data[0]

      setRestaurantInfo({
        restaurantName: restaurant.restaurant_name,
        restaurantImage: restaurant.restaurant_image,
        branchName: restaurant.branch_name,
      })

      setMenuList(restaurant.table_menu_list)

      if (restaurant.table_menu_list.length > 0) {
        setActiveCategory(restaurant.table_menu_list[0].menu_category)
      }

      setApiStatus(apiStatusConstants.success)
    }

    fetchRestaurantDetails()
  }, [])

  const onClickCart = () => history.push('/cart')
  const onClickRestaurantName = () => history.push('/')

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#f7931e" height={50} width={50} />
    </div>
  )

  const renderFailureView = () => <h1>Something went wrong</h1>

  const renderSuccessView = () => {
    const {restaurantName, restaurantImage, branchName} = restaurantInfo

    const activeMenu = menuList.find(
      each => each.menu_category === activeCategory,
    )

    if (!activeMenu) {
      return null
    }

    return (
      <>
        <Header
          restaurantName={restaurantName}
          restaurantImage={restaurantImage}
          branchName={branchName}
          onClickCart={onClickCart}
          onClickRestaurantName={onClickRestaurantName}
          cartCount={cartList.length}
        />

        <Category
          categories={menuList}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <ul className="category_dishes">
          {activeMenu.category_dishes.map(dish => (
            <DishItem
              key={dish.dishId}
              dishDetails={dish}
              addCartItem={addCartItem}
              cartList={cartList}
            />
          ))}
        </ul>
      </>
    )
  }

  const renderHomeView = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return <div>{renderHomeView()}</div>
}

export default Home
