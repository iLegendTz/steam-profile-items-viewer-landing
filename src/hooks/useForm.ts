import { useState, useEffect } from "react"

export const useForm = <T, D>(initialForm: T, validateForm?: (form: T) => D) => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState<D | {}>({});

    const handleChange = (name: string, value: string) => {
        setForm({
            ...form,
            [name]: value,
        });
    }

    const handleBlur = (name: string, value: string) => {
        handleChange(name, value);
    }

    const cleanForm = () => {
        setForm(initialForm);
    }

    useEffect(() => {
        if (validateForm) {
            setErrors(validateForm(form));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form])


    return { form, errors, handleChange, handleBlur, cleanForm }
}
