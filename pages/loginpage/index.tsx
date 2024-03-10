import { CloseOutlined } from '@ant-design/icons';
import { TextField } from '@mui/material';
import { Modal } from 'antd';
import { Formik } from 'formik';
import { useContext, useRef, useState } from 'react';
import * as Yup from 'yup';
import XLogo from '../../assets/xlogo.svg';
import Button from '../../components/atoms/Button';
import AuthContext from '../../context/AuthContext';
import { login, register } from '../../services/public/auth';

const LoginPage = () => {

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isUnderConstructionModalOpen, setIsUnderConstructionModalOpen] = useState(false);


    return (
        <div className='flex flex-col  min-h-lvh'>
            <div className='flex flex-1 flex-row justify-between items-center'>
                <div className='sm:flex sm:flex-1 hidden justify-center p-1'>
                    <img src={XLogo} />
                </div>
                <div className='flex-1 justify-center p-1 sm:text-left'>
                    <div className='flex sm:hidden justify-start px-10 pt-5'>
                        <img src={XLogo} className={'w-10 h-10'} />
                    </div>
                    <p className='text-4xl sm:text-7xl font-bold font-serif my-10 break-all px-10 sm:px-0'>Happening now</p>
                    <p className='text-3xl font-bold font-serif mb-10 px-10 sm:px-0'>Join today. </p>
                    <div >
                        <div className='flex flex-col  sm:max-w-96 sm:px-0 px-10 self-center flex-1 '>
                            <Button onClick={() => setIsUnderConstructionModalOpen(true)} title={'Continue With google'} />
                            <Button onClick={() => setIsUnderConstructionModalOpen(true)} title={'Sign Up With Apple'} />
                            <div className='flex flex-row items-center'>
                                <div className='h-[0.5px] w-auto flex-1 bg-gray-200' />
                                <p className='px-2' >or</p>
                                <div className='h-[0.5px] w-auto flex-1 bg-gray-200' />
                            </div>
                            <Button title={'Create Account'} variant={"primary"} onClick={() => setIsRegisterModalOpen(true)} />
                            <p className='text-xs mb-[20px]'>By signing up, you agree to the <span className='text-blue-500'>Terms of Service</span> and <span className='text-blue-500'>Privacy Policy</span>, including Cookie Use.</p>
                            <div className='mt-[40px] flex flex-col'>
                                <p>Already have an account?</p>
                                <div onClick={() => setIsLoginModalOpen(true)} className='flex flex-1'>
                                    <Button title={'Sign In'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-1 flex-row items-center justify-center py-1 gap-4 flex-wrap px-10' >
                <a href="" className='text-xs hover:underline hover:text-gray-500'>About</a>
                <a href="" className='text-xs hover:underline hover:text-gray-500'>Download the X app</a>
                <a href="" className='text-xs hover:underline hover:text-gray-500'>Help Center</a>
                <a href="" className='text-xs hover:underline hover:text-gray-500'>Terms of Service</a>
                <a href="" className='text-xs hover:underline hover:text-gray-500'>Privacy Policy</a>
                <a href="" className='text-xs hover:underline hover:text-gray-500'>Cookie Policy</a>
                <a href="" className='text-xs hover:underline hover:text-gray-500'>Accessibility</a>
                <a href="" className='text-xs hover:underline hover:text-gray-500'>Ads info</a>
                <a href="" className='text-xs hover:underline hover:text-gray-500'>Blog</a>
                <a href="" className='text-xs hover:underline hover:text-gray-500'>Status</a>
                <a href="" className='text-xs hover:underline hover:text-gray-500'>Careers</a>
                <a href="" className='text-xs hover:underline hover:text-gray-500'>Brand Resources</a>
                <a href="" className='text-xs hover:underline hover:text-gray-500'>Advertising</a>
                <a href="" className='text-xs hover:underline hover:text-gray-500'>Marketing</a>
                <a href="" className='text-xs hover:underline hover:text-gray-500'>X for Business</a>
                <a href="" className='text-xs hover:underline hover:text-gray-500'>Developers</a>
                <a href="" className='text-xs hover:underline hover:text-gray-500'>Directory</a>
                <a href="" className='text-xs hover:underline hover:text-gray-500'>Settings</a>
                <a href="" className='text-xs hover:underline hover:text-gray-500'>© 2024 X Corp.</a>
            </div>
            <ModalRegister isRegisterModalOpen={isRegisterModalOpen} setIsRegisterModalOpen={setIsRegisterModalOpen} />
            <ModalLogin isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
            <ModalUnderContruction isUnderContructionModalOpen={isUnderConstructionModalOpen} setIsUnderConstructionModalOpen={setIsUnderConstructionModalOpen} />
        </div>
    )
}


const ModalHeader = ({ handleCancel }: { handleCancel: any }) => {
    return (
        <div className='flex flex-row'>
            <button type={'button'} onClick={handleCancel}><CloseOutlined /></button>
            <div className="flex flex-1 justify-center">
                <img src={XLogo} className='w-5 h-5' />
            </div>
        </div>
    )
}

const ModalRegister = ({ setIsRegisterModalOpen, isRegisterModalOpen }: { setIsRegisterModalOpen: any, isRegisterModalOpen: boolean }) => {
    const { setIsLoggedInCtx } = useContext(AuthContext)
    const [errorsApi, setErrorsApi] = useState<string>("")

    const formikRef = useRef<any>();
    const signUpSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        username: Yup.string().required('Username is required').matches(/^(\S+$)/g, '* This field cannot contain only blankspaces'),
        password: Yup.string().required('Password is required')
    });

    return (
        <Modal title={<ModalHeader
            handleCancel={() => {
                formikRef?.current?.resetForm();
                setIsRegisterModalOpen(false)
            }} />}
            centered={true}
            open={isRegisterModalOpen}
            onOk={() => { }}
            footer={<></>}
            closeIcon={<></>}
            onCancel={() => formikRef?.current?.resetForm()}>
            <Formik
                innerRef={formikRef}
                initialValues={{ name: '', username: '', password: '' }}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    try {
                        const res = await register({ name: values.name, username: values.username, password: values.password })
                        if (res.status === 200) {
                            setIsLoggedInCtx(true)
                            localStorage.setItem('name', res.data?.data?.user?.name)
                            localStorage.setItem('username', res.data?.data?.user?.username)
                            localStorage.setItem('id', res.data?.data?.user?.id)
                            localStorage.setItem('accessToken', res.data?.data?.accessToken)
                        }
                    }
                    catch (e: any) {
                        e?.response?.status === 400 ? setErrorsApi(e?.response?.data?.errors) : null
                    }
                    setSubmitting(false);
                }}
                validationSchema={signUpSchema}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    handleBlur,
                    touched,
                    errors,
                    isValid,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col flex-1 ustify-center py-2 sm:px-10 '>
                            <p className='font-bold text-2xl'>Create Accounts</p>
                            <div className='py-4 '>
                                <TextField onBlur={handleBlur} value={values.name} name='name' onChange={handleChange} className='w-full' autoComplete='true' label="Name" variant="outlined" />
                                {errors.name && touched.name ? <p className='text-sm text-red-500'>{errors.name}</p> : null}
                            </div>
                            <div className='py-4 '>
                                <TextField onBlur={handleBlur} value={values.username} name="username" onChange={handleChange} autoComplete='true' className='w-full' label="Username" variant="outlined" />
                                {errors.username && touched.username ? <p className='text-sm text-red-500'>{errors.username}</p> : null}

                            </div>
                            <div className='py-4 '>
                                <TextField onBlur={handleBlur} value={values.password} name='password' onChange={handleChange} className='w-full' autoComplete='true' type='password' label="Password" variant="outlined" />
                                {errors.password && touched.password ? <p className='text-sm text-red-500'>{errors.password}</p> : null}
                            </div>
                            <div>
                                {errorsApi !== "" ? <p className='text-sm text-red-500'>{errorsApi}</p> : null}
                            </div>
                            <div className='flex flex-1'>
                                <Button type="submit" disabled={!isValid} variant='primary' title={isSubmitting ? "loading..." : "Sign Up"} />
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </Modal>
    )
}

const ModalLogin = ({ setIsLoginModalOpen, isLoginModalOpen }: { setIsLoginModalOpen: any, isLoginModalOpen: boolean }) => {
    const { setIsLoggedInCtx } = useContext(AuthContext)
    const [errorsApi, setErrorsApi] = useState<string>("")

    const signinSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });

    return (
        <Modal title={<ModalHeader handleCancel={() => setIsLoginModalOpen(false)} />} centered={true} open={isLoginModalOpen} onOk={() => setIsLoginModalOpen(false)} footer={<></>} closeIcon={<></>} onCancel={() => setIsLoginModalOpen(false)}>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    try {
                        const res = await login({ username: values.username, password: values.password })
                        if (res.status === 200) {
                            setIsLoggedInCtx(true)
                            localStorage.setItem('name', res.data?.data?.user?.name)
                            localStorage.setItem('username', res.data?.data?.user?.username)
                            localStorage.setItem('id', res.data?.data?.user?.id)
                            localStorage.setItem('accessToken', res.data?.data?.accessToken)
                        }
                    } catch (e: any) {
                        if (e?.response?.status === 401) setErrorsApi("Username or password is wrong");
                    }
                    setSubmitting(false);
                }}
                validationSchema={signinSchema}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    handleBlur,
                    touched,
                    errors,
                    isValid,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col flex-1 ustify-center py-2 sm:px-10 '>
                            <p className='font-bold text-2xl'>Sign In</p>
                            <div className='py-4'>
                                <TextField autoComplete={'true'} onBlur={handleBlur} name='username' value={values.username} onChange={handleChange} label="Username" variant="outlined" style={{ width: '100%' }} />
                                {errors.username && touched.username ? <p className='text-sm text-red-500'>{errors.username}</p> : null}
                            </div>
                            <div className='py-4'>
                                <TextField autoComplete={'true'} onBlur={handleBlur} name='password' value={values.password} onChange={handleChange} type='password' label="Password" variant="outlined" style={{ width: '100%' }} />
                                {errors.password && touched.password ? <p className='text-sm text-red-500'>{errors.password}</p> : null}
                            </div>
                            <div>
                                {errorsApi !== "" ? <p className='text-sm text-red-500'>{errorsApi}</p> : null}
                            </div>
                            <div className='flex flex-1'>
                                <Button type="submit" disabled={!isValid} variant='primary' title={isSubmitting ? "loading..." : "Sign In"} />
                            </div>
                        </div>
                    </form>)}
            </Formik>
        </Modal>
    )
}

const ModalUnderContruction = ({ setIsUnderConstructionModalOpen, isUnderContructionModalOpen }: { setIsUnderConstructionModalOpen: any, isUnderContructionModalOpen: boolean }) => {
    return (
        <Modal title="Underconstruction!!!" centered={true} open={isUnderContructionModalOpen} footer={<></>} onOk={() => setIsUnderConstructionModalOpen(false)} onCancel={() => setIsUnderConstructionModalOpen(false)}>
            <p>Stay tune! Feature is underconstruction!</p>
        </Modal>
    )
}

export default LoginPage;