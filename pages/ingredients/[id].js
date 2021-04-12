import ViewLayout from "../../components/ViewLayout";
import Head from "next/head";
import SkeletonForm from "../../components/SkeletonForm";
import styles from "../../styles/viewlayout.module.css";
import Api from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useRouter } from "next/router";
import { nonZero, positiveNumberVal } from "../../utils/validation";
import { ingredientSchema } from "../../utils/schemas";
import Input from "../../components/Input";
import { Formik } from "formik";
import Button from "../../components/Button";
import useSWR from "swr";

export default function Ingredient() {
  const router = useRouter();
  const { JWT, currentUser } = useAuth();
  const { data: response, error: errorSWR } = useSWR(
    !currentUser ? false : [`ingredients/${router.query.id}`, JWT]
  );

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
      const response = await Api.put(
        `ingredients/${router.query.id}`,
        postData,
        {
          Authorization: `Bearer ${JWT}`,
        }
      );
      setLoading(false);
      router.push("/ingredients");
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  }
  return (
    <ViewLayout title="Edit" subTitle={`Ingredient`}>
      <Head>
        <title>Add Ingredients - Nutrition cooking</title>
      </Head>

      {!response ? (
        <SkeletonForm />
      ) : (
        <>
          <Formik
            initialValues={{
              name: response.data.name,
              portion: 100,
              calories: response.data.calories,
              fat: response.data.fat,
              carbohydrate: response.data.carbohydrate,
              protein: response.data.protein,
            }}
            validationSchema={ingredientSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <form className="regular_form" onSubmit={formik.handleSubmit}>
                {error && <div className="error_box">{error}</div>}
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
        </>
      )}
    </ViewLayout>
  );
}
