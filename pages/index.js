import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { login } from '../services/api';
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/authSlice";
import { login } from "../services/api";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [toggelFieldType, setToggleFieledType] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (payload) => {
    setLoading(true);
    try {
      const { data } = await login(payload);
      dispatch(setAuth(data));
      setLoading(false);
      toast.success("Login Successfull");
      router.replace("/account");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <div>
      <Head>
        <title>Admin Panel</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/navbar/logo-alt.png" />
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex w-full max-w-xl rounded-lg shadow-lg bg-base-300 ">
          <div className="w-full p-4 lg:p-10">
            <h1 className="mb-6 text-3xl font-bold text-center">Admin Login</h1>
            <form
              className="h-full space-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  className={`input ${
                    errors.email ? "input-error" : "input-primary"
                  } input-bordered`}
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                {errors.email && (
                  <label className="label">
                    <span className="text-red-500 label-text-alt">
                      Please add a valid E-mail
                    </span>
                  </label>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative w-full">
                  <input
                    type={toggelFieldType ? "text" : "password"}
                    placeholder="Password"
                    className={`input ${
                      errors.password ? "input-error" : "input-primary"
                    } input-bordered w-full`}
                    {...register("password", {
                      required: true,
                    })}
                  />
                  {toggelFieldType ? (
                    <AiOutlineEyeInvisible
                      className="absolute text-xl cursor-pointer top-4 right-3"
                      onClick={() => setToggleFieledType(!toggelFieldType)}
                    />
                  ) : (
                    <AiOutlineEye
                      className="absolute text-xl cursor-pointer top-4 right-3"
                      onClick={() => setToggleFieledType(!toggelFieldType)}
                    />
                  )}
                </div>
                <label className="label">
                  {errors.password ? (
                    <span className="text-red-500 label-text-alt">
                      Password is a required field
                    </span>
                  ) : (
                    <span className="label-text-alt"></span>
                  )}
                  {/* <Link href="/auth/forget-password" passHref>
                                    <span className="font-bold cursor-pointer label-text-alt text-primary-blue hover:text-black">Forget Password?</span>
                                </Link> */}
                </label>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className={`btn px-10 my-6 ${
                    loading && "loading"
                  } btn-primary w-full border-0`}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;