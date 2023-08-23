(() => {
    const ctx1 = document.getElementById('jsChart').getContext('2d');
    const ctx2 = document.getElementById('cppChart').getContext('2d');
    const brightColors = [
        '#f00',
        '#f50',
        '#fd0',
        '#0f0',
        '#0ff',
        '#04f',
        '#f0f',
        '#60f',
        '#ddd',
        '#000',
        '#000',
    ];

    function parseFuncName(str) {
        let res = '';
        for (let i = 0; i < str.length; i++) {
            if (/^[A-Z]*$/.test(str[i])) {
                res += ' ' + str[i].toLowerCase();
                continue;
            }
            res += str[i];
        }
        return res;
    }

    function createConfig(chartLabels, chartDataset) {
        const gridSettings = {
            beginAtZero: true,
            grid: { color: '#444' },
            ticks: { color: '#ddd' }
        };
        return ({
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: chartDataset,
            },
            options: {
                responsive: true,
                scales: {
                    x: gridSettings,
                    y: gridSettings,
                }
            }
        });
    }

    function createDatasetItem(title, data, color) {
        return ({
            label: parseFuncName(title),
            borderColor: color,
            backgroundColor: color + '1',
            data: data,
            fill: true,
        });
    }

    function createDataset(data) {
        const res = [];
        const map = new Map();

        data.forEach(dataSet => {
            dataSet.stats.forEach(stat => {
                const { title, average } = stat;
                if (map.has(title)) {
                    const data = map.get(title)
                    data.push(average)
                    map.set(title, data);
                    return;
                }
                map.set(title, [average]);
            });
        });

        // console.log(map);
        colorIndex = 0;
        for (const [title, timeSeries] of map) {
            res.push(createDatasetItem(title, timeSeries, brightColors[colorIndex]));
            colorIndex++;
        }

        return res;
    }

    fetch('data').then(response => response.json()).then(data => {
        // console.log(data);

        const jsLabels = data.js.map(element => element.arrayLength);
        const cppLabels = data.cpp.map(element => element.arrayLength);

        const jsDataset = createDataset(data.js);
        const cppDataset = createDataset(data.cpp);

        console.log(jsDataset);

        const lineChart1 = new Chart(ctx1, createConfig(jsLabels, jsDataset));
        const lineChart2 = new Chart(ctx2, createConfig(cppLabels, cppDataset));

    }).catch(error => {
        console.error('Error fetching data:', error);
    });
})();