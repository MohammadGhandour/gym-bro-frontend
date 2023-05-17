import { useRef, useState } from "react";
import { Stack, Form, Button } from "react-bootstrap";
import { WorkoutData } from "../App";
import { categories } from "../Constants/categories";

type WorkoutFormProps = {
    buttonText: string
    onSubmit: (data: WorkoutData) => object
    emptyFields: string[]
    submitting: boolean
    error: string
} & Partial<WorkoutData>

function WorkoutForm({
    buttonText,
    onSubmit,
    emptyFields,
    submitting,
    error,
    title = "",
    category = "",
    load = 0,
    sets = 0,
    reps = 0
}: WorkoutFormProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const loadRef = useRef<HTMLInputElement>(null);
    const setsRef = useRef<HTMLInputElement>(null);
    const repsRef = useRef<HTMLInputElement>(null);
    const [unit, setUnit] = useState("kg");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSubmit({
            title: titleRef.current!.value,
            category: categoryRef.current!.value,
            unit: unit,
            load: loadRef.current!.valueAsNumber,
            sets: setsRef.current!.valueAsNumber,
            reps: repsRef.current!.valueAsNumber
        });
    }

    function handleUnitChange() {
        setUnit(unit === "kg" ? "lbs" : "kg");
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={2}>
                {error.length > 0 &&
                    <Form.Text className="text-danger fs-5">
                        {error}
                    </Form.Text>
                }
                <Form.Group controlId="title">
                    <Form.Label>Workout title:</Form.Label>
                    <Form.Control className={emptyFields.includes("title") ? "input border-danger" : "input"}
                        type="text"
                        required
                        autoComplete="off"
                        ref={titleRef}
                        defaultValue={title} />
                </Form.Group>
                <Form.Group controlId="category">
                    <Form.Label>Category:</Form.Label>
                    <Form.Select
                        className={emptyFields.includes("category") ? "select border-danger" : "select"}
                        required
                        ref={categoryRef}
                        defaultValue={category.toLowerCase()} >
                        <option>Category</option>
                        {categories.map((category, i) => (
                            <option value={category.toLowerCase()} key={i}>{category}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="load">
                    <Stack direction="horizontal" className="d-flex align-items-center justify-content-between">
                        <Form.Label>Load:</Form.Label>
                        <Form.Text className="mt-0 mb-2">
                            in (
                            <Form.Group controlId="unit" className="d-inline">
                                <Form.Label>{unit.toUpperCase()}</Form.Label>
                                <Form.Control type="checkbox" className="d-none" onChange={handleUnitChange} />
                            </Form.Group>
                            )
                        </Form.Text>
                    </Stack>
                    <Form.Control
                        className={emptyFields.includes("load") ? "input border-danger" : "input"}
                        required
                        type="number"
                        step="any"
                        ref={loadRef}
                        defaultValue={load} />
                </Form.Group>
                <Form.Group controlId="sets">
                    <Form.Label>Sets:</Form.Label>
                    <Form.Control
                        className={emptyFields.includes("sets") ? "input border-danger" : "input"}
                        type="number"
                        step="any"
                        required
                        ref={setsRef}
                        defaultValue={sets} />
                </Form.Group>
                <Form.Group controlId="reps">
                    <Form.Label>Reps:</Form.Label>
                    <Form.Control
                        className={emptyFields.includes("reps") ? "input border-danger" : "input"}
                        type="number"
                        step="any"
                        required
                        ref={repsRef}
                        defaultValue={reps} />
                </Form.Group>
                <Button className="btn-secondary outline-none fs-5 text-light mt-2"
                    type="submit" >
                    {submitting ? <i className="fa-solid fa-spinner"></i> : buttonText}
                </Button>
            </Stack>
        </Form>
    )
}

export default WorkoutForm;
