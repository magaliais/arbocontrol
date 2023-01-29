import React from "react";
import dynamic from "next/dynamic";
import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

// * dynamic é uma função do Next utilizada para fazer lazy-loading
// ? Neste caso, a opção 'ssr: false' define que o Chart só será carregado pelo lado
// ? do browser, e não pelo servidor do Next
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const areaOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: true,
  },
  tooltip: {
    enabled: true,
    theme: 'dark',
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2022-01-01T00:00:00.000Z",
      "2022-02-01T00:00:00.000Z",
      "2022-03-01T00:00:00.000Z",
      "2022-04-01T00:00:00.000Z",
      "2022-05-01T00:00:00.000Z",
      "2022-06-01T00:00:00.000Z",
      "2022-07-01T00:00:00.000Z",
      "2022-08-01T00:00:00.000Z",
      "2022-09-01T00:00:00.000Z",
      "2022-10-01T00:00:00.000Z",
      "2022-11-01T00:00:00.000Z",
      "2022-12-01T00:00:00.000Z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [
  {
    name: "series1",
    data: [93, 120, 105, 183, 230, 292, 200, 180, 124, 144, 82, 73],
  },
];


const donutOptions = {
  labels: [
    "Zona Norte",
    "Zona Sul",
    "Central",
    "Zona Leste",
    "Zona Oeste",
    "Zona Nordeste",
    "Zona Sudeste",
  ],

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        labels: {
          show: true,
          name: {
            fontSize: "12",
            fontFamily: "Roboto",
          },
          value: {
            fontSize: "16",
            offsetY: 0,
          },
          total: {
            show: true,
            showAlways: true, // Remove show always to show specific info
          },
        },
      },
    },
  },
  colors: [
    "#dc2626",
    "#2E93fA", 
    "#66DA26", 
    "#546E7A", 
    "#E91E63", 
    "#a21caf",
    "#FF9800"
  ],
  dataLabels: {
    enabled: false,
    style: {
      fontSize: "12",
      fontWeight: "400",
      fontFamily: "Roboto",
    },
  },

  chart: {
    toolbar: {
      show: false,
    },
    foreColor: theme.colors.gray[500],
  },
  fill: {
    opacity: 0.8,
    type: "solid",
  },
  stroke: {
    show: false,
    width: 1,
  },
};

const donutSeries = [44, 55, 41, 17, 15, 10, 20];


const pieOptions = {
  labels: ["Inválidas", "Finalizadas", "Pendentes", "Em Atendimento" ],

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        labels: {
          show: true,
          name: {
            fontSize: "12",
            fontFamily: "Roboto",
          },
          value: {
            fontSize: "16",
            offsetY: 0,
          },
          total: {
            show: true,
            showAlways: true, // Remove show always to show specific info
          },
        },
      },
    },
  },
  colors: ["#bc3232", "#12A08B", "#a1a522", "#6632ba"],
  dataLabels: {
    enabled: false,
    style: {
      fontSize: "12",
      fontWeight: "400",
      fontFamily: "Roboto",
    },
  },

  chart: {
    toolbar: {
      show: false,
    },
    foreColor: theme.colors.gray[500],
  },
  fill: {
    opacity: 0.8,
    type: "solid",
  },
  stroke: {
    show: false,
    width: 1,
  },
};

const pieSeries = [8, 3, 2, 5];

export default function Charts() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="480px" align="flex-start">
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Denúncias
            </Text>
            <Chart type="area" height={160} options={areaOptions} series={series} />
          </Box>
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Região
            </Text>
            <Chart type="donut" height={160} options={donutOptions} series={donutSeries} />
          </Box>
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Status
            </Text>
            <Chart type="pie" height={160} options={pieOptions} series={pieSeries} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
