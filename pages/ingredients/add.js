import ViewLayout from "../../components/ViewLayout";
import Head from "next/head";
import Button from "../../components/Button";
import Api from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useRouter } from "next/router";
import { Formik } from "formik";
import Input from "../../components/Input";
<<<<<<< HEAD
=======
import * as Yup from 'yup';
>>>>>>> 7d17a9c0b74811355a47625ee40e1ab05626eb95
import {ingredientSchema} from '../../utils/schemas'

export default function add() {
  const router = useRouter();
  const { JWT } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit({
    name,
    portion,
    calories: portionCal,
    fat: portionFat,
    carbohydrate: portionCarb,
    protein: portionProt,
  }) {
    setError("");
    setLoading(true);
    let postData = { name };
    const calories = (portionCal / portion) * 100;
    const fat = (portionFat / portion) * 100;
    const carbohydrate = (portionCarb / portion) * 100;
    const protein = (portionProt / portion) * 100;
    postData = { ...postData, calories, fat, carbohydrate, protein };
    try {
      const response = await Api.post("ingredients", postData, {
        Authorization: `Bearer ${JWT}`,
      });
      router.push("/ingredients");
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }
  return (
    <ViewLayout title="Add" subTitle="Ingredients" loading={loading}>
      <Head>
        <title>Add Ingredients - Nutrition cooking</title>
      </Head>
      <Formik
        initialValues={{
          name: "",
          portion: "",
          calories: "",
          fat: "",
          carbohydrate: "",
          protein: "",
        }}
        validationSchema = {ingredientSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <form className="regular_form" onSubmit={formik.handleSubmit}>
            {error && (<div className="error_box">{error}</div>)}
            <div className="form_group">
              <Input
                id="name"
                name="name"
                {...formik.getFieldProps("name")}
                label="Name"
                error={formik.errors.name}
                touched={formik.touched.name}
                placeholder="Ingredient name"
              />
              <Input
                id="portion"
                name="portion"
                {...formik.getFieldProps("portion")}
                label="Portion"
                error={formik.errors.portion}
                touched={formik.touched.portion}
                placeholder="Portion size"
              />
              <Input
                id="calories"
                name="calories"
                {...formik.getFieldProps("calories")}
                label="Calories"
                error={formik.errors.calories}
                touched={formik.touched.calories}
                placeholder="Calories per portion"
              />
              <Input
                id="fat"
                name="fat"
                {...formik.getFieldProps("fat")}
                label="Fats"
                error={formik.errors.fat}
                touched={formik.touched.fat}
                placeholder="Fats per portion"
              />
              <Input
                id="carbohydrate"
                name="carbohydrate"
                {...formik.getFieldProps("carbohydrate")}
                label="Carbohydrates"
                error={formik.errors.carbohydrate}
                touched={formik.touched.carbohydrate}
                placeholder="Carbohydrates per portion"
              />
              <Input
                id="protein"
                name="protein"
                {...formik.getFieldProps("protein")}
                label="Proteins"
                error={formik.errors.protein}
                touched={formik.touched.protein}
                placeholder="Proteins per portion"
              />
            </div>
            <div className="flex flex-hc">
              <Button loading={loading}>Save</Button>
            </div>
          </form>
        )}
      </Formik>
    </ViewLayout>
  );
}
