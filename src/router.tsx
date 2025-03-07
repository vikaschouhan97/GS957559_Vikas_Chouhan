import { createBrowserRouter } from 'react-router-dom';
import BaseLayout from './components/base-layout';
import SuspenseLoader from './components/loader/suspense-loader';
import { lazy, Suspense } from 'react';

const Loader = (Component: any) => (props: any) =>
(
    <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
    </Suspense>
);

const HomePage = Loader(lazy(() => import("./contents/homepage")));
const StorePage = Loader(lazy(() => import("./contents/store")));
const SkuPage = Loader(lazy(() => import("./contents/sku")));
const PlanningPage = Loader(lazy(() => import("./contents/planning")));
const ChartsPage = Loader(lazy(() => import("./contents/charts")));
const PageNotFound = Loader(lazy(() => import("./components/page-not-found")));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <BaseLayout />,
        errorElement: <PageNotFound />,
        children: [
            { index: true, element: <HomePage /> },
        ]
    },
    {
        path: '/store',
        element: <BaseLayout />,
        errorElement: <PageNotFound />,
        children: [
            { index: true, element: <StorePage /> },
        ]
    },
    {
        path: '/sku',
        element: <BaseLayout />,
        errorElement: <PageNotFound />,
        children: [
            { index: true, element: <SkuPage /> },
        ]
    },
    {
        path: '/planning',
        element: <BaseLayout />,
        errorElement: <PageNotFound />,
        children: [
            { index: true, element: <PlanningPage /> },
        ]
    },
    {
        path: '/charts',
        element: <BaseLayout />,
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
