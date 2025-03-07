import { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import { Box, styled } from "@mui/system";
import Navbar from "../navbar";
import SideNavigation from "../sideNavigation";

const Wrapper = styled(Box)(() => ({
    width: "100vw",
    height: "100vh",
    display: "flex",
    overflow: "hidden",
}));


interface IBaseLayoutProps {
    children?: ReactNode;
}

const BaseLayout: FC<IBaseLayoutProps> = () => {
    return (
        <Wrapper>
            <Outlet />
            <Navbar />
            <SideNavigation />
        </Wrapper>
    );
};

BaseLayout.propTypes = {
    children: PropTypes.node,
};

export default BaseLayout;
