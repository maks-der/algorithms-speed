(() => {
    const jsCtx = document.getElementById('jsChart').getContext('2d');
    const cppCtx = document.getElementById('cppChart').getContext('2d');

    const bubbleSortCtx = document.getElementById("bubble-sort").getContext('2d');
    const countingSortCtx = document.getElementById("counting-sort").getContext('2d');
    const heapSortCtx = document.getElementById("heap-sort").getContext('2d');
    const insertionSortCtx = document.getElementById("insertion-sort").getContext('2d');
    const mergeSortCtx = document.getElementById("merge-sort").getContext('2d');
    const quickSortCtx = document.getElementById("quick-sort").getContext('2d');
    const radixSortCtx = document.getElementById("radix-sort").getContext('2d');
    const selectionSortCtx = document.getElementById("selection-sort").getContext('2d');
    const sortSortCtx = document.getElementById("sort-func").getContext('2d');

    const brightColors = ['#c11', '#d50', '#dd0', '#0d5', '#0cc', '#06f', '#c0c', '#70f', '#eee', '#000', '#000'];

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

    function createConfig(chartLabels, chartDataset, type = 'line') {
        const gridSettings = {
            beginAtZero: true,
            grid: { color: '#444' },
            ticks: { color: '#ddd' }
        };
        return ({
            type: type,
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

    function createLangDataset(data) {
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

    function getSortingDatasets(jsDataset, cppDataset) {
        const result = [];
        
        jsDataset.forEach((item, i) => {
            const sortItem = [
                {
                    borderColor: '#05f',
                    // backgroundColor: '#05f1',
                    label: 'C++',
                    fill: true,
                    data: cppDataset[i].data,
                },
                {
                    borderColor: '#0f6',
                    // backgroundColor: '#0f61',
                    label: 'JavaScript',
                    fill: true,
                    data: item.data,
                },
            ]
            result.push(sortItem);
        });
        
        return result;
    }

    fetch('data').then(response => response.json()).then(data => {
        // console.log(data);

        const labels = data.js.map(element => element.arrayLength);

        const jsDataset = createLangDataset(data.js);
        const cppDataset = createLangDataset(data.cpp);

        console.log(jsDataset);

        new Chart(jsCtx, createConfig(labels, jsDataset));
        new Chart(cppCtx, createConfig(labels, cppDataset));

        const sortingDatasets = getSortingDatasets(jsDataset, cppDataset);

        console.log(sortingDatasets);
        new Chart(bubbleSortCtx, createConfig(labels, sortingDatasets[0]));
        new Chart(countingSortCtx, createConfig(labels, sortingDatasets[1]));
        new Chart(heapSortCtx, createConfig(labels, sortingDatasets[2]));
        new Chart(insertionSortCtx, createConfig(labels, sortingDatasets[3]));
        new Chart(mergeSortCtx, createConfig(labels, sortingDatasets[4]));
        new Chart(quickSortCtx, createConfig(labels, sortingDatasets[5]));
        new Chart(radixSortCtx, createConfig(labels, sortingDatasets[6]));
        new Chart(selectionSortCtx, createConfig(labels, sortingDatasets[7]));
        new Chart(sortSortCtx, createConfig(labels, sortingDatasets[8]));
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
})();