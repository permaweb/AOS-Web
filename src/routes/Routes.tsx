import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Dashboard = lazy(() => import("../views/Dashboard"));


export default function ApplicationRoutes() {
    return (
        <Suspense fallback={<span>Loading...</span>}>
            <Routes>
                <Route path={"/"} element={<Dashboard />} />
                <Route path={"/process/:processId"} element={<Dashboard />} />
            </Routes>
        </Suspense>
    );
}