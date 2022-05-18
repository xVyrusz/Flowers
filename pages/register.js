/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import valid from "../utils/valid";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import { useRouter } from 'next/router';


const Register = () => {
  const initialState = { name: '', email: '', password: '', cf_password: '' };
  const [userData, setUserData] = useState(initialState);
  const { name, email, password, cf_password } = userData;

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const router = useRouter();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = valid(name, email, password, cf_password);
    if (errMsg) {
      return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
    }

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await postData('auth/register', userData);

    if (res.err) {
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    }
    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  }

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      router.push('/');
    }
  }, [auth])

  return (
    <div>
      <Head>
        <title>Register Page</title>
      </Head>

      <form className="mx-auto my-4" style={{ maxWidth: '500px' }} onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label mt-4">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={name} onChange={handleChangeInput} placeholder="Enter Name" />
        </div>
        <div className="form-group">
          <label className="form-label mt-4">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={email} onChange={handleChangeInput} placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label className="form-label mt-4">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={password} onChange={handleChangeInput} placeholder="Password" />
        </div>
        <div className="form-group">
          <label className="form-label mt-4">Confirm Password</label>
          <input type="password" className="form-control" id="exampleInputPassword2" name="cf_password" value={cf_password} onChange={handleChangeInput} placeholder="Confirm Password" />
        </div>
        <button type="submit" className="btn btn-dark mt-4 w-100">Register</button>
        <p className="my-2">Ya tienes una cuenta?
          <Link href="/signin"><a style={{ color: 'crimson' }}> Iniciar sesión</a></Link>
        </p>
      </form>
    </div>
  )
}

export default Register;