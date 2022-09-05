import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {

    const [isErrorLogin, setIsErrorLogin] = useState(false)
    const { handleSubmit, register, reset, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const submit = data => {
        const url = 'https://ecommerce-api-react.herokuapp.com/api/v1/users/login'
        axios.post(url, data)
            .then(res => {
                localStorage.setItem('token', res.data.data.token)
                console.log(res.data.data.user)
                localStorage.setItem('NameUser', JSON.stringify(res.data.data.user))
                navigate('/')
            })
            .catch(err => {
                localStorage.setItem('token', '')
                setIsErrorLogin(true)
                setTimeout(() => {
                    setIsErrorLogin(false)
                }, 4200)
                reset({
                    email: '',
                    password: ''
                })
            })

    }

    return (
        <div className='card__login'>
            <form className='login__form' onSubmit={handleSubmit(submit)}>
                <div className='contain_login_title'>
                    <h2 className='login__title'>To try this page enter the email and password below</h2>
                </div>

                <div className='contain_list'>
                    <div className='login__test'>
                        <p className='flex-login'> <strong>Email:</strong>  mason@gmail.com</p>
                        <p className='flex-login'> <strong>Password:</strong>  mason1234</p>
                    </div>

                    <ul className='login__list'>
                        <li className='login-item'>
                            <input type="email" id='login-email' placeholder='Email' className='login__input' autoComplete='off' {...register('email', {
                                required: {
                                    value: true,
                                    message: "Required field"
                                },
                            })} />
                            {errors.email && <span className='error-text'>{errors.email.message}</span>}
                        </li>
                        <li className='login-item'>
                            <input type="password" id='login-password'  placeholder='Password' className='login__input' autoComplete='off' {...register('password', {
                                required: {
                                    value: true,
                                    message: "Required field"
                                },
                            })} />
                            {errors.password && <span className='error-text'>{errors.password.message}</span>}
                        </li>
                    </ul>
                    <div className="contain-button">
                        <div className='invalid'>
                            {
                                isErrorLogin
                                &&
                                'follow the instruction'
                            }
                        </div>
                        <button className='button-login'>Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login