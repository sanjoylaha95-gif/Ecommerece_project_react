//  import './header.css';
import axios from 'axios';
import {useEffect,useState} from 'react';
import { Header } from '../components/Header';
import {Product} from './Product'
import './HomePage.css';

export function HomePage({cart,loadCart}) {
    const [products ,setProducts]=useState([]);


    useEffect(()=>{
        const getHomeData=(async()=>{
            const response=await axios.get('http://localhost:3000/api/products');
            setProducts(response.data);
        })
        getHomeData();
    },[]);


    return (
        <>
            <Header cart={cart}/>
            <title>Ecommerce Project</title>

            <div className="home-page">
                <div className="products-grid">
                    {products.map((product) => {
                        return (
                            <Product key={product.id} product={product} loadCart={loadCart}/>
                        );
                    })}

                </div>
            </div>
        </>
    );
}