'use client'

import Button from "@/ui/Button/Button";
import Input from "@/ui/Input/Input";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect } from "react";

const FilterBlock = () => {
    const router = useRouter()

    // Effects
    const searchParams = useSearchParams();
    // Очистка формы, когда нет параметров в URL
    useEffect(() => {
        if (!searchParams.toString().length) {
            filterForm.resetForm()
        } else {
            const params = searchParams.toString().split('&')
            console.log('URL params', params)
        }


    }, [searchParams.toString()])


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
        onSubmit: async (values) => {
            const searchParams = new URLSearchParams();
            searchParams.set('search_id', values.id)
            router.push(`/?${searchParams}`)
        }
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        filterForm.handleChange(e)
        filterForm.submitForm()
        // const searchTimeout = setTimeout(() => filterForm.submitForm(), 200)
        // clearTimeout(searchTimeout)
    }

    return (
        <>
            <div className="p-8 flex flex-col justify-center gap-4 rounded-xl bg-lightblack text-white">
                <form className="grid grid-cols-4 gap-8">
                    <Input
                        label="Task ID"
                        id="id"
                        name="id"
                        placeholder="Enter task ID"
                        inptType="text"
                        onChange={handleChange}
                        onBlur={filterForm.handleBlur}
                        value={filterForm.values.id}
                    ></Input>

                    {/* <Button btnType="submit" text={"Add new task"} /> */}
                </form>
            </div>
        </>
    )
}

export default FilterBlock;