import { createTheme, MantineColorsTuple, } from '@mantine/core';

const success: MantineColorsTuple = [
    '#e3fff8',
    '#d2f9f0',
    '#a9f0df',
    '#7de7ce',
    '#59dfbf',
    '#41dab6',
    '#30d8b1',
    '#1ebf9b',
    '#06aa89',
    '#009475'
];

const violetDark: MantineColorsTuple = [
    "#f1f1f9",
    "#dfdfeb",
    "#bcbbd8",
    "#9696c6",
    "#7776b7",
    "#6362ae",
    "#1B1B3B",
    "#39315C",
    "#23193B",
    "#363677"
]


export const theme = createTheme({
    fontFamily: 'Inter, sans-serif',
    primaryColor: 'success',
    colors: {
        success,
        dark: violetDark,
    },
    primaryShade: {
        dark: 6,
        light: 6,
    },
    components: {
        Modal: {
            styles: {
                modal: {
                    backgroundColor: '#39315C',
                    color: '#fff',
                },
            },
        },
    },
});
