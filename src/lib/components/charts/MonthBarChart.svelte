<script lang="ts">
    import { getReflection } from "api/Reflection";
    import type { Reflection } from "api/Reflection";
    import { Chart } from "chart.js";
    import { onMount } from "svelte";
    export let height = 400;
    export let width = 500;
    export let allData: Reflection[];
    onMount(async () => {
        const MONTHS = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        let allCount = [];
        let allTemp = {
            '0': 0,
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0,
            '7': 0,
            '8': 0,
            '9': 0,
            '10': 0,
            '11': 0,
        };

        console.log('allData', allData);

    
        allData.forEach(async (ref) => {
            const month = new Date(ref.date_added).getMonth();
            console.log("month", JSON.stringify(month));
            allTemp[month] += 1;
            console.log('amonth', allTemp[month])
        });
        Object.keys(allTemp).forEach(key => {
            console.log('amonth2', allTemp[key])
    
            allCount.push(allTemp[key])
        });
        const data = {
            labels: MONTHS,
            datasets: [
                {
                    // barthickness: 6,
                    // maxBarThickness: 8,
                    // minBarlength: 2,
                    label: "Number of reflections by month",
                    backgroundColor: "#1e88e5",
                    borderColor: "#1e88e5",
                    data: Object.values(allTemp),
                },
            ],
        };
        const chart = new Chart("chart", {
            type: "bar",
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                responsive: true,
            },
        });
    });
</script>

<h2>Monthly reflections</h2>

<canvas {width} {height} id="chart" />

<style>
    h2 {
        width: 100%;
        text-align: center;
    }
</style>
