<script lang="ts">
    import { Chart } from "chart.js";
    import { onMount } from "svelte";
    import type { Reflection } from "api/Reflection";

    export let height = 400;
    export let width = 500;

    export let creativityData: Reflection[];
    export let activityData: Reflection[];
    export let serviceData: Reflection[];

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

    let creativityCount = [];
    let creativityTemp = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
    };
    let activityCount = [];
    let activityTemp = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
    };
    let serviceCount = [];
    let serviceTemp = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
    };

    creativityData.forEach((ref) => {
        console.log('ref', ref)
        console.log('date',ref.date_added);
        const month = new Date(ref.date_added).getMonth();
        console.log("month", month);
        creativityTemp[month] += 1;
    });
    activityData.forEach((ref) => {
        console.log('ref', ref)

        console.log("date", ref.date_added);
        const month = new Date(ref.date_added).getMonth();
        console.log("month", month);

        activityTemp[month] += 1;
    });
    serviceData.forEach((ref) => {
        console.log('ref', ref)

        console.log("date", ref.date_added);
        const month = new Date(ref.date_added).getMonth();
        console.log("month", month);

        serviceTemp[month] += 1;
    });

    Object.entries(creativityTemp).forEach(([key, value]) =>
        creativityCount.push(value)
    );
    Object.entries(activityTemp).forEach(([key, value]) =>
        activityCount.push(value)
    );
    Object.entries(serviceTemp).forEach(([key, value]) =>
        serviceCount.push(value)
    );

    console.log("crcount", creativityCount);

    const data = {
        labels: MONTHS,
        grouped: true,
        datasets: [
            {
                // barthickness: 6,
                // maxBarThickness: 8,
                // minBarlength: 2,
                label: "Creativity",
                backgroundColor: "#1e88e5",
                borderColor: "white",
                data: creativityCount,
            },
            {
                // barthickness: 6,
                // maxBarThickness: 8,
                // minBarlength: 2,
                label: "Activity",
                backgroundColor: "#f50057",
                borderColor: "white",
                data: activityCount,
            },
            {
                // barthickness: 6,
                // maxBarThickness: 8,
                // minBarlength: 2,
                label: "Service",
                backgroundColor: "#00e676",
                borderColor: "white",
                data: serviceCount,
            },
        ],
    };

    onMount(() => {
        const chart = new Chart("byCategoryChart", {
            type: "bar",
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    });
</script>

<h2>Montly reflections by category</h2>

<canvas {width} {height} id="byCategoryChart" />

<style>
    h2 {
        width: 100%;
        text-align: center;
    }
</style>
