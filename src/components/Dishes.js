import { Stack } from "@mui/material";
import Dish from "./Dish";

function Dishes({ foundDishes, inventoryLabels }) {
    return (
        <Stack
            flexWrap={"wrap"}
            spacing={0}
            direction="row"
            alignItems="center"
        >
            {foundDishes.map((dish) => {
                return <Dish i={dish} inventoryLabels={inventoryLabels} />;
            })}
        </Stack>
    );
}

export default Dishes;
