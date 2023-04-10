import styled from "@emotion/styled";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Badge } from "@mui/material";

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));

function Hearts({ rating, type = 0, size = "medium" }) {
    type = !type ? "error" : "warning";
    return (
        <>
            {rating ? (
                <StyledBadge
                    badgeContent={rating}
                    color="primary"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                >
                    <Favorite
                        color={type}
                        fontSize={size}
                        titleAccess="Healing"
                    />
                </StyledBadge>
            ) : null}
        </>
    );
}

export default Hearts;
