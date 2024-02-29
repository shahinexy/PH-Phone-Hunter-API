const myData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phoens = data.data
    getphoneCard(phoens)
}
myData()

function getphoneCard(phones) {
    const cardContainer = document.getElementById('card_container');
    for (const phone of phones) {
        console.log(phone);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card pt-3 bg-base-100 shadow-xl">
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body text-center">
          <h2 class="text-xl font-semibold">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <h2 class="text-xl font-semibold">Price</h2>
          <div class="card-actions justify-center">
            <button class="btn bg-yellow-500 text-black text-xl font-semibold">Buy Now</button>
          </div>
        </div>
      </div>
        `

        cardContainer.appendChild(div);
    }
}