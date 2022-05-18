/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';
import Cookie from 'js-cookie'
import { useRouter } from 'next/router';

const Signin = () => {
  const initialState = { email: '', password: '' };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

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
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await postData('auth/login', userData);

    if (res.err) {
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    }
    dispatch({ type: "NOTIFY", payload: { success: res.msg } });

    dispatch({
      type: "AUTH", payload: {
        token: res.accessToken,
        user: res.user
      }
    });

    Cookie.set('refreshToken', res.refreshToken, {
      path: 'api/auth/accessToken',
      expires: 7
    });

    localStorage.setItem('firstLogin', true);
  }

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      router.push('/');
    }
  }, [auth])

  return (
    <div>
      <Head>
        <title>Sign in Page</title>
      </Head>

      <form className="mx-auto my-4" style={{ maxWidth: '500px' }} onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label mt-4">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email} onChange={handleChangeInput} />
        </div>
        <div className="form-group">
          <label className="form-label mt-4">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" value={password} onChange={handleChangeInput} />
        </div>
        <button type="submit" className="btn btn-dark mt-4 w-100">Login</button>
        <p className="my-2">No tienes una cuenta?
          <Link href="/register"><a style={{ color: 'crimson' }}> Registrarse</a></Link>
        </p>
      </form>
    </div>
  )
}

export default Signin;