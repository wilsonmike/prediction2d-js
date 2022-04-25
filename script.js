async function getData() {
    const carsDataResponse = await fetch('https://storage.googleapis.com/tfjs-tutorials/carsData.json');
    const carsData = await carsDataResponse.json();
    const cleaned = carsData.map(car => ({
        mpg: car.Miles_per_Gallon,
        horsepower: car.Horsepower,
    }))
    .filter(car => (car.mpg != null && car.horsepower != null));

    return cleaned;
}

async function run() {
    const data = await getData();
    const values = data.map(d => ({
        x: d.horsepower,
        y: d.mpg,
    }));

    tfvis.render.scatterplot(
        {name: 'HP v MPG'},
        {values},
        {
            xLabel: 'HP',
            yLabel: 'MPG',
            height: 300
        }
    )
}

document.addEventListener('DOMContentLoaded', run);