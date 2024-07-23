import React from "react"
import { Card, Flex, Input, Typography } from "antd"
import { useForm, Controller } from "react-hook-form"
import "./Auth.css"
import { registerUser } from "../../api"
import { useNavigate } from "react-router-dom"

const { Text } = Typography

const Register = () => {

    const { handleSubmit, formState: { errors }, control , reset } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const token = await registerUser(data)
        console.log(token)
        if(token) {
            reset()
            navigate("/login")
            alert("Register Success please login")
        }
    }

    return (
        <div className="container">
            <Card className="card" hoverable title="Register" bordered={false} style={{ width: 300 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex vertical gap={10}>
                        <div>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: "Name is required" }}
                                render={({ field }) => <Input placeholder="Name" {...field} status={errors.name ? "error" : ""}/>}
                            />
                            {errors.name && <Text type={errors.name ? "danger" : undefined}>{typeof errors.name.message}</Text>}
                        </div>
                        <div>
                            <Controller
                                name="email"
                                control={control}
                                rules={{ required: "Email is required" }}
                                render={({ field }) => <Input placeholder="Email Address" {...field} status={errors.email ? "error" : ""}/>}
                            />
                            {errors.email && <Text type={errors.email ? "danger" : undefined}>{typeof errors.email.message}</Text>}
                        </div>
                        <div>
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: "Password is required" }}
                                render={({ field }) => <Input placeholder="Password" {...field} status={errors.password ? "error" : ""}/>}
                            />
                            {errors.password && <Text type={errors.password ? "danger" : undefined}>{typeof errors.password.message}</Text>}
                        </div>
                        <button type="submit">Submit</button>
                    </Flex>
                </form>
            </Card>
        </div>
    );
}

export default Register;