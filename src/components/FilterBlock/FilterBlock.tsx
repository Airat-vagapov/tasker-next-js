import Input from "@/ui/Input/Input";
import { useFormik } from "formik";

const FilterBlock = () => {
    // Fromik settings
    const filterForm = useFormik({
        initialValues: {
            id: '',
            status_id: '',
            priority: '',
            search: '',
            sortBy: '',
            order: '',
        },
        onSubmit: async () => {

        }
    })

    return (
        <>
            <div className="p-8 flex flex-col justify-center gap-4 rounded-xl bg-lightblack text-white">
                <form className="grid grid-cols-4 gap-8">
                    <Input
                        label="Task ID"
                        id="text"
                        name="task_id"
                        placeholder="Enter task ID"
                        inptType="text"
                        onChange={filterForm.handleChange}
                        onBlur={filterForm.handleBlur}
                        value={filterForm.values.title}
                    ></Input>
                </form>
            </div>
        </>
    )
}

export default FilterBlock;