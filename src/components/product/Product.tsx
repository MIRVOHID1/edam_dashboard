import React from "react";
import "./Products.css";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, createProduct } from '../../redux/product/productSlice';
import axios from 'axios';

interface Product {
    _id: string;
    title: string;
    image: string;
    subtitle: string;
    description: string;
    rate: number;
    price: number;
    size: number;
    color: string;
}

const Product = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: any) => state.product);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newProduct, setNewProduct] = useState<Product>({
        _id: '',
        title: "",
        image: '',
        subtitle: "",
        description: "",
        rate: 0,
        price: 0,
        size: 0,
        color: ""
    });
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product>({
        _id: '',
        title: "",
        image: "",
        subtitle: "",
        description: "",
        rate: 0,
        price: 0,
        size: 0,
        color: ""
    });

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(
                `https://ecommerce-backend-fawn-eight.vercel.app/api/products/${id}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("token") || "",
                    },
                }
            );

            if (response.data) {
                dispatch(fetchProducts());
            }
        } catch (err) {
            console.log(err);
        }
        console.log(id);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    }

    const handleSubmit = () => {
        dispatch(createProduct(newProduct));
        setShowModal(false);
    };

    const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSelectedProduct({ ...selectedProduct, [name]: value });
    };

    const handleOk = async () => {
        setIsModalOpen(false);
        try {
            const response = await axios.put(
                `https://ecommerce-backend-fawn-eight.vercel.app/api/products/${selectedProduct._id}`,
                {
                    title: selectedProduct.title,
                    subtitle: selectedProduct.subtitle,
                    image: selectedProduct.image,
                    description: selectedProduct.description,
                    rate: selectedProduct.rate,
                    price: selectedProduct.price,
                    size: selectedProduct.size,
                    color: selectedProduct.color,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("token") || "",
                    },
                }
            );
            if (response.data) {
                dispatch(fetchProducts());
            }
        } catch (error) {
            console.log(error);
        }
    };

    console.log(products);
    return (
        <div className="products">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Products</h1>
                <button
                    style={{ padding: "10px 20px", borderRadius: "8px" }}
                    className="btn btn-success"
                    onClick={() => setShowModal(true)}
                >
                    Create Product
                </button>
            </div>
            <table className="table__product">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Image</th>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item: Product, index: number) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>

                            <td>
                                <img src={item.image} alt={item.title} width="100" />
                            </td>
                            <td>
                                <button onClick={() => { setSelectedProduct(item); setIsModalOpen(true) }}>Edit</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Create New Product</h2>
                        <input
                            type="text"
                            name="title"
                            placeholder="Product title"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="image"
                            placeholder="Product Image URL"
                            onChange={handleInputChange}
                        />

                        <input
                            type="text"
                            name="subtitle"
                            placeholder="Product subtitle"
                            onChange={handleInputChange}
                        />

                        <input  
                            type="text"
                            name="description"
                            placeholder="Product description"
                            onChange={handleInputChange}
                        />  

                        <input
                            type="number"
                            name="rate"
                            placeholder="Product rate"
                            onChange={handleInputChange}
                        />

                        <input
                            type="number"
                            name="price"
                            placeholder="Product price"
                            onChange={handleInputChange}
                        />

                        <input
                            type="number"
                            name="size"
                            placeholder="Product size"
                            onChange={handleInputChange}
                        />

                        <input
                            type="text"
                            name="color"
                            placeholder="Product color"
                            onChange={handleInputChange}
                        />

                        <button onClick={handleSubmit}>Add Product</button>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <input
                            type="text"
                            name="title"
                            value={selectedProduct.title}
                            onChange={handleProductChange}
                        />
                        <input
                            type="text"
                            name="image"
                            value={selectedProduct.image}
                            onChange={handleProductChange}
                        />

                        <input
                            type="text"
                            name="subtitle"
                            value={selectedProduct.subtitle}
                            onChange={handleProductChange}
                        />

                        <input
                            type="text"
                            name="description"
                            value={selectedProduct.description}
                            onChange={handleProductChange}
                        />

                        <input
                            type="text"
                            name="rate"
                            value={selectedProduct.rate}
                            onChange={handleProductChange}
                        />

                        <input
                            type="text"
                            name="price"
                            value={selectedProduct.price}
                            onChange={handleProductChange}
                        />

                        <input
                            type="text"
                            name="size"
                            value={selectedProduct.size}
                            onChange={handleProductChange}
                        />

                        <input
                            type="text"
                            name="color"
                            value={selectedProduct.color}
                            onChange={handleProductChange}
                        />

                        <button onClick={handleOk}>Update Product</button>
                        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;
