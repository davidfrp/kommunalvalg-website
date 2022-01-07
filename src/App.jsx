import CandidatesSection from "./components/CandidatesSection";
import PartiesSection from "./components/PartiesSection";
import candidateService from "./services/candidateService";
import partyService from "./services/partyService";
import { useState, useEffect } from "react";

function App() {
    return (
        <main>
            <PartiesSection />
            <CandidatesSection />
        </main>
    );
}

export default App;
