import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function WardPatientsPage() {
    const { wardId } = useParams();

    return (
        <>
            <Navbar />

            <main className="page-container">
                <h1>Ward</h1>
                <p>Ward ID: {wardId}</p>
            </main>
        </>
    );
}

export default WardPatientsPage;
