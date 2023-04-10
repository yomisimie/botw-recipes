import styled from "@emotion/styled";
import { ShoppingCartCheckout } from "@mui/icons-material";
import { Badge } from "@mui/material";

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));
function Value({ value, size = "medium" }) {
    return (
        <>
            {value ? (
                <StyledBadge
                    badgeContent={value}
                    color="primary"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                >
                    <ShoppingCartCheckout
                        fontSize={size}
                        titleAccess="Sell price"
                    />
                </StyledBadge>
            ) : null}
        </>
    );
}

export default Value;
