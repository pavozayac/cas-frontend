<script lang="ts">
    import type { Reflection } from "api/Reflection";

    import { Chart } from "chart.js";
    import { onMount } from "svelte";

    export let height = 400;
    export let width = 500;

    export let creativityData: Reflection[];
    export let activityData: Reflection[];
    export let serviceData: Reflection[];

    console.log('crlen', creativityData);

    const CATEGORIES = ["Creativity", "Activity", "Service"];

    const data = {
        labels: CATEGORIES,
        grouped: true,
        datasets: [
            {
                // barthickness: 6,
                // maxBarThickness: 8,
                // minBarlength: 2,
                // label: 'Creativity',
                backgroundColor: ["#1e88e5", "#f50057", "#00e676"],
                borderColor: "white",
                data: [
                    creativityData.length,
                    activityData.length,
                    serviceData.length,
                ],
            },
        ],
    };

    onMount(() => {
        const chart = new Chart("balanceChart", {
            type: "doughnut",
            data: data,
            options: {
                plugins: {
                    legend: {
                        position: "top",
                    },
                },
            },
        });
    });
</script>


<h2>Yearly balance</h2>
<canvas id="balanceChart" />

<style>
    h2 {
        width: 100%;
        text-align: center;
    }
</style>