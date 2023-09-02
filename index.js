let selectedCategory;

//  category wise data loaded here
const categoryWiseDataLoad = async () => {
    const url = 'https://openapi.programming-hero.com/api/videos/categories';
    const res = await fetch(url);
    const data = await res.json();
    const categories = data.data;
    console.log(categories);
    loadDataById(categories[0].category_id);
    displayCategoryWiseData(categories);
}
categoryWiseDataLoad()

// data displayed here

const displayCategoryWiseData = (categories) => {
    const categoryDataContainer = document.getElementById('category-data-container');
    categories.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="loadDataById('${category.category_id}')" class="hover:bg-blogColor hover:text-blogText capitalize px-8 py-2 rounded-md text-xs bg-btnColor">${category?.category}</button>
        `
        categoryDataContainer.appendChild(div)
    });
}

// load data
const loadDataById = async (id) => {
    selectedCategory = id
    const url = `https://openapi.programming-hero.com/api/videos/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data)
}

// sorting part
const sorting = async () => {
    const url = `https://openapi.programming-hero.com/api/videos/category/${selectedCategory}`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data?.data?.sort((a, b) => parseInt(b.others.views.replace(/[KM]/g, ''), 10) - parseInt(a.others.views.replace(/[KM]/g, ''), 10)))
    console.log()
}

// data display part
const displayData = (data) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    const mainData = data;
    if (mainData.length !== 0) {
        mainData.forEach(datum => {
            const div = document.createElement('div');
            div.classList.add('relative','shadow-md','p-4','runded-md')
            div.innerHTML = `
              <img class=" w-full h-[200px]  lg:w-[300px] hover:-translate-y-1 hover:scale-110  lg:h-[200px] rounded-md mb-3" src="${datum.thumbnail}" />
              <div class="absolute left-[55%] bottom-[38%] w-[35%] text-center text-xs text-white bg-black rounded-md">
                 ${datum?.others?.posted_date ? timeCount(datum?.others?.posted_date) : ''}
              </div>
              <div class="flex flex-row items-center gap-3">
                 <img class="w-[40px] h-[40px] rounded-full" src="${datum.authors[0].profile_picture}" alt="" />
                 <div class="space-y-3">
                     <p class=" font-bold">${datum.title}</p>
                   <div class="flex flex-row gap-2 items-center">
                    <p class="text-xs">${datum.authors[0].profile_name}</p>
                     <div >
                        ${datum?.authors[0]?.verified ? `
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <g clip-path="url(#clip0_13_1000)">
                          <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                          <path d="M12.7093 7.20637L9.14053 10.7751L7.29053 8.92668C6.88897 8.52512 6.2374 8.52512 5.83584 8.92668C5.43428 9.32824 5.43428 9.97981 5.83584 10.3814L8.43115 12.9767C8.82178 13.3673 9.45615 13.3673 9.84678 12.9767L14.1624 8.66106C14.564 8.25949 14.564 7.60793 14.1624 7.20637C13.7608 6.80481 13.1108 6.80481 12.7093 7.20637Z" fill="#FFFCEE"/>
                           </g>
                           <defs>
                          <clipPath id="clip0_13_1000">
                          <rect width="20" height="20" fill="white"/>
                          </clipPath>
                          </defs>
                         </svg>` : ''}
                      </div>
                   </div>
                   <p class=" text-xs">${datum.others.views}</p>  
                 </div>
              </div> 
            `
            cardContainer.appendChild(div)
        })
    }
    else {
        const cardContainer = document.getElementById('card-container');
        cardContainer.textContent = '';
        const div = document.createElement('div');
        div.classList.add('lg:w-[1250px]','md:w-[735px]','mt-5')
        div.innerHTML = `
          <img class="w-[20%] lg:w-[10%] md:w-[10%] mx-auto py-2" src="https://i.ibb.co/t8CQdm4/Icon.png" alt="" />
          <p class="text-sm md:text-xl text-center">Oops!! Sorry, There is no content here</p>
        `
        cardContainer.appendChild(div)
    }

}

// blog quistions
const blogQuestions = () => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('w-[1000px]', 'container', 'space-y-3', 'mx-auto', 'lg:ml-[50%]')
    div.innerHTML = `
     <p>
        var:- var is a function scoped,i can acces from anywhere within that function if i want it's value and also it can be reassigned.var variables are hoisted, which means they are moved to the top of their containing function or global scope during execution.
     </p>
     <p>
        let:- let is block scoped, that means it's value will available only within his block.you can reassign it's value like 'var'.let is part of ES6(ECMAScript-2015).
     </p>
     <P>
        const:- const is also a block scoped but you can not reassign if you want.const is also a partof ES6.
     </p>
     <p>In javascript null means absence of value of a variable and it gives a falsy value.</p>
     <p>In javascript undefined means when a variable containes no value from first and output will be undefined and it gives a falsy value too.</p>
     <p>REST API:- REST API means Representational State Transfer Application Programming Interface.It gives us resources to get,put,update and remove resources.To get a structured web application api helps us to provide resources</p>

    `
    cardContainer.appendChild(div)
}

// time count part
const timeCount = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}hrs ${minutes} min ago`;

}



