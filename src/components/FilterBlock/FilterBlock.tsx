'use client'

import Button from "@/ui/Button/Button";
import Input from "@/ui/Input/Input";
import Droplist from "@/ui/Droplist/Droplist";
import { Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

// Data
import { priorityData } from '@/data/priority'
import TextLink from "@/ui/TextLink/TextLink";

type FilterBlockProps = {
    params: {
        status_id: string,
        priority: string,
        search: string,
        sortBy: string,
        order: string,
    };
}

const FilterBlock: React.FC<FilterBlockProps> = ({ params }) => {
    const router = useRouter()

    // Effects
    const searchParams = useSearchParams();
    // Очистка формы, когда нет параметров в URL
    useEffect(() => {

    }, [searchParams.toString()])


    // Fromik settings
    type FilterValuesProps = {
        task_id: string,
        // status_id: string,
        priority: string,
        search: string,
        sortBy: string,
        order: string,
    }
    console.log('status_id', params.status_id)
    return (
        <>
            <div className="p-8 flex flex-col justify-end gap-4 rounded-xl bg-lightblack text-white">
                <Formik<FilterValuesProps>
                    initialValues={{
                        task_id: params.status_id ?? '',
                        // status_id: '',
                        priority: '',
                        search: '',
                        sortBy: '',
                        order: '',
                    }}
                    onSubmit={(values) => {
                        const searchParams = new URLSearchParams();
                        Object.entries(values).forEach(([key, value]) => {
                            if (value) searchParams.set(key, String(value).toLowerCase())
                        })
                        router.push(`/?${searchParams}`)
                    }}
                >
                    {(filterForm) => (
                        <Form className="relative grid grid-cols-4 gap-8 items-end">
                            <Input
                                label="Task ID"
                                id="task_id"
                                name="task_id"
                                placeholder="Enter task ID"
                                inptType="text"
                                tooltipText="Search by task ID"
                            ></Input>
                            <Input
                                label="Search"
                                id="search"
                                name="search"
                                placeholder="Enter search query"
                                inptType="text"
                                tooltipText="Search by task title and description"
                            ></Input>
                            <Droplist
                                id="priority"
                                name="priority"
                                label="Priority"
                                placeholder="Select priotity"
                                options={priorityData}
                            />
                            <div className="absolute top-0 right-0">
                                <TextLink type={'action'} action={() => {
                                    filterForm.resetForm()
                                    filterForm.submitForm()

                                }}>Clear form</TextLink>
                            </div>
                            <Button text={"Apply"} btnType='submit' />
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default FilterBlock;
