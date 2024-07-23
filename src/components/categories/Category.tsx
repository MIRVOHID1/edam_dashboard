


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createCategory } from '../../redux/category/categorySlice';
import axios from 'axios';
import { Button, Modal, Table, Input, Form } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import "./Categoryes.css";

interface Category {
    _id: string;
    id?: string; // Agar id maydoni bo'lsa
    name: string;
    image: string;
}

interface RootState {
    category: {
        value: Category[];
    };
}

const Category: React.FC = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.category.value);
    const [showModal, setShowModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category>({ _id: "", name: "", image: "" });
    const [newCategory, setNewCategory] = useState<Omit<Category, '_id'>>({ name: "", image: "" });    

    useEffect(() => {
        dispatch<any>(fetchCategories());
    }, [dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCategory({ ...newCategory, [name]: value });
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSelectedCategory({ ...selectedCategory, [name]: value });
    };

    const handleSubmit = () => {
        dispatch<any>(createCategory(newCategory));
        setShowModal(false);
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(
                `https://ecommerce-backend-fawn-eight.vercel.app/api/categories/${id}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("token") || "",
                    },
                }
            );
            if (response.data) {
                dispatch<any>(fetchCategories());
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleOk = async () => {
        setIsModalOpen(false);
        try {
            const response = await axios.put(
                `https://ecommerce-backend-fawn-eight.vercel.app/api/categories/${selectedCategory._id}`,
                {
                    name: selectedCategory.name,
                    image: selectedCategory.image,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("token") || "",
                    },
                }
            );
            if (response.data) {
                dispatch<any>(fetchCategories());
            }
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            render: (text: string, record: Category, index: number) => index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text: string) => <img src={text} alt="category" width="100" />,
        },
        {
            title: 'Edit',
            key: 'edit',
            render: (text: string, record: Category) => (
                <Button
                    icon={<EditOutlined />}
                    onClick={() => { setSelectedCategory(record); setIsModalOpen(true); }}
                >
                    Edit
                </Button>
            ),
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (text: string, record: Category) => (
                <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(record._id)}
                    danger
                >
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <div className="category">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Categories</h1>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setShowModal(true)}
                >
                    Create Category
                </Button>
            </div>
            <Table dataSource={categories} columns={columns} rowKey="_id" />

            <Modal
                title="Create New Category"
                visible={showModal}
                onCancel={() => setShowModal(false)}
                onOk={handleSubmit}
            >
                <Form layout="vertical">
                    <Form.Item label="Category Name">
                        <Input
                            type="text"
                            name="name"
                            placeholder="Category Name"
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item label="Category Image URL">
                        <Input
                            type="text"
                            name="image"
                            placeholder="Category Image URL"
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Update Category"
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleOk}
            >
                <Form layout="vertical">
                    <Form.Item label="Category Name">
                        <Input
                            type="text"
                            name="name"
                            value={selectedCategory.name}
                            onChange={handleCategoryChange}
                        />
                    </Form.Item>
                    <Form.Item label="Category Image URL">
                        <Input
                            type="text"
                            name="image"
                            value={selectedCategory.image}
                            onChange={handleCategoryChange}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Category;
