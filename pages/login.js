import Button from "../components/Button";
import { useState } from "react";
import styles from "../styles/sass/auth.module.scss";
import { useAuth } from "../contexts/AuthContext";
import { Formik } from "formik";
import Input from "../components/Input";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { loginSchema } from '../utils/schemas'

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onFinish({ email, password }) {
    setLoading(true);

    try {
      setError("");
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }
  return (
    <div className={styles.middle_container}>
      <Head>
        <meta
          name="description"
          content="Store your ingredients and recipes nutrition values so you can stop worring about them"
        />
        <title>Log In - Nutrition cooking</title>
      </Head>
      <Formik
        initialValues={{
          email:"",
          password:""
        }}
        validationSchema={loginSchema}
        onSubmit={onFinish}
      >
        {(formik) => (
          <form className="log_form" onSubmit={formik.handleSubmit}>
            <h1 className={`md-26 ${styles.title}`}>Log In</h1>
            {error && <div className={styles.error}>{error} </div>}
            <div className="form_group">
              <Input
                id="email"
                label="Email"
                {...formik.getFieldProps("email")}
                type="email"
                error={formik.errors.email}
                touched={formik.touched.email}
                placeholder="Email"
              />
              <Input
                id="password"
                label="Password"
                {...formik.getFieldProps("password")}
                type="password"
                error={formik.errors.password}
                touched={formik.touched.password}
                placeholder="Password"
              />
            </div>
            <div className="flex flex-hc">
              <Button loading={loading}>Log In</Button>
            </div>
            <p className={styles.info}>
              Don't have an account? <Link href="/signup">Sign Up</Link>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
}
