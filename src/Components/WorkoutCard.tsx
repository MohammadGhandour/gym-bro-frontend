import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { Modal, Stack } from 'react-bootstrap';
import { Workout, WorkoutData } from '../App';
import { api } from '../Config/Api';
import { headers } from '../Config/Headers';
import { useWorkoutsContext } from '../Hooks/useWorkoutsContext';
import WorkoutForm from './WorkoutForm';

type WorkoutCardProps = {
    workout: Workout
}

type EditWorkoutModalProps = {
    show: boolean
    handleClose: () => void
    workout: Workout
    editWorkout: (data: WorkoutData) => object
    emptyFields: string[]
    submitting: boolean
    error: string
}

function WorkoutCard({ workout }: WorkoutCardProps) {
    const [show, setShow] = useState(false);
    const { dispatch } = useWorkoutsContext();
    const [emptyFields, setEmptyFields] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    function handleClose() {
        setShow(false);
    }

    function editWorkout(data: WorkoutData) {
        let returnedObject = {};
        setSubmitting(true);

        axios.patch(`${api}/workouts/${workout._id}`, data, { headers: headers })
            .then((res) => {
                dispatch({ type: "EDIT_WORKOUT", payload: res.data });
                setEmptyFields([]);
                setError("");
                setSubmitting(false);
                setShow(false);
                localStorage.setItem('userPrefferedSetsCount', res.data.sets);
                localStorage.setItem('userPrefferedRepsCount', res.data.reps);
            })
            .catch((err) => {
                setSubmitting(false);
                setError(err.response.data.error);
                if (err.response.data.emptyFields.length) setEmptyFields(err.response.data.emptyFields);
            })

        return returnedObject;
    }

    function deleteWorkout() {
        if (window.confirm(`Are you sure you want to delete this workout (${workout.title}) ?`)) {
            axios.delete(`${api}/workouts/${workout._id}`, { headers: headers })
                .then(res => {
                    dispatch({ type: "DELETE_WORKOUT", payload: workout })
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            return
        }
    }

    return (
        <div className="mb-2">
            <Stack className="bg-light p-2 rounded">
                <Stack direction="horizontal" className="d-flex justify-content-between">
                    <h4 className="text-secondary">{workout.title}</h4>
                    <div className="d-flex align-items-center gap-2 text-light">
                        <i role="button" className="fa-solid fa-pen bg-secondary p-2 rounded"
                            onClick={() => setShow(true)}></i>
                        <i role="button" className="fa-solid fa-trash bg-danger p-2 rounded"
                            onClick={deleteWorkout}></i>
                    </div>
                </Stack>
                <Stack>
                    <p className="mb-0"><strong>Load ({workout.unit}): </strong>{workout.load}</p>
                    <p className="mb-0"><strong>Sets: </strong>{workout.sets}</p>
                    <p className="mb-0"><strong>Reps: </strong>{workout.reps}</p>
                    <p className="mb-0">{formatDistanceToNow(new Date(workout.updatedAt), { addSuffix: true })}</p>
                </Stack>
            </Stack>
            <EditWorkoutModal
                show={show}
                handleClose={handleClose}
                workout={workout}
                editWorkout={editWorkout}
                emptyFields={emptyFields}
                submitting={submitting}
                error={error} />
        </div>
    )
};

function EditWorkoutModal({ show, handleClose, workout, editWorkout, emptyFields, submitting, error }: EditWorkoutModalProps) {
    return (
        <Modal show={show} onHide={handleClose} className="mt-4 mb-4">
            <Modal.Header closeButton>
                <Modal.Title>Edit Workout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <WorkoutForm buttonText="Edit workout"
                    onSubmit={editWorkout}
                    title={workout.title}
                    emptyFields={emptyFields}
                    submitting={submitting}
                    error={error}
                    category={workout.category}
                    load={workout.load}
                    sets={workout.sets}
                    reps={workout.reps} />
            </Modal.Body>
        </Modal>
    )
}

export default WorkoutCard;
