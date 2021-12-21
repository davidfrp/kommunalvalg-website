import FilterableCandidateView from "./components/FilterableCandidateView";

function App() {
    return (
        <main>
            <h1 className="text-3xl font-bold mb-4">
                Kandidater fra Københavns Kommune
            </h1>
            <FilterableCandidateView />
        </main>
    );
}

export default App;
