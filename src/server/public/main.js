/* eslint-disable no-undef */
(() => {
    const jsSortCtx = document.getElementById('jsSortCtx').getContext('2d');
    const cppSortCtx = document.getElementById('cppSortCtx').getContext('2d');

    const bubbleSortCtx = document.getElementById('bubble-sort').getContext('2d');
    const countingSortCtx = document.getElementById('counting-sort').getContext('2d');
    const heapSortCtx = document.getElementById('heap-sort').getContext('2d');
    const insertionSortCtx = document.getElementById('insertion-sort').getContext('2d');
    const mergeSortCtx = document.getElementById('merge-sort').getContext('2d');
    const quickSortCtx = document.getElementById('quick-sort').getContext('2d');
    const radixSortCtx = document.getElementById('radix-sort').getContext('2d');
    const selectionSortCtx = document.getElementById('selection-sort').getContext('2d');
    const sortSortCtx = document.getElementById('sort-func').getContext('2d');

    const jsSearchCtx = document.getElementById('jsSearchCtx').getContext('2d');
    const cppSearchCtx = document.getElementById('cppSearchCtx').getContext('2d');

    const binarySearchCtx = document.getElementById('binary-search').getContext('2d');
    const exponentialSearchCtx = document.getElementById('exponential-search').getContext('2d');
    const fibonacciSearchCtx = document.getElementById('fibonacci-search').getContext('2d');
    const interpolationSearchCtx = document.getElementById('interpolation-search').getContext('2d');
    const jumpSearchCtx = document.getElementById('jump-search').getContext('2d');
    const linearSearchCtx = document.getElementById('linear-search').getContext('2d');

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
                    const data = map.get(title);
                    data.push(average);
                    map.set(title, data);
                    return;
                }
                map.set(title, [average]);
            });
        });

        let colorIndex = 0;
        for (const [title, timeSeries] of map) {
            res.push(createDatasetItem(title, timeSeries, brightColors[colorIndex]));
            colorIndex++;
        }

        return res;
    }

    function getAlgorithmsDatasets(jsDataset, cppDataset) {
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
            ];
            result.push(sortItem);
        });
        
        return result;
    }

    fetch('data').then(response => response.json()).then(data => {
        // console.log(data);

        const sortLabels = data.sortJs.map(element => element.arrayLength);
        const searchLabels = data.searchJs.map(element => element.arrayLength);

        const jsSortDataset = createLangDataset(data.sortJs);
        const cppSortDataset = createLangDataset(data.sortCpp);
        const jsSearchDataset = createLangDataset(data.searchJs);
        const cppSearchDataset = createLangDataset(data.searchCpp);

        // console.log(jsSortDataset);
        // console.log(cppSortDataset);
        console.log(jsSearchDataset);
        console.log(cppSearchDataset);

        new Chart(jsSortCtx, createConfig(sortLabels, jsSortDataset));
        new Chart(cppSortCtx, createConfig(sortLabels, cppSortDataset));

        new Chart(jsSearchCtx, createConfig(searchLabels, jsSearchDataset));
        new Chart(cppSearchCtx, createConfig(searchLabels, cppSearchDataset));
    
        const sortAlgorithmsDatasets = getAlgorithmsDatasets(jsSortDataset, cppSortDataset);

        new Chart(bubbleSortCtx, createConfig(sortLabels, sortAlgorithmsDatasets[0]));
        new Chart(countingSortCtx, createConfig(sortLabels, sortAlgorithmsDatasets[1]));
        new Chart(heapSortCtx, createConfig(sortLabels, sortAlgorithmsDatasets[2]));
        new Chart(insertionSortCtx, createConfig(sortLabels, sortAlgorithmsDatasets[3]));
        new Chart(mergeSortCtx, createConfig(sortLabels, sortAlgorithmsDatasets[4]));
        new Chart(quickSortCtx, createConfig(sortLabels, sortAlgorithmsDatasets[5]));
        new Chart(radixSortCtx, createConfig(sortLabels, sortAlgorithmsDatasets[6]));
        new Chart(selectionSortCtx, createConfig(sortLabels, sortAlgorithmsDatasets[7]));
        new Chart(sortSortCtx, createConfig(sortLabels, sortAlgorithmsDatasets[8]));

        const searchAlgorithmsDatasets = getAlgorithmsDatasets(jsSearchDataset, cppSearchDataset);

        console.log(searchAlgorithmsDatasets);
        new Chart(binarySearchCtx, createConfig(searchLabels, searchAlgorithmsDatasets[0]));
        new Chart(exponentialSearchCtx, createConfig(searchLabels, searchAlgorithmsDatasets[1]));
        new Chart(fibonacciSearchCtx, createConfig(searchLabels, searchAlgorithmsDatasets[2]));
        new Chart(interpolationSearchCtx, createConfig(searchLabels, searchAlgorithmsDatasets[3]));
        new Chart(jumpSearchCtx, createConfig(searchLabels, searchAlgorithmsDatasets[4]));
        new Chart(linearSearchCtx, createConfig(searchLabels, searchAlgorithmsDatasets[5]));
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
})();