import styled from "@emotion/styled";
import { AddShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));
function Cost({ cost, size = "medium" }) {
    return (
        <>
            {cost ? (
                <StyledBadge
                    badgeContent={cost}
                    color="primary"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                >
                    <AddShoppingCart fontSize={size} titleAccess="Buy cost" />
                </StyledBadge>
            ) : null}
        </>
    );
}

export default Cost;
