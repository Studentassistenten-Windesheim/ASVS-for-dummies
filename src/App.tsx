import React from 'react';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Root from './pages/root';
import ErrorPage from './pages/error-page';
import Tips from './pages/tips';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
    },
    {
        path: "tips",
        element: <Tips />,
    },
]);

const App = () => {

    return (
        <>
            <header className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-02">
                <nav className="nav font-semibold text-lg">
                    <ul className="flex items-center">
                        <li className="p-4 hover:text-blue-500 duration-200 cursor-pointer">
                            <a href="/">Home</a>
                        </li>
                        <li className="p-4 hover:text-blue-500 duration-200 cursor-pointer">
                            <a href="/tips">Tips</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className="flex justify-center">
                <div className="w-4/5 pt-3">
                    <React.StrictMode>
                        <RouterProvider router={router} />
                    </React.StrictMode>
                </div>
            </div>
        </>

    );
}

export default App;
