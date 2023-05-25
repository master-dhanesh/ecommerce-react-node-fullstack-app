import React, { Fragment, useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import './Home.css';
import ProductCard from './ProductCard/ProductCard';
import Metadata from '../layout/Metadata';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';

import { getProducts } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';


// const product = {
//     name: "Lal Gadi",
//     images: [{url: "https://images.unsplash.com/photo-1639321911392-2ba291d62cdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"}],
//     price: "3000",
//     _id: "ac123lal$"
// }

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products);

    useEffect(() => {
        if(error) return alert.error(error);
        dispatch(getProducts());
    }, [dispatch, error, alert])

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>

                    <Metadata title="ECOMMERCE" />

                    <div className="banner">
                        <p>Welcome to Ecommerce</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>
                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Featured Products</h2>

                    <div className="container" id="container">

                        {products && products.map((product, i) =>
                            <ProductCard key={i} product={product} />
                        )}

                    </div>
                </Fragment>
            }
        </Fragment>
    );
}

export default Home
