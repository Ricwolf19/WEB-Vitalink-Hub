import { chartsConfig } from "../Configs";
//Se agarra el import desde un indice que exporta todas las funciones haciendo asi mas facil 
// la manipulacionn de importaciones

const newPatientsChart = {
    type: "bar",
    height: 220,
    series: [
        {
            name: "Views",
            data: [50, 20, 10, 22, 50, 10, 40, 10, 22, 50, 10, 40],
        },
    ],
    options: {
        ...chartsConfig,
        colors: "#FF9900",
        plotOptions: {
            bar: {
                columnWidth: "50%",
                borderRadius: 0,
            },
        },
        xaxis: {
            ...chartsConfig.xaxis,
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
    },
};

const newDoctorChartConf = {
    type: "line",
    height: 220,
    series: [
        {
            name: "Sales",
            data: [10, 20, 30, 40, 35, 2, 10, 12, 15, 18],
        },
    ],
    options: {
        ...chartsConfig,
        colors: ["#388e3c"],
        stroke: {
            lineCap: "round",
        },
        markers: {
            size: 5,
        },
        xaxis: {
            ...chartsConfig.xaxis,
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
    },
};
const newDoctorChart = {
    ...newDoctorChartConf,
    series: [
        {
            name: "New Doctors",
            data: [10, 20, 30, 40, 35, 2, 10, 12, 15, 18],
        },
    ],
};

const newTaskChartConf = {
    type: "line",
    height: 220,
    series: [
        {
            name: "Sales",
            data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
        },
    ],
    options: {
        ...chartsConfig,
        colors: ["#cc0000"],
        stroke: {
            lineCap: "round",
        },
        markers: {
            size: 5,
        },
        xaxis: {
            ...chartsConfig.xaxis,
            categories: [
                "M",
                "T",
                "W",
                "T",
                "F",
                "S",
                "S",
            ],
        },
    },
};
const newTaskChart = {
    ...newTaskChartConf,
    series: [
        {
            name: "Tasks",
            data: [20, 40, 30, 50, 10, 25, 40],
        },
    ],
};

const completedTasksChart = {
    type: 'area',
    height: 220,
    series: [
        {
            name: 'M',
            data: [100, 30, 60, 90, 100, 30, 50]
        },
    ],
    options: {
        xaxis: {
            ...chartsConfig.xaxis,
            categories: ["M", "T", "W", "T", "F", "S", "S"]
        },
    },
};

const incidentsChart = {
    type: 'bar',
    height: 220,
    series: [{
        data: [53, 32, 33, 52, 13, 44, 32,]
    }],
    options: {
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'top',
                },
            }
        },
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '15px',
                colors: ['#fff']
            }
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff']
        },
        xaxis: {
            ...chartsConfig.xaxis,
            categories: ["M", "T", "W", "T", "F", "S", "S"],
        },
    },
};

const vitalinkScansChart = {
    type: 'radialBar',
    height: 255,
    series: [76, 67, 61, 90, 50, 80, 90],
    options: {
        toolbar: {
            show: true,
          },
        plotOptions: {
            radialBar: {
                offsetY: 0,
                offsetX: -30,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined,
                },
                dataLabels: {
                    name: {
                        show: true,
                    },
                    value: {
                        show: true,
                    }
                },
            }
        },
        colors: ['#00cc00', '#FFcc33', '#39539E', '#000066','#0077B5','#cc66FF','#FF0000'],
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        legend: {
            show: true,
            floating: true,
            fontSize: '11px',
            position: 'left',
            offsetX: 270,
            offsetY: 0,
            labels: {
                useSeriesColors: true,
            },
            markers: {
                size: 0
            },
            formatter: function (seriesName: any, opts: any) {
                return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
            },
            itemMargin: {
                vertical: 0
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    show: true
                }
            }
        }]
    },

};

export const statisticsChartsDataAnalitycs = [
    {
        color: "white",
        title: "New Tasks",
        description: "per week",
        chart: newTaskChart,
    },
    {
        color: "white",
        title: "Vitalink Scans",
        description: "per week",
        chart: vitalinkScansChart,

    },
    {
        color: "white",
        title: "Incidents",
        description: "per week",
        chart: incidentsChart,
    },
    {
        color: "white",
        title: "Completed Tasks",
        description: "per week",
        chart: completedTasksChart,
    },
    {
        color: "white",
        title: "New Patients",
        description: "per month",
        chart: newPatientsChart,
    },
    {
        color: "white",
        title: "New Doctors",
        description: "per month",
        chart: newDoctorChart,
    },
];

export default statisticsChartsDataAnalitycs;
