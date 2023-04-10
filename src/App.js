import styled from "@emotion/styled";
import {
    Backspace,
    Delete,
    ExpandMore,
    Favorite,
    FavoriteBorder,
    RemoveCircle,
    ShoppingCart,
} from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete,
    Avatar,
    Badge,
    Card,
    CardActions,
    CardContent,
    Container,
    CssBaseline,
    Divider,
    FormControl,
    IconButton,
    Rating,
    Stack,
    TextField,
    ThemeProvider,
    Typography,
    createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import Dishes from "./components/Dishes";
import Hearts from "./components/Hearts";
import Cost from "./components/Cost";
import Value from "./components/Value";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    const [ingredients, setIngredients] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [inventoryLabels, setInventoryLabels] = useState([]);
    const [foundDishes, setFoundDishes] = useState([]);

    const getData = () => {
        fetch("./data/ingredients.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setIngredients(myJson);
            });
        fetch("./data/dishes.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setDishes(myJson);
            });
    };
    useEffect(() => {
        getData();
    }, []);

    const addToInventory = (ingredient, amount = null) => {
        if (!ingredient) {
            return;
        }
        let items = inventory;
        let existing = items.find((i) => i.label === ingredient.label);
        if (!amount) {
            ingredient["amount"] = existing
                ? parseInt(existing["amount"]) + 1
                : 1;
        } else {
            ingredient["amount"] = amount;
        }
        items = items.filter((i) => i.label !== ingredient.label);
        let temp = [...items, ingredient].sort((a, b) =>
            a.label > b.label ? 1 : -1
        );
        updateInventories(temp);
    };

    const updateAmount = (e, i) => {
        addToInventory(i, e.target.value);
    };

    const removeFromInventory = (item) => {
        const items = inventory;
        const temp = items.filter((i) => i.label !== item.label);
        updateInventories(temp);
    };

    const updateInventories = (temp) => {
        setInventory(temp);
        let labels = [];
        temp.forEach((t) => {
            labels.push(t.label);
        });
        setInventoryLabels(labels);
        findRecipe(temp);
    };

    const findRecipe = (ingredients = ingredients) => {
        let found = [];
        ingredients.forEach((i) => {
            dishes.forEach((d) => {
                let f = false; // set if first or second ingredient found
                if (d.ingredients?.first?.includes(i.label)) {
                    d.ingredients["firstFound"] = i.label;
                    f = true;
                } else if (d.ingredients?.second?.includes(i.label)) {
                    d.ingredients["secondFound"] = i.label;
                    f = true;
                }
                if (f) {
                    found.push(d);
                }
            });
        });
        console.log([...new Set(found)]);
        setFoundDishes([...new Set(found)]);
    };

    const RemoveIngredient = styled(IconButton)(({ theme }) => ({
        position: "absolute",
        top: 0,
        right: 0,
        transform: "translateX(50%) translateY(-50%)",
    }));

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <FormControl margin="dense" sx={{ width: "100%" }}>
                    <Autocomplete
                        disablePortal
                        id="ingredients-list"
                        options={ingredients}
                        sx={{ width: "100%" }}
                        onChange={(e, v) => {
                            addToInventory(v);
                        }}
                        clearOnBlur={true}
                        isOptionEqualToValue={(option, value) =>
                            option.label === value.label
                        }
                        groupBy={(option) => option?.type}
                        // renderOption={(props, option, state) => {
                        //     return (
                        //         <ListItem aria-label={option.label} {...props}>
                        //             {option.label}
                        //         </ListItem>
                        //     );
                        // }}
                        renderInput={(params) => (
                            <TextField {...params} label="Ingredient" />
                        )}
                    />
                </FormControl>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Badge
                            badgeContent={inventory.length}
                            color="primary"
                            max={999}
                        >
                            <Typography>Inventory</Typography>
                        </Badge>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack
                            flexWrap={"wrap"}
                            spacing={2}
                            direction="row"
                            alignItems="center"
                        >
                            {inventory.map((i) => {
                                return (
                                    <Card
                                        elevation={2}
                                        variant="outlined"
                                        sx={{
                                            width: "calc((100% / 5) - 16px)",
                                            position: "relative",
                                            overflow: "visible",
                                        }}
                                    >
                                        <RemoveIngredient
                                            onClick={(e) =>
                                                removeFromInventory(i)
                                            }
                                        >
                                            <RemoveCircle
                                                titleAccess="Remove this"
                                                fontSize="medium"
                                                color="error"
                                            />
                                        </RemoveIngredient>
                                        <CardActions
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-evenly",
                                            }}
                                        >
                                            <Hearts
                                                rating={i?.hearts}
                                                size="large"
                                            />
                                            <Cost cost={i?.cost} size="large" />
                                            <Value
                                                value={i?.value}
                                                size="large"
                                            />
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
                                        <CardContent>
                                            <Typography>{i.label}</Typography>
                                        </CardContent>
                                        <FormControl>
                                            <TextField
                                                type="number"
                                                label="Amount"
                                                value={i.amount}
                                                onInput={(e) =>
                                                    updateAmount(e, i)
                                                }
                                            />
                                        </FormControl>
                                    </Card>
                                );
                            })}
                        </Stack>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Badge
                            badgeContent={foundDishes.length}
                            color="primary"
                            max={999}
                        >
                            <Typography>Dishes</Typography>
                        </Badge>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Dishes
                            foundDishes={foundDishes}
                            inventoryLabels={inventoryLabels}
                        />
                    </AccordionDetails>
                </Accordion>
            </Container>
        </ThemeProvider>
    );
}

export default App;
