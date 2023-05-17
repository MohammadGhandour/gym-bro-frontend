import axios from "axios";
import { useEffect, useState } from "react";
import { Accordion, Card, Stack } from "react-bootstrap";
import Loader from "../Components/Loader";
import WorkoutCard from "../Components/WorkoutCard";
import { api } from "../Config/Api"
import { headers } from "../Config/Headers";
import { categories } from "../Constants/categories";
import { useWorkoutsContext } from "../Hooks/useWorkoutsContext";

function Homepage() {
    const [loading, setLoading] = useState(false);
    const { state, dispatch } = useWorkoutsContext();
    const workouts = state.workouts;
    workouts.sort(function (a, b) {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    });

    useEffect(() => {
        setLoading(true);
        axios.get(`${api}/workouts`, { headers: headers })
            .then(res => {
                dispatch({ type: "SET_WORKOUTS", payload: res.data });
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            })
    }, []);

    if (loading) return <Loader />
    return (
        <Stack gap={2}>
            {categories.map((category: string, i) => (
                <Accordion key={category}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className="border-bottom-0 fw-500 fs-5 text-secondary">
                            <h5>{category}</h5>
                        </Accordion.Header>
                        <Accordion.Body>
                            {workouts.map(workout =>
                                workout.category.toLowerCase() === category.toLowerCase() &&
                                <WorkoutCard key={workout._id} workout={workout} />
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            ))}
        </Stack>
    )
}

export default Homepage;
