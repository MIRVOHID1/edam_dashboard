import { Card, Flex, Input, Typography } from "antd"
import { useForm, Controller } from "react-hook-form"
import "./Auth.css"
import { loginUser } from "../../api"
import { useNavigate } from "react-router-dom"

const { Text } = Typography

const Login = () => {

    const { handleSubmit, formState: { errors }, control, reset } = useForm();

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        const token = await loginUser(data)
        console.log(token)
        if(token){
            localStorage.setItem("token", token)
            reset()
            navigate("/")
            alert("Login Successful")
        }
    }

    return (
        <div className="container">
            <Card className="card" hoverable title="Login" bordered={false} style={{ width: 300 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex vertical gap={10}>
                        <div>
                            <Controller
                                name="email"
                                control={control}
                                rules={{ required: "Email is required" }}
                                render={({ field }) => <Input placeholder="Email Address" {...field} status={errors.email ? "error" : ""}/>}
                            />
                            {errors.name && <Text type={errors.email ? "danger" : ""}>{errors.name.message}</Text>}
                        </div>
                        <div>
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: "Password is required" }}
                                render={({ field }) => <Input placeholder="Password" {...field} status={errors.password ? "error" : ""}/>}
                            />
                            {errors.name && <Text type={errors.password ? "danger" : ""}>{errors.name.message}</Text>}
                        </div>
                        <button type="submit">Submit</button>
                    </Flex>
                </form>
            </Card>
        </div>
    );
}

export default Login;