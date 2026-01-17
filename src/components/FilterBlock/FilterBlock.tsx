'use client'

import Button from "@/ui/Button/Button";
import Input from "@/ui/Input/Input";
import Droplist from "@/ui/Droplist/Droplist";
import { Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

// Data
import { priorityData } from '@/data/priority'

const FilterBlock = () => {
    const router = useRouter()

    // Effects
    const searchParams = useSearchParams();
    // Очистка формы, когда нет параметров в URL
    useEffect(() => {

    }, [searchParams.toString()])


    // Fromik settings
    type FilterValuesProps = {
        search_id: string,
        status_id: string,
        priority: string,
        search: string,
        sortBy: string,
        order: string,
    }

    return (
        <>
            <div className="p-8 flex flex-col justify-center gap-4 rounded-xl bg-lightblack text-white">
                <Formik<FilterValuesProps>
                    initialValues={{
                        search_id: '',
                        status_id: '',
                        priority: '',
                        search: '',
                        sortBy: '',
                        order: '',
                    }}
                    onSubmit={(values) => {
                        console.log('form values', values)
                        const searchParams = new URLSearchParams();
                        Object.entries(values).forEach(([key, value]) => {
                            if (value) searchParams.set(key, String(value).toLowerCase())
                        })
                        router.push(`/?${searchParams}`)
                    }}
                >
                    {(filterForm) => (
                        <Form className="grid grid-cols-4 gap-8">
                            <Input
                                label="Task ID"
                                id="search_id"
                                name="search_id"
                                placeholder="Enter task ID"
                                inptType="text"
                                onChange={filterForm.handleChange}
                                onBlur={filterForm.handleBlur}
                                value={filterForm.values.search_id}
                                tooltipText="Search by task ID"
                            ></Input>
                            <Input
                                label="Search"
                                id="search"
                                name="search"
                                placeholder="Enter search query"
                                inptType="text"
                                onChange={filterForm.handleChange}
                                onBlur={filterForm.handleBlur}
                                value={filterForm.values.search}
                                tooltipText="Search by task title and description"
                            ></Input>
                            <Droplist
                                id="priority"
                                name="priority"
                                label="Priority"
                                placeholder="Select priotity"
                                onChange={filterForm.handleChange}
                                onBlur={filterForm.handleBlur}
                                value={filterForm.values.priority}
                                form={filterForm}
                                options={priorityData}
                            />

                            <Button text={"Apply"} btnType='submit'></Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default FilterBlock;
