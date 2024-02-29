const myData = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phoens = data.data
    getphoneCard(phoens)
}

// get all phone card
function getphoneCard(phones) {
    const cardContainer = document.getElementById('card_container');
    // clear card container before showing new search result.
    cardContainer.textContent = '';
    console.log(phones);

    // display show more btn when cards are grater then 12
    const showMoreBtn = document.getElementById('show_more_btn');
    if(phones.length > 12){
        showMoreBtn.classList.remove('hidden')
    }
    else{
        showMoreBtn.classList.add('hidden')
    }

    // display only 12 cards
    phones = phones.slice(0,12);

    //append cards
    for (const phone of phones) {
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

    // end loading time
    loadingTime(false);
}

// phone search fild
const searchFild = document.getElementById('search_fild')
function searchBtn(){
    loadingTime(true);
    myData(searchFild.value)
}

function loadingTime(isload){
    const loading = document.getElementById('loading_time');
    if(isload){
        loading.classList.remove('hidden')
    }
    else{
        loading.classList.add('hidden')
    }
}



// show more btn
// const showAll = true;
// function showMore(){
//     if(showAll){

//     }
// }