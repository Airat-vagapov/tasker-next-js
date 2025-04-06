import { useFormik } from "formik";

import Input from "@/ui/Input/Input";
import Button from "@/ui/Button/Button";
import axios from "axios";
import * as yup from "yup";

const AddNewTaskForm = () => {
    const addNewTask = async (text: string) => {
        await axios
            .post("http://localhost:8080/task", {
                text: text,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addNewTaskForm = useFormik({
        initialValues: {
            text: "",
        },
        validationSchema: yup.object({
            text: yup.string().required("Required"),
        }),
        onSubmit: async (values) => {
            console.log(values);

            try {
                await addNewTask(values.text);
                addNewTaskForm.values.text = "";
            } catch (err) {
                console.error(err);
            }
        },
    });

    const { errors, touched } = addNewTaskForm;
    return (
        <div className="">
            <form
                className="flex flex-col gap-5"
                onSubmit={addNewTaskForm.handleSubmit}
            >
                <p className="text-center">Add new task</p>
                {errors.text && touched.text && <div>{errors.text}</div>}
                <Input
                    label="Task text"
                    id="text"
                    name="text"
                    inptType="text"
                    onChange={addNewTaskForm.handleChange}
                    onBlur={addNewTaskForm.handleBlur}
                    value={addNewTaskForm.values.text}
                    errorText={errors.text}
                />

                <Button btnType="submit" text={"Add new task"} />
            </form>
        </div>
    );
};

export default AddNewTaskForm;
