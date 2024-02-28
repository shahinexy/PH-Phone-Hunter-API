const myData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phoens = data.data
    console.log(phoens);
}
myData()