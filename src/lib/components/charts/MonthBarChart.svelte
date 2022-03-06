<script lang="ts">
import { getReflection } from 'api/Reflection';
import type { BulkReflection } from 'api/Reflection';

    import { Chart } from  'chart.js';
    import { onMount } from 'svelte';

    export let height = 400;
    export let width = 500;

    export let allData: BulkReflection[];

    const MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    let allCount = [];
    let allTemp = {
        0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0,
    };

    
    allData.forEach(async bulk => {
        const ref = await getReflection(bulk.id);
        const month = new Date(ref.date_added).getMonth();
        console.log('month', month);
        allTemp[month] += 1;
    })

    Object.entries(allTemp).forEach(([key, value]) => allCount.push(value));

    const data = {  
        labels: MONTHS,
        datasets: [{
            // barthickness: 6,
            // maxBarThickness: 8,
            // minBarlength: 2,
            label: 'Number of reflections by month',
            backgroundColor: 'white',
            borderColor: 'white',
            data: allCount
        }]
    }


    onMount(() => {
        const chart = new Chart(
            'chart',
            {
                type: 'bar',
                data: data,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    responsive: true
                }
            }
        );
    });

</script>

<h2>Monthly reflections</h2>

<canvas {width} {height} id="chart"></canvas>

<style>
    h2 {
        width: 100%;
        text-align: center;
    }
</style>