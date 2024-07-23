import React, { useEffect, useState } from "react";
import "./Products.css";
import axios from 'axios';

interface Product1 {
    _id: string;
    __v?: number; // Add __v if it is present in the data returned from the server
    title: string;
    image: string;
    subtitle: string;
    description: string;
    rate: number;
    price: number;
    size: number;
    color: string;
}

interface Product2 {
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
    const [products, setProducts] = useState<Product1[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newProduct, setNewProduct] = useState<Product2>({
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
    const [selectedProduct, setSelectedProduct] = useState<Product1>({
        _id: "",
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
        const fetchProducts = async () => {
            try {
                const response = await axios.get<Product1[]>('https://ecommerce-backend-fawn-eight.vercel.app/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(
                `https://ecommerce-backend-fawn-eight.vercel.app/api/products/${id}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("token") || "",
                    },
                }
            );
            setProducts(products.filter(product => product._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post<Product1>(
                'https://ecommerce-backend-fawn-eight.vercel.app/api/products',
                newProduct,
                {
                    headers: {
                        Authorization: localStorage.getItem("token") || "",
                    },
                }
            );
            setProducts([...products, response.data]);
            setShowModal(false);
        } catch (error) {
            console.error('Failed to create product', error);
        }
    };

    const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSelectedProduct(prevState => ({ ...prevState, [name]: value }));
    };

    const handleOk = async () => {
        setIsModalOpen(false);
        try {
            const { _id, __v, ...productData } = selectedProduct; // Remove _id and __v before updating
            await axios.put(
                `https://ecommerce-backend-fawn-eight.vercel.app/api/products/${_id}`,
                productData,
                {
                    headers: {
                        Authorization: localStorage.getItem("token") || "",
                    },
                }
            );
            setProducts(products.map(product =>
                product._id === _id ? { ...productData, _id } : product
            ));
        } catch (error) {
            console.log(error);
        }
    };

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
                    {products.map((item, index) => (
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
                            type="number"
                            name="rate"
                            value={selectedProduct.rate}
                            onChange={handleProductChange}
                        />
                        <input
                            type="number"
                            name="price"
                            value={selectedProduct.price}
                            onChange={handleProductChange}
                        />
                        <input
                            type="number"
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
