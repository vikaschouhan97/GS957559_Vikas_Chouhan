import { createBrowserRouter, Navigate } from 'react-router-dom';
import BaseLayout from './components/base-layout';
import SuspenseLoader from './components/loader/suspense-loader';
import { lazy, Suspense } from 'react';

const Loader = (Component: any) => (props: any) => (
    <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
    </Suspense>
);

const StorePage = Loader(lazy(() => import("./contents/store")));
const SkuPage = Loader(lazy(() => import("./contents/sku")));
const PlanningPage = Loader(lazy(() => import("./contents/planning")));
const ChartsPage = Loader(lazy(() => import("./contents/charts")));
const LoginPage = Loader(lazy(() => import("./contents/login")));
const PageNotFound = Loader(lazy(() => import("./components/page-not-found")));

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" replace />;
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/store" replace />,
    },
    {
        path: '/login',
        element: <LoginPage />,
        errorElement: <PageNotFound />,
    },
    {
        path: '/store',
        element: <RequireAuth><BaseLayout /></RequireAuth>,
        errorElement: <PageNotFound />,
        children: [
            { index: true, element: <StorePage /> },
        ]
    },
    {
        path: '/sku',
        element: <RequireAuth><BaseLayout /></RequireAuth>,
        errorElement: <PageNotFound />,
        children: [
            { index: true, element: <SkuPage /> },
        ]
    },
    {
        path: '/planning',
        element: <RequireAuth><BaseLayout /></RequireAuth>,
        errorElement: <PageNotFound />,
        children: [
            { index: true, element: <PlanningPage /> },
        ]
    },
    {
        path: '/charts',
        element: <RequireAuth><BaseLayout /></RequireAuth>,
        errorElement: <PageNotFound />,
        children: [
            { index: true, element: <ChartsPage /> },
        ]
    },
    {
        path: "*",
        element: <PageNotFound />,
        errorElement: <PageNotFound />,
    },
]);
