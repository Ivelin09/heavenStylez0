import '../styles/displayprod.css'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const DisplayProd = () => {
    //console.log(title.current.value)
    const [product, setProduct] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.values())
    const pageId = searchParams.get("id");
    console.log(pageId)

    useEffect(() => {
        const fetchData = async () => {
            console.log('here', pageId)
            const response = await fetch(`http://localhost:8000/product/${pageId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((res) => res.json());
            setProduct(response.products)
            console.log(response);
        }

        fetchData();

    }, [])

    // return response.json(); 

    return (
        <div>
            {product && <img src={`http://localhost:8000/${product.primaryImagePath}`} alt="Shoes" />}

        </div>
    )
}

export default DisplayProd;