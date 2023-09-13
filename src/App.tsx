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
        <div className="flex justify-center">
            <header className="App-header">

            </header>
            <nav>
                <ul>
                    <li>
                        <a href={`/`}>Home</a>
                    </li>
                    <li>
                        <a href={`/tips`}>Tips</a>
                    </li>
                </ul>
            </nav>
            <div className="container">
                <React.StrictMode>
                    <RouterProvider router={router} />
                </React.StrictMode>

            </div>
        </div>
    );
}

export default App;
