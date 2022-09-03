import Head from "next/head";
import React from "react";
import Users from "../../components/users";

const index = () => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Users />
    </>
  );
};

export default index;
