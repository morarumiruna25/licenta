import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../store/GlobalState';
// import { postData } from '../utils/fetchData';
// import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import Link from "next/link";

const Login = () => {
  const initialState = {
    email: '',
    password: ''
  };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;
  const { state, dispatch } = useContext(DataContext);

  const { auth } = state;

   const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'NOTIFY', payload: { loading: true } });
    const res = await postData('/login', userData);

    if (res.err)
      return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
    dispatch({ type: 'NOTIFY', payload: { success: res.msg } });

    dispatch({
      type: 'AUTH',
      payload: {
        token: res.access_token,
        user: res.user
      }
    });

    Cookie.set('refreshtoken', res.refresh_token, {
      path: 'api/accessToken',
      expires: 7
    });

    localStorage.setItem('firstLogin', true);
  };
  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push('/');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  return (
    <div>
      <div>
        <Head>
          <title>Welcome to Next.js!</title>
        </Head>
      </div>

      <div className="flex justify-center pt-3 px-0">
        <div className="w-11/12 p-5 bg-white sm:w-11/12 md:w-3/4 lg:w-8/12">
          <h1 className="text-xl text-center pb-3 font-semibold">
            Hello there 👋
          </h1>
          <form className="mt-6" onSubmit={handleSubmit}>
            <label
              htmlFor="email"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={handleChangeInput}
              placeholder="turism.oltenia@company.com"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            />
            <label
              htmlFor="password"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handleChangeInput}
              placeholder="*************"
              className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            />
            <button
              href="/registeruser"
              type="submit"
              className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
              Login
            </button>
            {/* <a
              type="submit"
              href="/registeruser"
              className="text-xl flex justify-between inline-block mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">
              Nu ai cont ? - Inregistrare
            </a> */}
          </form>
          <Link  href="/register">
          <button
             
              className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
              Register
            </button>
            </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;