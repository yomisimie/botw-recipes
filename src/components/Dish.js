import { AddBoxRounded, Checklist } from "@mui/icons-material";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Divider,
    Popover,
    Stack,
    Typography,
} from "@mui/material";
import { useState } from "react";
import Hearts from "./Hearts";

function Dish({ i, inventoryLabels }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <Card
            elevation={2}
            variant="outlined"
            sx={{
                width: "calc((100% / 5) - 10px)",
                margin: "0 5px",
            }}
        >
            <CardActions>
                <Hearts rating={i?.hearts} />
            </CardActions>
            <Divider variant="middle" />
            <CardContent>
                <Avatar
                    alt={i.label}
                    src={`assets/ingredients/${i.label}.png`}
                    sx={{
                        minWidth: 60,
                        minHeight: 60,
                        maxWidth: 60,
                        maxHeight: 60,
                        width: "auto",
                        height: "auto",
                        margin: "0 auto",
                    }}
                />
            </CardContent>
            <Divider variant="middle" />
            <CardContent>
                <Typography textAlign={"center"}>{i.label}</Typography>
            </CardContent>
            <Divider variant="middle" />
            <Button
                aria-describedby={`${id} ${i.label.replace(" ", "_")}`}
                variant="text"
                sx={{ width: "100%" }}
                onClick={handleClick}
                startIcon={<Checklist />}
            >
                Ingredients
            </Button>
            <Popover
                id={`${id} ${i.label.replace(" ", "_")}`}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                sx={{ width: "100%" }}
            >
                <Stack
                    direction="column"
                    spacing={1}
                    textAlign={"center"}
                    sx={{ p: 2 }}
                >
                    {i.ingredients?.first.map((f) => {
                        if (inventoryLabels.includes(f)) {
                            return <Chip label={f} color="success" />;
                        } else {
                            return <Chip label={f} color="error" />;
                        }
                    })}
                    {i.ingredients?.first.length &&
                    i.ingredients?.second.length ? (
                        <Chip
                            variant="outlined"
                            size="small"
                            label={<AddBoxRounded />}
                            sx={{
                                borderWidth: 0,
                            }}
                        />
                    ) : null}
                    {i.ingredients?.second.map((f) => {
                        if (inventoryLabels.includes(f)) {
                            return <Chip label={f} color="success" />;
                        } else {
                            return <Chip label={f} color="error" />;
                        }
                    })}
                </Stack>
            </Popover>
        </Card>
    );
}

export default Dish;
