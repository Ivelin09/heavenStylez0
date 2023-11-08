import '../styles/createprod.css'
import { useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
const CreateProd = () => {
    const title = useRef();
    const description = useRef();
    const price = useRef()
    let getRole;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async (event) => {

        }


        fetchData();
    }, [])

    const HandleRequest = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("title", event.target.title.value);
        formData.append("description", event.target.description.value);
        formData.append("price", event.target.price.value);
        formData.append("path", Date.now() + '-' + Math.round(Math.random() * 1E9));
        console.log(event.target.secondImage.files[0]);
        formData.append("primaryImage", event.target.primaryImage.files[0]);
        formData.append("secondaryImage", event.target.secondImage.files[0]);
        for (let i = 0; i < event.target.image.files.length; i++)
            formData.append("image", event.target.image.files[i]);

        const response = await fetch(`http://localhost:8000/products`, {
            method: "POST",
            body: formData
        });


        console.log(title.current.value, description.current.value, price.current.value)
    }

    // return response.json(); 

    return (
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                {/* <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> */}
                <div className="card-body">
                    <h2 className="card-title">Fill in the blanks</h2>
                    <form onSubmit={HandleRequest}>
                        <input ref={title} type="text" name="title" placeholder="Type Title here" className="input input-bordered w-full max-w-xs" />
                        <input ref={description} type="text" name="description" placeholder="Type Description here" className="input input-bordered w-full max-w-xs" />
                        <h1>Images</h1>
                        <input type="file" multiple name="image" className="file-input file-input-bordered w-full max-w-xs" />
                        <h1>secondary image</h1>
                        <input type="file" name="secondImage" className="file-input file-input-bordered w-full max-w-xs" />
                        <h1>primary image</h1>
                        <input type="file" name="primaryImage" className="file-input file-input-bordered w-full max-w-xs" />
                        <input ref={price} type="number" name="price" placeholder="Type Price here" className="input input-bordered w-full max-w-xs" />
                        <div className="card-actions justify-end">
                            <input type="submit" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default CreateProd;