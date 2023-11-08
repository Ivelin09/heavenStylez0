import '../styles/products.css'
import image from './collaborators.jpeg';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom'

const Products = () => {
    const [products, setProducts] = useState([]);
    const [pages, setPages] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [productImages, setProductImages] = useState([]);
    const page = searchParams.get("page");
    const animate = useRef();



    useEffect(() => {
        function addAnimation() {
            const scrollers = document.querySelectorAll(".scroller");
            scrollers.forEach((scroller) => {
                // add data-animated="true" to every `.scroller` on the page
                scroller.setAttribute("data-animated", true);

                // Make an array from the elements within `.scroller-inner`
                const scrollerInner = scroller.querySelector(".scroller__inner");
                const scrollerContent = Array.from(scrollerInner.children);

                // For each item in the array, clone it
                // add aria-hidden to it
                // add it into the `.scroller-inner`
                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    duplicatedItem.setAttribute("aria-hidden", true);
                    scrollerInner.appendChild(duplicatedItem);
                });
            });
        }

        addAnimation();
    }, []);

    useEffect(() => {
        const fetchData = async () => {


            let response = await fetch(`http://localhost:8000/products/${page}`, {
                method: 'GET'
            }).then((res) => res.json());

            setProducts(() => response.message);

            let arr = await response.message.map((product) => {
                return {
                    id: product._id,
                    isPrimaryImage: true
                }
            });

            setProductImages(arr);


            response = await fetch(`http://localhost:8000/total_products`, {
                method: 'GET'
            }).then((res) => res.json());

            setPages(() => response.message);
        }

        fetchData();
    }, []);

    const bottomNavbar = () => {
        let navbar = [];

        for (let i = 0; i < pages; i++) {

            navbar.push(<button className={page == i ? "currentBar" : ""} onClick={() => window.location.replace(`/products?page=${i}`)}> {i}</button >)
        }
        return navbar;
    }

    return (
        <div>
            <div className="Header">
                <h1>Heaven stylez</h1>
                <div className="form-control">
                    <div className="input-group">
                        <input type="text" placeholder="Search…" className="input input-bordered" />
                        <button className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
                <div className='bag'>
                    <p>Кошница</p>
                </div>
            </div>
            <div className='navbar'>
                <h2>Обувки</h2>
                <h2>Слушалки</h2>
                <h2>Часовници</h2>
            </div>

            <div className="products">
                <div className="topProducts">
                    <h2>TOP PRODUCTS</h2>
                    <div className="scroller" data-speed="slow" onMouseEnter={() => { animate.current.classList.add("animationPause") }}>
                        <ul ref={animate} className="tag-list scroller__inner">
                            <div className="sales">
                                <div className="product">
                                    <img src={image} alt="Shoes" />
                                    <h1>Shoes</h1>
                                    <h1>Price: </h1>
                                </div>
                            </div>
                            <div className="sales">
                                <div className="product">
                                    <img src={image} alt="Shoes" />
                                    <h1>Shoes</h1>
                                    <h1>Price: </h1>
                                </div>
                            </div>
                            <div className="sales">
                                <div className="product">
                                    <img src={image} alt="Shoes" />
                                    <h1>Shoes</h1>
                                    <h1>Price: </h1>
                                </div>
                            </div>
                            <div className="sales">
                                <div className="product">
                                    <img src={image} alt="Shoes" />
                                    <h1>Shoes</h1>
                                    <h1>Price: </h1>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="left">
                    <div className="filter">
                        <h1>Filter</h1>
                        <p>price</p>
                        <input type="range" min={0} max="100" value="20" className="range" />
                    </div>
                    <div className="brands">
                        <h1>Nike</h1>
                        <h1>Samsung</h1>
                        <h1>Redmi</h1>
                    </div>
                </div>
                <div className="sales">
                    {products && products.map((product, key) => {
                        console.log(product);
                        return (
                            <div className='product'>
                                <div className="wrapper">
                                    <img src={productImages[key].isPrimaryImage ? `http://localhost:8000/${product.primaryImagePath}` : `http://localhost:8000/${product.secondaryImagePath}`} alt="Shoes"
                                        onMouseEnter={() => {
                                            setProductImages((prev) => {
                                                const arr = [...prev];
                                                arr[key].isPrimaryImage = true;

                                                return arr;
                                            });
                                        }}
                                        onMouseLeave={() => {
                                            setProductImages((prev) => {
                                                prev[key].isPrimaryImage = true;
                                                return prev
                                            });
                                        }}

                                        onClick={() => {
                                            window.location.replace(`/product?id=${product.id}`)
                                        }}
                                    />
                                </div>
                                <h1>{product.title}</h1>
                                <h1>Price: {product.price}</h1>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="bottomBar">
                {bottomNavbar()}
            </div>
        </div>
    )
}

export default Products;