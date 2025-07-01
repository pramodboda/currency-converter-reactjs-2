import React, { useEffect, useState } from "react";

import Axios from "axios";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
// import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import { AiOutlineSwap } from "react-icons/ai";

function CurrencyConverter() {
    // Initializing all the state variables
    const [from, setFrom] = React.useState("usd");
    const [to, setTo] = React.useState("inr");
    const [info, setInfo] = React.useState([]);
    const [input, setInput] = React.useState(1);
    const [options, setOptions] = React.useState([]);
    const [output, setOutput] = React.useState(0);

    // Calling the API whenever the dependancy changes
    useEffect(() => {
        Axios.get(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`
        ).then((res) => {
            setInfo(res.data[from]);
        });
    }, [from]);

    // Calling the convert function whenever
    // a user switches the currency
    useEffect(() => {
        setOptions(Object.keys(info));
        convert();
    }, [info]);

    // Function to convert the currency
    function convert() {
        var rate = info[to];
        setOutput(input * rate);
    }

    // Function to switch between two currency
    function flip() {
        var temp = from;
        setFrom(to);
        setTo(temp);
    }

    const fromSelectChange = (event) => {
        setFrom(event.target.value);
    };

    const toSelectChange = (event) => {
        setTo(event.target.value);
    };

    return (
        <React.Fragment>
            <Card
                variant="outlined"
                sx={{
                    width: "20rem",
                    boxShadow:
                        "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px",
                }}
            >
                <Paper>
                    <CardContent>
                        <Box sx={{ mb: 2 }}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Box sx={{ mb: 2 }}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ pb: 0.5 }}
                                    >
                                        Convert Amount
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        inputProps={{ "aria-label": "Without label" }}
                                        id="amount"
                                        variant="filled"
                                        size="small"
                                        onChange={(e) => setInput(e.target.value)}
                                        value={input}
                                    />
                                </Box>

                                <Box sx={{ minWidth: "50%" }}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ pb: 0.5 }}
                                    >
                                        From
                                    </Typography>
                                    <FormControl fullWidth size="small" variant="filled">
                                        <Select
                                            value={from}
                                            onChange={fromSelectChange}
                                            displayEmpty
                                            inputProps={{ "aria-label": "Without label" }}
                                            placeholder="From"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {options.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option.toUpperCase()}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>


                            </Stack>
                        </Box>
                        <Box sx={{ mb: 2 }}>

                            <IconButton
                                color="primary"
                                aria-label="Swap"
                                onClick={() => {
                                    flip();
                                }}
                            >
                                <AiOutlineSwap fontSize="1.6rem" />
                            </IconButton>


                        </Box>

                        <Box sx={{ minWidth: 110 }}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ pb: 0.5 }}
                            >
                                To
                            </Typography>
                            <FormControl fullWidth size="small" variant="filled">
                                <Select
                                    value={to}
                                    onChange={toSelectChange}
                                    displayEmpty
                                    inputProps={{ "aria-label": "Without label" }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {options.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option.toUpperCase()}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box bgColor="text.secondary" sx={{ p: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Converted Amount:
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                {input +
                                    " " +
                                    from.toUpperCase() +
                                    " = " +
                                    output.toFixed(2) +
                                    " " +
                                    to.toUpperCase()}
                            </Typography>
                        </Box>
                    </CardContent>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        onClick={() => {
                            convert();
                        }}
                        sx={{ padding: "0.7rem" }}
                    >
                        Convert
                    </Button>
                </Paper>
            </Card>
        </React.Fragment>
    );
}

export default CurrencyConverter;