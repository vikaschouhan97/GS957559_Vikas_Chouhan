import CircularProgress from "@mui/material/CircularProgress";
import { Box, styled } from "@mui/material";

const Wrapper = styled(Box)(() => ({
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

const SuspenseLoader = () => {
    return (
        <Wrapper>
            <CircularProgress size={"6vh"} />
        </Wrapper>
    );
};

export default SuspenseLoader;
