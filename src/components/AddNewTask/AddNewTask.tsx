'use client'

import Button from "@/ui/Button/Button";
import Modal from "@/components/Modal/Modal";
import AddNewTaskForm from './AddNewTaskForm/AddNewTaskForm'
import { useState } from "react";

const AddNewTask = () => {
    // States
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    // const [taskIsAdded, setTaskIsAdded] = useState<boolean>(false);
    return (
        <>
            <Button
                onClick={() => setModalIsOpen(true)}
                text={"Add new task"}
            />
            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                <AddNewTaskForm />
            </Modal>
        </>
    );
};

export default AddNewTask;
