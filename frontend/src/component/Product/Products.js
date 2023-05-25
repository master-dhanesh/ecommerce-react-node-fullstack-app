import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProducts } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard/ProductCard';
import Pagination from 'react-js-pagination';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { useAlert } from 'react-alert';
import Metadata from '../layout/Metadata';


const categories = [
    "Laptop",
    "Footware",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];

const Products = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 25000])
    const [category, setCategory] = useState("")
    const [ratings, setRatings] = useState(0)

    const { products, loading, error, resultPerPage, filteredProductsCount } = useSelector(state => state.products)

    const { keyword } = useParams();

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProducts(keyword, currentPage, price, category, ratings));
    }, [keyword, dispatch, currentPage, price, category, ratings, alert, error])

    const count = filteredProductsCount;

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <Metadata title="PRODUCTS -- ECOMMERCE" />
                    <h2 className="productsHeading">Products</h2>
                    <div className="products">
                        {products && products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>


                    {resultPerPage < count && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={count}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="<<"
                                lastPageText=">>"
                                itemClass='page-item'
                                linkClass='page-link'
                                activeClass='pageItemActive'
                                activeLinkClass='pageLinkActive'

                            />
                        </div>
                    )}

                </Fragment>
            )}

            <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay='auto'
                            aria-labelledby='range-slider'
                            min={0}
                            max={25000}
                        />

                        <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map(category => (
                                <li
                                    className="category-link"
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>

                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider 
                                value={ratings}
                                onChange={(e, newRating) => setRatings(newRating)}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay='auto'
                                min={0}
                                max={5}
                            />
                        </fieldset>

                    </div>

        </Fragment>
    )
}

export default Products
