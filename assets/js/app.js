const myData = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phoens = data.data
    getphoneCard(phoens, isShowAll)
}

// get all phone card
function getphoneCard(phones, isShowAll) {
    const cardContainer = document.getElementById('card_container');
    // clear card container before showing new search result.
    cardContainer.textContent = '';

    // display show more btn when cards are grater then 12
    const showMoreBtn = document.getElementById('show_more_btn');
    if(phones.length > 12){
        showMoreBtn.classList.remove('hidden')
    }
    else{
        showMoreBtn.classList.add('hidden')
    }

    // display only 12 cards if isShowAll if false
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    else{
        showMoreBtn.classList.add('hidden')
    }

    //append cards
    for (const phone of phones) {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card pt-3 bg-base-100 shadow-xl">
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body text-center">
          <h2 class="text-xl font-semibold">${phone.phone_name}</h2>
          <p>There are many variations of passages of available, but the majority have suffered</p>
          <div class="card-actions justify-center">
            <button onclick="showDetails('${phone.slug}')" class="btn bg-yellow-500 text-black text-xl font-semibold">Show Details</button>
          </div>
        </div>
      </div>
        `
        cardContainer.appendChild(div);
    }

    // end loading time
    loadingTime(false);
}

// handel card show details btn
const showDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showModalDetails(phone)
}
// show card modal details
const showModalDetails = (phone) => {
    my_modal.showModal();
    const modalDetails = document.getElementById('modal_details');
    modalDetails.innerHTML = `
    <img src="${phone.image}" alt="">
    <h3 class="font-bold mt-3 text-2xl">${phone.name}</h3>
    <p class=""> <span class="font-semibold text-xl">Stroge:</span> ${phone.mainFeatures.storage}</p>
    <p class=""> <span class="font-semibold text-xl">Display Size:</span> ${phone.mainFeatures?.displaySize}</p>
    <p class=""> <span class="font-semibold text-xl">Chipset:</span> ${phone.mainFeatures?.chipSet}</p>
    <p class=""> <span class="font-semibold text-xl">Memory:</span> ${phone.mainFeatures?.memory}</p>
    <p class=""> <span class="font-semibold text-xl">Release Date:</span> ${phone?.releaseDate}</p>
    <p class=""> <span class="font-semibold text-xl">GPS:</span> ${phone?.others?.GPS || 'No GPS'}</p>
    `
}


// phone search fild
const searchFild = document.getElementById('search_fild')
function searchBtn(isShowAll){
    loadingTime(true);
    myData(searchFild.value, isShowAll)
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



// show All btn
function showAll(){
    searchBtn(true);
}

window.onload = myData();