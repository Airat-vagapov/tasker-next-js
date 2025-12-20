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
        // const paramsValueArr = Array.from(searchParams.values())
        // console.log('URL params', paramsValueArr)

        // let paramsEmptyIndx = 0
        // paramsValueArr.map((v, _) => {
        //     if (v.length) {
        //         paramsEmptyIndx++
        //     }
        // })

        // if (paramsEmptyIndx) {
        //     filterForm.resetForm()
        // }




        const params = searchParams.toString().split('&')
        params.forEach((val, _) => {
            const paramName = val.split('=')[0]
            const paramValue = val.split('=')[1]
            
            if (paramValue.length) {
                filterForm.setFieldValue(paramName, paramValue)
            }

            paramValue && paramValue.length ? filterForm.setFieldValue(paramName, '') : filterForm.resetForm()

        })

        // if (!searchParams.toString().length) {
        //     filterForm.resetForm()
        // } else {
        //     const params = searchParams.toString().split('&')
        //     console.log('URL params', params)
        // }


    }, [searchParams.toString()])


    // Fromik settings
    const filterForm = useFormik({
        initialValues: {
            search_id: '',
            status_id: '',
            priority: '',
            search: '',
            sortBy: '',
            order: '',
        },
        onSubmit: async (values) => {
            const searchParams = new URLSearchParams();
            searchParams.set('search_id', values.search_id)
            searchParams.set('search', values.search)
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
                        id="search_id"
                        name="search_id"
                        placeholder="Enter task ID"
                        inptType="text"
                        onChange={handleChange}
                        onBlur={filterForm.handleBlur}
                        value={filterForm.values.search_id}
                    ></Input>
                    <Input
                        label="Search"
                        id="search"
                        name="search"
                        placeholder="Enter search query"
                        inptType="text"
                        onChange={handleChange}
                        onBlur={filterForm.handleBlur}
                        value={filterForm.values.search}
                    ></Input>

                    {/* <Button btnType="submit" text={"Add new task"} /> */}
                </form>
            </div>
        </>
    )
}

export default FilterBlock;