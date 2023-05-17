import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkoutData } from '../App';
import WorkoutForm from '../Components/WorkoutForm';
import { api } from '../Config/Api';
import { headers } from '../Config/Headers';

function Create() {
    const [emptyFields, setEmptyFields] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    function createWorkout(workout: WorkoutData) {
        let returnedData = {};
        setSubmitting(true);
        axios.post(`${api}/workouts`, workout, { headers: headers })
            .then((res) => {
                setSubmitting(false);
                setError("");
                setEmptyFields([]);
                navigate("/");
            })
            .catch((err) => {
                setSubmitting(false);
                setError(err.response.data.error);
                if (err.response.data.emptyFields.length) setEmptyFields(err.response.data.emptyFields);
            })
        return returnedData;
    }

    return (
        <div>
            <WorkoutForm
                buttonText="Add workout"
                onSubmit={createWorkout}
                emptyFields={emptyFields}
                submitting={submitting}
                error={error} />
        </div>
    )
}

export default Create;
