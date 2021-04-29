import { useState } from "react";
import styles from "../styles/sass/auth.module.scss";
import { Formik } from "formik";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../contexts/AuthContext";
import Head from "next/head";
import { registerSchema } from "../utils/schemas";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onFinish({ name, email, password, confirmPassword }) {
    setLoading(true);
    setError();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);

      return;
    }
    try {
      setError("");
      await signup({ name, email, password });
      router.push("/login");
    } catch (err) {
      setError(err.message);
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
        <title>Sign up - Nutrition cooking</title>
      </Head>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerSchema}
        onSubmit={onFinish}
      >
        {(formik) => (
          <form className="log_form" onSubmit={formik.handleSubmit}>
            <h1 className={`md-26 ${styles.title}`}>Sign Up</h1>
            {error && <div className={styles.error}>{error} </div>}
            <div className="form_group">
              <Input
                id="name"
                label="Name"
                {...formik.getFieldProps("name")}
                error={formik.errors.name}
                touched={formik.touched.name}
                placeholder="name"
              />
              <Input
                id="email"
                label="Email"
                {...formik.getFieldProps("email")}
                error={formik.errors.email}
                touched={formik.touched.email}
                type="email"
                placeholder="Email"
              />
              <Input
                id="password"
                label="Password"
                {...formik.getFieldProps("password")}
                error={formik.errors.password}
                touched={formik.touched.password}
                type="password"
                placeholder="Password"
              />
              <Input
                id="confirmPassword"
                label="Confirm Password"
                {...formik.getFieldProps("confirmPassword")}
                error={formik.errors.confirmPassword}
                touched={formik.touched.confirmPassword}
                type="password"
                placeholder="Confirm password"
              />
            </div>
            <div className="flex flex-hc">
              <Button loading={loading}>Sign Up</Button>
            </div>
            <p className={styles.info}>
              Already have an account? <Link href="/login">Log In</Link>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
}
